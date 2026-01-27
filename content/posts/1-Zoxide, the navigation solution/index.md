---
layout: page
title: "Zoxide, the navigation solution"
date: 2025-10-16
showAuthor: true
showDate: true
showReadingTime: true
showSummary: true
showComments: false
---

### Zoxide - `z` 

This has completely replaced `cd` command for me. 

It's fast and remembers your previous visit to directories, ranking them by visit frequency. 

You can jump to any previously visited directory without explicitly specifying the path to it like `z dir`, where directory can look something like /home/user/..../dir. 

If you have jumped enough times you don't even need to write the full directory name. 

There is also an interactive selection using `fzf`, so you can filter out similar named directories, `zi app` will list out all the projects that include an "/app" directory.  

`z foo` - cd into highest ranked directory matching foo.

`z foo bar` - cd into highest ranked directory matching foo and bar.

`z foo /` - cd into a subdirectory starting with foo.

`z ~/foo` - z also works like a regular cd command.

`z foo/` - cd into relative path.

`z ..` - cd one level up.

`z -` - cd into previous directory.

`zi foo` - cd with interactive selection (using fzf).

`z foo<SPACE><TAB>` - show interactive completions (zoxide v0.8.0+, bash 4.4+/fish/zsh only).

[Try it!](https://github.com/ajeetdsouza/zoxide)

