import { json, setAdminCookie } from '../_myra';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!process.env.MYRA_ADMIN_PASSWORD || req.body?.password !== process.env.MYRA_ADMIN_PASSWORD) return json(res, 401, { error: 'Invalid password' });
  setAdminCookie(res);
  return json(res, 200, { ok: true });
}
