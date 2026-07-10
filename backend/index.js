const express = require('express');
const multer  = require('multer');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const crypto  = require('crypto');

const CONTENT_FILE = path.join(__dirname, 'content.json');
const ADMIN_FILE   = path.join(__dirname, 'admin.json');
const UPLOADS_DIR  = path.join(__dirname, 'uploads');

// ── In-memory session store ──────────────────────────────
const sessions = new Set();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token && sessions.has(token)) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// ── Helpers ──────────────────────────────────────────────
const readContent  = () => JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
const writeContent = (data) => fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2));
const readAdmin    = () => JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf8'));

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key])) {
      out[key] = source[key];
    } else if (source[key] && typeof source[key] === 'object') {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

// ── Multer ───────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS_DIR),
  filename:    (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// ── API app (port 4000) ──────────────────────────────────
const api = express();
api.use(cors());
api.use(express.json());
api.use('/uploads', express.static(UPLOADS_DIR));

// Public — frontend reads content freely
api.get('/api/content', (_, res) => res.json(readContent()));

// Admin login — returns token on success
api.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const creds = readAdmin();
  if (username === creds.username && password === creds.password) {
    const token = generateToken();
    sessions.add(token);
    return res.json({ ok: true, token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Admin logout
api.post('/api/admin/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

// Verify token (used by admin panel on load)
api.get('/api/admin/verify', (req, res) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  res.json({ ok: token && sessions.has(token) ? true : false });
});

// Protected write routes
api.put('/api/content',    requireAuth, (req, res) => {
  const updated = deepMerge(readContent(), req.body);
  writeContent(updated);
  res.json({ ok: true });
});

api.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

api.listen(4000, () => console.log('✅  API running at http://localhost:4000'));

// ── Admin app (port 4001) ────────────────────────────────
const admin = express();
admin.use(express.static(path.join(__dirname, 'admin')));
admin.get('/{*path}', (_, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')));

admin.listen(4001, () => console.log('✅  Admin panel at  http://localhost:4001'));
