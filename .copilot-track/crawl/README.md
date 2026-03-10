# Crawl Phase — Copilot Training Track

## Purpose
This directory holds working notes, prompt logs, and evidence artifacts for the
**Crawl** exercises (the first phase of the Crawl → Walk → Run training track).

## Workflow: Chain PRs
Each exercise should be completed on its own branch and submitted as a PR that
chains off the previous one:

```
main ← crawl/ex1 ← crawl/ex2 ← crawl/ex3 …
```

This keeps reviews incremental and easy to follow.

## Evidence in PRs
Every PR should include:
1. **What prompt(s) you used** — paste the exact Copilot prompt or describe the
   interaction (inline completion, Chat, Edits, etc.).
2. **What Copilot produced** — the raw suggestion or diff.
3. **What you changed** — any manual edits you made after accepting.
4. **Outcome** — did tests pass? Was the result correct?

Keeping this evidence makes it easy for reviewers to give feedback on prompt
technique, not just code.

## Prompt tips
- Be specific: include function names, expected signatures, edge cases.
- Provide context: open relevant files or paste snippets before prompting.
- Iterate: refine the prompt if the first result isn't right.
- Use `@workspace` in Chat to give Copilot repo-wide context.
