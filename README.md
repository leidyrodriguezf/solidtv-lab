# Solid Lab

Repo educativo para aprender **SolidJS** y **SolidTV** (`@solidtv/solid`) con ejemplos interactivos.

## ¿Qué es SolidJS?

SolidJS es un framework reactivo para interfaces de usuario. A diferencia de React, no usa Virtual DOM — las actualizaciones son granulares y se aplican directamente donde se necesitan, lo que lo hace extremadamente rápido.

## ¿Qué es SolidTV / @solidtv/solid?

`@solidtv/solid` es un fork de `@lightningtv/solid` mantenido por el equipo para aplicaciones de TV (Smart TVs, set-top boxes). Renderiza sobre un canvas WebGL en lugar del DOM. Este fork mantiene compatibilidad con **Chromium 47** (Samsung Tizen TVs), a diferencia del upstream que requiere navegadores modernos.

Ver [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md) para más detalles sobre el fork y el versionado.

## Instalación

```bash
# Requiere Node.js >= 22 (solo para tooling, el output es compatible con Chromium 47)
fnm use 22   # o nvm use 22

npm install
npm run dev
```

## Navegación

- **Flechas arriba/abajo**: mover el foco en el sidebar
- **Enter**: seleccionar un tema
- **Flechas**: navegar dentro de los ejemplos

## Final example: Streaming Home

The last sidebar item, **SolidTV: Streaming Home**, brings the PDF's concepts together at `/#/20-streaming-home`. The code lives in `src/examples/20-streaming-home/`, with one component per file: `Example` handles catalog loading, `CatalogStatus` displays loading/empty/error states, and `StreamingHome` owns the shared state and composes `Hero`, `PosterCard`, `Carousel`, and `FavoriteButton`.

`createResource` loads `/SolidTV_Assets/movies.json` with a local `fetch`. Focusing a card in either carousel updates the hero's image, title, and description through a signal. A store shares favorites by ID, and a memo calculates the list count.

Each carousel repeats its four movies three times (12 cards) to demonstrate scrolling. `scroll="always"` moves the row by one card per **← / →** press, keeping the focused card in the first visible position, even at the end of the list.

Use **↑ / ↓** to browse rows. Press **Enter on a card** in either carousel to jump directly to the favorite button, without previewing another movie along the way. The original card gets a **blue border**; **orange** indicates keyboard focus. Press **Enter on the button** to add or remove the movie, then **↓** to return to the exact card and scroll position.

The example remembers an `ElementNode` and its row index for focus restoration, not just a movie ID: repeated cards are separate focus targets. Browsing a card clears the blue selection marker. Favorites still use movie IDs, so every copy reflects the same saved state. **←** from the first card or the button returns to the sidebar. Favorites last while this page is mounted.

## Dependencias principales

| Paquete              | Versión | Rol                              |
|----------------------|---------|----------------------------------|
| `@solidtv/renderer`  | 1.6.4   | Motor de renderizado WebGL       |
| `@solidtv/solid`     | 1.5.0   | Bindings SolidJS para el renderer|
| `solid-js`           | 1.9.10  | Framework reactivo               |
| `@solidjs/router`    | 0.16.1  | Router para SolidJS              |

## Temas

| #  | Tema             | Carpeta                           | Concepto                                      |
|----|------------------|-----------------------------------|-----------------------------------------------|
| 01 | Signals          | `src/examples/01-signals/`        | `createSignal` básico (contador)              |
| 02 | Effects          | `src/examples/02-effects/`        | `createEffect` + `onMount`/`onCleanup`        |
| 03 | Memos            | `src/examples/03-memos/`          | `createMemo` derivando un valor               |
| 04 | Control Flow     | `src/examples/04-control-flow/`   | `Show`, `For` y `Switch`/`Match`              |
| 05 | Stores           | `src/examples/05-stores/`         | `createStore` con un objeto anidado           |
| 06 | Context          | `src/examples/06-context/`        | `createContext`/`useContext` compartiendo estado|
| 07 | Resources        | `src/examples/07-resources/`      | `createResource` simulando un fetch           |
| 08 | View & Text      | `src/examples/08-view-text/`      | Uso de `View` y `Text`                        |
| 09 | Styles           | `src/examples/09-styles/`         | Estilos, colores, bordes, sombras             |
| 10 | Row & Column     | `src/examples/10-row-column/`     | `Row` y `Column` con navegación automática    |
| 11 | Focus Management | `src/examples/11-focus-management/`| `useFocusManager`, autofocus, onFocus/onBlur |
| 12 | Remote Keys      | `src/examples/12-remote-keys/`    | keyMap y manejo de `onEnter`/`onLeft`/etc.    |
| 13 | Routing          | `src/examples/13-routing/`        | Router y Route con 2 pantallas                |
| 14 | Animations       | `src/examples/14-animations/`     | Animación simple con animate                  |
| 15 | Images           | `src/examples/15-images/`         | Carga de una imagen/textura                   |
| 16 | Large Lists      | `src/examples/16-large-lists/`    | Lista larga con scroll/virtualización         |
