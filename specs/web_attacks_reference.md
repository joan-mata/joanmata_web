# ⚔️ Catálogo de Ataques Web — Teoría de Seguridad

> Documento de referencia teórico. Ordenado de menos a más grave.

---

## 🟡 BAJO — Molestias y Reputación

### 1. Clickjacking
Tu web se carga dentro de un `<iframe>` invisible en una web maliciosa. El usuario cree que está haciendo clic en la web maliciosa pero en realidad interactúa con la tuya.
- **Protección:** `X-Frame-Options: DENY` ✅ (ya tienes esto)

### 2. Tabnapping
El atacante abre una pestaña en background. Cuando el usuario no la mira, la página cambia a una réplica de Gmail/banco/etc. El usuario vuelve y escribe sus credenciales sin darse cuenta.
- **Protección:** Usar `rel="noopener noreferrer"` en links externos ✅ (ya tienes esto)

### 3. UI Redressing / Spoofing visual
Se solapan elementos invisibles encima de botones legítimos para engañar al usuario sobre lo que está clickando.
- **Protección:** CSP estricto ✅ (ya tienes esto)

### 4. HTML Injection (sin script)
Si la web refleja input del usuario sin sanitizar, el atacante puede inyectar HTML puro (no JS). Por ejemplo cambiar el aspecto de la página, insertar formularios falsos.
- **Protección:** React escapa automáticamente el JSX ✅ (ya tienes esto)

---

## 🟠 MEDIO — Robo de Datos y Sesión

### 5. XSS Reflejado (Cross-Site Scripting Reflected)
El script malicioso viaja en la URL. La víctima recibe un enlace como:
```
https://web.com/search?q=<script>robarCookies()</script>
```
La web refleja ese parámetro sin sanitizar y el script se ejecuta en el navegador de la víctima.
- **Protección:** React + CSP ✅ (ya tienes esto)

### 6. XSS Persistente (Stored XSS)
El atacante guarda un script malicioso en la base de datos (comentarios, perfiles, etc.). Cada vez que alguien carga esa página, el script se ejecuta. **Más grave que el reflejado porque afecta a todos los usuarios.**
- **Protección:** Sanitización de inputs en backend (no aplica en tu web estática)

### 7. XSS DOM-Based
El ataque ocurre completamente en el cliente. Si el JavaScript usa `innerHTML`, `document.write()` o `eval()` con datos de la URL, el atacante lo explota.
- **Protección:** No usar esas funciones. React no las usa por defecto ✅ (ya tienes esto)

### 8. CSRF (Cross-Site Request Forgery)
El atacante engaña al usuario para que su navegador haga una petición autenticada a otra web sin que se dé cuenta. Ejemplo: un `<img>` oculto que hace un POST a `banco.com/transferencia`.
- **Protección:** Tokens CSRF, SameSite cookies. No aplica a tu web (no hay backend)

### 9. Session Hijacking
Si la sesión (cookie o token) viaja sin HTTPS o está mal protegida, el atacante la intercepta y suplanta al usuario.
- **Protección:** HTTPS (Cloudflare lo fuerza), sessionStorage en lugar de localStorage para datos sensibles ✅

### 10. Open Redirect
La web tiene un parámetro de redirección: `?returnUrl=https://phishing.com`. Si no se valida, el atacante envía a usuarios a webs maliciosas usando tu dominio como credencial de confianza.
- **Protección:** Validar que las redirecciones sean solo internas.

---

## 🔴 ALTO — Compromiso del Sistema

### 11. SQL Injection
El atacante manda input que se "escapa" de la query SQL y ejecuta comandos propios:
```sql
SELECT * FROM users WHERE name = '' OR '1'='1'; DROP TABLE users; --
```
Puede borrar bases de datos, obtener credenciales de todos los usuarios, elevar privilegios.
- **Protección:** Queries parametrizadas / ORMs. **No aplica a tu web (sin DB)**

### 12. Command Injection
Si el backend pasa input del usuario directamente a comandos del sistema operativo (`exec()`, `child_process`), el atacante puede ejecutar cualquier comando en el servidor.
```bash
ping INPUT → ping "google.com; rm -rf /"
```
- **Protección:** No usar comandos del sistema con input externo. **No aplica a tu web**

### 13. Path Traversal / Directory Traversal
El atacante manipula rutas de ficheros para acceder a archivos que no debería:
```
https://web.com/files?name=../../../../etc/passwd
```
Si el servidor sirve ficheros sin validar la ruta, el atacante puede leer cualquier archivo del sistema.
- **Protección:** Validar y sanitizar rutas, usar `basename()`.

