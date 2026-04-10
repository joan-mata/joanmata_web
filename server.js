import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'src/models/cvData.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Servir la web ya compilada
app.use(express.static(path.join(__dirname, 'dist')));

// API: Obtener los datos actuales
app.get('/api/cv', async (req, res) => {
  try {
    const data = await fs.readJson(DATA_FILE);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer los datos de la web' });
  }
});

// API: Guardar cambios (Protegido por Hash)
app.post('/api/cv', async (req, res) => {
  const { authHash, newData } = req.body;
  const masterHash = process.env.VITE_ADMIN_AUTH_HASH;

  if (!authHash || authHash !== masterHash) {
    console.warn(`[Seguridad] Intento de guardado fallido desde IP: ${req.ip}`);
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    await fs.writeJson(DATA_FILE, newData, { spaces: 2 });
    console.log('[Sistema] CV actualizado correctamente por el administrador');
    res.json({ success: true });
  } catch (err) {
    console.error('[Error] Fallo al escribir en el disco:', err);
    res.status(500).json({ error: 'Error al guardar los cambios en el servidor' });
  }
});

// Redireccionar todo lo demás al index.html (para React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Full-Stack corriendo en http://localhost:${PORT}`);
});
