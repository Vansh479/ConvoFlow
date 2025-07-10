# ConvoFlow

A modern, full-stack real-time chat application built with **Next.js 14**, **Socket.IO**, **Supabase PostgreSQL**, **Drizzle ORM**, and **Lucia Auth**. Supports public channels, direct messaging, real-time message delivery, and secure user authentication.

> ⚡ Developed as a personal project to demonstrate real-time full-stack development skills with a focus on performance, modern architecture, and developer experience.

---

## 🚀 Features

- ✅ **Authentication**: Sign up / Sign in with secure password handling using **Lucia Auth**.
- 💬 **Real-Time Messaging**: Powered by **Socket.IO**.
- 👥 **Direct Messaging** and **Public Channels** support.
- 📦 **PostgreSQL + Drizzle ORM**: Typed, scalable database with schema-first dev experience.
- ⚙️ **Rate Limiting** on channel/message creation to prevent abuse.
- 📱 **Responsive UI** built with Tailwind CSS and shadcn/ui.
- 🧑‍🤝‍🧑 **Invite System** for channels.
- 🧼 **Secure Cookie-based Sessions** via Lucia.
- 💡 **Component-based design** for clean UI logic.
- 🧪 Powered by **React Query** for efficient data fetching.

---

## 🏗️ Tech Stack

| Tech                  | Purpose                                 |
|-----------------------|-----------------------------------------|
| **Next.js 14**        | App framework (App Router)              |
| **React**             | Frontend UI                             |
| **Tailwind CSS**      | Styling                                 |
| **Socket.IO**         | Real-time messaging                     |
| **Lucia Auth**        | Authentication/session management       |
| **Drizzle ORM**       | Database ORM                            |
| **Supabase**          | PostgreSQL hosting                      |
| **React Query**       | Client-side caching/fetching            |
| **Zod**               | Validation                              |

---

## 📦 Installation & Usage

```bash
# Clone the repository
git clone https://github.com/Vansh479/ConvoFlow.git
cd next14-chat-app

# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env.local
# → Edit with your Supabase DB, secrets, etc.

# Push Drizzle schema to DB
pnpm drizzle:push

# Start the dev server
pnpm dev
```

---


## 🧠 How It Works

- **Users** can create public channels or start direct messages.
- All chat messages are persisted in PostgreSQL.
- When a message is sent, it's broadcasted using `Socket.IO` to everyone in the channel.
- Each message is stored and shown in real time.
- Only authenticated users can access chats.

---

## 🛡️ Security Notes

- Uses secure, **httpOnly cookies** via Lucia.
- All channels/messages are protected by session verification.
- Rate limiters are used for spam prevention.

---


## 📄 License

MIT License