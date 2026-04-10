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
- Do not mix heading markers with other Markdown emphasis. Headings such as `#`, `##`, `###` must use plain text only, without `**bold**`, inline code, links, or other Markdown syntax inside the heading line.

## Editorial Rules

- If frontmatter is incomplete, finish `description`. Keep `tags` in English only, and if tag strategy matters for `src/content`, follow `$blog-tag-strategy`.
- Keep frontmatter metadata plain text only. Do not put Markdown syntax such as `**bold**`, inline code, links, or heading markers inside `title`, `description`, or other metadata fields.
- Keep inline code, examples, and facts intact while improving surrounding prose.
- Avoid quotation-mark-heavy emphasis when a sentence can stand on its own.
- Prefer direct Korean explanation over dramatic setup.
- For technical blog posts, do not present a narrow personal experience as a sweeping rule unless the draft clearly proves it.
- When the certainty is interpretive rather than absolute, prefer phrasing such as `~라고 볼 수 있다`, `~로 이해할 수 있다`, `~로 파악된다`, `~처럼 보인다`.
- Remove meta-guide phrases such as `이번 글은`, `다음 글은`, `이 부분을`, `이 글은`, `이 글에서는` unless they are strictly necessary for navigation.

## Blog Voice Heuristics

- Open with a concrete developer memory, operational moment, or observed confusion before widening the scope.
- Let the opening anecdote explain why the topic matters, but move quickly from `내 경험` to `정리해보면` or `살펴보면` 같은 분석형 서술로 넘어간다.
- Frame the article around a distinction of layers, responsibilities, or questions, then keep returning to that frame.
- Use short glossary-style blockquotes for terms that a reader may know vaguely but not precisely.
- Prefer comparison tables or short bullet triads when separating adjacent concepts such as tools, layers, or routing models.
- End with a practical selection rule. The close should answer `언제 무엇을 쓰면 되나` rather than only restating the topic.
- Allow one light colloquial hook in the title or opening, but keep the body precise and unsentimental.
- When contrasting past and present stacks, explain what changed in architecture, not just what syntax disappeared.
- Prefer scoped conclusions over absolute endings. `이 글의 범위에서는`, `이 맥락에서는`, `보통은` 같은 제한 조건이 어울리면 적극적으로 남긴다.
- Prefer scoped conclusions without article-guide phrasing. Favor `이 맥락에서는`, `보통은`, `대체로`, `실무에서는` over `이번 글은`, `다음 글은`, `이 글에서는`.

## Mermaid Heuristics

- Convert tables or parallel bullet lists into Mermaid only when a flow, comparison, or structure becomes clearer.
- Split large diagrams before shrinking text.
- Keep diagram labels short and readable in Korean.
- Do not force Mermaid into sections that are already clearer as prose or code.

## Workflow

1. Scan for repeated filler phrases and translated sentence endings.
2. If the draft sounds translated or vague, read `references/style-patterns.md`.
3. If the draft sounds too assertive or turns a personal impression into a general rule, read `references/epistemic-tone.md`.
4. Rewrite headings before polishing paragraphs, so the article structure becomes clear first.
5. Rewrite paragraph by paragraph, not sentence by sentence in isolation.
6. Preserve examples, code, and factual claims.
7. If Mermaid would help, replace only the sections that benefit from diagrammatic explanation.
8. After rewriting, do one final pass for repeated endings like `-이다`, `-것이다`, `-수 있다`.
9. Do an epistemic tone pass: reduce over-assertive claims, separate anecdote from general explanation, and keep conclusions scoped to what the article actually established.
10. Remove article-guide filler such as `이번 글은`, `다음 글은`, `이 부분을`, `이 글은`, `이 글에서는` when the sentence works without them.
11. Do a Markdown structure pass: frontmatter fields must stay plain text, and headings must not mix `#` markers with bold, code, links, or other inline Markdown.
12. For technical blog posts, ensure the final draft contains one clear organizing lens such as `세 가지 관점`, `요청 흐름`, or `설계 전환`, and that each section supports that lens.

## Reference

- Read [references/style-patterns.md](references/style-patterns.md) when the rewrite still sounds translated or overly explained.
- Read [references/epistemic-tone.md](references/epistemic-tone.md) when the draft feels too certain, too first-person, or too narrowly generalized.

## Output Standard

The result should read like a Korean engineer wrote it directly for a blog: plain, precise, fluent, and structurally intentional.
