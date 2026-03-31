# Tech Stack Specification: JOAN MATA Portfolio

Este documento detalla la infraestructura tecnológica y las herramientas utilizadas.

## Tecnologías Principales

- **Runtime**: Node.js (Vite)
- **Framework**: React 18+ (Hooks: useState, useEffect, useMemo)
- **Enrutador**: `react-router-dom` (HashRouter para portabilidad local)
- **Estilos**: Vanilla CSS con Sistema de Variables de Diseño.

## Arquitectura de Aplicación

### Diseño del Sistema (Infinity Luxury)
- **Variables Globales**: Definidas en `:root` de `index.css`.
  - `--bg-dark`: #0a0a0c
  - `--glass`: rgba(255, 255, 255, 0.05)
  - `--accent-primary`: #6366f1 (Indigo)
  - `--accent-secondary`: #a855f7 (Violet)
- **Componentes de Cristal**: Uso sistemático de `backdrop-filter: blur(25px)` y `border: 1px solid rgba(255, 255, 255, 0.1)`.

### Motor de Administración y Traducción
- **Traducción Automática**: API `https://translate.googleapis.com/translate_a/single?client=gtx`.
- **Lógica de Sincronización**: Algoritmo asíncrono en `AdminModal.jsx` que procesa listas y campos antes del guardado final (`handleFinalSave`).

### Persistencia y Seguridad
- **Datos Personales**: `src/models/cvData.js`. Formato JSON multilingüe.
- **Almacenamiento Local**: `localStorage` para cambios en tiempo real.
- **Auth de Sesión**: `sessionStorage` para mantener el estado de administrador durante la navegación.

## Estructura de Proyecto (SSD MVC)
- `/src/models`: Datos crudos y traducciones.
- `/src/components`:
  - `/admin`: Formularios modales y entrada.
  - `/common`: Componentes reutilizables (Card, Badge).
  - `/layout`: Header (Nav central), Footer.
  - `/sections`: Secciones principales del CV.
- `/specs`: Documentación de especificaciones de diseño y lógica.