### 14. SSRF (Server-Side Request Forgery)
El servidor hace peticiones HTTP a URLs que el atacante controla. Si el servidor tiene acceso a servicios internos (AWS metadata, bases de datos internas), el atacante los explota a través del servidor como proxy.
- **Protección:** Whitelist de URLs permitidas, bloquear acceso a rangos internos.

### 15. File Upload Attacks
Si la web permite subir archivos, el atacante sube un PHP/shell disfrazado de imagen. Si el servidor lo ejecuta, tiene control total.
- **Protección:** Validar extensión Y tipo MIME, no ejecutar nunca uploads. **No aplica a tu web**

### 16. Broken Authentication
Tokens JWT mal firmados, sesiones que no expiran, passwords sin hashing, recuperación de contraseña insegura. El atacante puede suplantar cualquier usuario.
- **Protección:** Usar librerías de auth reconocidas, nunca reinventar la rueda.

---

## 🔴🔴 CRÍTICO — Toma de Control Total

### 17. Insecure Deserialization
El servidor deserializa datos enviados por el cliente sin validarlos. El atacante envía un objeto serializado malicioso que al deserializarse ejecuta código en el servidor (Remote Code Execution).
- **Protección:** No deserializar datos del cliente. Usar JSON con validación estricta.

### 18. XXE (XML External Entity)
Si el servidor procesa XML con entidades externas habilitadas, el atacante puede leer archivos del sistema o hacer SSRF:
```xml
<!ENTITY xxe SYSTEM "file:///etc/passwd">
```
- **Protección:** Deshabilitar entidades externas en el parser XML.

### 19. RCE (Remote Code Execution)
El Santo Grial del hacker. Conseguir ejecutar código arbitrario en el servidor. Puede llegar mediante cualquiera de los vectores anteriores. Una vez logrado, el atacante tiene **control total**: puede instalar backdoors, leer todos los datos, pivotar a otros sistemas de la red.
- **Protección:** Combinación de todo lo anterior. **Principio de mínimo privilegio.**

### 20. Supply Chain Attack
El atacante no ataca tu web directamente, sino **una dependencia que usas** (npm package, CDN, docker image). El código malicioso llega a producción dentro de un paquete legítimo. Caso real: `event-stream` (npm, 2018), `xz-utils` (Linux, 2024).
- **Protección:** Auditar dependencias (`npm audit`), usar `lockfiles`, verificar checksums.

### 21. Zero-Day Exploit
Vulnerabilidad descubierta y explotada antes de que el fabricante publique el parche. No hay defensa directa posible en el momento del ataque.
- **Protección:** Actualizar siempre, segmentar sistemas, detección de anomalías.

---

## 📊 Resumen por Gravedad

| # | Ataque | Gravedad | Aplica a tu web |
|---|---|---|---|
| 1-4 | Clickjacking, Tabnapping, UI Redressing, HTML Injection | 🟡 Bajo | ✅ (protegido) |
| 5-7 | XSS (Reflejado, Persistente, DOM) | 🟠 Medio | ✅ (protegido) |
| 8-10 | CSRF, Session Hijacking, Open Redirect | 🟠 Medio | ✅ N/A o protegido |
| 11-12 | SQL Injection, Command Injection | 🔴 Alto | ✅ N/A (sin backend) |
| 13-16 | Path Traversal, SSRF, File Upload, Broken Auth | 🔴 Alto | ⚠️ Parcial |
| 17-19 | Deserialization, XXE, RCE | 🔴🔴 Crítico | ✅ N/A (sin backend) |
| 20-21 | Supply Chain, Zero-Day | 🔴🔴 Crítico | ⚠️ Siempre posible |

---

## 🏆 Conclusión para joanmata_web

Al ser una web **100% estática sin backend propio**, estás naturalmente inmune a la mayoría de los ataques más graves (SQL Injection, RCE, Command Injection, SSRF). La superficie de ataque es mínima.

**Los únicos vectores realistas para tu arquitectura son:**
1. **XSS** → Protegido por React + CSP
2. **Supply Chain** → Mitigado con `npm audit` 
3. **Compromiso del servidor** → Mitigado con Cloudflare + Docker aislado
4. **Broken Auth del admin** → Mitigado con hash + user:pass + rate limiting

---
*Referencia: OWASP Top 10 — https://owasp.org/www-project-top-ten/*
