# FindSkill — Agent Skills Experiment

Interactive, bilingual (English/Persian) experiment hub for TunnelLab.

**Live site (once GitHub Pages is enabled):** https://pouramin.github.io/FindSkill/

## Explore the four storefronts

- [A · Baseline](https://pouramin.github.io/FindSkill/A-Baseline/)
- [B · Auto Discovery](https://pouramin.github.io/FindSkill/B-Auto-Discovery/)
- [C · Explicit Skills](https://pouramin.github.io/FindSkill/C-With-Skills/)
- [D · Project Instructions](https://pouramin.github.io/FindSkill/D-Agent-Instructions/)

Every storefront is a standalone React, TypeScript, and Vite app under its existing directory. The root showcase is a lightweight static site, with the complete prompt collection in `prompts.js`. No experiment source files are modified by the showcase.

## Experimental interpretation

- **A:** baseline storefront based on the shared brief.
- **B:** `find-skills` was available but not invoked. Audit reported that a bundled Sites workflow was used.
- **C:** the uploaded project documents explicit reading of three specialist skills; this is different from automatic discovery.
- **D:** a root `AGENTS.md` instructs skill discovery. The uploaded project README records find-skills discovery and approved frontend-design use.

These are **exploratory runs**, not a randomized or fully controlled benchmark. In particular, session-wide plugin skills can influence runs. An installed skill is not necessarily a used skill.

## GitHub Pages

The workflow `.github/workflows/deploy-pages.yml` builds each storefront with the proper repository subpath and combines them with the root showcase.

In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**. The workflow runs on pushes to `main`, or manually from **Actions**. If repository Pages is not yet enabled, the links above will not work until the first successful deployment.

## Reproducing locally

Each experiment can be run independently with `npm ci` and `npm run dev` from its own directory. The local browser may use a different localhost port for concurrent runs.

## Sources and credits

- [Vercel Skills CLI](https://github.com/vercel-labs/skills)
- [Anthropic agent skills](https://github.com/anthropics/skills)
- [Vercel agent skills](https://github.com/vercel-labs/agent-skills)
- [TunnelLab on YouTube](https://www.youtube.com/@TunnelLab)

AERON is a fictional sneaker brand. The four demos are for educational comparison and do not process orders or payments.
