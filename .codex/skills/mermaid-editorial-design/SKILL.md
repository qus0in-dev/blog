---
name: mermaid-editorial-design
description: Use when Mermaid diagrams in blog posts or docs need to look more editorial and less generic. Apply tasteful color palettes, readable Korean typography, mobile-friendly composition, and split oversized diagrams into smaller focused diagrams.
---

# Mermaid Editorial Design

Design Mermaid diagrams so they read like part of a polished technical article, not like a raw default export.

## Priorities

1. Keep diagrams readable on mobile first.
2. Prefer calm, neutral colors over saturated defaults.
3. Use Mermaid to clarify one idea per diagram.

## Layout Rules

- Prefer `flowchart TB` unless left-to-right flow is essential.
- Avoid wide side-by-side comparisons in a single diagram when labels are longer than a few words.
- Split one large diagram into two or more smaller diagrams if the rendered width is likely to shrink text.
- Keep each diagram focused on one message: request flow, structure comparison, or lifecycle.
- Limit the number of nodes in a single diagram when writing Korean labels.
- Prevent label overlap by increasing `nodeSpacing`, `rankSpacing`, and diagram `padding` before shrinking font size.
- Add enough outer breathing room so nodes do not feel glued to the diagram edge.
- Shorten node text before adding more branches or denser structure.

## Visual Rules

- Use a restrained palette with low-saturation warm neutrals or cool grays.
- Avoid harsh pure black fills and bright accent colors.
- Use one accent color for the main concept and one muted secondary color for supporting nodes.
- Keep borders visible but soft.
- Prefer simple shapes and clean spacing over decorative complexity.

## Typography Rules

- Set Mermaid font to the site’s Korean body font when available.
- Increase font size slightly if Korean labels feel cramped.
- Shorten node labels before shrinking the whole diagram.
- If labels still collide, split the diagram and reduce sentence length inside nodes instead of compressing the layout.

## Composition Patterns

- For architectural flow: input group -> controller/core -> output group.
- For comparisons: separate “before” and “after” diagrams instead of mirrored two-column layouts when space is tight.
- For step explanations: use one short sentence before the diagram and one short takeaway after it.

## Reference

- Read [references/diagram-patterns.md](references/diagram-patterns.md) before choosing a Mermaid layout direction.

## Output Standard

The diagram should feel calm, readable, and publication-ready in a Korean technical blog.
