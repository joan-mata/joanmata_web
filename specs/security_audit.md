# 🔒 Auditoría de Seguridad — joanmata_web

## Resumen Ejecutivo

| Categoría | Estado | Comentario |
|---|---|---|
| SQL Injection | ✅ **No aplica** | No hay base de datos ni queries SQL |
| XSS (Cross-Site Scripting) | ✅ **Seguro** | No hay `dangerouslySetInnerHTML`, `innerHTML` ni `eval()` |
| Backdoors / Puertas traseras | ✅ **No detectadas** | No hay `child_process`, `exec`, endpoints ocultos |
| Credenciales en código | ⚠️ **Atención** | La contraseña admin se compara en el cliente |
| Peticiones externas | ⚠️ **Riesgo bajo** | API de Google Translate sin autenticación |
| Almacenamiento local | ⚠️ **Riesgo bajo** | `sessionStorage` para sesión admin, bypasseable |
| Importación de datos | ⚠️ **Riesgo medio** | JSON importado sin validación |
| Links externos | ✅ **Seguro** | Todos usan `rel="noreferrer"` |
| Headers de seguridad | ⚠️ **Faltan** | No hay CSP, HSTS, X-Frame-Options |

---

## Detalle de Hallazgos

### 🔴 CRÍTICO: Contraseña Admin Expuesta en el Cliente

**Archivo:** [AdminEntry.jsx](file:///Users/joanmataparraga/Documents/joanmata_web/src/components/admin/AdminEntry.jsx#L11)

```javascript
if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
```

**Problema:** Las variables `VITE_*` se embeben en el bundle de producción en texto plano. Cualquier persona puede abrir las DevTools del navegador → Sources → buscar la contraseña y verla directamente en el JavaScript compilado. **Esto NO es seguridad real.**

**Además:** No existe archivo `.env`, lo que significa que `VITE_ADMIN_PASSWORD` es `undefined`. Cualquiera que deje el campo vacío y pulse "Entrar" podría acceder al modo admin (comparación `"" === undefined` → `false`, pero si no hay `.env` en producción, esto podría fallar de forma impredecible).

> [!CAUTION]
> Este es el hallazgo más importante. La contraseña del admin es visible para cualquier visitante de la web.

---

### 🟡 MEDIO: Sesión Admin sin Protección Real

**Archivo:** [App.jsx](file:///Users/joanmataparraga/Documents/joanmata_web/src/App.jsx#L26)

```javascript
const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === 'true');
```

**Problema:** Cualquier usuario puede abrir la consola del navegador y escribir:
```javascript
sessionStorage.setItem('isAdmin', 'true');
location.reload();
```
Y tendrá acceso completo al modo admin sin conocer ninguna contraseña.

---

### 🟡 MEDIO: Importación JSON sin Validación ni Sanitización

**Archivo:** [App.jsx](file:///Users/joanmataparraga/Documents/joanmata_web/src/App.jsx#L149-L161)

```javascript
const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        try {
          localStorage.setItem('curcv_data', re.target.result);
          window.location.reload();
        } catch (err) { alert("Error"); }
      };
      reader.readAsText(file);
    }
  };
```

**Problema:** Se guarda el contenido del archivo directamente en `localStorage` sin:
- Validar que sea JSON válido (`JSON.parse` antes de guardar)
- Verificar la estructura esperada del objeto
- Sanitizar los valores (podrían contener scripts si algún día se usa `dangerouslySetInnerHTML`)

---

### 🟡 BAJO: API de Google Translate sin Restricciones

**Archivo:** [AdminModal.jsx](file:///Users/joanmataparraga/Documents/joanmata_web/src/components/admin/AdminModal.jsx#L41)

```javascript
const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
```

**Problema:** Se usa la API interna de Google Translate (`client=gtx`) que no requiere clave API. No es un riesgo de seguridad directo para tu web, pero:
- Google podría bloquearla sin previo aviso
- El parámetro `targetLang` no se valida (solo debería aceptar `en`, `ca`)

---

### 🟢 Buenas Prácticas Detectadas

| Práctica | Estado |
|---|---|
| No hay `eval()` ni `Function()` | ✅ |
| No hay `dangerouslySetInnerHTML` | ✅ |
| No hay `innerHTML` ni `document.write` | ✅ |
| No hay servidor backend (100% estático) | ✅ |
| No hay base de datos (no puede haber SQL injection) | ✅ |
| Links externos con `rel="noreferrer"` | ✅ |
| `.env` en `.gitignore` (no se sube al repo) | ✅ |
| React escapa automáticamente todo el JSX | ✅ |
| No hay `child_process` ni ejecución de comandos | ✅ |
| No hay rutas de servidor ni APIs propias | ✅ |

---

## Recomendaciones de Corrección

### 1. Proteger la Autenticación Admin (Prioridad Alta)

Usar hash SHA-256 en lugar de texto plano — la contraseña nunca aparece en el bundle:

```javascript
// En AdminEntry.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  if (hashHex === import.meta.env.VITE_ADMIN_PASSWORD_HASH) {
    onLogin();
  } else {
    setError(true);
    setTimeout(() => setError(false), 3000);
  }
};
```

Y en `.env` guardar el HASH, no la contraseña:
```
VITE_ADMIN_PASSWORD_HASH=5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
```

### 2. Validar la Importación JSON

```javascript
const importData = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (re) => {
      try {
        const parsed = JSON.parse(re.target.result);
        // Validación básica de estructura
        if (!parsed.name || !parsed.experience || !parsed.projects) {
          throw new Error('Invalid CV structure');
        }
        localStorage.setItem('curcv_data', JSON.stringify(parsed));
        window.location.reload();
      } catch (err) {
        alert("Archivo inválido");
      }
    };
    reader.readAsText(file);
  }
};
```

### 3. Añadir Headers de Seguridad (en producción)

Si usas Nginx o Cloudflare, añadir:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;";
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### 4. Crear el archivo `.env`

```bash
# Generar hash: echo -n "tu_contraseña" | shasum -a 256
VITE_ADMIN_PASSWORD_HASH=<hash_aquí>
```
