# Solid Lab

Educational repo for learning **SolidJS** and **SolidTV** (`@solidtv/solid`) with interactive examples.

## What is SolidJS?

SolidJS is a reactive framework for user interfaces. Unlike React, it doesn't use a Virtual DOM — updates are granular and applied directly where needed, making it extremely fast.

## What is SolidTV / @solidtv/solid?

`@solidtv/solid` is a fork of `@lightningtv/solid` maintained by the team for TV applications (Smart TVs, set-top boxes). It renders on a WebGL canvas instead of the DOM. This fork maintains compatibility with **Chromium 47** (Samsung Tizen TVs), unlike the upstream which requires modern browsers.

See [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) for more details about the fork and versioning.

## Installation

```bash
# Requires Node.js >= 22 (only for tooling, the output is compatible with Chromium 47)
fnm use 22   # or nvm use 22

npm install
npm run dev
```

## Navigation

- **Up/Down arrows**: move focus in the sidebar
- **Enter**: select a topic
- **Arrows**: navigate within examples

## Final example: Streaming Home

The last sidebar item, **SolidTV: Streaming Home**, brings the PDF's concepts together at `/#/20-streaming-home`. The code lives in `src/examples/20-streaming-home/`, with one component per file: `Example` handles catalog loading, `CatalogStatus` displays loading/empty/error states, and `StreamingHome` owns the shared state and composes `Hero`, `PosterCard`, `Carousel`, and `FavoriteButton`.

`createResource` loads `/SolidTV_Assets/movies.json` with a local `fetch`. Focusing a card in either carousel updates the hero's image, title, and description through a signal. A store shares favorites by ID, and a memo calculates the list count.

Each carousel repeats its four movies three times (12 cards) to demonstrate scrolling. `scroll="always"` moves the row by one card per **← / →** press, keeping the focused card in the first visible position, even at the end of the list.

Use **↑ / ↓** to browse rows. Press **Enter on a card** in either carousel to jump directly to the favorite button, without previewing another movie along the way. The original card gets a **blue border**; **orange** indicates keyboard focus. Press **Enter on the button** to add or remove the movie, then **↓** to return to the exact card and scroll position.

The example remembers an `ElementNode` and its row index for focus restoration, not just a movie ID: repeated cards are separate focus targets. Browsing a card clears the blue selection marker. Favorites still use movie IDs, so every copy reflects the same saved state. **←** from the first card or the button returns to the sidebar. Favorites last while this page is mounted.

## Documentation

### SolidJS
- [SolidJS Official Docs](https://docs.solidjs.com/) — Guides, tutorials, and API reference
- [SolidJS GitHub](https://github.com/solidjs/solid)
- [@solidjs/router GitHub](https://github.com/solidjs/solid-router)

### SolidTV (fork of LightningTV for Chromium 47)
- [@solidtv/solid GitHub](https://github.com/solid-tv/solid) — SolidJS bindings for the renderer
- [@solidtv/renderer GitHub](https://github.com/solid-tv/renderer) — WebGL rendering engine

### LightningTV (upstream)
- [LightningTV Solid Docs](https://lightningtv.dev/solid) — Guides for the upstream Solid integration (API is similar to `@solidtv/solid`)
- [@lightningtv/solid GitHub](https://github.com/lightning-tv/solid)
- [@lightningjs/renderer GitHub](https://github.com/lightning-js/renderer)

> **Note:** This project uses `@solidtv/*`, not `@lightningtv/*`. The upstream docs are useful as reference since the APIs are similar, but there are differences — see [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md).

## Main Dependencies

| Package              | Version | Role                             |
|----------------------|---------|----------------------------------|
| `@solidtv/renderer`  | 1.6.4   | WebGL rendering engine           |
| `@solidtv/solid`     | 1.5.0   | SolidJS bindings for the renderer|
| `solid-js`           | 1.9.10  | Reactive framework               |
| `@solidjs/router`    | 0.16.1  | Router for SolidJS               |

## Topics

### SolidJS

| #  | Topic            | Folder                            | Concept                                       |
|----|------------------|-----------------------------------|-----------------------------------------------|
| 00 | Lifecycle        | `src/examples/00-lifecycle/`      | `onMount`, `onCleanup` and component lifecycle|
| 01 | Signals          | `src/examples/01-signals/`        | Basic `createSignal` (counter)                |
| 02 | Effects          | `src/examples/02-effects/`        | `createEffect` + `onMount`/`onCleanup`        |
| 03 | Memos            | `src/examples/03-memos/`          | `createMemo` for derived values               |
| 04 | Control Flow     | `src/examples/04-control-flow/`   | `Show`, `For`, `Index`, `Switch`/`Match` and `Dynamic` |
| 05 | Stores           | `src/examples/05-stores/`         | `createStore` with nested objects             |
| 06 | Context          | `src/examples/06-context/`        | `createContext`/`useContext` for shared state  |
| 07 | Resources        | `src/examples/07-resources/`      | `createResource` simulating a fetch           |
| 08 | Batch & Untrack  | `src/examples/08-batch-untrack/`  | `batch` groups updates; `untrack` reads without subscribing |

### SolidTV

| #  | Topic            | Folder                            | Concept                                       |
|----|------------------|-----------------------------------|-----------------------------------------------|
| 09 | View & Text      | `src/examples/09-view-text/`      | Using `view` and `text` elements              |
| 10 | Styles           | `src/examples/10-styles/`         | Styles, colors, borders, shadows              |
| 11 | Theming          | `src/examples/11-theming/`        | Spread styles, `$state` theming, dynamic themes|
| 12 | Row & Column     | `src/examples/12-row-column/`     | `Row` and `Column` with automatic navigation  |
| 13 | Focus Management | `src/examples/13-focus-management/`| `useFocusManager`, autofocus, onFocus/onBlur |
| 14 | Remote Keys      | `src/examples/14-remote-keys/`    | keyMap and `onEnter`/`onLeft`/`onRight` handling |
| 15 | Routing          | `src/examples/15-routing/`        | Router and Route with 2 screens               |
| 16 | Animations       | `src/examples/16-animations/`     | Simple animation with animate                 |
| 17 | Images           | `src/examples/17-images/`         | Loading an image/texture                      |
| 18 | Large Lists      | `src/examples/18-large-lists/`    | Large list with scroll/virtualization         |
| 19 | Grid             | `src/examples/19-grid/`           | Grid component with 2D navigation             |
| 20 | Streaming Home   | `src/examples/20-streaming-home/` | Reactive hero, carousels and shared favorites |
