---
name: minimal-code
description: Keep implementation changes small and readable when asked for minimal code, a focused fix, or a simple solution. Use when reducing unnecessary complexity without changing required behavior.
---

# Minimal Code

Implement the requested behavior with the smallest clear change that fully satisfies it.

- Follow existing repository patterns and reuse suitable helpers before adding abstractions or dependencies.
- Prefer direct code. Introduce a helper or abstraction when it removes meaningful duplication or makes the current behavior easier to understand.
- Keep edits within the requested scope. Avoid unrelated cleanup, speculative features, and configuration changes.
- Preserve required validation, error handling, and public contracts. Fewer lines are not an improvement if they hide behavior or remove safeguards.
- For tests, cover the requested observable behavior and meaningful failure cases. Avoid redundant assertions or exhaustive tests of library internals.
- When asked only to write a test for missing behavior, add the test and report its expected failure; do not silently implement the feature.
- Run the relevant checks and briefly report what changed and whether they passed.
