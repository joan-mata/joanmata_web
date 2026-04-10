# 🔐 Gestión de Seguridad — joanmata_web

> **Este archivo es solo local.** No se publica en el servidor ni se sirve por el navegador.

---

Para que tu contraseña **no quede guardada en el historial del terminal** (`history`), puedes usar estos 3 trucos:

### 1. El truco del espacio inicial (El más rápido)
Si pones un **espacio en blanco** justo antes del comando, ZSH/Bash no lo guardará en el historial:
```bash
# Hay un espacio justo antes de echo
 echo -n "usuario:password" | shasum -a 256 | cut -d ' ' -f1
```

### 2. Usar `read -s` (⭐ RECOMENDADO)
Es el más seguro porque no ves lo que escribes y no deja rastro en ningún sitio:
```bash
read -s creds
# (Escribe usuario:contraseña y pulsa Enter. No verás nada en pantalla)
echo -n "$creds" | shasum -a 256 | cut -d ' ' -f1
```

### 3. Limpiar el historial tras el comando
Si accidentalmente escribiste la clave sin protección, ejecuta esto inmediatamente para borrar el rastro:
```bash
history -c && history -w
```

---

### Paso Final: Actualizar y Reconstruir

1. **Actualiza el archivo `.env`:** Copy/pega el hash generado en la variable `VITE_ADMIN_AUTH_HASH`.
2. **Reconstruye la web:**
```bash
# En local:
npm run build

# En el servidor (Docker):
docker compose up -d --build
```

---

## 🌐 URL del panel de administrador

```
https://joanmata.com/#/private-portal
```

> No es `/admin`. Está ofuscado intencionalmente.

---

## 📊 Estado de seguridad actual

| Medida | Estado |
|---|---|
| Usuario + Contraseña (hash SHA-256) | ✅ Activo |
| Ruta de admin ofuscada (`/private-portal`) | ✅ Activo |
| Headers Nginx (CSP, X-Frame, Nosniff) | ✅ Activo |
| Rate limiting (5 intentos / 60s) | ✅ Activo |
| robots.txt protegiendo `/docs/` | ✅ Activo |
| Contraseña en texto plano en codigo | ❌ Eliminado |
| Dependencias vulnerables | ❌ Eliminado |

---

*Actualizado: Abril 2026*
