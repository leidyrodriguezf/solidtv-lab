# Dependencies: `@solidtv/*` vs `@lightningtv/*` / `@lightningjs/*`

This document explains why tvsolid uses the `@solidtv` namespace instead of the upstream
`@lightningtv` / `@lightningjs` packages, and why versions are pinned.

---

## Two ecosystems, same lineage

The TV rendering stack in this project comes from the **Lightning** ecosystem — an open-source
WebGL framework for building TV apps. However, tvsolid does **not** consume the upstream packages
directly. Instead, it uses a **fork** published under the `@solidtv` namespace.

### Package mapping

| Upstream (Lightning)          | Fork (SolidTV)          | Role                          |
| ----------------------------- | ----------------------- | ----------------------------- |
| `@lightningjs/renderer` ^3.x  | `@solidtv/renderer` 1.x | WebGL rendering engine        |
| `@lightningtv/solid` ^3.x     | `@solidtv/solid` 1.x    | SolidJS bindings for the renderer |

### Repositories

| Package              | GitHub                                   | Maintainer |
| -------------------- | ---------------------------------------- | ---------- |
| `@solidtv/renderer`  | https://github.com/solid-tv/renderer     | chiefcll   |
| `@solidtv/solid`     | https://github.com/solid-tv/solid        | chiefcll   |
| `@lightningjs/renderer` | https://github.com/lightning-js/renderer | Metrological team |
| `@lightningtv/solid`    | https://github.com/lightning-tv/solid    | Metrological team |

---

## Why the fork?

### Chromium 47 constraint

tvsolid targets **Samsung Tizen TVs running Chromium 47** — a browser engine from 2015. This is
defined in `package.json`:

```json
"browserslist": {
  "production": ["chrome >= 47"]
}
```

The upstream `@lightningjs/renderer` v3.x and `@lightningtv/solid` v3.x target modern browsers and
use JavaScript/WebGL APIs that are **not available in Chromium 47**. The `@solidtv/*` fork maintains
compatibility with this legacy runtime while still providing a SolidJS-based WebGL rendering
pipeline.

### Independent versioning

Because the fork has its own release cadence and API surface, the version numbers between the two
ecosystems are **not comparable**:

- `@lightningjs/renderer` is at **v3.6.0** — this does NOT mean it's "ahead" of
  `@solidtv/renderer` at **v1.10.0**. They are separate version lines.
- `@lightningtv/solid` is at **v3.2.5** vs `@solidtv/solid` at **v1.6.4** — same principle.

---

## Current versions in tvsolid

| Package              | Pinned version | Latest available | Delta    |
| -------------------- | -------------- | ---------------- | -------- |
| `@solidtv/renderer`  | 1.6.4          | 1.10.0           | 4 minor  |
| `@solidtv/solid`     | 1.5.0          | 1.6.4            | 1 minor  |
| `solid-js`           | 1.9.10         | 1.9.x            | patch    |
| `@solidjs/router`    | 0.16.1         | 0.16.x           | current  |

> **Note:** This table reflects the state as of 2026-09-30. Run `npm view <package> version` to
> check the latest.

### Why exact pins (no `^` or `~`)?

The `@solidtv/renderer` and `@solidtv/solid` versions are **exactly pinned** (no caret `^`, no
tilde `~`). This is intentional:

1. **Chromium 47 stability** — A minor bump in the renderer could introduce a WebGL call or JS
   syntax that breaks on legacy firmware. Exact pins prevent accidental upgrades.
2. **Coordinated upgrades** — Renderer and solid bindings must be upgraded together after testing
   on physical Samsung devices. A mismatch between the two can cause runtime crashes that only
   manifest on the TV, not in desktop dev mode.
3. **Reproducible builds** — Every developer and CI pipeline gets the exact same dependency tree,
   eliminating "works on my machine" issues for a platform where remote debugging is difficult.

---

## Comparison with a standard LightningTV project

A typical modern LightningTV project (targeting current browsers/devices) would use:

```json
{
  "dependencies": {
    "@lightningjs/renderer": "^3.6.0",
    "@lightningtv/solid": "^3.2.5",
    "@solidjs/router": "^0.15.4",
    "solid-js": "^1.9.15"
  }
}
```

Key differences:

| Aspect                | Standard LightningTV       | tvsolid                        |
| --------------------- | -------------------------- | ------------------------------ |
| **Namespace**         | `@lightningjs` / `@lightningtv` | `@solidtv`                |
| **Browser target**    | Modern (Chrome 90+)        | Chromium 47 (Samsung Tizen)    |
| **Version ranges**    | Caret (`^`) — auto-update  | Exact pin — manual upgrade     |
| **Renderer version**  | 3.x                        | 1.x (fork line)                |
| **Solid bindings**    | 3.x                        | 1.x (fork line)                |
| **SolidJS**           | ^1.9.15                    | 1.9.10 (pinned)                |
| **Router**            | ^0.15.4                    | 0.16.1 (pinned, actually newer)|