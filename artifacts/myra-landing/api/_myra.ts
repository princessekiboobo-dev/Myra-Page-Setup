/// <reference types="node" />

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const cookieName = 'myra_admin_session';

function sign(value: string) {
  return Buffer.from(`${value}.${process.env.MYRA_ADMIN_SESSION_SECRET}`).toString('base64url');
}

export function isAdmin(req: any) {
  const token = req.headers.cookie?.split(';').map((part: string) => part.trim()).find((part: string) => part.startsWith(`${cookieName}=`))?.split('=')[1];
  return Boolean(token && token === sign('admin'));
}

export function setAdminCookie(res: any) {
  res.setHeader('Set-Cookie', `${cookieName}=${sign('admin')}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`);
}

export function json(res: any, status: number, body: unknown) {
  res.status(status).json(body);
}

export { pool };
