<p align="center">
  <img src="https://raw.githubusercontent.com/vansh-121/what-was-i-doing/master/icon.png" alt="What Was I Doing Logo" width="120" height="120">
</p>

<h1 align="center">What Was I Doing?</h1>

<p align="center">
  <strong>Never Lose Your Coding Context</strong>
</p>

<p align="center">
  <a href="https://whatwasidoing.dev">
    <img src="https://img.shields.io/badge/Website-whatwasidoing.dev-blue?style=flat&logo=google-chrome" alt="Website">
  </a>
  <a href="https://open-vsx.org/extension/VanshSethi/what-was-i-doing">
    <img src="https://img.shields.io/open-vsx/v/VanshSethi/what-was-i-doing?color=purple" alt="Open VSX Version">
  </a>
  <a href="https://open-vsx.org/extension/VanshSethi/what-was-i-doing">
    <img src="https://img.shields.io/open-vsx/dt/VanshSethi/what-was-i-doing?color=purple" alt="Open VSX Downloads">
  </a>
  <a href="https://open-vsx.org/extension/VanshSethi/what-was-i-doing">
    <img src="https://img.shields.io/open-vsx/r/VanshSethi/what-was-i-doing?color=purple" alt="Open VSX Rating">
  </a>
  <a href="https://github.com/vansh-121/what-was-i-doing/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/vansh-121/what-was-i-doing?style=flat" alt="License">
  </a>
</p>

<p align="center">
  <a href="https://whatwasidoing.dev">🌐 Website</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#%EF%B8%8F-configuration">Configuration</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📖 About

**What Was I Doing?** is your silent productivity assistant.

Developers are constantly interrupted. Don't waste mental energy trying to remember your train of thought after a context switch. This extension seamlessly tracks your work context in the background and helps you resume exactly where you left off.

Whether you:
- Get pulled into an unexpected meeting
- Switch to another application
- Take a coffee break
- Close your editor for the weekend

...the moment you return, a helpful popup instantly reminds you what file you were in, what function you were editing, and the exact next step you were supposed to take based on your TODO comments.

**100% Private, 100% Local.** We never send your code or data anywhere. Ideal for developers using VSCodium who want telemetry-free focus tools.

## 🎬 See It In Action

