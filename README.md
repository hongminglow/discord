# Discord-like Chat Application

A real-time chat application built with [Next.js](https://nextjs.org), [Supabase](https://supabase.com), and [TypeScript](https://www.typescriptlang.org). This project demonstrates how to build a modern, scalable chat platform with real-time messaging, presence tracking, and Row-Level Security (RLS) policies.

## Features

- **Real-Time Messaging**: Powered by Supabase Realtime, messages broadcast instantly to all room members using PostgreSQL triggers and realtime subscriptions.
- **Presence Tracking**: See who's online in each chat room with live presence updates.
- **Public & Private Rooms**: Create public rooms anyone can join or invite-only rooms for focused conversations.
- **GitHub OAuth**: Seamless authentication via GitHub through Supabase Auth.
- **Row-Level Security**: Database-level security ensures users can only access rooms they're members of and see messages from those rooms.
- **PostgreSQL Triggers**: Automatic `user_profile` creation on signup and real-time message broadcasting via database functions.
- **Infinite Scroll**: Load older messages on demand with optimized pagination.

## Architecture

### Frontend

- **Next.js 16** with React 19 (App Router)
- Real-time subscriptions using `@supabase/supabase-js`
- Server Components and Server Actions for SSR

### Backend

- **Supabase PostgreSQL**: Core database with RLS policies and triggers
- **Supabase Realtime**: WebSocket-based pub/sub for live messages and presence
- **PostgreSQL Functions**: Custom functions for room creation, member management, and message broadcasting

### Database Schema

- `auth.users` - Supabase authentication users
- `public.user_profile` - User profile data (auto-populated via trigger)
- `public.chat_room` - Chat room metadata (public/private flag)
- `public.chat_room_member` - Room membership associations
- `public.message` - Chat messages with author references

### Key Database Functions & Policies

- **Trigger**: `handle_new_user_profile()` - Creates profile row when user signs up
- **Trigger**: `broadcast_new_message()` - Broadcasts messages to realtime channel on insert
- **RLS Policies**:
  - Members can read messages only from rooms they're in
  - Members can join public rooms
  - Members can remove themselves from rooms
  - Users can read all profiles

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase project (free tier available at [supabase.com](https://supabase.com))
- GitHub OAuth app credentials

### Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd discord
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (`.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=<your-anon-key>
SUPABASE_SECRET_KEY=<your-service-role-key>
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing Real-Time Chat

### With Two Users

1. Sign in with your GitHub account
2. Create a public chat room
3. Use the Supabase SQL editor to create a second test user and add them to the room
4. Insert a message on behalf of the second user (use the provided SQL template)
5. Watch the message appear in real-time on your client

### Presence Tracking

- Join a room and watch the "X users online" counter update as you connect/disconnect
- Use multiple browser tabs or windows to simulate multiple users

## Key Technologies

- **Next.js 16** - React framework with SSR and Server Actions
- **Supabase** - PostgreSQL backend + Auth + Realtime
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Zod** - Runtime schema validation
- **React Hook Form** - Form state management

## Development

### Generate TypeScript Types

Update database types after schema changes:

```bash
npm run gen-types
```

### Database Migrations

Deploy SQL functions and RLS policies via Supabase CLI:

```bash
npx supabase db execute < migrations/schema.sql
```

## Deployment

The app is optimized for deployment on [Vercel](https://vercel.com). For production:

1. Set environment variables in your Vercel project settings
2. Push to GitHub and Vercel auto-deploys
3. Ensure Supabase project is accessible from your deployment URL

See [Vercel deployment documentation](https://vercel.com/docs/frameworks/next-js/deploy) for details.

## Learning Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/sql-createtrigger.html)
- [Row-Level Security](https://supabase.com/docs/guides/auth/row-level-security)
