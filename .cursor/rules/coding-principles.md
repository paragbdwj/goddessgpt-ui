---
description: Coding standards, best practices, and guidelines for Next.js, TypeScript, and shadcn/ui projects.
alwaysApply: true
---

# Next.js & shadcn/ui: Coding Best Practices

This document outlines the core coding standards, architectural patterns, and best practices to ensure consistency, scalability, and maintainability for our Next.js project.

---

## 1. Project Structure (App Router)

A clean structure is key. We follow a **feature-based or domain-based grouping** within the `app` directory.

```
/src
├── /app
│ ├── /_components # Shared components (global)
│ ├── /_lib # Shared logic, utils, hooks (global)
│ ├── /(api) # Route Handlers (API routes)
│ │ └── /api
│ │ └── /...
│ ├── /(main) # Main application routes (e.g., dashboard, marketing)
│ │ ├── /dashboard
│ │ │ ├── /_components # Components specific to dashboard
│ │ │ ├── /settings
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── /layout.tsx # Layout for (main) group
│ │ └── page.tsx # Landing page
│ ├── /layout.tsx # Root layout (MUST include <html> and <body>)
│ ├── /globals.css # Global styles (imported in root layout)
│ └── page.tsx # Root page (often unused, redirect or landing)
│
├── /components # shadcn/ui components (as installed)
│ └── /ui # Default dir for shadcn/ui
│
├── /lib
│ ├── utils.ts # shadcn/ui utils (cn function)
│ └── validators.ts # Zod schemas, etc.
│
├── /public # Static assets
│
├── /types # Global type definitions
│ └── index.ts
│
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json # TypeScript configuration
└── next.config.mjs # Next.js configuration
```

- **Route Groups `()`:** Use route groups like `(main)` or `(auth)` to organize routes without affecting the URL path.  
- **Private Folders `_`:** Use private folders like `_components` or `_lib` to co-locate modules within the `app` directory. These folders are ignored by the router.

---

## 2. Next.js App Router

### Server Components by Default

- **Rule:** All components in the App Router are **Server Components** by default. Only add `"use client"` when absolutely necessary.  
- **Why:** Better performance, smaller client-side bundles, direct data fetching, improved security (server-only code).

**When to use `"use client"`:**
- Event listeners (`onClick`, `onChange`, etc.)
- React hooks (`useState`, `useEffect`, `useContext`, `useReducer`, etc.)
- Browser-only APIs (`window`, `localStorage`)
- Custom hooks that depend on state or browser APIs.

### Component Architecture

- **Pattern:** Keep Client Components as small as possible (leaf components).  
- **Pass Server Components as Props:** Pass Server Components (like `<Analytics />`) as `children` or props to Client Components.

```tsx
// app/page.tsx (Server Component)
import { ClientWrapper } from './_components/client-wrapper';
import { ServerAnalytics } from './_components/server-analytics';

export default function HomePage() {
  return (
    <ClientWrapper>
      {/* ServerAnalytics is rendered on the server */}
      {/* and passed to the client wrapper as a child */}
      <ServerAnalytics />
    </ClientWrapper>
  );
}
```

### Data Fetching

- **Server Components:** Fetch data directly in Server Components using async/await.
- **Benefits:** React cache, deduplication, and better performance.
- **Client Components:** Use SWR or React Query for client-side fetching (dynamic data).
- **Route Handlers (APIs):** Use route.ts for API endpoints.

**Note:** Server Components should not call their own Route Handlers; they should access the database or service directly.

---

## 3. TypeScript

### Strict Mode is Mandatory

Ensure `"strict": true` is set in `tsconfig.json`.

### Types vs. Interfaces

**Default to `type`:** Use `type` for props, state, and general object shapes.

```typescript
type UserProfileProps = {
  userId: string;
  name: string;
};
```

**Use `interface`:** For objects that may be extended or merged (e.g., class contracts or declaration merging).

### Zod for Validation

Use Zod for all data validation (e.g., forms, API Route Handlers).

```typescript
import { z } from 'zod';

// Define schema
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// Infer type
export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
```

---

## 4. shadcn/ui & Tailwind CSS

### The cn Utility

**Rule:** ALWAYS use the `cn` utility (from `@/lib/utils`) for merging Tailwind classes.

**Why:** It intelligently handles conditional merging and overrides.

```tsx
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### Theme & Variables

**Rule:** Define all colors, fonts, and radii in `tailwind.config.ts` using CSS variables.

**Files:**
- `src/app/globals.css` — Define variable values
- `tailwind.config.ts` — Map tokens to Tailwind

**Why:** Enables dynamic theming and centralizes design tokens.

### Responsive Design

**Rule:** Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).

**Avoid:** Fixed `px` widths — use `max-w-` utilities with `mx-auto` and `w-full`.

---

## 5. State Management

- **Component State:** `useState` / `useReducer` (default).
- **URL State:** Use `useSearchParams` and `usePathname` for sharable states.
- **React Context:** Use for infrequent global state (e.g., theme, auth user).
- **Zustand / Jotai:** Use for frequently updated global states (e.g., cart, form state).

Prefer these lightweight options over Redux.

---

## 6. Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Components (React) | PascalCase | `UserProfile.tsx` |
| Next.js Routes Files | kebab/lower | `page.tsx`, `layout.tsx` |
| Variables & Functions | camelCase | `getUserProfile` |
| Types & Interfaces | PascalCase | `UserProfileType` |
| CSS / Tailwind Classes | kebab-case | `custom-card` |

---

