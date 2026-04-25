import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import { fail } from './utils/response.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ code: 0, message: 'ok', data: { timestamp: Date.now() } });
});

app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => fail(res, `接口不存在: ${req.method} ${req.url}`, 40400, 404));

app.use((error, _req, res, _next) => {
  console.error(error);
  return fail(res, error.message || '服务器内部错误', 50000, 500);
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
