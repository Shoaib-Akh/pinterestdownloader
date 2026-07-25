# Sprint 3 — 2026 UI Design System (Not AI-Generated Look)

**Goal:** Replace the generic dummy UI with a distinctive, premium 2026 design system.  
The site must NOT look like every other AI-generated downloader.

**Time:** 1 day  
**Depends on:** [SPRINT-02-DATABASE-API.md](./SPRINT-02-DATABASE-API.md)  
**Next sprint:** [SPRINT-04-CORE-PAGES.md](./SPRINT-04-CORE-PAGES.md)

---

## Why the Current UI Looks "AI Generated"

| Problem | Current | Fix |
|---------|---------|-----|
| Font | System default (-apple-system) | **Geist** or **Plus Jakarta Sans** |
| Color | Generic Pinterest red `#E60023` | **Indigo `#6C63FF`** + warm neutrals |
| Layout | Everything centered, symmetric | Asymmetric hero, left-aligned content |
| Cards | 6 identical feature boxes | Varied sizes, bento grid layout |
| Hero | "Download X, Y & Z" headline | Specific value prop + live counter |
| Background | Plain white/gradient | Subtle dot grid or noise texture |
| Animations | None or overdone | Purposeful micro-interactions only |
| Icons | Lucide everywhere, same size | Mixed sizes, icon + illustration |
| Dark mode | Basic toggle | System-aware + smooth transition |

---

## Design Tokens (Copy Exactly)

### Colors

```css
/* globals.css */
:root {
  /* Brand */
  --brand-50:  #f0f0ff;
  --brand-100: #e0e0ff;
  --brand-500: #6C63FF;   /* Primary — Indigo Violet */
  --brand-600: #5a52e0;
  --brand-700: #4840c4;

  /* Neutrals — warm, not cold gray */
  --gray-50:  #fafaf9;
  --gray-100: #f5f5f4;
  --gray-200: #e7e5e4;
  --gray-600: #57534e;
  --gray-900: #1c1917;

  /* Surfaces */
  --surface:     #ffffff;
  --surface-alt: #fafaf9;

  /* Semantic */
  --success: #22c55e;
  --error:   #ef4444;
}

.dark {
  --surface:     #0c0a09;
  --surface-alt: #1c1917;
  --gray-50:  #1c1917;
  --gray-900: #fafaf9;
}
```

### Typography

```typescript
// app/layout.tsx — Google Fonts
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| H1 (hero) | 3.5rem / 56px | 800 | -0.03em |
| H2 (section) | 2.25rem / 36px | 700 | -0.02em |
| Body | 1rem / 16px | 400 | 0 |
| Small/caption | 0.875rem | 500 | 0.01em |
| Badge/label | 0.75rem | 600 | 0.05em uppercase |

### Spacing & Radius

```
Border radius:  12px (cards), 16px (modals), 9999px (pills)
Section padding: py-24 (96px) desktop, py-16 mobile
Max width:       1200px (content), 800px (text blocks)
Gap:             8px grid system
```

---

## Component Library (Build These)

Create `src/components/ui/`:

| Component | File | Notes |
|-----------|------|-------|
| Button | `button.tsx` | Primary, secondary, ghost variants |
| Input | `input.tsx` | With icon slot, error state |
| Badge | `badge.tsx` | "Free", "HD", "New" labels |
| Card | `card.tsx` | Subtle border, no heavy shadow |
| Skeleton | `skeleton.tsx` | Loading states for result card |
| Toast | `toast.tsx` | Success/error notifications |

**Do NOT install shadcn for everything** — build 6 components manually. Keeps bundle small and design consistent.

---

## Layout Patterns (2026 Style)

### Hero Section — Asymmetric

```
┌─────────────────────────────────────────────────────┐
│  [Badge: Free · No signup · HD quality]             │
│                                                     │
│  Save any Pinterest          ┌──────────────────┐  │
│  pin in one click.           │  [Live preview   │  │
│                              │   mockup card]   │  │
│  Paste a link, get the       │                  │  │
│  original file.              └──────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 🔗 Paste link here...          [Download ↓] │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ✓ 12,847 downloads today                          │
└─────────────────────────────────────────────────────┘
```

NOT this (AI slop):
```
        ✨ 100% Free Pinterest Downloader ✨
     Download Pinterest Videos, Images & GIFs
              [ centered input ]
         [ feature ] [ feature ] [ feature ]
         [ feature ] [ feature ] [ feature ]
```

### Feature Section — Bento Grid

```
┌──────────────┬────────┐
│  Fast        │ Mobile │
│  (large)     ├────────┤
│              │  HD    │
├──────────────┴────────┤
│  Free & Private (wide)│
└───────────────────────┘
```

Varied card sizes. Not 3×2 identical grid.

### Result Card — Premium Feel

```
┌─────────────────────────────────────────┐
│ ┌─────────┐  Sunset over mountains      │
│ │ preview │  image · original quality   │
│ │  image  │                             │
│ └─────────┘  [↓ Download HD]  [Copy]  │
│              [Share ↗]                  │
└─────────────────────────────────────────┘
```

- Rounded preview with subtle ring border
- Type badge (IMAGE / VIDEO / GIF) — monospace font
- Download button with file size if available
- Copy link button with toast confirmation

---

## Background & Texture

Add to `globals.css`:

```css
body {
  background-color: var(--surface);
  background-image: radial-gradient(circle, var(--gray-200) 1px, transparent 1px);
  background-size: 24px 24px;
}

.dark body {
  background-image: radial-gradient(circle, #292524 1px, transparent 1px);
}
```

Subtle dot grid — not a purple gradient blob.

---

## Motion Guidelines

Install: `npm install framer-motion`

**Use animation ONLY for:**
- Result card appearing (fade + slide up, 300ms)
- FAQ accordion expand (height transition)
- Download button loading spinner
- Toast enter/exit

**Do NOT animate:**
- Page load hero text word-by-word
- Floating icons
- Parallax scrolling
- Pulsing buttons

---

## Dark Mode (Proper Implementation)

Use `next-themes`:
```bash
npm install next-themes
```

```typescript
// providers/theme-provider.tsx
'use client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

Header toggle: Sun/Moon icon, no page flash on load.

---

## Your Tasks

- [ ] Install Plus Jakarta Sans + JetBrains Mono fonts
- [ ] Replace color tokens in `tailwind.config.ts` and `globals.css`
- [ ] Build 6 UI components in `src/components/ui/`
- [ ] Create dot-grid background (no gradient blobs)
- [ ] Install and configure `next-themes`
- [ ] Install `framer-motion` (minimal use)
- [ ] Create `src/components/ui/bento-grid.tsx` for features
- [ ] Update Header — cleaner, less cluttered
- [ ] Remove all "PintDown" / rose-red branding → PinFlow indigo

---

## Verify

- [ ] Site looks distinct — show to someone, they shouldn't say "AI generated"
- [ ] Dark mode works without flash
- [ ] Mobile responsive at 375px width
- [ ] Fonts load (not fallback system font)
- [ ] No purple gradient on white background anywhere
- [ ] Lighthouse Accessibility score ≥ 90 (run in Sprint 8)

---

## Done Checklist

- [ ] Design tokens in CSS
- [ ] Typography system applied
- [ ] 6 UI components built
- [ ] Bento feature grid designed
- [ ] Dark mode with next-themes
- [ ] Dot grid background
- [ ] Brand = PinFlow indigo everywhere

**Next → [SPRINT-04-CORE-PAGES.md](./SPRINT-04-CORE-PAGES.md)**
