import json
import os

files = ['en.json', 'ca.json']
base_path = '/Users/server_user/Documents/joanmata_web/src/models/cv_data/'

with open(os.path.join(base_path, 'es.json'), 'r') as f:
    es_data = json.load(f)

for filename in files:
    lang = filename.split('.')[0]
    path = os.path.join(base_path, filename)
    with open(path, 'r') as f:
        data = json.load(f)
    
    # 1. Update Gastia
    gastia = next((p for p in data['projects'] if p['id'] == 'gastia'), None)
    if not gastia:
        gastia = {"id": "gastia"}
        data['projects'].append(gastia)
    
    gastia.update({
        "name": "Gastia: Smart Finance Management" if lang == 'en' else "Gastia: Gestió Financera Intel·ligent",
        "date": "2026",
        "tags": ["Next.js", "Prisma", "Telegram Bot", "AI Parser"],
        "desc": "Comprehensive ecosystem for personal finance management with an AI assistant via Telegram and smart import." if lang == 'en' else "Ecosistema integral per a la gestió de finances personals amb assistent d'IA via Telegram i importació intel·ligent.",
        "points": [
            "Customizable dashboard with dynamic widgets for full control of expenses, income, and budgets." if lang == 'en' else "Dashboard personalitzable amb widgets dinàmics per al control total de despeses, ingressos i pressupostos.",
            "Smart Import Module: Processing of Excel/CSV and plain text files via AI for automatic movement detection." if lang == 'en' else "Mòdul d'Importació Intel·ligent: Processament de fitxers Excel/CSV i text pla mitjançant IA per a la detecció automàtica de moviments.",
            "Advanced Group and Trip management for tracking shared expenses and debt settlement." if lang == 'en' else "Gestió avançada de Grups i Viatges per al seguiment de despeses compartides i liquidació de deutes.",
            "Fixed Expenses control system with automatic pro-rating and Reserve Fund for emergencies." if lang == 'en' else "Sistema de control de Despeses Fixes amb prorrateig automàtic i Fons de Reserva per a emergències.",
            "Integrated Telegram bot that processes natural language via Claude (Anthropic) to record expenses on the fly." if lang == 'en' else "Bot de Telegram integrat que processa llenguatge natural mitjançant Claude (Anthropic) per registrar despeses al vol.",
            "Compartmentalized self-hosted architecture with Docker and securely exposed via Cloudflare Tunnel." if lang == 'en' else "Arquitectura auto-hostejada compartimentada amb Docker i exposada de forma segura via Cloudflare Tunnel."
        ],
        "techStack": ["Next.js (App Router)", "Prisma ORM", "PostgreSQL", "Anthropic API", "Telegram API", "Cloudflare Tunnel"],
        "security": [
            "Financial auditing implementation with full transaction traceability via Prisma and PostgreSQL." if lang == 'en' else "Implementació d'auditoria financera amb traçabilitat total de transaccions mitjançant Prisma i PostgreSQL.",
            "Multi-layer secure access via HttpOnly cookies, SameSite=Strict, and JWT Authentication." if lang == 'en' else "Accés segur multi-capa mitjançant cookies HttpOnly, SameSite=Strict i Autenticació JWT.",
            "Invisible network perimeter without ISP port opening, using end-to-end encrypted tunnels." if lang == 'en' else "Perímetre de xarxa invisible sense obertura de ports ISP, utilitzant túnels xifrats d'extrem a extrem."
        ],
        "links": {"github": "github.com/joan-mata/gastia", "live": "gastia.joanmata.com"}
    })

    # 2. Update/Add Biblioteca
    biblioteca = next((p for p in data['projects'] if p['id'] == 'biblioteca'), None)
    if not biblioteca:
        biblioteca = {"id": "biblioteca"}
        data['projects'].append(biblioteca)
    
    biblioteca.update({
        "name": "Biblioteca: Personal Collection Management" if lang == 'en' else "Biblioteca: Gestió de Col·lecció Personal",
        "date": "2026",
        "tags": ["Next.js", "Prisma", "Glassmorphism", "NextAuth", "Secure Media"],
        "desc": "Premium platform for managing personal book collections with a focus on security and elegant design." if lang == 'en' else "Plataforma premium per a la gestió de col·leccions personals de llibres amb focus en seguretat i disseny elegant.",
        "points": [
            "Premium interface with Glassmorphism and micro-animations for a fluid user experience." if lang == 'en' else "Interfície premium amb Glassmorphism i micro-animacions per a una experiència d'usuari fluida.",
            "Acquisition status system (Purchased, Wanted, Do not buy) for detailed management." if lang == 'en' else "Sistema d'estats d'adquisició (Comprat, Desitjat, No comprar) per a una gestió detallada.",
            "Secure media vault: book covers are only accessible to authenticated users." if lang == 'en' else "Bòveda de mèdia segura: les portades dels llibres només són accessibles per a usuaris autenticats.",
            "Decoupled architecture optimized for self-hosted deployments (Homelab)." if lang == 'en' else "Arquitectura desacoblada i optimitzada per a despliegues auto-hostejats (Homelab).",
            "Full integration with PostgreSQL and Prisma for robust data persistence." if lang == 'en' else "Integració completa amb PostgreSQL i Prisma per a una persistència de dades robusta."
        ],
        "techStack": ["Next.js (App Router)", "Prisma ORM", "PostgreSQL", "NextAuth", "Tailwind CSS"],
        "security": [
            "Protected access to media files through server-side session validation, preventing public exposure of personal assets." if lang == 'en' else "Accés protegit a fitxers multimèdia mitjançant validació de sessió al costat del servidor, evitant l'exposició pública d'actius personals.",
            "Robust authentication implemented with NextAuth and credential encryption via Bcrypt." if lang == 'en' else "Autenticació robusta implementada amb NextAuth i xifrat de credencials mitjançant Bcrypt.",
            "Infrastructure isolation using Docker containers, facilitating secure deployment in local networks." if lang == 'en' else "Aïllament d'infraestructura mitjançant contenidors Docker, facilitant el despliegue segur en xarxes locals."
        ],
        "links": {"github": "github.com/joan-mata/biblioteca", "live": "biblioteca.joanmata.com"}
    })

    # 3. Reorder to match ES order
    es_order = [p['id'] for p in es_data['projects']]
    new_projects = []
    for pro_id in es_order:
        p = next((proj for proj in data['projects'] if proj['id'] == pro_id), None)
        if p:
            new_projects.append(p)
    data['projects'] = new_projects

    with open(path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

