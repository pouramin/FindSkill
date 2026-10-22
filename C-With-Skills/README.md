# AERON

A complete fictional sneaker storefront built with React, TypeScript, Vite, and plain CSS.

## Preview

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. For the verified running session: http://localhost:5174.

```sh
npm run build
npm run preview
npm test
```

The production build is written to `dist/` and can be hosted as a static site.

## Shopping flows

Six sneakers, working category filters, sorting, search, session favorites, product detail dialogs, EU size selection, fit guidance, add-to-bag validation, quantity limits, cart totals including shipping, removal with undo, and persistent cart storage. Product/category URLs support back/forward navigation and direct links. The mobile menu and all dialogs support keyboard use and Escape dismissal.

This is a frontend concept. No orders, payments, or shipments are processed. The newsletter validates email format and saves an interest flag on the device; it does not retain or transmit the email or claim to subscribe anyone to a mailing service.

## Skill evidence

The three user-requested project skills were read in full before implementation:

1. `.agents/skills/frontend-design/SKILL.md`: applied subject-led composition, a deliberate type scale and token palette, focused visual emphasis, restrained motion, and screenshot critique.
2. `.agents/skills/vercel-react-best-practices/SKILL.md`: applied functional state updates, render-derived totals/filtering, lazy storage initialization, validated versioned local storage, lightweight direct imports, and lazy offscreen assets. Three detailed rule files were read: `client-localstorage-schema`, `rerender-functional-setstate`, and `rerender-derived-state-no-effect`. Next.js-only guidance was excluded.
3. `.agents/skills/web-design-guidelines/SKILL.md`: fetched https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md, then applied semantic controls, labels, image dimensions, skip navigation, focus states, status announcements, responsive grids, native modal behavior, URL state, removal undo, and reduced-motion support.

The pre-build design plan, critique, and implementation mapping are recorded in `DESIGN.md`. No skills were discovered or installed.

## Assets

All runtime assets are local; each photo has an SVG fallback. Unsplash product photos are illustrative and may show third-party brands.

| Local name | Unsplash image ID |
| --- | --- |
| hero | photo-1600185365483-26d7a4cc7519 |
| court | photo-1600269452121-4f2416e55c28 |
| pace | photo-1600185365926-3a2ce3cdb9eb |
| terra | photo-1549298916-b41d501d3772 |
| form | photo-1608231387042-66d1773070a5 |
| drift | photo-1543508282-6319a3e2621f |
| story | photo-1476480862126-209bfaa8edc8 |

DM Sans is hosted locally under the SIL Open Font License in `public/fonts/OFL.txt`.
