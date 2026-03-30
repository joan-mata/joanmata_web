# Tech Stack: JOAN MATA Personal Portfolio / CV

## Core Framework
- **React 19**: Modern functional components with hooks.
- **Vite 8**: High-speed build tool and dev server.

## Architecture (MVC)
The project follows a **Model-View-Controller** pattern for clean code and separation of concerns:
- **Models** (`src/models/`): Static data (`cvData.js`) and UI strings (`translations.js`).
- **Views** (`src/components/`): 
    - `layout/`: Global elements (Header, Footer).
    - `sections/`: Individual CV parts (Experience, Projects, Hero).
    - `common/`: Reusable UI primitives (Card, Badge).
- **Controllers** (`src/App.jsx`): Main logic orchestrator.

## Styling
- **Vanilla CSS**: Optimized, custom styling in `src/index.css`.
- **Variables**: Global CSS tokens for colors, animations, and transitions.
- **Glassmorphism**: Extensive use of `backdrop-filter: blur(12px)` and semi-transparent backgrounds.

## Environment
- **Node.js 25+**: Latest performance and standard compliance.
- **NVM**: Node Version Manager for environment stability.
- **Package Manager**: npm.

## Infrastructure & Security
- **Cloudflare Tunnel**: Secure local server exposition to `cv.joanmata.com`.
- **SSL/TLS**: Mandatory encryption for all subdomains.
- **Docker**: Containerized deployment planned for full environment parity.
