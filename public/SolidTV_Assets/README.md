# SolidTV example assets

Four landscape hero images and four portrait 2:3 posters in PNG format.
They recreate the PDF's imagery without embedded titles, buttons, or borders.

## Usage

1. Keep this folder inside `public/SolidTV_Assets`.
2. Fetch `/SolidTV_Assets/movies.json` and use each movie's `hero` and `poster` fields.
3. Apply focus styling, text, and contrast overlays in the UI.

Paths start with `/SolidTV_Assets/images/` because files in `public` are served from the site root.
The PNG files retain their original resolution.

The JSON includes genre, description, year, duration, and `recommendedOrder` to sort the second carousel without duplicating movie data. The example lives in `src/examples/20-streaming-home/`.

## Dimensions

| Movie | Asset | Pixels |
| --- | --- | --- |
| Night in the City | hero | 1672 × 941 |
| Night in the City | poster | 1024 × 1536 |
| Orbit | hero | 1672 × 941 |
| Orbit | poster | 1024 × 1536 |
| The Final Play | hero | 1672 × 941 |
| The Final Play | poster | 1024 × 1536 |
| Origin | hero | 1672 × 941 |
| Origin | poster | 1024 × 1536 |
