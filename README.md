# Tau web

This is a Vite website, so `index.html` must be served rather than opened directly from Finder.

```sh
npm install
npm run dev
```

Then open the local URL Vite prints (normally `http://127.0.0.1:5173`).

To make a production bundle:

```sh
npm run build
npm run preview
```

## Publishing with GitHub Pages

The `main` branch deploys automatically through GitHub Actions. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. Once the first workflow finishes, the site is available at `https://alfatreze.github.io/tau-web/`.

The build uses relative asset paths so the same bundle can later run at a custom domain such as `tauproject.live` without a path-prefix rebuild. Add a purchased domain in the Pages settings and configure its DNS at the registrar when you're ready.

## License

Tau Web's original source code and documentation are licensed under the MIT License; see [`LICENSE`](LICENSE). This license does not replace or extend the licenses of third-party assets and software listed below. In particular, the Pocket Sync model assets retain their upstream AGPL-3.0 terms; see [`ATTRIBUTION.md`](ATTRIBUTION.md) before redistributing or hosting them.

## Credits and attribution

- **Pocket Sync** — Pocket casing, controls, board model, and screen texture in `public/assets/pocket-sync/` and `public/assets/pocket-sync-board.glb`. Sourced from [Pocket Sync](https://github.com/neil-morrison44/pocket-sync); its attribution and AGPL-3.0 notice are recorded in [`ATTRIBUTION.md`](ATTRIBUTION.md).
- **OpenGameArt audio** — the locally bundled demonstration tracks are CC0. Track titles, creators, and source pages are listed in [`ATTRIBUTION.md`](ATTRIBUTION.md).
- **Three.js** — 3D rendering library, [MIT License](https://github.com/mrdoob/three.js).
- **Vite** — local development server and production build tool, [MIT License](https://github.com/vitejs/vite).
- **Google Fonts** — Space Grotesk, DM Mono, and Instrument Serif are loaded from Google Fonts; see [fonts.google.com](https://fonts.google.com/).

Third-party materials retain their respective licenses. See [`ATTRIBUTION.md`](ATTRIBUTION.md) for detailed asset-level credits and notices. Tau Web's original source is not affiliated with or endorsed by the upstream projects listed here.
