import { FormEvent, useEffect, useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [codes, setCodes] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadCodes = async () => { const response = await fetch('/api/admin/codes'); if (response.ok) { setAuthenticated(true); setCodes((await response.json()).codes); } };
  useEffect(() => { void loadCodes(); }, []);
  const login = async (event: FormEvent) => { event.preventDefault(); const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); if (!response.ok) return setMessage('Incorrect password.'); setPassword(''); setMessage(''); setAuthenticated(true); void loadCodes(); };
  const createCode = async (event: FormEvent) => { event.preventDefault(); const response = await fetch('/api/admin/codes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) }); const result = await response.json(); if (!response.ok) return setMessage(result.error); setCode(''); setMessage('Code created.'); void loadCodes(); };

  if (!authenticated) return <main className="admin-shell"><form className="admin-card" onSubmit={login}><p className="eyebrow">Myra admin</p><h1>Manage download access</h1><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label><button className="button button-dark" type="submit">Open admin</button>{message && <p role="alert">{message}</p>}</form></main>;
  return <main className="admin-shell"><section className="admin-card"><p className="eyebrow">Myra admin</p><h1>Download codes</h1><form className="admin-create" onSubmit={createCode}><label className="sr-only" htmlFor="new-code">New code</label><input id="new-code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="e.g. MYRA-FRIEND-01" required /><button className="button button-dark" type="submit">Create code</button></form>{message && <p role="status">{message}</p>}<ul className="admin-code-list">{codes.map((item) => <li key={item.id}><code>{item.code}</code><span>{item.redeemed_at ? 'Used' : 'Available'}</span></li>)}</ul></section></main>;
}
