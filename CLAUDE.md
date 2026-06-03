# Blackstone Islamic — Project Guide

## Overview

Static SPA for Blackstone Islamic, a Shariah-compliant brokerage with offices in Lahore (Pakistan) and London (UK), targeting the Pakistani capital market (PSX). No backend — purely frontend.

## Tech Stack

- **React + Vite** (JavaScript, not TypeScript)
- **Tailwind CSS v3** via PostCSS
- **Framer Motion** — scroll reveals, navbar animation, cursor effects
- **Lucide React** — icons
- **React Router DOM v6** — client-side routing

## Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project Structure

```
src/
  components/
    Navbar.jsx          # smart sticky navbar + Advisory dropdown
    Footer.jsx          # links, socials, office addresses
    InteractiveHero.jsx # canvas cursor-reactive particle mesh
    GlassCard.jsx       # reusable glassmorphism card primitive
    AnimatedSection.jsx # framer-motion viewport reveal wrapper
    StatsBar.jsx        # animated counter stats strip
    CursorGlow.jsx      # soft cursor-follower glow (global polish)
  pages/
    Home.jsx            # hero + presence + stats + services teaser
    Report.jsx          # market report cards
    Intel.jsx           # intelligence feed
    Advisory.jsx        # 4 anchored service sections
    Client.jsx          # client portal landing (no real auth)
    Content.jsx         # blog / market insights grid
  App.jsx               # Router + layout shell
  main.jsx
```

## Design System

### Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| Navy 950 | `#050d1a` | Page background |
| Navy 900 | `#0a1628` | Section backgrounds |
| Navy 800 | `#0f1e38` | Card backgrounds (solid) |
| Accent | `#38bdf8` | Buttons, highlights, canvas nodes |
| Silver | `#94a3b8` | Secondary text |
| White | `#ffffff` | Primary text |

### Glassmorphism Pattern

```jsx
// Standard glass card
className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"

// Navbar glass
className="bg-white/5 backdrop-blur-lg border-b border-white/10"
```

### Animation Pattern (`AnimatedSection`)

All page sections use the `AnimatedSection` wrapper for consistent scroll reveals:

```jsx
<AnimatedSection>
  {/* content fades in + slides up on viewport entry */}
</AnimatedSection>
```

Internally uses: `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: "-80px" }}`.

## Routing

| Path | Page |
|------|------|
| `/` | Home |
| `/report` | Report |
| `/intel` | Intel |
| `/advisory` | Advisory (4 anchored sections) |
| `/client` | Client |
| `/content` | Content |

Advisory dropdown links use `/advisory#equities`, `/advisory#asset-management`, `/advisory#ma`, `/advisory#ipo` — all smooth-scroll anchors within one page.

## Navbar Behavior

- Sticky, starts transparent, gains glass background after 20px scroll
- Hides (`translateY: -100%`) when scrolling **down** past 80px
- Reveals (`translateY: 0`) when scrolling **up**
- Advisory item triggers a dropdown on hover (desktop) / tap (mobile)
- Collapses to hamburger on mobile (`< 768px`)

## InteractiveHero Canvas

- ~150 nodes drift slowly, connect with lines when within 120px
- On `mousemove`: nodes within 150px radius repel from cursor (subtle)
- Node color: `rgba(56, 189, 248, 0.5)` | Line color: `rgba(56, 189, 248, 0.15)`
- Canvas resizes on `window.resize`
- Animation loop via `requestAnimationFrame`

## Content / Data

All data is **mock/static** — defined as arrays at the top of each page file. No API calls.

Placeholder stats (update in place):
- Markets: `40+`
- Screened Instruments: `3,200+`
- Offices: `Lahore · London`

## Key Conventions

- No TypeScript — plain `.jsx` throughout
- No global state management — local state only (`useState`, `useRef`)
- No comment blocks — self-documenting names only
- Tailwind utility classes only — no custom CSS files beyond `index.css` globals
- Framer Motion `motion.div` for all animated elements; never CSS `@keyframes`
- Lucide icons imported individually: `import { ArrowRight } from 'lucide-react'`

## Islamic Branding Policy

Finance-first tone. Shariah compliance mentioned in **copy only** — no Arabic text, no geometric Islamic patterns, no calligraphy. Small "Shariah-Compliant" text badges on service cards are acceptable.

## Office Addresses (Placeholders)

- **Lahore**: [Street Address], Lahore, Punjab, Pakistan
- **London**: [Street Address], London, United Kingdom

## Regulatory Footers

- SECP regulated (Pakistan Securities & Exchange Commission)
- FCA Authorised (UK Financial Conduct Authority)
