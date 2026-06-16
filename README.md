<div align="center">

# 🧹 Cache Reaper

> **Interactively obliterate hidden developer caches to reclaim gigabytes of space.**

[![npm version](https://badge.fury.io/js/cache-reaper.svg)](https://www.npmjs.com/package/cache-reaper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

```text
    ██████╗ ██████╗  █████╗ ██╗  ██╗███████╗
    ██╔════╝██╔══██╗██╔══██╗██║  ██║██╔════╝
    ██║     ██████╔╝███████║███████║█████╗  
    ██║     ██╔══██╗██╔══██║██╔══██║██╔══╝  
    ╚██████╗██║  ██║██║  ██║██║  ██║███████╗
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
    ██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
    ██████╔╝█████╗  ███████║██████╔╝█████╗  ██████╔╝
    ██╔══██╗██╔══╝  ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
    ██║  ██║███████╗██║  ██║██║     ███████╗██║  ██║
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
```

Did you know that NPM, Yarn, Pip, Homebrew, Docker, and Bun all silently store gigabytes of cached packages deep inside your computer's hidden directories? Over time, these caches become a graveyard of dead data, stealing massive amounts of your hard drive space.

**Cache Reaper** is a blazing-fast, interactive CLI that automatically detects which package managers you have installed and lets you mass-clear their caches with a single click.

## ✨ Features

- **🧹 Cross-Platform Scanning:** Automatically detects NPM, Yarn, Homebrew, Pip, Docker Builders, and Bun environments.
- **⚡ Interactive UI:** Powered by `inquirer` for a buttery-smooth terminal experience.
- **🛡️ Safe Obliteration:** Executes the official cache-clearing commands (`npm cache clean`, `brew cleanup`, etc.) so your system remains perfectly stable.
- **🎨 Premium Aesthetics:** Features custom ASCII art, spinners, and beautifully color-coded outputs.

## 🚀 Installation

Run it instantly anywhere without installing:

```bash
npx cache-reaper
```

Or install it globally to keep your storage clean forever:

```bash
npm install -g cache-reaper
```

## 🎮 Usage

Run the command anywhere:

```bash
cache-reaper
```

### Controls:
- **`↑ / ↓`** : Navigate the list of discovered caches.
- **`Space`** : Select targets to clear.
- **`a`** : Select ALL targets to do a full system sweep.
- **`Enter`** : Proceed to obliteration.

---

### Architected by [@lakshanmuruganandam](https://github.com/lakshanmuruganandam)
*Because nobody needs the cached version of `left-pad` from 2017.*


### 🧠 AI Engine & Model Architecture
This system is explicitly powered by **`deepseek-ai/deepseek-coder-33b-instruct`**.

Rather than relying on closed-source APIs, we custom-engineered this agent to leverage the specific strengths of `deepseek-ai/deepseek-coder-33b-instruct`. This allows the agent to process complex inputs with significantly lower latency and higher accuracy, ensuring enterprise-grade performance while remaining entirely open-source.
