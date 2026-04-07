---
name: korean-natural-rewrite
description: Use when the user wants Korean prose rewritten to sound natural, less translated, and less AI-generated. Especially useful for blog posts and technical writing that need cleaner wording, noun-based section headings, better metadata, and selective Mermaid conversion for explanatory structure.
---

# Korean Natural Rewrite

Rewrite Korean prose so it reads like a competent human writer, not a translated or templated draft.

## Priorities

1. Replace translated or overused filler expressions with direct Korean phrasing.
2. Keep the original meaning and technical accuracy.
3. Prefer shorter, cleaner sentences when the current sentence sounds explained rather than written.
4. Make headings and structure carry meaning, not just tone.

## Rewrite Rules

- Avoid stock AI phrasing such as `핵심은`, `본질은`, `중요한 점은`, `~에 가깝다`, `의미를 주지 못한다`, `~라고 보는 편이 정확하다` unless they are genuinely the best phrasing.
- Prefer concrete verbs over abstract noun-heavy endings.
- Remove unnecessary scene-setting like `본인이`, `사용자가`, `즉`, `현재는` when the sentence works without them.
- Convert translated comparisons into natural Korean. Example: `A에 가깝다` -> `A라고 보면 된다` or a more direct sentence with no comparison.
- Tighten explanatory transitions. Example: `이 차이는 ... 비롯된 것이다` can often become `이 변화 뒤에는 ...가 있다`.
- Keep emphasis sparse. If bold or blockquotes already carry the point, simplify surrounding prose.
- For technical writing, naturalness matters more than rhetorical flourish.

## Heading Rules

- Rewrite section headings so they summarize the section’s actual content.
- Prefer noun phrases over declarative `~다` headings.
- Avoid vague headings like `정리`, `핵심`, `의미`, `변화`, `이유` when a more specific noun phrase is available.
- Keep heading hierarchy clear with `#`, `##`, `###`, and ensure each lower heading narrows the scope of the parent.

## Editorial Rules

- If frontmatter is incomplete, finish `description` and keep `tags` in English only, within five items unless the user says otherwise.
- Keep inline code, examples, and facts intact while improving surrounding prose.
- Avoid quotation-mark-heavy emphasis when a sentence can stand on its own.
- Prefer direct Korean explanation over dramatic setup.

## Mermaid Heuristics

- Convert tables or parallel bullet lists into Mermaid only when a flow, comparison, or structure becomes clearer.
- Split large diagrams before shrinking text.
- Keep diagram labels short and readable in Korean.
- Do not force Mermaid into sections that are already clearer as prose or code.

## Workflow

1. Scan for repeated filler phrases and translated sentence endings.
2. Rewrite headings before polishing paragraphs, so the article structure becomes clear first.
3. Rewrite paragraph by paragraph, not sentence by sentence in isolation.
4. Preserve examples, code, and factual claims.
5. If Mermaid would help, replace only the sections that benefit from diagrammatic explanation.
6. After rewriting, do one final pass for repeated endings like `-이다`, `-것이다`, `-수 있다`.

## Output Standard

The result should read like a Korean engineer wrote it directly for a blog: plain, precise, fluent, and structurally intentional.
