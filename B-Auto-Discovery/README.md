# AERON

A responsive fictional sneaker storefront built with React, TypeScript, Vite, and plain CSS.

## Preview

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal (normally http://127.0.0.1:5173).

## Production

```sh
npm run build
npm run preview
```

The production bundle is written to `dist/`.

## Features

Six products, category filtering, price sorting, product dialogs, EU size selection with validation, a persistent shopping bag, quantity controls, favorites for the current visit, mobile navigation, and informational dialogs. Native modal dialogs provide keyboard focus containment and Escape dismissal. Reduced motion is respected.

Cart data stays in browser localStorage. The newsletter is a local demonstration and does not transmit or store an email address. No checkout, payment service, backend, or paid API is included. Product and brand photography is downloaded from Unsplash into `public/images`; product images have a local SVG fallback. Google Fonts is optional, with system font fallbacks.

All products and brand claims are fictional. Photos are illustrative and are not product inventory.
