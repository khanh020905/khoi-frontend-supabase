# FluentFlow - English Learning Platform

A modern, responsive, and highly interactive English learning platform built with Next.js App Router, Tailwind CSS, and Supabase.

## Project Overview

FluentFlow helps users build a daily English habit through vocabulary, grammar, listening, speaking practice, quizzes, and progress tracking. It uses a clean, warm, educational design aesthetic.

## Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS (v4)](https://tailwindcss.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Folder Structure

```txt
fe/
├── src/
│   ├── app/
│   │   ├── admin/             # CMS Admin Dashboard
│   │   ├── dashboard/         # User Dashboard
│   │   ├── login/             # Login Page
│   │   ├── signup/            # Signup Page
│   │   ├── globals.css        # Global Tailwind variables
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Landing Page
│   ├── components/
│   │   ├── admin/             # CMS Components (Sidebar, StatCard)
│   │   ├── hooks/             # Reusable Custom Hooks
│   │   ├── landing/           # Landing Page Components
│   │   └── ui/                # Shared UI Components
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client setup
│   │   └── database.types.ts  # Supabase TypeScript types
├── public/                    # Static assets
└── .github/workflows/         # GitHub Actions CI/CD configuration
```

## Environment Variables

Copy the `.env.example` file to `.env` or `.env.local` for local development:

```bash
cp .env.example .env.local
```

Populate it with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available npm scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.

## Supabase Setup Notes

- Make sure you have created a Supabase project.
- Obtain the `URL` and `anon key` from your project settings (`Project Settings > API`).
- For user authentication to work, ensure email/password authentication is enabled in Supabase (`Authentication > Providers`).

## Code Conventions

### Component Naming
- React components must use **PascalCase**.
- Example: `Header`, `LoginForm`, `LessonCard`.

### File Naming
- Use **kebab-case** for component files, except for Next.js convention files like `page.tsx` or `layout.tsx`.
- Example: `lesson-card.tsx`, `login-form.tsx`.
- *Note: Some legacy files may currently use PascalCase (e.g. `HeroSection.tsx`), but new files should follow kebab-case.*

### Hooks
- Custom hooks must start with `use`.
- Example: `useAuth`, `useSectionReveal`.

### Imports
- Prefer absolute imports using the `@/` alias (e.g., `import { supabase } from "@/src/lib/supabase"`).
- Group imports clearly: external libraries first, then internal module imports.

### TypeScript
- Avoid using `any` unless absolutely necessary.
- Define reusable types/interfaces in a `types/` folder or adjacent to the component.
- Prefer explicit types for component props.

### Tailwind CSS
- Keep class names readable.
- Avoid writing unnecessary custom CSS in `globals.css`; rely on utility classes.
- Reuse common UI components when styles repeat heavily.

### Supabase
- Keep all Supabase client setup inside `src/lib/supabase.ts`.
- **Never expose service role keys on the frontend.**
- Only use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in client-side code.

## Security Checklist

- [ ] **Do not commit `.env.local`**: It is ignored by `.gitignore`, ensure it stays that way.
- [ ] **Do not expose Supabase service role key**: The service key bypasses RLS and should never be used in Next.js client components.
- [ ] **Only use publishable/anon keys on frontend**: Variables prefixed with `NEXT_PUBLIC_` are safe.
- [ ] **Keep real secrets in environment variables**: Use your hosting provider's dashboard (e.g., Vercel) to manage production secrets.
