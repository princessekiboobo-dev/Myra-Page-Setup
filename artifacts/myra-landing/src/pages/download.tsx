import { FormEvent, useState } from 'react';
import { useLocation } from 'wouter';

export default function DownloadPage() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); const response = await fetch('/api/redeem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) }); const result = await response.json(); if (!response.ok) return setError(result.error); window.location.href = result.downloadUrl; };
  return <main className="admin-shell"><form className="admin-card" onSubmit={submit}><p className="eyebrow">Myra for Windows</p><h1>Enter your download code</h1><p>Your code unlocks one download for the Myra installer.</p><label>Download code<input value={code} onChange={(event) => setCode(event.target.value)} autoComplete="off" required /></label><button className="button button-dark" type="submit">Unlock download</button>{error && <p role="alert">{error}</p>}<button className="text-link" type="button" onClick={() => setLocation('/')}>Back to Myra</button></form></main>;
}
