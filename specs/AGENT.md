# AGENT.MD: Portfolio Manager (SSD Protocol)

Este documento define el comportamiento y las responsabilidades del Agente para este proyecto específico.

## Contexto del Proyecto
Este es el portal profesional de Joan Mata, diseñado bajo arquitectura MVC para máxima escalabilidad. Combina hardware, software y ciencia de datos bajo una estética de "Infinity Luxury".

## Protocolo de Sincronización (OBLIGATORIO)

### 1. Sincronización de Especificaciones (SSD)
- **Antes de cada cambio funcional**, consulta `MASTER_SPEC.md` y `specs/plan.md`.
- **Después de cada cambio funcional**, actualiza `MASTER_SPEC.md` con las nuevas reglas técnicas.
- Mantén `specs/product.md` alineado con las funcionalidades disponibles (incluyendo Modo Admin y Descarga CV).

### 2. Sincronización de Datos (Modo Administrador)
- Los cambios realizados a través del editor interactivo se reflejan en el estado local de la sesión.
- Cualquier adición persistente de datos en `cvData.js` o `translations.js` debe seguir el formato estructurado: 
  * Multilingüe (es, ca, en).
  * Soporte para `links` (github, live).
  * Soporte para `security` y `techStack`.

### 3. Protocolo de Git
- Tras cada cambio sustancial (ej: nueva sección, corrección UI), realiza un **commit descriptivo**. 
- Sigue el formato `feat: ...`, `fix: ...`, `chore: ...`.

### 4. Modo Administrador & Dashboard
- **Dashboard Emojis**: Las herramientas de administrador (Import, Export, Logout) son exclusivamente emojis (📥, 💾, 🚪). No se debe añadir texto innecesario.
- **Regla de Auto-Traducción**: El Agente DEBE asegurar que cualquier cambio en `es` dispare la traducción automática a `ca` y `en` antes de guardar, usando la API de Google Translate incorporada en `AdminModal.jsx`.

## Reglas de Diseño Premium ("Infinity Luxury")
- **Viewport Positioning**: Las utilidades (Idiomas y Admin) deben ser `fixed` y situarse en los bordes extremos del viewport (`top: 1.5rem; left/right: 0.75rem`).
- **Glassmorphism**: Mantener `backdrop-filter: blur(25px)` en todos los nuevos componentes (`Card`, `Modal`, `AdminPanel`).
- **Responsive**: Asegurar que el logo central ("JOAN MATA") tenga `white-space: nowrap` y sea el eje central de la cabecera.

## Verificación de Despliegue
- El entorno local Corre en `localhost:5173` para desarrollo.
- El despliegue final está en `joanmata.com`. 
- El Agente **debe** verificar que los cambios no rompen la accesibilidad del portal principal.
