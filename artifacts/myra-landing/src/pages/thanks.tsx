import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Download, Share2, Sparkles } from 'lucide-react';

type ThanksPageProps = {
  downloadUrl: string;
};

export default function ThanksPage({ downloadUrl }: ThanksPageProps) {
  const [shareMessage, setShareMessage] = useState('');
  const homeUrl = import.meta.env.BASE_URL;
  const shareUrl = new URL(homeUrl, window.location.origin).toString();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Thanks for giving Myra a try | Myra';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = shareUrl;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('Clipboard copy was not available');
      }
      setShareMessage('Link copied. Send a friend a little more room for good work.');
    } catch {
      setShareMessage('Copying is unavailable here. You can still share the Myra link from your browser.');
    }
  };

  const shareMyra = async () => {
    if (typeof navigator.share !== 'function') {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title: 'Myra — your computer should work for you',
        text: 'Meet Myra, a Windows work companion for the small computer tasks that get in the way.',
        url: shareUrl,
      });
      setShareMessage('Thanks for passing Myra along. Good ideas travel.');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      await copyLink();
    }
  };

  return (
    <main className="myra-glass thanks-page">
      <header className="site-header thanks-header">
        <a className="brand" href={homeUrl} aria-label="Myra home">
          <img src="/assets/myra-logo.svg" alt="" />
          <span>myra<span className="brand-period">.</span></span>
        </a>
        <a className="thanks-home-link" href={homeUrl}>Back to Myra <ArrowLeft size={15} /></a>
      </header>

      <div className="thanks-layout section-wrap">
        <section className="thanks-copy" aria-labelledby="thanks-title">
          <div className="thanks-status"><span className="status-dot" /> Download should be starting</div>
          <p className="eyebrow">Your computer, on your side</p>
          <h1 className="thanks-title" id="thanks-title">Your computer’s about to work for <em>you.</em></h1>
          <p className="thanks-lede">
            Thanks for giving Myra a try. The installer should be opening in a new tab.
            Know someone buried in little tasks? Send a little help their way.
          </p>

          <div className="thanks-share-card">
            <div className="thanks-share-icon"><Share2 size={18} /></div>
            <div>
              <p className="thanks-share-kicker">PASS THE GOOD ON</p>
              <h2>Be the friend with the helpful download.</h2>
              <p>One less tiny task can make a surprisingly good day.</p>
            </div>
            <div className="thanks-share-actions">
              <button className="button button-dark" type="button" onClick={shareMyra}>
                <Share2 size={16} /> Share Myra
              </button>
              <button className="thanks-copy-button" type="button" onClick={copyLink}>
                {shareMessage.startsWith('Link copied') ? <Check size={15} /> : <Copy size={15} />}
                {shareMessage.startsWith('Link copied') ? 'Copied' : 'Copy link'}
              </button>
            </div>
            <p className="thanks-share-feedback" aria-live="polite">{shareMessage}</p>
          </div>

          <a className="thanks-back-link" href={homeUrl}><ArrowLeft size={15} /> Take another look at Myra</a>
        </section>

        <aside className="thanks-side" aria-label="Getting started with Myra">
          <div className="thanks-art">
            <div className="thanks-art-glow" />
            <img src="/assets/character-idle.svg" alt="Myra, ready to help with your next task" />
            <div className="thanks-art-note"><span className="status-dot" /> Here when you need me.</div>
            <span className="thanks-spark thanks-spark-one" aria-hidden="true">✦</span>
            <span className="thanks-spark thanks-spark-two" aria-hidden="true">✧</span>
          </div>

          <div className="thanks-install-card">
            <div className="thanks-install-heading"><Sparkles size={17} /><h2>Your first little win</h2></div>
            <p>Once the installer is ready, you’re just a few steps from getting started.</p>
            <ol>
              <li><span>1</span><div><strong>Open your Downloads folder</strong><small>Look for Myra.Private.Setup.0.1.1.exe</small></div></li>
              <li><span>2</span><div><strong>Run the installer</strong><small>Follow the prompts on your screen.</small></div></li>
              <li><span>3</span><div><strong>Start with one small task</strong><small>Let Myra help move it along.</small></div></li>
            </ol>
            <p className="thanks-retry">
              Didn’t start? <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Try the download again <Download size={14} /></a>
            </p>
          </div>
        </aside>
      </div>

      <footer className="thanks-footer">
        <span>myra<span className="brand-period">.</span></span>
        <span>A little more room for good work.</span>
      </footer>
    </main>
  );
}
