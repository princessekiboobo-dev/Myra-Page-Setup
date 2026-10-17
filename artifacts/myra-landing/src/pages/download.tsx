const DOWNLOAD_URL = 'https://github.com/princessekiboobo-dev/myra-releases/releases/download/v0.1.1/Myra.Private.Setup.0.1.1.exe';

export default function DownloadPage() {
  return <main className="admin-shell"><section className="admin-card"><p className="eyebrow">Myra for Windows</p><h1>Your download is ready</h1><p>Click below to download the Myra installer.</p><a className="button button-dark" href={DOWNLOAD_URL}>Download Myra</a><p><a className="text-link" href="/">Back to Myra</a></p></section></main>;
}
