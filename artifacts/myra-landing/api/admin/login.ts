import { json, setAdminCookie } from '../_myra';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
  const submittedPassword = typeof body?.password === 'string' ? body.password : '';
  const configuredPassword = process.env.MYRA_ADMIN_PASSWORD?.trim();

  if (!configuredPassword || submittedPassword !== configuredPassword) {
    return json(res, 401, { error: 'Invalid password' });
  }

  setAdminCookie(res);
  return json(res, 200, { ok: true });
}
