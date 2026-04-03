# 1. Generar hash
echo -n "tu_contraseña" | shasum -a 256 | cut -d ' ' -f1

# 2. Cambiar en .env
VITE_ADMIN_PASSWORD_HASH=<el_hash_generado>
# y borrar la línea VITE_ADMIN_PASSWORD

# 3. Rebuild
npm run build
