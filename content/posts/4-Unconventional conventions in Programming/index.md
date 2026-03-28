---
layout: page
title: "Unconventional conventions in Programming"
date: 2026-03-23
showAuthor: true
showDate: true
showReadingTime: true
showSummary: true
showComments: false
---
Most programming advice sounds a little detached from real world scenarios, a bit too clean, well structured. But in real world we see a repeated pattern of systems failing, user behavior introducing unpredictable bugs etc. If you've spent some time shipping software, you start to notice these different set of principles emerge. Not always taught first hand but implied with intent.

---

### Logs > Code
Your code will break. Not "if" but *when*. And when it does, you will not be sitting comfortably inside your IDE with a debugger attached. You'll be staring at a production issue with incomplete information with elevated cortisol level. <br>

Here logs can become your savior. Well-placed, meaningful logs turn chaos into science. Without them, you're guessing. With them, you're diagnosing. <br>

The difference is hours or even days of wasted effort. If you had to choose between slightly cleaner code and better observability, pick observability. Clean code doesn't help you when you can't see what's going wrong.

---

### Users - Breaker of things
Developers tend to test for what *should* happen. Users **specialize** in discovering what shouldn't. They will input unexpected values, click things out of order, reload at the worst moment, and combine actions in ways you never considered. Not because they're malicious but because reality is often messy. <br>

Edge cases aren't edge cases in production. They're inevitable. <br>

So stop thinking in terms of "valid input". Start thinking in terms of "how does this fail safely?" Because it will fail.

---

### Technical Debt is a Tool
There's a lot of moral language around technical debt as if writing imperfect code is some kind of failure. <br>

It's not. <br>

It's a trade-off (like everything else in engineering). <br>

When you're validating an idea, speed matters more than perfection. Shipping something rough but functional teaches you more than polishing something no one uses. <br>

The key is *intentional* debt. <br>

Take shortcuts when you need momentum. But be honest about it. Document it. And only pay it back when the feature proves it deserves long-term investment. Premature perfection is just procrastination in disguise.

---

### Naming is Hard
It sounds trivial. Until you've worked in a codebase where nothing makes sense. Bad names don't just confuse you today. They compound. And over time, that friction becomes real cost. A well-named variable or function removes the need for comments. A poorly named one creates endless questions. <br>

Take the extra minute to name things properly. Future you and everyone else will thank you ❤️

---

### Local != Production
You're local environment is controlled, predictable, and forgiving. Production is none of those things. Locally, you don't have real traffic spikes, network latency, race conditions, or partial failures. Everything feels smooth until it isn't. This gap is where many bugs are born. <br>

Respect the difference. Test with real-world conditions when possible. Use staging environments. Simulate load. <br>

Because "Zit werks on my machine" is not going to cut it when the stakes are real.

---

### Final Thoughts

Programming isn’t just about writing code. It’s about dealing with uncertainty, trade-offs, and imperfect conditions. If you internalize these principles, you stop chasing the illusion of perfect systems and start building resilient ones instead. And that shift? That’s where *real* engineering begins.
