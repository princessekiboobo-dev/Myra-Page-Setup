import './_group.css';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, AudioLines, Check, ChevronDown, FolderOpen, Globe2, Menu, MessageCircle, ShieldCheck, Sparkles, X } from 'lucide-react';

const ASSETS = '/__mockup/images/';

const tasks = [
  {
    n: '01',
    icon: FolderOpen,
    title: 'Files, in order.',
    body: 'Find, sort, rename, and organize the files you’ve been meaning to deal with.',
    detail: 'From the downloads folder that got away from you to a handful of files that need a better home.',
    tone: 'peach',
  },
  {
    n: '02',
    icon: Globe2,
    title: 'The useful bits, found.',
    body: 'Ask Myra to look through websites and bring the information together.',
    detail: 'She can gather details from pages using her managed browser, or a paired browser with the right setup.',
    tone: 'pink',
  },
  {
    n: '03',
    icon: MessageCircle,
    title: 'Documents, underway.',
    body: 'Get help with spreadsheets, Word documents, and straightforward presentations.',
    detail: 'Supported tasks in Excel, Word, and basic PowerPoint depend on Office being installed and your setup.',
    tone: 'lilac',
  },
];

function DownloadDialog({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;
      const dialog = closeButtonRef.current?.closest('[role="dialog"]');
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="download-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description" onClick={(event) => event.stopPropagation()}>
        <button ref={closeButtonRef} className="dialog-close" data-testid="button-close-download" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
        <img src={`${ASSETS}character-idle.svg`} alt="" className="dialog-mascot" />
        <p className="eyebrow">A note from Myra</p>
        <h2 id="dialog-title">I’m almost ready.</h2>
        <p id="dialog-description">Myra is getting ready for her first hello. The download isn’t available just yet, but it’s on its way.</p>
        <div className="coming-note"><span className="status-dot" /> Download coming soon</div>
        <button className="button button-dark dialog-ok" data-testid="button-dismiss-download" onClick={onClose}>Got it <ArrowRight size={16} /></button>
      </section>
    </div>
  );
}

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showDownload = () => {
    setDialogOpen(true);
    setMenuOpen(false);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Myra home" data-testid="link-home">
          <img src={`${ASSETS}myra-logo.svg`} alt="" />
          <span>myra<span className="brand-period">.</span></span>
        </a>
        <button className="mobile-menu-button" data-testid="button-toggle-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
          <nav id="main-navigation" className={`header-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#how" data-testid="link-how-myra-helps" onClick={() => setMenuOpen(false)}>How Myra helps</a>
          <a href="#control" data-testid="link-your-say" onClick={() => setMenuOpen(false)}>Your say, always</a>
          <button className="button button-small" data-testid="button-meet-myra-header" onClick={showDownload}>Meet Myra <ArrowRight size={15} /></button>
        </nav>
      </header>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-mark" /> Your Windows work companion</div>
          <h1>Your computer<br />should work <em>for you.</em></h1>
          <p className="hero-description">Myra takes the little computer jobs off your plate—finding files, tidying folders, gathering details from websites, and helping with everyday documents.</p>
          <div className="hero-actions">
            <button className="button button-dark" data-testid="button-meet-myra-hero" onClick={showDownload}>Meet Myra <ArrowRight size={16} /></button>
            <a className="text-link" href="#how" data-testid="link-see-what-she-can-do">See what she can do <ArrowDown size={15} /></a>
          </div>
          <p className="hero-platform"><span className="windows-mark" aria-hidden="true"><i /><i /><i /><i /></span> Made for Windows desktop</p>
        </div>
        <div className="hero-art">
          <div className="hero-art-paper" />
          <div className="hello-note"><span className="status-dot" /> Here with you.</div>
          <img className="hero-mascot" src={`${ASSETS}character-idle.svg`} alt="Myra, a friendly character with glasses and a pink sweater" />
          <div className="hero-caption">You bring the task.<br /><strong>Myra brings the follow-through.</strong></div>
          <div className="orbit-stamp" aria-hidden="true"><span>A LITTLE LESS</span><b>work</b><span>ONE THING AT A TIME</span></div>
          <div className="tiny-spark" aria-hidden="true">✳</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track"><span>Less fiddling</span><i /><span>More doing</span><i /><span>A little less work</span><i /><span>Less fiddling</span><i /><span>More doing</span><i /><span>A little less work</span><i /></div>
      </div>

      <section className="intro section-wrap" id="how">
        <div className="section-kicker"><span>01</span><span>The little jobs add up</span></div>
        <div className="intro-content">
          <h2>All those little<br />“I’ll do it later”<br /><em>things?</em></h2>
          <div className="intro-aside">
            <p>A folder to sort. A detail to find. A spreadsheet to update. Tell Myra what you need, and she’ll help move it along.</p>
            <span className="hand-note">No big production. <span>↙</span></span>
          </div>
        </div>
        <div className="task-grid">
          {tasks.map(({ n, icon: Icon, title, body, detail, tone }) => (
            <article className={`task-card ${tone}`} key={n}>
              <div className="task-top"><span>{n}</span><Icon size={19} strokeWidth={1.65} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
              <details className="task-detail" data-testid={`details-task-${n}`}>
                <summary data-testid={`summary-task-${n}`}>A little more <ChevronDown size={14} /></summary>
                <p>{detail}</p>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="conversation">
        <div className="conversation-inner section-wrap">
          <div className="section-kicker kicker-light"><span>02</span><span>Good company, not a control panel</span></div>
          <div className="conversation-layout">
            <div className="conversation-copy">
              <p className="eyebrow">Talk naturally</p>
              <h2>Just tell her<br />what’s <em>next.</em></h2>
              <p className="conversation-description">Type it or say it out loud. Myra can ask a quick question when she needs your input.</p>
            <div className="input-ways"><span><MessageCircle size={16} /> By typing</span><span className="ways-divider" /><span className="voice-icon"><AudioLines size={17} /></span><span>Or by voice</span></div>
            </div>
            <div className="app-photo-wrap">
              <div className="app-photo-label"><span className="status-dot" /> A peek at Myra</div>
              <div className="app-window"><img src={`${ASSETS}myra-app.png`} alt="Screenshot of Myra’s Windows app, showing her welcome screen and chat input" /></div>
              <p className="app-caption">The real thing, just as it is. <span>Myra’s app view</span></p>
            </div>
          </div>
          <div className="stay-note"><span className="stay-line" /> She can keep close by while you work, ready when another small task comes up.</div>
        </div>
      </section>

      <section className="trust section-wrap" id="control">
        <div className="trust-copy">
          <div className="section-kicker"><span>03</span><span>Still very much your computer</span></div>
          <p className="eyebrow">You stay in control</p>
          <h2>Helpful, not<br /><em>hands-off.</em></h2>
          <p className="trust-body">Myra may ask before a task that needs your approval. She’ll tell you when she needs help, and she checks her work before saying she’s finished.</p>
          <p className="trust-foot"><ShieldCheck size={17} /> Your say stays part of the process.</p>
        </div>
        <div className="trust-visual">
          <div className="trust-orbit orbit-one" /><div className="trust-orbit orbit-two" />
          <div className="approval-card">
            <div className="approval-heading"><span className="approval-icon"><Sparkles size={17} /></span><span>MYRA HAS A QUESTION</span><span className="approval-dots">•••</span></div>
            <p>Should I put these<br />in the project folder?</p>
            <div className="file-chips"><span>brief-final.docx</span><span>notes-march.xlsx</span></div>
            <div className="approval-buttons"><span>Not yet</span><b>Yes, please <Check size={14} /></b></div>
          </div>
          <img className="trust-mascot" src={`${ASSETS}character-idle.svg`} alt="" />
          <span className="trust-note">You’re still<br />the boss.</span>
        </div>
        <p className="fine-print">What Myra can do depends on your installed apps, setup, and permissions. She works with supported tasks—not every app or every task automatically.</p>
      </section>

      <section className="closing">
        <div className="closing-inner">
          <img src={`${ASSETS}character-idle.svg`} alt="" className="closing-mascot" />
          <p className="eyebrow">A little less work</p>
          <h2>Give the busywork<br />to <em>Myra.</em></h2>
          <p>Make a little more room for the work you actually want to do.</p>
          <button className="button button-light" data-testid="button-meet-myra-footer" onClick={showDownload}>Meet Myra <ArrowRight size={16} /></button>
          <span className="closing-small">For Windows. Coming soon.</span>
        </div>
        <span className="closing-doodle doodle-left" aria-hidden="true">+</span>
        <span className="closing-doodle doodle-right" aria-hidden="true">+</span>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-home"><img src={`${ASSETS}myra-logo.svg`} alt="" /><span>myra<span className="brand-period">.</span></span></a>
        <span className="footer-tagline">A little less work.</span>
        <span className="footer-credit">Made by Utterance</span>
        <a className="back-top" href="#top" data-testid="link-back-to-top">Back to top ↑</a>
      </footer>

      {dialogOpen && <DownloadDialog onClose={() => setDialogOpen(false)} />}
    </main>
  );
}

export default App;
