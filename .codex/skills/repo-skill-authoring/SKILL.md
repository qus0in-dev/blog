---
name: repo-skill-authoring
description: Use when creating or updating local skills in this repository so they follow the repository convention of pairing SKILL.md, agents/openai.yaml, and references/ helper docs.
---

# Repo Skill Authoring

Create or update local skills in this repository using the repository's actual on-disk format, not a generic skill template.

## Priorities

1. Every local skill should include `SKILL.md`, `agents/openai.yaml`, and a `references/` directory with at least one useful helper file.
2. Match the tone and structure already used under `.codex/skills`.
3. Keep the interface metadata short and practical.
4. Move reusable examples, vocab, and decision aids out of the main skill body into `references/`.

## Repository Format

Each skill should live under:

```text
.codex/skills/<skill-name>/
```

Each skill directory should normally contain:

```text
SKILL.md
agents/openai.yaml
references/
```

## What Each File Does

- `SKILL.md` contains the actual instructions, workflow, rules, and output expectations.
- `agents/openai.yaml` contains the OpenAI-facing interface metadata used to expose the skill cleanly in the local agent environment.
- `references/*.md` contains reusable lookup material such as naming vocab, checklists, examples, outlines, or decision tables.

## SKILL.md Rules

- Start with frontmatter containing `name` and `description`.
- Use a short title heading after the frontmatter.
- Prefer sections such as `Priorities`, `Rules`, `Workflow`, `Output Standard`, or other repository-appropriate headings.
- Write repository-specific instructions, not generic AI guidance.
- Keep examples concrete and directly usable.
- Add a `Reference` section when the skill points to helper material under `references/`.

## agents/openai.yaml Rules

- Add an `interface` object.
- Set `display_name` to a concise human-readable name.
- Set `short_description` to one short Korean summary.
- Set `default_prompt` to a direct invocation prompt that references the skill by `$skill-name`.
- Keep the file minimal. Do not duplicate the whole skill body here.

## references Rules

- Add at least one concise markdown file under `references/`.
- Put reusable material there instead of bloating `SKILL.md`.
- Prefer reference content such as checklists, example tables, canonical terms, section outlines, command shapes, or decision guides.
- Name files by purpose, such as `categories.md`, `scopes.md`, `readme-outline.md`, or `skill-scaffold.md`.

## Workflow

1. Inspect nearby skills under `.codex/skills` before creating a new one.
2. Create the new skill directory with an `agents` subdirectory.
3. Add a `references` subdirectory and decide what reusable helper material should live there.
4. Write `SKILL.md` in the same style as the existing local skills.
5. Write `agents/openai.yaml` to expose the skill cleanly.
6. Verify the main skill file, interface file, and reference files all exist before finishing.

## Blocking Rule

Do not treat a skill as complete in this repository if `SKILL.md`, `agents/openai.yaml`, or the intended `references/` helper docs are missing.

## Reference

- Read [references/skill-scaffold.md](references/skill-scaffold.md) before scaffolding a new local skill directory.

## Output Standard

A finished local skill in this repository should be ready to inspect in the filesystem and should include the instruction body, the interface metadata, and reusable reference material.
