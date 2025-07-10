import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { parse } from "cookie";
import { joinLimiter, messagesLimiter, socketLimiter } from "./lib/limiters";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

declare module "socket.io" {
	interface Socket {
		user?: {
			username: string;
			userId: string;
			sessionId: string;
		};
	}
}

let io: Server;

app.prepare().then(() => {
	const httpServer = createServer((req, res) => {
		handler(req, res);
	});

	io = new Server(httpServer, {
		cors: {
			origin: `http://${hostname}:${port}`,
			credentials: true,
		},
	});

	io.use(async (socket, next) => {
		try {
			const cookies = socket.handshake.headers.cookie;
			if (!cookies) return next(new Error("No cookies sent"));

			const { auth_session } = parse(cookies);
			if (!auth_session) return next(new Error("No session ID"));

			await socketLimiter.consume(`${auth_session}-${socket.handshake.address}`, 1);

			const res = await fetch(`http://${hostname}:${port}/api/validate-auth`, {
				method: "POST",
				body: JSON.stringify({ sessionId: auth_session }),
				headers: { "Content-Type": "application/json" },
			});

			const result = (await res.json()) as
				| { username: string; userId: string }
				| { error: string };

			if ("error" in result) return next(new Error(result.error));

			const { username, userId } = result;
			socket.user = { username, userId, sessionId: auth_session };

			next();
		} catch (error) {
			console.error("Socket auth error:", error);
			return next(new Error("Authentication error"));
		}
	});

	io.on("connection", (socket) => {
		console.log("✅ New connection:", socket.user?.username);

		socket.on("join_channel", async (channelId: string) => {
			if (!socket.user) return;

			try {
				await joinLimiter.consume(socket.user.username, 1);

				const res = await fetch(`http://${hostname}:${port}/api/can-user-join`, {
					method: "POST",
					body: JSON.stringify({
						sessionId: socket.user.sessionId,
						channelId,
					}),
					headers: { "Content-Type": "application/json" },
				});

				const result = (await res.json()) as { allow: boolean; error?: string };

				if (result.allow === true) {
					socket.join(channelId);
					console.log(`🟢 ${socket.user.username} joined ${channelId}`);
				} else {
					console.warn(`❌ Join denied: ${result.error}`);
				}
			} catch {
				console.warn(`❌ Rate limited join: ${socket.user.username}`);
			}
		});

		socket.on("send_message", async (channelId: string, content: string) => {
			if (!socket.user) return;
			if (!content.trim() || content.trim().length > 400) return;

			try {
				await messagesLimiter.consume(socket.user.username, 1);

				const res = await fetch(`http://${hostname}:${port}/api/send-message`, {
					method: "POST",
					body: JSON.stringify({
						sessionId: socket.user.sessionId,
						channelId,
						content,
					}),
					headers: { "Content-Type": "application/json" },
				});

				const body = (await res.json()) as { msg?: unknown };

				if (res.status === 200 && "msg" in body) {
					io.to(channelId).emit("new_message", body.msg);
					console.log(`✉️ ${socket.user.username} -> ${channelId}: ${content}`);
				} else {
					console.warn("Message failed to send:", body);
				}
			} catch {
				console.warn(`❌ Message rate limit: ${socket.user.username}`);
			}
		});
	});

	httpServer.once("error", (err) => {
		console.error("❌ Server error:", err);
		process.exit(1);
	});

	httpServer.listen(port, () => {
		console.log(`🚀 Server ready at http://${hostname}:${port}`);
	});
});
