# AGENT.MD: Portfolio Manager (SSD Protocol)

Este documento define el comportamiento y las responsabilidades del Agente para este proyecto específico.

## Contexto del Proyecto
Este es el portal profesional de Joan Mata, diseñado bajo arquitectura MVC para máxima escalabilidad. Combina hardware, software y ciencia de datos.

## Protocolo de Sincronización (OBLIGATORIO)

### 1. Sincronización de Especificaciones (SSD)
- **Antes de cada cambio funcional**, consulta `specs/plan.md`.
- **Después de cada cambio funcional**, actualiza `specs/plan.md` con el estado actual.
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

### 4. Modo Administrador
- Acceso: `admin123` (configurado en `.env`).
- Funcionalidad: Edición visual sin código.
- **Regla de Auto-Traducción**: El Agente debe facilitar o emular la traducción automática ES -> EN/CA siempre que se modifique texto en español.

## Reglas de Diseño Premium
- Mantener Glassmorphism en todos los nuevos componentes (`Card`, `Modal`, `AdminPanel`).
- Usar variables CSS globales (`index.css`) para colores y desenfoques.
- Asegurar que los botones de descarga han de ser visibles e informativos.

## Verificación de Despliegue
- El entorno local Corre en `localhost:5173` para desarrollo.
- El despliegue final está en `joanmata.com`. 
- El Agente **debe** verificar que los cambios no rompen la accesibilidad del portal principal.
