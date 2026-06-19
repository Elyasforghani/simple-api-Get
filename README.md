# 🛒 HyperCart Engine

HyperCart Engine is a high-performance, responsive e-commerce product catalog interface designed with a focus on fluid motion aesthetics, real-time data integration, and user-centric features. 

Built using a modern utility-first styling workflow and accelerated with sequence-based UI transitions, the engine offers a high-fidelity browsing experience connected to a live production database.

---

## ✨ Key Features

* **Dynamic API Catalog:** Implements real-time asynchronous data fetching (`async/await`) integrated directly with the DummyJSON products database.
* **High-Performance Search Debouncing:** Features an intelligent `input` monitoring delay (350ms timeout) that prevents API flooding and optimizes network efficiency during live search filters.
* **Fluid Motion Design:** Utilizes the GreenSock Animation Platform (GSAP) to orchestrate complex, staggered entrance sequences for the layout grid and header layout.
* **Flicker-Free Theme Synchronization:** A dual-state light/dark mode engine mapped to local storage and the browser's hardware level preference state (`prefers-color-scheme`), preventing style flashing on page load.
* **Fully Responsive Architecture:** Crafted with Tailwind CSS utilizing fluid typography, structural CSS grids, and interactive asset states.

---

## 🛠️ Technology Stack

* **Markup:** HTML5 (Semantic Structure)
* **Styling:** Tailwind CSS (Utility-first framework via CDN implementation), Google Fonts (Inter)
* **Animation Engine:** GSAP (GreenSock Animation Platform)
* **Data Controller:** Vanilla JavaScript (ES6+ Asynchronous Fetch API)
* **Data Source:** DummyJSON Products API

---

## 📂 File Architecture

The engine splits structural UI and logic modules to maintain clean design segregation:

```text
├── index.html        # Semantic layout structure & modern typography foundations
└── js/
    └── master.js     # Asynchronous lifecycle hooks, theme handlers, & GSAP pipelines

### 🏗️ Core Architecture Breakdown

* **`index.html`**[cite: 1]
  * Establishes layout shells utilizing class-based dark modes[cite: 1].
  * Houses search inputs, grid containers (`#product-grid`), and isolated action components natively optimized for Tailwind’s compilation[cite: 1].
* **`js/master.js`**
  * **Initialization Logic:** Detects the operational platform's styling profile before first paint to enforce theme persistence.
  * **GSAP Timelines:** Sequences header and interface fades linearly using precise time offsets (`-=0.2`).
  * **Render Controllers:** Generates virtual product grid nodes with lazy-loaded thumbnails, category badges, dynamic text clamping, and unique escape sequences for isolated detail checking.

---

### 🚀 Getting Started

To launch and modify the project locally:

1. Clone or download the repository files.
2. Ensure you maintain the file structure, specifically nesting your JavaScript engine logic within a `js/` directory named `master.js` (or adjust the script target path in `index.html`)[cite: 1].
3. Open `index.html` inside any modern web browser or run it through a local development server extension (e.g., Live Server)[cite: 1].

---

### 👨‍💻 Author

* **Elyas Forghani**
