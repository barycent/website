---
title: "Introducing Barycent"
date: 2026-11-17
author: "The Barycent Team"
summary: "Why we're building a shared center for open source agent collaboration — and why that means filling gaps, not building another gateway."
tags: [announcement]
---

A **barycenter** is the point two orbiting bodies share. The Earth and the Moon
both circle a point between them, and neither one *is* that point. That's the
idea behind this organization's name, and it's the idea behind everything we're
building.

## The ecosystem already has a lot of pieces

Over the last year, the open agent ecosystem has grown fast:

- The **Agentic AI Foundation (AAIF)** hosts MCP, A2A, goose, agentgateway, and
  seven other projects.
- **AGNTCY** gives us SLIM messaging, the OASF schema, an agent directory, and —
  most relevant to us — **AgentBridge**, which already wraps Claude Code, Codex,
  Copilot, Cursor, goose, and OpenCode as A2A agents.
- **Project NANDA** (MIT) is building an index for discovering agents across
  registries.

None of that needed us to build it again. So we didn't.

## What's actually missing

What we found, after a few weeks of research across these ecosystems, is a gap
in the *collaboration layer*:

1. Nothing stops an agent from reviewing its own code.
2. Nothing caps spend before a 700-agent fan-out turns into a four-figure bill.
3. Teams of agents from different vendors have no shared, enforced workflow —
   just side-by-side execution.

That's what **[Bary](/bary/)** is for: a small CLI, built on AgentBridge, that
runs a pipeline — plan, implement, cross-vendor review, test — and *refuses* to
start if a review step would let an agent approve its own patch.

## One organization, many working groups

Barycent isn't an "AI company" with a generic name bolted on. It's a general
open source organization with **working groups**. The AI Working Group is
active today. Nothing stops a Quantum Working Group, or something nobody has
thought of yet, from forming the same way: a real gap, a working prototype, and
maintainers willing to run it in the open.

## Try it

```bash
cargo install --path crates/bary-cli
cd your-repo
bary init
bary run --task "add a login page" --mock
```

Everything is Apache-2.0, including the parts we haven't built yet. [Read the
design doc](https://github.com/barycent/bary) or follow along here on the blog.
