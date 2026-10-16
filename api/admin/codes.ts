import { isAdmin, json, pool } from '../_myra';

export default async function handler(req: any, res: any) {
  if (!isAdmin(req)) return json(res, 401, { error: 'Unauthorized' });
  if (req.method === 'GET') {
    const result = await pool.query('SELECT id, code, created_at, redeemed_at FROM myra_download_codes ORDER BY id DESC');
    return json(res, 200, { codes: result.rows });
  }
  if (req.method === 'POST') {
    const code = String(req.body?.code || '').trim();
    if (!/^[A-Za-z0-9_-]{6,80}$/.test(code)) return json(res, 400, { error: 'Use 6–80 letters, numbers, hyphens, or underscores.' });
    try {
      const result = await pool.query('INSERT INTO myra_download_codes (code) VALUES ($1) RETURNING id, code, created_at, redeemed_at', [code]);
      return json(res, 201, { code: result.rows[0] });
    } catch (error: any) {
      if (error.code === '23505') return json(res, 409, { error: 'That code already exists.' });
      return json(res, 500, { error: 'Could not create code.' });
    }
  }
  return json(res, 405, { error: 'Method not allowed' });
}
