# Younes AI Discovery

AI-powered business consultation app that guides companies through discovering their ideal AI integration.

## Setup

1. Clone and install:
```bash
git clone https://github.com/younesamer2001-ui/younes-ai-discovery.git
cd younes-ai-discovery
npm install
```

2. Create `.env.local` from the example:
```bash
cp .env.local.example .env.local
```

3. Set up Supabase:
   - Create a new project at supabase.com
   - Run `supabase-schema.sql` in the SQL Editor
   - Copy your URL and keys to `.env.local`

4. Add your Anthropic API key to `.env.local`

5. Run:
```bash
npm run dev
```

## Pages

- `/` — Landing page (Norwegian/English)
- `/login` — Magic link auth
- `/start` — Company profile setup
- `/discover` — AI-powered discovery interview
- `/result` — Final recommendation
- `/admin` — Team dashboard

## Tech Stack

Next.js 14, TypeScript, Tailwind CSS, Supabase, Anthropic Claude API
