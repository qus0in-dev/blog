# Categories

Use these categories unless the user explicitly requests a different convention.

- `feat`: new user-facing behavior or a meaningful product capability
- `fix`: bug fix, regression fix, broken path, invalid rendering, incorrect behavior
- `refactor`: structural code change without intended behavior change
- `docs`: documentation-only changes
- `style`: formatting or stylistic changes without logic impact
- `test`: adding or updating tests
- `perf`: measurable performance improvement
- `build`: build pipeline, bundling, package manager, tooling needed to produce artifacts
- `ci`: CI workflow, deployment pipeline, automation runner configuration
- `chore`: maintenance work that does not fit the categories above
- `revert`: reverting a previous commit

## Selection hints

- Prefer `feat` over `refactor` when the user will notice a new capability.
- Prefer `fix` over `chore` when something was wrong before and is now corrected.
- Prefer `build` or `ci` only when the change is mainly about delivery infrastructure.
- Use `chore` as the fallback, not the default.