### 🚀 Quick Start: Install and Get Started
![Installing What Was I Doing Extension](https://raw.githubusercontent.com/vansh-121/what-was-i-doing/master/assets/clips/Clip1.gif)

### ⏰ Track Your Work Timeline
![Work History Timeline Feature](https://raw.githubusercontent.com/vansh-121/what-was-i-doing/master/assets/clips/Clip2.gif)

### 📜 Browse Complete Work History
![Complete Work History View](https://raw.githubusercontent.com/vansh-121/what-was-i-doing/master/assets/clips/Clip3.gif)

### 🎯 Command Palette Integration
![Command Palette Features](https://raw.githubusercontent.com/vansh-121/what-was-i-doing/master/assets/clips/Clip4.gif)

### ⚙️ Customize to Your Workflow
![Extension Settings Configuration](https://raw.githubusercontent.com/vansh-121/what-was-i-doing/master/assets/clips/Clip5.gif)

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔄 Automatic Context Tracking
Seamlessly monitors your coding activity without any manual intervention.
- 📝 **Activity Monitoring** - Tracks file edits, cursor movements, and active editors
- ⏱️ **Smart Idle Detection** - Automatically detects when you step away
- 💾 **Context Preservation** - Saves your exact position, function name, and nearby TODO comments
- 🚫 **Smart Deduplication** - Doesn't save duplicate contexts repeatedly

</td>
<td width="50%">

### 🎯 Instant Resume
Get back to work instantly with helpful context.
- 📄 **Last Active File** - Jump to the exact file you were editing
- 🔍 **Function/Method** - See the function or class you were in
- 💡 **Auto-Generated Notes** - Automatic context summary (e.g., "Fixing auth bug in login.ts")
- 🔀 **Git Awareness** - Branch name, last commit, and uncommitted files count
- 📝 **Next Steps** - View TODO/FIXME comments for context
- ⏰ **Time Tracking** - Know how long you've been away

</td>
</tr>
<tr>
<td width="50%">

### 📋 Work Session History
Never lose track of your recent work.
- 🕒 **Session Timeline** - Browse through recent work sessions
- 🔍 **Quick Navigation** - Jump to any previous context instantly
- 📊 **Configurable Size** - Keep as many sessions as you need
- 🗂️ **Per-Workspace** - Separate history for each project

</td>
<td width="50%">

### ⚙️ Highly Configurable
Customize the extension to fit your workflow.
- ⏲️ **Idle Timeout** - Set from 1-120 minutes (default: 10)
- 🚫 **File Exclusions** - Ignore node_modules, .git, etc.
- 🏷️ **Custom Keywords** - Define your own TODO keywords
- 🔔 **Auto-Popup** - Toggle automatic resume notifications

</td>
</tr>
</table>

## 🚀 Installation

### From Open VSX Registry (Recommended for VSCodium / Gitpod)

<a href="https://open-vsx.org/extension/VanshSethi/what-was-i-doing">
  <img src="https://img.shields.io/badge/Install-Open%20VSX-purple?style=for-the-badge&logo=eclipse-che" alt="Install from Open VSX">
</a>

#### Method 1: UI
1. Open **VSCodium** / **Eclipse Theia**
2. Open the Extensions view (`Ctrl+Shift+X`)
3. Search for **"What Was I Doing"**
4. Click **Install**

#### Method 2: Command Line
```bash
codium --install-extension VanshSethi.what-was-i-doing
```

#### Method 3: Direct Link
[→ Install from Open VSX Registry](https://open-vsx.org/extension/VanshSethi/what-was-i-doing)

---

### From VS Code Marketplace (for MS VS Code)

<a href="https://marketplace.visualstudio.com/items?itemName=VanshSethi.what-was-i-doing">
  <img src="https://img.shields.io/badge/Install-VS%20Code%20Marketplace-blue?style=for-the-badge&logo=visual-studio-code" alt="Install from Marketplace">
</a>

#### Method 1: VS Code UI
1. Open **VS Code**
2. Open the Extensions view (`Ctrl+Shift+X`)
3. Search for **"What Was I Doing"**
4. Click **Install**

#### Method 2: Command Line
```bash
code --install-extension VanshSethi.what-was-i-doing
```

---

## 💡 Usage

### Quick Start
1. **Install the extension** (see [Installation](#-installation))
2. **Start coding** - The extension automatically tracks your activity
3. **Take a break** - Step away for coffee, meetings, or lunch
4. **Return** - See a helpful popup showing where you left off!

### Available Commands
Open the Command Palette with `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac):

| Command | Description | Icon |
| :--- | :--- | :--- |
| `What Was I Doing: Show Last Context` | View your most recent work context | 🕒 |
| `What Was I Doing: View History` | Browse all saved work sessions | 📋 |
| `What Was I Doing: Save Current Context` | Manually save your current position | 💾 |
| `What Was I Doing: Clear History` | Reset all saved contexts | 🗑️ |

### Status Bar Integration
Look for the **clock icon** (🕒) in your status bar:
- Shows time since last activity (e.g., "2m ago", "1h ago")
- Click it to quickly view your work history
- Hover for tooltip with last active function/file

### 💡 Automatic Context Notes
The extension automatically generates helpful notes about what you were working on.
These notes are generated from:
- TODO/FIXME comments near your cursor
- Function/method names you were editing
- The file you were working in

### 🔀 Git Awareness
The extension automatically captures Git context when saving your work:
- 🌿 Branch name (e.g., `feature/auth-fix`)
- 💬 Last commit message
- 📝 Number of uncommitted files

---

## ⚙️ Configuration

Access settings via `File > Preferences > Settings` or `Ctrl+,` (Windows/Linux) / `Cmd+,` (Mac), then search for "What Was I Doing".

<details>
<summary><b>📋 All Configuration Options</b></summary>
<br>

### ⏲️ `whatWasIDoing.idleTimeoutMinutes`
Minutes of inactivity before context is automatically saved (default: `10`).

### 📚 `whatWasIDoing.maxHistorySize`
Maximum number of work sessions to keep in history (default: `30`).

### 🔔 `whatWasIDoing.autoShowResumePopup`
Automatically show resume popup when returning to work (default: `true`).

### 🚫 `whatWasIDoing.excludePatterns`
File path regex patterns to exclude from tracking.

### 🏷️ `whatWasIDoing.todoKeywords`
Keywords to detect in comments for next-step hints.
</details>

---

## 🔒 Privacy & Security

<table>
<tr>
<td>✅ **100% Local Storage**</td>
<td>All data stored locally in your editor's workspace state</td>
</tr>
<tr>
<td>✅ **No External Servers**</td>
<td>Zero network requests - your code stays private</td>
</tr>
<tr>
<td>✅ **User Control**</td>
<td>Clear history anytime with one command</td>
</tr>
<tr>
<td>✅ **Open Source**</td>
<td><a href="https://github.com/vansh-121/what-was-i-doing">Fully auditable code on GitHub</a></td>
</tr>
</table>

---

## ❓ FAQ

<details>
<summary><b>Does this extension slow down my editor?</b></summary>
No! The extension uses efficient event listeners and only activates after the editor finishes starting up. It has minimal performance impact.
</details>

<details>
<summary><b>Will it track files in node_modules or .git?</b></summary>
No. Common directories like `node_modules`, `.git`, `dist`, and `build` are excluded by default.
</details>

<details>
<summary><b>Can I use this across multiple workspaces?</b></summary>
Yes! Each workspace maintains its own separate history, so contexts don't mix between projects.
</details>

<details>
<summary><b>What happens if I don't want the auto-popup?</b></summary>
You can disable it in settings with `"whatWasIDoing.autoShowResumePopup": false`. You can still view history manually.
</details>

---

## 🛠️ Development
See [GitHub Repository](https://github.com/vansh-121/what-was-i-doing) for instructions on building from source and contributing.

---

## 💬 Support & Feedback

<p align="center">
  <a href="https://open-vsx.org/extension/VanshSethi/what-was-i-doing">
    <img src="https://img.shields.io/badge/⭐-Rate%20this%20extension-purple?style=for-the-badge" alt="Rate Extension">
  </a>
  <a href="https://github.com/vansh-121/what-was-i-doing/issues">
    <img src="https://img.shields.io/badge/🐛-Report%20Issue-red?style=for-the-badge" alt="Report Issue">
  </a>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/vansh-121">Vansh Sethi</a>
</p>
