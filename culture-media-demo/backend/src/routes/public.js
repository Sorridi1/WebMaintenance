import express from 'express';
import { query } from '../db.js';
import { fail, ok } from '../utils/response.js';

const router = express.Router();

router.get('/services', async (_req, res) => {
  const rows = await query(
    'SELECT id, title, summary, description, icon, sort_order FROM services WHERE status = 1 ORDER BY sort_order ASC, id DESC'
  );
  return ok(res, rows);
});

router.get('/cases', async (req, res) => {
  const { categoryId } = req.query;
  const params = [];
  let sql = `
    SELECT c.id, c.title, c.summary, c.cover_url, c.publish_time, cc.id as category_id, cc.name as category_name
    FROM cases c
    LEFT JOIN case_categories cc ON c.category_id = cc.id
    WHERE c.status = 1
  `;

  if (categoryId) {
    sql += ' AND c.category_id = ?';
    params.push(categoryId);
  }

  sql += ' ORDER BY c.publish_time DESC, c.id DESC';
  const rows = await query(sql, params);

  const categories = await query(
    'SELECT id, name FROM case_categories WHERE status = 1 ORDER BY sort_order ASC, id ASC'
  );

  return ok(res, { list: rows, categories });
});

router.get('/cases/:id', async (req, res) => {
  const rows = await query(
    `SELECT c.*, cc.name AS category_name
     FROM cases c
     LEFT JOIN case_categories cc ON c.category_id = cc.id
     WHERE c.id = ? AND c.status = 1`,
    [req.params.id]
  );

  if (!rows.length) {
    return fail(res, '案例不存在', 40401, 404);
  }
  return ok(res, rows[0]);
});

router.get('/news', async (_req, res) => {
  const rows = await query(
    'SELECT id, title, summary, cover_url, publish_time FROM news WHERE status = 1 ORDER BY publish_time DESC, id DESC'
  );
  return ok(res, rows);
});

router.get('/news/:id', async (req, res) => {
  const rows = await query('SELECT * FROM news WHERE id = ? AND status = 1', [req.params.id]);
  if (!rows.length) {
    return fail(res, '新闻不存在', 40402, 404);
  }
  return ok(res, rows[0]);
});

router.post('/messages', async (req, res) => {
  const { name, phone, content } = req.body;
  if (!name || !phone || !content) {
    return fail(res, '姓名、电话、咨询内容必填');
  }
  if (!/^1\d{10}$/.test(phone)) {
    return fail(res, '手机号格式不正确');
  }

  const result = await query(
    'INSERT INTO contact_messages (name, phone, content, status) VALUES (?, ?, ?, 0)',
    [name, phone, content]
  );

  return ok(res, { id: result.insertId }, '提交成功，我们会尽快与您联系');
});

export default router;
