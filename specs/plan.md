# Project Plan: JOAN MATA Personal Portfolio / CV

## Current State: Robust & Managed
The project has been refactored to a modern MVC architecture, includes a password-protected interactive Admin Editor with auto-translation, and features a redundant CV download system.

## Completed Tasks (`[x]`)
- [x] **Arquitectura MVC**: Separación de Modelos, Vistas y Controlador.
- [x] **Multilingüe**: Soporte para ES, CA, EN sin dependencias.
- [x] **Restauración de Datos**: Recuperación de los 3 proyectos originales (AI Editor, AWS Pipeline, Docker Video).
- [x] **Modo Administrador**: Panel de edición interactivo protegido por contraseña (admin123 en .env) con **Auto-Traducción** ES -> EN/CA.
- [x] **UI de Proyectos**: Rediseño de tarjetas con botón "WEB/URL" independiente y eliminación de sufijos técnicos en títulos.
- [x] **Descarga de CV**: Integración de botón de descarga PDF con popup de error si el archivo no existe.
- [x] **Corrección de Typos**: Ajuste de "Data Scientist" y sus variantes multilingües.
- [ ] **Dockerización**: (Próximo paso tras estabilizar contenido).

## Upcoming Features (`[ ]`)
- [ ] **Dockerización**: Crear `Dockerfile` y `docker-compose.yml` para despliegue productivo.
- [ ] **Animaciones de Transición**: Añadir Framer Motion o transiciones CSS más suaves entre tabs.
- [ ] **Formación Detallada**: Expandir sección de educación con tarjetas modales.
- [ ] **SEO & Meta**: Optimización de tags para mejor indexación.

## Roadmap Phase 1: Interactive CMS (Done)
1. Implementar el Modo Administrador para edición sin código (Done).
2. Sincronizar traducciones automáticas (Done).
3. Asegurar la integridad de todos los proyectos históricos (Done).

## Roadmap Phase 2: Deployment & Devops
1. Configurar entorno Docker para el servidor joanmata.com local.
2. Optimizar tiempos de carga mediante Vite y compresión de assets.
