---
layout: page
title: "Copy, Jump, Paste: Yazi Meets Zoxide"
date: 2026-11-02
description: "Copy files in Yazi, jump to any Zoxide directory with an interactive picker, and paste without leaving your terminal."
summary: "A faster way to move files across directories using Yazi, Zoxide, and fzf."
tags: [linux, tools, command-line, productivity, yazi, fzf, zoxide]
---

Moving files across distant directories is one of the few places terminal file managers can feel clunky. You find what you want in `~/Downloads`, yank it, and then spend five seconds drilling up and down your directory tree to find a project folder inside `~/Projects/work/...`

If you use [Yazi](https://github.com/sxyazi/yazi) and [Zoxide](https://github.com/ajeetdsouza/zoxide), you can eliminate that traversal entirely. By wiring Zoxide's directory history directly into Yazi with an interactive fuzzy picker, you can yank files, jump immediately to any tracked directory with a quick search query, and paste.

![yazi](/images/yazi.png)

Here is how to set up the workflow on Arch Linux.

## 1. Install the dependencies

Make sure both `zoxide` and `fzf` are installed on your system:

```bash
sudo pacman -S zoxide fzf
```

Zoxide tracks directories using *frecency*, combining frequency and recency of directory visits. The fzf dependency provides the interactive fuzzy search interface used by the directory picker when jumping.

## 2. Enable Zoxide tracking in Yazi

Yazi ships with a built-in Zoxide plugin, so you do not need to install anything from Git. You only need to tell Yazi to update Zoxide's database as you browse.

Open your Yazi configuration directory:

```bash
cd ~/.config/yazi
```

Open `init.lua` in your editor:

```bash
$EDITOR init.lua
```

Add this setup call:

```lua
require("zoxide"):setup({
    update_db = true,
})
```

Setting `update_db = true` allows Yazi to update Zoxide's database as you navigate.

## 3. Map a key to the interactive picker

Next, configure a shortcut to launch the Zoxide picker inside the file manager.

Open `keymap.toml`:

```bash
$EDITOR keymap.toml
```

Add the following keymap:

```toml
[mgr]
prepend_keymap = [
    { on = "Z", run = "plugin zoxide", desc = "Jump using zoxide" },
]
```

This maps uppercase `Z` to launch the plugin. If your `keymap.toml` already has a `[mgr]` section, append the mapping to your existing `prepend_keymap` array rather than adding a duplicate `[mgr]` table.

## 4. The copy, jump, and paste workflow

Restart Yazi so the new configuration takes effect. The entire operation takes three keystrokes.

### Step 1: Select and yank files

Navigate to the files you want to copy:

- Press `Space` to select multiple files or folders.
- Press `y` to yank (copy) them.

If you only need to copy a single file or directory under your cursor, you can press `y` without selecting it first. To cut rather than copy, press `x`.

### Step 2: Jump to your destination directory

Press `Z`.

Yazi opens an interactive directory picker powered by Zoxide. Type a few letters of the target directory name, hit `Enter`, and Yazi jumps there immediately.

### Step 3: Paste

Once you arrive in the destination folder, press `p`. Yazi pastes the yanked items directly into the current directory.

![copy-jump-paste](/images/copy-jump-paste.gif)

## Quick key reference

| Key | Action |
| --- | --- |
| `Space` | Toggle selection for files or directories |
| `y` | Yank (copy) selected items |
| `x` | Cut selected items |
| `Z` | Open the interactive Zoxide directory picker |
| `p` | Paste items into the current directory |

## Why this workflow works

Terminal file managers often excel at local folder navigation but slow down when transferring files across separate branches of a filesystem. Traditional workarounds usually mean opening a second pane, typing long paths manually, or falling back to a shell with `cp` or `mv`.

Pairing Yazi with Zoxide bridges that gap. Because Zoxide tracks frecency (frequency and recency of visits), the destinations you need most often are usually just two or three keystrokes away in the fzf prompt. You get the speed of terminal navigation without losing the safety and visual confirmation of a file manager.

## Further Reading

- [Yazi documentation](https://yazi-rs.github.io/docs/)
- [Zoxide GitHub repository](https://github.com/ajeetdsouza/zoxide)
