#!/usr/bin/env python3
"""Normalize root-relative static asset references for GitHub Pages subpath hosting.

This modifies ONLY generated dist files during deployment. Experiment source stays intact.
"""
import pathlib
import re
import sys

project = sys.argv[1]
dist = pathlib.Path(sys.argv[2])
prefix = f"/FindSkill/{project}/"
replacements = 0
for path in dist.rglob("*"):
    if not path.is_file() or path.suffix not in (".js", ".css", ".html"):
        continue
    value = path.read_text(encoding="utf-8")
    updated = value
    # User-authored asset refs bypass Vite's HTML/CSS rewriting because they are
    # dynamic runtime strings inside React components.
    for origin in ("/images/", "/fonts/", "/favicon.svg", "/shoe-fallback.svg"):
        updated = updated.replace(origin, prefix + origin.lstrip("/"))
    # Avoid duplicate prefixing when processing assets already expanded by Vite.
    updated = updated.replace(prefix + prefix.lstrip("/"), prefix)
    if updated != value:
        path.write_text(updated, encoding="utf-8")
        replacements += 1
print(f"{project}: fixed asset references in {replacements} generated files")
