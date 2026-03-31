# HilalOS — Project Guide for Claude

## Tech Stack & Architecture
- **Framework:** React 19.2.0 with TypeScript 5.9.3 (strict mode)
- **Build:** Vite 7.3.1 with `@vitejs/plugin-react` + `@tailwindcss/vite`
- **State Management:** Zustand 5.0.11 — 6 stores: `boot-store`, `window-store`, `desktop-store`, `theme-store`, `wallpaper-store`, `ai-store`
- **Styling:** Tailwind CSS 4.1.18 with custom Win95 CSS variables (defined in `src/index.css`). Use `cn()` from `src/utils/cn.ts` for class merging.
- **Animation:** Framer Motion 12.34.0
- **3D:** Three.js 0.183.2 + React Three Fiber 9.5.0 + Drei 10.7.7 (3D avatar with mouse tracking)
- **AI:** Google Generative AI (Gemini 2.5 Flash) — direct browser client + Firebase Cloud Functions backend
- **Hosting:** Firebase Hosting (SPA rewrite). Analytics via Firebase + custom Firestore visitor tracking.
- **Path Alias:** `@/*` → `./src/*`

## Project Rules
- **Maintain perfect Win95 aesthetic.** Always use the CSS variables (`--color-win-*`, `--shadow-win-*`, `--font-fixedsys`, `--font-ms-sans`). Never use modern rounded corners or gradients that break the retro feel.
- **Use Framer Motion for all animations.** Entry/exit via `AnimatePresence`, spring physics for interactive elements.
- **All complex state must use Zustand.** Follow the existing pattern: typed interface → `create<Interface>((set, get) => ({...}))`.
- **Run `npm run build` to type-check before submitting.** The build runs `tsc -b && vite build`.
- **Z-index hierarchy:** Desktop(0) → Windows(100+) → AI Orb(8000) → Taskbar(9000) → Start Menu(9100) → Boot(10000). Respect this layering.
- **Window management:** Use `useWindowStore.openWindow()` to programmatically open windows. Reuse `WINDOW_CONFIGS` from `src/hooks/use-ai-commands.ts` for title/icon lookups.
- **Keep components small.** Follow the existing pattern of one component per file, co-located with related components in feature folders.

## Key Patterns
- Desktop icons are rendered from `src/data/desktop-icons.ts` via `useDesktopStore`
- Window content routing happens in `src/components/desktop/window-content-renderer.tsx` (switch on `WindowType`)
- First-visit logic is in `App.tsx` using `localStorage('hilalOS-visited')`
- Boot skip logic uses `localStorage('sentient-os-skip-boot')`
