import { json, pool } from './_myra';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  const code = String(req.body?.code || '').trim();
  if (!code) return json(res, 400, { error: 'Enter a download code.' });
  const result = await pool.query('UPDATE myra_download_codes SET redeemed_at = NOW(), redeemed_ip = $1 WHERE code = $2 AND redeemed_at IS NULL RETURNING code', [req.headers['x-forwarded-for'] || req.socket?.remoteAddress || null, code]);
  if (!result.rowCount) return json(res, 403, { error: 'Invalid or already-used code.' });
  return json(res, 200, { ok: true, downloadUrl: 'https://github.com/princessekiboobo-dev/myra-releases/releases/download/v0.1.1/Myra.Private.Setup.0.1.1.exe' });
}
