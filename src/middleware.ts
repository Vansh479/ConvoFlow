import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (["GET", "HEAD", "OPTIONS"].includes(request.method)) {
		return NextResponse.next();
	}

	if (
		request.nextUrl.pathname.startsWith("/api/validate-auth") ||
		request.nextUrl.pathname.startsWith("/api/can-user-join") ||
		request.nextUrl.pathname.startsWith("/api/send-message")
	) {
		return NextResponse.next();
	}

	const originHeader = request.headers.get("Origin");
	const hostHeader = request.headers.get("Host");

	if (
		!originHeader ||
		!hostHeader ||
		!verifyRequestOrigin(originHeader, [hostHeader])
	) {
		console.warn("Blocked by middleware (invalid origin):", originHeader);
		return new NextResponse(null, { status: 403 });
	}

	return NextResponse.next();
}