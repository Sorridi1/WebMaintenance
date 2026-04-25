import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fail } from '../utils/response.js';

dotenv.config();

export function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) {
    return fail(res, '未登录或登录已过期', 40101, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return fail(res, 'Token 无效，请重新登录', 40102, 401);
  }
}
