import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { adminAuth } from '../middleware/auth.js';
import { query } from '../db.js';
import { fail, ok } from '../utils/response.js';

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return fail(res, '用户名和密码不能为空');
  }

  const users = await query('SELECT * FROM admin_users WHERE username = ? LIMIT 1', [username]);
  if (!users.length) {
    return fail(res, '用户名或密码错误', 40001, 400);
  }

  const user = users[0];
  const pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    return fail(res, '用户名或密码错误', 40001, 400);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, nickname: user.nickname },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  );

  return ok(res, { token, user: { id: user.id, username: user.username, nickname: user.nickname } }, '登录成功');
});

router.use(adminAuth);

router.get('/dashboard', async (_req, res) => {
  const [serviceCount] = await query('SELECT COUNT(*) AS total FROM services');
  const [caseCount] = await query('SELECT COUNT(*) AS total FROM cases');
  const [newsCount] = await query('SELECT COUNT(*) AS total FROM news');
  const [messageCount] = await query('SELECT COUNT(*) AS total FROM contact_messages');
  const [pendingMessageCount] = await query('SELECT COUNT(*) AS total FROM contact_messages WHERE status = 0');

  return ok(res, {
    services: serviceCount.total,
    cases: caseCount.total,
    news: newsCount.total,
    messages: messageCount.total,
    pendingMessages: pendingMessageCount.total
  });
});

router.get('/services', async (_req, res) => {
  const rows = await query('SELECT * FROM services ORDER BY sort_order ASC, id DESC');
  return ok(res, rows);
});

router.post('/services', async (req, res) => {
  const { title, summary, description, icon, sort_order = 99, status = 1 } = req.body;
  if (!title || !summary || !description) return fail(res, '标题、简介、说明必填');
  const result = await query(
    'INSERT INTO services (title, summary, description, icon, sort_order, status) VALUES (?, ?, ?, ?, ?, ?)',
    [title, summary, description, icon || '', sort_order, status]
  );
  return ok(res, { id: result.insertId }, '新增成功');
});

router.put('/services/:id', async (req, res) => {
  const { title, summary, description, icon, sort_order = 99, status = 1 } = req.body;
  await query(
    'UPDATE services SET title=?, summary=?, description=?, icon=?, sort_order=?, status=? WHERE id=?',
    [title, summary, description, icon || '', sort_order, status, req.params.id]
  );
  return ok(res, null, '更新成功');
});

router.delete('/services/:id', async (req, res) => {
  await query('DELETE FROM services WHERE id=?', [req.params.id]);
  return ok(res, null, '删除成功');
});

router.get('/cases', async (_req, res) => {
  const rows = await query(
    `SELECT c.*, cc.name AS category_name
    FROM cases c
    LEFT JOIN case_categories cc ON c.category_id = cc.id
    ORDER BY c.publish_time DESC, c.id DESC`
  );
  const categories = await query('SELECT * FROM case_categories ORDER BY sort_order ASC, id ASC');
  return ok(res, { list: rows, categories });
});

router.post('/cases', async (req, res) => {
  const { category_id, title, summary, cover_url, content, publish_time, status = 1 } = req.body;
  if (!category_id || !title || !summary || !content) return fail(res, '分类、标题、简介、详情必填');
  const result = await query(
    `INSERT INTO cases (category_id, title, summary, cover_url, content, publish_time, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [category_id, title, summary, cover_url || '', content, publish_time || new Date(), status]
  );
  return ok(res, { id: result.insertId }, '新增成功');
});

router.put('/cases/:id', async (req, res) => {
  const { category_id, title, summary, cover_url, content, publish_time, status = 1 } = req.body;
  await query(
    `UPDATE cases SET category_id=?, title=?, summary=?, cover_url=?, content=?, publish_time=?, status=?
     WHERE id=?`,
    [category_id, title, summary, cover_url || '', content, publish_time || new Date(), status, req.params.id]
  );
  return ok(res, null, '更新成功');
});

router.delete('/cases/:id', async (req, res) => {
  await query('DELETE FROM cases WHERE id=?', [req.params.id]);
  return ok(res, null, '删除成功');
});

router.get('/news', async (_req, res) => {
  const rows = await query('SELECT * FROM news ORDER BY publish_time DESC, id DESC');
  return ok(res, rows);
});

router.post('/news', async (req, res) => {
  const { title, summary, cover_url, content, publish_time, status = 1 } = req.body;
  if (!title || !summary || !content) return fail(res, '标题、摘要、正文必填');
  const result = await query(
    'INSERT INTO news (title, summary, cover_url, content, publish_time, status) VALUES (?, ?, ?, ?, ?, ?)',
    [title, summary, cover_url || '', content, publish_time || new Date(), status]
  );
  return ok(res, { id: result.insertId }, '新增成功');
});

router.put('/news/:id', async (req, res) => {
  const { title, summary, cover_url, content, publish_time, status = 1 } = req.body;
  await query(
    'UPDATE news SET title=?, summary=?, cover_url=?, content=?, publish_time=?, status=? WHERE id=?',
    [title, summary, cover_url || '', content, publish_time || new Date(), status, req.params.id]
  );
  return ok(res, null, '更新成功');
});

router.delete('/news/:id', async (req, res) => {
  await query('DELETE FROM news WHERE id=?', [req.params.id]);
  return ok(res, null, '删除成功');
});

router.get('/messages', async (_req, res) => {
  const rows = await query('SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC');
  return ok(res, rows);
});

router.put('/messages/:id/status', async (req, res) => {
  const { status = 1 } = req.body;
  await query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, req.params.id]);
  return ok(res, null, '状态更新成功');
});

router.delete('/messages/:id', async (req, res) => {
  await query('DELETE FROM contact_messages WHERE id=?', [req.params.id]);
  return ok(res, null, '删除成功');
});

export default router;
