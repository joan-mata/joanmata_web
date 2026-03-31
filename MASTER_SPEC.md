# Luxury CV Portal: Master Specification

This document serves as the comprehensive technical blueprint for the **Luxury CV Portal**. It encapsulates every architectural decision, design pattern, and logic flow implemented in the project.

---

## 🏗️ Core Architecture

### Tech Stack
- **Framework**: React (Vite-based)
- **Routing**: `react-router-dom` (HashRouter for easy deployment)
- **Styling**: Vanilla CSS with a custom Design System
- **Persistence**: `localStorage` (for CV data) and `sessionStorage` (for Admin authentication)

### State Management
- **Global State**: Managed in `App.jsx` using `useState`.
- **Data Synchronization**: Any change to `currentData` is automatically synced to `localStorage` via a `useEffect` hook.
- **Multilingual Support**: Supports Spanish (ES), Catalan (CA), and English (EN).

---

## 🛠️ Administrative Engine

### 1. Specialized Admin Forms
The `AdminModal.jsx` provides context-aware forms for:
- **Experience**: Company, Role (multi), Date, Key Points (multi).
- **Projects**: Name, Description (multi), Points (multi), Tags, Links.
- **Education/Certificates**: Institution, Title (multi), Date.
- **Skills**: Simple comma-separated list.
- **Profile**: Direct bio translation.

### 2. Auto-Translation Workflow (`performAutoTranslation`)
**Secret Sauce**: When an admin saves an entry in Spanish (ES), the system automatically triggers an asynchronous translation loop.
- **API**: Uses the `https://translate.googleapis.com/translate_a/single?client=gtx` endpoint.
- **Logic**:
    - Detects Spanish input.
    - Iterates through all text fields and array items.
    - Translates ES -> CA and ES -> EN.
    - Updates the state only after all translations are complete.
- **UI**: Displays a "Guardando y Traduciendo..." loading state during the process.

---

## 🎨 Design System ("Infinity Luxury")

### Visual Language
- **Glassmorphism**: Dense `backdrop-filter: blur(25px)` combined with semi-transparent backgrounds (`rgba(255, 255, 255, 0.05)`).
- **Color Palette**: 
  - Background: `#0a0a0c` (Deep Obsidian)
  - Primary Accent: `#6366f1` (Indigo Glow)
  - Secondary Accent: `#a855f7` (Violet Pulse)
- **Typography**: 'Outfit' (Google Fonts) with heavy weights (`900`) for headers and letter-spacing for premium feel.

### Component Logic
- **Button System**: 
  - `.nav-btn`: Rounded pills for navigation.
  - `.cta-btn`: High-contrast buttons for calls to action.
  - `.admin-icon`: Circular pencil icons for card-level editing.
- **Absolute Positioning**: To prevent UI clutter, the Language Switcher and Admin Tools are rendered as top-level fixed vertical stacks at the screen edges (`left: 0.75rem` and `right: 0.75rem`), bypassing the header's centering transforms.

---

## 📜 Key Implementation Notes

### Project Details Page
A two-column "Luxury Layout" with a vertical hero. Features a dedicated glass card for long descriptions and a technical sidebar for tags and live links.

### Contact Hub
A grid of feature cards featuring large icons (✉️, 🌐) and a prominent, centered "CV Download" block with glowing hover states.

### Data Portability
The system includes built-in `Import JSON` and `Export JSON` tools (📥, 💾) to allow manual data backups and migrations without a backend.

---

## 🚀 Single Prompt Reconstruction

*If you want to rebuild this entire project in one go using an AI agent, use the following prompt:*

> "Rebuild the Luxury CV Portal following these specifications:
> 1. **Tech Stack**: React + Vite + Vanilla CSS. Use HashRouter.
> 2. **Design**: Implement a Dark Mode theme called 'Infinity Luxury' using Glassmorphism (blur: 25px) and Gradient Text (Indigo to Violet).
> 3. **Admin Portal**: 
>    - Create a session-based admin mode triggered by `/admin`.
>    - Implement an `AdminModal` with specialized forms for Experience, Projects, and Education.
>    - **CRITICAL**: On save, use the Google Translate gtx API to automatically translate Spanish (ES) input into Catalan (CA) and English (EN) for all text fields and arrays. Show a loading state ('Guardando y Traduciendo...') during this process.
> 4. **UI Layout**:
>    - Header: Centralized fixed menu with a logo 'JOAN MATA'.
>    - Utilities: Place a vertical Language Switcher (ES, CA, EN) at the far top-right and an Admin Toolset (Import, Export, Exit) at the far top-left.
>    - Navigation: Use `.nav-btn` pills and ensure the active state is Indigo.
> 5. **Pages**:
>    - Home: Summary hero + Experience timeline.
>    - Projects: Card grid linking to a detailed Two-Column Project Page.
>    - Contact: Feature cards with a prominent 'Download CV' CTA.
> 6. **Data**: Use a JSON structure in `localStorage` that nests [lang] keys for all translatable content."

---

> [!IMPORTANT]
> This specification reflects the state of the project as of March 31, 2026. Any further UI tweaks should be appended to this document to maintain the "Master" status.
