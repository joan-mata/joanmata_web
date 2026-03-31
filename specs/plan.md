# Project Plan: JOAN MATA Personal Portfolio / CV

## Current State: Luxury CMS & Managed
The project has been refactored to a modern "Infinity Luxury" architecture, including a specialized emoji-only Admin Dashboard with automated translation, a two-column detailed project view, and a high-impact contact hub.

## Completed Tasks (`[x]`)
- [x] **Arquitectura MVC**: Separación de Modelos, Vistas y Controlador.
- [x] **Multilingüe**: Soporte para ES, CA, EN sin dependencias.
- [x] **Restauración de Datos**: Recuperación de los 3 proyectos originales (AI Editor, AWS Pipeline, Docker Video).
- [x] **Modo Administrador**: Panel de edición interactivo protegido por contraseña (admin123 en .env) con **Auto-Traducción** ES -> EN/CA.
- [x] **UI de Proyectos**: Rediseño de tarjetas con botón "WEB/URL" independiente y eliminación de sufijos técnicos en títulos.
- [x] **Descarga de CV**: Integración de botón de descarga PDF con popup de error si el archivo no existe.
- [x] **Luxury UI Overhaul**: Implementación de botones `.nav-btn` pulsátiles, diseño "Infinity" con variables CSS de alto contraste.
- [x] **Project Details Page**: Creación de una página de detalles en dos columnas con hero vertical y tarjetas de cristal.
- [x] **Contact Hub**: Rediseño de la sección de contacto con tarjetas interactivas y descarga de CV destacada.
- [x] **Master Spec Consolidation**: Creación de `MASTER_SPEC.md` con un prompt de reconstrucción única.
- [x] **Declutter UI**: Posicionamiento de utilidades (Idiomas/Admin) en los bordes extremos del viewport para despejar el logo.

## Upcoming Features (`[ ]`)
- [ ] **Dockerización**: (Próximo paso tras estabilizar contenido). Crear `Dockerfile` y `docker-compose.yml` para despliegue productivo.
- [ ] **Animaciones de Transición**: Añadir Framer Motion o transiciones CSS más suaves entre tabs.
- [ ] **Formación Detallada**: Expandir sección de educación con tarjetas modales.
- [ ] **SEO & Meta**: Optimización de tags para mejor indexación.

## Roadmap Phase 1: Interactive CMS & Luxury UI (Done)
1. Implementar el Modo Administrador para edición sin código (Done).
2. Sincronizar traducciones automáticas mediante Google API (Done).
3. Rediseño visual premium ("Infinity Luxury") (Done).
4. Sincronización de especificaciones técnicas (Done).

## Roadmap Phase 2: Deployment & Devops
1. Configurar entorno Docker para el servidor joanmata.com local.
2. Optimizar tiempos de carga mediante Vite y compresión de assets.
