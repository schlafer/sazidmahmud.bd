---
layout: page
title: "AI Isn’t Improving - We’re Just Calling It More Often"
date: 2026-03-30
showAuthor: true
showDate: true
showReadingTime: true
showSummary: true
showComments: false
---
A noticeable trend in software right now is teams rushing to build systems around agents, RAG, MCP, and similar patterns; especially within ecosystems like Claude.

They’re often framed as productivity or automation gains. But if you look at the architecture, they don’t reduce reliance on LLMs; they deepen it.

Agents, for example, don’t simply “automate” tasks. They decompose a single request into multiple steps: planning, tool selection, execution, and iteration. What could have been one model call often becomes several.

RAG is marketed as a retrieval mechanism, but in practice it’s just a way to construct better prompts. The final output still depends entirely on the model.

MCP appears to be a standardization layer, but its real effect is making it easier for LLMs to interact with external tools which further reinforces the model as the central decision-maker.

Even a single LLM call is non-deterministic. Yet these systems stack multiple calls in sequence and expect reliable outcomes.

At the same time, improvements in core model capability seem to be slowing down.

So instead of fundamental leaps in intelligence, what we’re seeing may be something else. Like LLMs being inserted into more parts of the workflow, more frequently. Less “AI is getting smarter,” and more “we’re using LLMs everywhere.” 

---

LLMs are becoming infrastructure and infrastructure always gets expensive.
