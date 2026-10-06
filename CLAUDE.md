# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Solid Lab is an educational app for learning **SolidJS** and **SolidTV** (`@solidtv/solid`) through interactive examples. It renders on a **WebGL canvas** (not the DOM) using the SolidTV renderer — a fork of LightningTV maintained for **Chromium 47** compatibility (Samsung Tizen TVs). The content and comments are in Spanish.

## Commands

```bash
npm run dev      # Start Vite dev server (hot reload)
npm run build    # Type-check (tsc -b) then Vite production build
npm run preview  # Serve the production build locally
```

No test runner, linter, or formatter is configured.

## Architecture

**Rendering pipeline:** This is NOT a DOM app. SolidJS is configured in `universal` mode (`vite.config.ts`) so JSX compiles to `@solidtv/solid` calls, which render to a WebGL canvas via `@solidtv/renderer`. The entry point (`src/index.tsx`) creates the WebGL renderer at 1920×1080, registers shaders, and initializes the focus manager.

**App structure:**
- `src/App.tsx` — HashRouter with a sidebar + content panel layout. Each topic is a `<Route>`.
- `src/Sidebar.tsx` — TV-navigable sidebar using `Column` with keyboard focus (arrows + Enter).
- `src/ExamplePanel.tsx` — Wrapper that displays a title, file path, description, and the example content.
- `src/pages/*Page.tsx` — One page per topic; wraps the example in `ExamplePanel`.
- `src/examples/NN-topic/Example.tsx` — Self-contained example component for each SolidJS/SolidTV concept.
- `src/examples/topics.ts` — Topic registry (id, label, path, description, category). Drives the sidebar and routing.

**Adding a new topic:** Add an entry to `topics.ts`, create `src/examples/NN-topic/Example.tsx`, create `src/pages/TopicPage.tsx` wrapping it in `ExamplePanel`, add a `<Route>` in `App.tsx`, and import the page there.

## Key Constraints

- **Chromium 47 target:** The `@solidtv/*` packages are pinned to exact versions (no `^` or `~`) because even a minor bump can introduce JS/WebGL APIs unavailable on legacy Samsung TVs. Do not change these versions without testing on a physical device.
- **`@solidtv/*` ≠ `@lightningtv/*`:** This project uses the `@solidtv` fork, not the upstream `@lightningjs/renderer` or `@lightningtv/solid`. Version numbers between the two are not comparable. See `docs/DEPENDENCIES.md`.
- **No DOM elements:** All UI uses `<view>` and `<text>` (SolidTV primitives), not HTML elements. Layout uses `Row`/`Column` from `@solidtv/solid/primitives`, not CSS flexbox/grid.
- **Colors are hex numbers:** Styles use `0xRRGGBBAA` format (e.g., `0x7c3aedcc`), not CSS color strings.
- **Focus-based navigation:** The app uses TV-style spatial navigation via `useFocusManager`, `forwardFocus`, `autofocus`, `onEnter`, `forwardStates`, and `skipFocus`. There is no mouse/touch interaction.
- **Shaders required:** `registerDefaultShaders()` must be called in the entry point for `borderRadius`, `border`, and shadow effects to render.

## Import Patterns

```tsx
import { createSignal } from 'solid-js'           // Core SolidJS reactivity
import { Show, For } from '@solidtv/solid'         // Control flow (NOT from solid-js)
import { Column, Row } from '@solidtv/solid/primitives'  // Layout primitives
import { useFocusManager } from '@solidtv/solid/primitives'  // Focus system
import { HashRouter } from '@solidtv/solid/primitives/router' // Router binding
import { Route, useNavigate, useLocation } from '@solidjs/router' // Route definitions
import type { ElementNode } from '@solidtv/solid'  // Node type for refs
```

Note: `Show`, `For`, `Switch`/`Match` are imported from `@solidtv/solid`, not from `solid-js`.
