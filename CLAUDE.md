# Groove — Claude Code Instructions

## Development Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture

**Stack:** React 19 + Vite 7, single-page app, no router.

**Section-based structure:** Each page section lives in `src/sections/<name>/` with a co-located CSS file (e.g. `Hero.jsx` + `Hero.css`). `App.jsx` composes them top-to-bottom: `Header → Hero → Gallery → ImageCompration → BestSeller → Locations → Insta → WorkWithUs → Footer`.

**GSAP animations:**
- Register plugins at module level: `gsap.registerPlugin(ScrollTrigger, SplitText)`
- Use `useResponsiveGSAP` (from `src/hooks/useResponsive.jsx`) for all GSAP animations — it wraps `useGSAP` with `gsap.matchMedia()` and provides `{ isDesktop, isTablet, isMobile }` to the callback
- Use `useResponsive` (React state hook, same file) only for non-GSAP conditional rendering
- Always pass `{ scope: ref }` as the second arg to `useResponsiveGSAP` to scope selectors

**Responsive breakpoints** (defined in `useResponsive.jsx`):
- `desktop`: min-width 1024px
- `tablet`: 768px–1023px
- `mobile`: max-width 767px

## Key Conventions

- **RTL layout:** `html, body { direction: rtl; }` — all content and layout assumes right-to-left
- **24-column grid:** `.layout-grid` uses `--layout-columns-count: 24` on desktop, collapses to 4 columns on mobile (`@media (max-width: 767px)`)
- **CSS custom properties** (defined in `App.css` `:root`): `--bg-color`, `--text-color`, `--dark-purple`, `--baby-blue`, `--purple`, `--yellow`, `--pink`, `--error`, plus layout vars (`--layout-columns-count`, `--layout-columns-gap`, `--layout-margin`, `--layout-column-width`)
- **Fonts:** `manhattan` (headings, `.sticker-text`) and `futurism` (body/UI) — loaded via `@font-face` from `src/fonts/`
- **Ref-based animation pattern:** Attach `useRef` to DOM elements, animate via refs rather than class selectors when possible; use scoped selectors (`gsap.utils.selector`) for children
- **Co-located CSS:** Import each section's CSS directly in its component file, not globally
- **`sticker-text` utility:** CSS class for outlined/shadow text effect using `::before`/`::after` with `data-text` attribute; variants `sticker-pink` and `sticker-yellow`
