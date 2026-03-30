# CV Web: JOAN MATA Personal Portfolio / CV

This project is a high-performance interactive digital portfolio designed with a modern **MVC Architecture** and **Spec-Driven Development (SSD)** philosophy.

## Quick Rebuild (Single-Prompt)
To rebuild the entire site from scratch using an AI Agent (like Jarvis), use the following prompt:

> "Build a premium React 19 + Vite 8 portfolio website for Joan Mata Pàrraga following the MVC architecture. Use the specifications found in `specs/product.md`, `specs/tech_stack.md`, and `specs/AGENT.md`. Core features: Hero block, Experience grid, detailed Projects with modals, and full Multilingual support (ES, CA, EN)."

## Project Structure
- **/specs**: The project's source of truth.
    - `product.md`: Goals and features.
    - `tech_stack.md`: Architectural details.
    - `plan.md`: Roadmap and completed tasks.
    - `AGENT.md`: Context and rules for the AI Agent.
- **/src**:
    - `/models`: Dynamic data (`cvData.js`) and UI strings (`translations.js`).
    - `/components`: Modular UI (layout, sections, common).
    - `App.jsx`: Main logic controller.
    - `index.css`: Custom premium styles.

## How to Run Locally
1. Ensure you have **Node 25+** and **npm** installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Contribution & Spec Rule
Any functional change to the code **must** be preceded by an update to the corresponding specification in `/specs`. The documentation and the code must always be in sync.
