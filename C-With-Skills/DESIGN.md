# AERON design direction

Read before implementation on 22 October 2026:
- `.agents/skills/frontend-design/SKILL.md` — read in full. Subject-led editorial composition, deliberate typography, compact tokens, restrained motion, two-pass design critique.
- `.agents/skills/vercel-react-best-practices/SKILL.md` — read in full. Also read `rules/client-localstorage-schema.md`, `rules/rerender-functional-setstate.md`, and `rules/rerender-derived-state-no-effect.md` in full.
- `.agents/skills/web-design-guidelines/SKILL.md` — read in full. Fetched its current source at https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md and reviewed the implementation against it.

## Tokens & concept

Paper `#f7f6f2`, chalk `#eeeee7`, sage grey `#e6e7de`, charcoal `#282925`, vermilion `#e6582b`, muted ink `#60665a`.

One locally hosted variable sans family, with a system fallback. Display type uses tight spacing and restrained weight. Text stays left-aligned with short line lengths.

Layout: a split campaign hero, with a large two-line headline beside sneaker photography. A slim service strip leads to a three-column product collection, followed by a photographic brand story, an everyday editorial, and newsletter/footer.

```
brand             navigation              search / bag
headline + CTA    | oversized sneaker photograph
service           service                 service
collection title                          supporting copy
filters                                   sort
product           product                 product
product           product                 product
brand photograph  | story
editorial         | product photograph
newsletter        | email
brand             links
```

Pre-build critique: cream is explicitly required by the brief. Avoid a generic luxury serif, floating rounded card kit, repeated eyebrows, and gratuitous motion. Let the orange-trim sneaker and tightly set headline carry the visual identity. Product surfaces remain square, with circular treatment reserved for compact controls and swatches.

## Implementation decisions

- React + TypeScript + Vite with plain CSS; no backend, payment flow, icon framework, or component kit.
- Static product data lives outside React. Counts, filtered products, and prices are derived during rendering.
- Functional updates prevent stale state in cart/favorite handlers. Lazy cart initialization avoids repeated storage reads.
- Versioned, minimal cart storage is validated on load and guarded against unavailable or corrupt storage.
- Semantic controls, skip link, visible focus, labeled inputs, native modal dialogs with focus containment/restore and Escape support, inline size errors and status regions.
- Width/height attributes, local imagery, local fallback, lazy offscreen images, high-priority hero image; reduced-motion query disables transitions.
- Product and category state is reflected in the URL. Cart removal offers undo. Total includes shipping and uses Intl currency formatting.
- Newsletter is explicitly a local preference, with no claim to send emails. Store is explicitly fictional and accepts no orders.

Asset source: Unsplash photography (illustrative; visible product brands are not AERON). Image IDs are recorded in README.md.
