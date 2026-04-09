# Skill Scaffold

Use this scaffold when creating a new local skill in this repository.

## Directory Shape

```text
.codex/skills/<skill-name>/
  SKILL.md
  agents/openai.yaml
  references/
```

## Minimum Files

- `SKILL.md`: the main instructions
- `agents/openai.yaml`: UI and default prompt metadata
- `references/*.md`: reusable lookup material, examples, checklists, or vocab

## Good Reference Material

- category tables
- example command shapes
- naming or scope vocab
- output checklists
- repository-specific outlines

## Keep References Separate When

- the list is reusable across multiple turns
- the material would clutter the main skill body
- the skill needs examples, canonical terminology, or decision aids
