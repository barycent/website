---
title: "Why cross-vendor review is a validation error, not a convention"
date: 2026-11-17
author: "The Barycent Team"
summary: "In bary, must_differ_from isn't a suggestion — a pipeline where an agent reviews its own code never starts."
tags: [design, bary]
---

Most multi-agent coding tools let you add a "review" step. Few of them stop you
from pointing that review step at the same agent that wrote the code.

In `bary`, that's not allowed:

```yaml
steps:
  - name: implement
    agent: claude-code
    prompt: "Implement: {task}"

  - name: review
    agents: [claude-code, codex]   # claude-code reviewing itself
    must_differ_from: implement
    prompt: "Review the latest commit."
```

Running `bary validate` against this file fails before a single token is spent:

```
error: step `review`: reviewer `claude-code` is the same agent that ran
`implement`; cross-vendor review requires a different agent
```

## Why this matters

Self-review isn't just a theoretical risk. A single vendor's agent reviewing
its own output inherits the same blind spots that produced the bug in the first
place — the same training data, the same failure modes, the same confidence in
its own reasoning. A second vendor's agent is a genuinely different reviewer,
not a rubber stamp with extra latency.

This is also why the check happens at **validation time**, not run time. If
`must_differ_from` were just documentation, it would be the first constraint
teams quietly disable under deadline pressure. Making it a parse error means
there's no pipeline to run until the review is real.

## What this doesn't solve

Cross-vendor review doesn't guarantee *correct* review — two agents from
different vendors can still both miss the same bug, or get into a rubber-stamp
pattern if the same two agents always review each other. That's part of why
we're building
[TeamBench](/working-groups/): to measure, rather than assume, which team
compositions actually catch more issues.

Try it yourself:

```bash
bary init
bary validate   # try breaking must_differ_from and see what happens
```
