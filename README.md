# Jaymin Dabhi — AI Engineer Portfolio

A personal, production-oriented portfolio website specifically engineered to showcase personal contributions to **AI agent frameworks, RAG systems, multi-agent workflows, Text-to-SQL systems, and LLM application architectures**.

---

## 🎯 Positioning & Core Philosophy

> **“I don't just call an LLM API. I design the workflow around the LLM.”**

This portfolio is tailored to satisfy rigorous AI Engineer hiring evaluations:
- **No generic developer templates**: Built as a technical research portfolio and system architecture showcase.
- **Progressive Engineering Journey**:
  1. **Enterprise AI Assistant / RAG Chatbot** (Semantic Ingestion & Context Grounding)
  2. **Text-to-SQL Multi-Agent System** (LangGraph Multi-Agent Orchestration & Schema Reduction)
  3. **Production-Oriented AI SQL Chatbot** (REST API, vLLM Serving & AST Validation)
  4. **Runtime PDF RAG / Mini RAG** (Local Embeddings & Ephemeral Vector Indexing)
- **10-Point Technical Rigor**: Every project explicitly specifies Problem, Architecture, Agent Design, Personal Contribution, Technologies, Engineering Decisions, Challenges, Internal Mechanics, Learnings, and Future Improvements.
- **Truthful & Grounded**: Zero invented companies, fake metrics, or exaggerated user claims.

---

## 📂 Project Structure

```
/home/user/Documents/port/
├── index.html              # Semantic HTML5 layout with all sections & visual flow
├── css/
│   ├── style.css           # Core dark obsidian/charcoal design system, glassmorphism, responsive styles
│   └── diagrams.css        # Architecture flowcharts, agent network nodes, state machine visualizations
├── js/
│   ├── data.js             # 10-point technical specs for all projects, pipeline states & tech mappings
│   ├── hero-canvas.js      # Animated background agent network & token packet flow
│   ├── visualizers.js      # Interactive RAG simulator ("Ask the System"), Text-to-SQL inspector, tech map
│   └── main.js             # Project filtering, 10-point deep dive modal controller, navigation
└── README.md               # Portfolio documentation & deployment guide
```

---

## 🚀 Running Locally

You can run this portfolio locally with any static web server:

### Option 1: Python HTTP Server (Built-in)
```bash
cd /home/user/Documents/port
python3 -m http.server 8085
```
Then open your browser at:
`http://localhost:8085/`

### Option 2: Node / npx (if installed)
```bash
npx serve .
```

---

## 🌐 Deploying to Production

### 1. GitHub Pages (Free & Immediate)
1. Initialize git in the folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AI Engineer portfolio"
   ```
2. Create a repository on GitHub (e.g., `jaymin-portfolio` or `<username>.github.io`).
3. Push to `main` branch.
4. In GitHub Repository Settings &rarr; **Pages**, set branch to `main` and root `/`.
5. Your portfolio is live with SSL in seconds!

### 2. Vercel or Netlify
- Drag and drop the `/home/user/Documents/port` folder directly into [Netlify Drop](https://app.netlify.com/drop) or import via Vercel CLI / Dashboard.

---

## ✏️ Customizing Contact Placeholders

In `index.html` under the `#contact` section, replace the bracketed placeholders with your real profile links:

```html
<!-- Email -->
<div class="text-light text-sm font-mono">[ADD EMAIL]</div>

<!-- LinkedIn -->
<div class="text-cyan text-sm font-mono">[ADD LINKEDIN]</div>

<!-- GitHub -->
<div class="text-cyan text-sm font-mono">[ADD GITHUB]</div>

<!-- Resume Link -->
<div class="text-emerald text-sm font-mono">[ADD RESUME LINK]</div>
```

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: HTML5, Vanilla Modern CSS, JavaScript (ES6+), Bootstrap 5 (CSS & modal utils), Google Fonts (`Inter`, `JetBrains Mono`).
- **Visuals**: Custom HTML5 Canvas agent network, SVG flow diagrams, stateful interactive inspectors.
- **Backend / Deployment**: 100% static & serverless ready. Can also be served directly via Django or Flask if desired.
