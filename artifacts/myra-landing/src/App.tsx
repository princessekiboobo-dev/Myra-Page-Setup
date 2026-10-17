import { useState } from 'react';
import { ArrowDown, ArrowRight, AudioLines, Check, ChevronDown, FolderOpen, Globe2, Menu, MessageCircle, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useLocation } from 'wouter';
import ThanksPage from '@/pages/thanks';

const ASSETS = '/assets/';
const DOWNLOAD_URL = 'https://github.com/princessekiboobo-dev/myra-releases/releases/download/v0.1.1/Myra.Private.Setup.0.1.1.exe';

const tasks = [
  {
    n: '01',
    icon: FolderOpen,
    title: 'Make room to think.',
    body: 'Find, sort, rename, and organize the files that keep pulling your attention away.',
    detail: 'From a crowded downloads folder to a small batch of files that need a better home, Myra can help bring order to everyday file tasks.',
    tone: 'peach',
  },
  {
    n: '02',
    icon: Globe2,
    title: 'Bring the details together.',
    body: 'Ask Myra to gather useful information from websites, without losing your place in the work.',
    detail: 'She can gather details from pages using her managed browser, or a paired browser with the right setup.',
    tone: 'pink',
  },
  {
    n: '03',
    icon: MessageCircle,
    title: 'Get documents moving.',
    body: 'Get help with supported everyday tasks in spreadsheets, Word documents, and straightforward presentations.',
    detail: 'Supported tasks in Excel, Word, and basic PowerPoint depend on Office being installed and your setup.',
    tone: 'lilac',
  },
];

const compatibilityTools = [
  'Windows',
  'Word',
  'Excel',
  'PowerPoint',
  'Chrome',
] as const;

function CompatibilityLogo({ name }: { name: (typeof compatibilityTools)[number] }) {
  if (name === 'Windows') {
    return (
      <svg className="compatibility-icon" viewBox="0 0 448 512" aria-hidden="true" focusable="false">
        <path fill="#0078D4" d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
      </svg>
    );
  }

  if (name === 'Chrome') {
    return (
      <svg className="compatibility-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#EA4335" d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0z" />
        <path fill="#34A853" d="M1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z" />
        <path fill="#FBBC04" d="M15.273 7.636a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364z" />
        <path fill="#4285F4" d="M12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
      </svg>
    );
  }

  if (name === 'Word') {
    return (
      <svg className="compatibility-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <path fill="#41A5EE" d="M5 7.5 21 4v32l-16-3.5z" />
        <path fill="#2B7CD3" d="M19 8h17v24H19z" />
        <path fill="#185ABD" d="M12 11h10v18H12z" />
        <path fill="#fff" d="m9.6 15.1 2.3.2 1.5 7.1 1.8-6.8 2.1.2 1.8 7.1 1.6-6.8 2.2.2-2.8 10.6-2.1-.2-1.8-6.8-1.8 6.4-2.2-.2z" />
      </svg>
    );
  }

  if (name === 'Excel') {
    return (
      <svg className="compatibility-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <path fill="#33C481" d="M5 7.5 21 4v32l-16-3.5z" />
        <path fill="#21A366" d="M19 8h17v24H19z" />
        <path fill="#107C41" d="M12 11h10v18H12z" />
        <path fill="#fff" d="m13.4 15.2 2.4-.1 2.1 3.6 2.2-3.9 2.5-.1-3.4 5.4 3.5 5.5-2.5-.1-2.3-3.8-2.2 3.6-2.5-.1 3.4-5.3z" />
      </svg>
    );
  }

  return (
    <svg className="compatibility-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="23" cy="20" r="15" fill="#ED6C47" />
      <path fill="#FF8F6B" d="M21 7h15v26H21z" />
      <path fill="#D35230" d="M4 10h20v20H4z" />
      <path fill="#fff" d="M10 15h5.2c3.2 0 5.1 1.6 5.1 4.5s-1.9 4.6-5.1 4.6h-2v4H10zm5 6.7c1.4 0 2.1-.7 2.1-2.1s-.7-2.1-2.1-2.1h-1.8v4.2z" />
    </svg>
  );
}

function CompatibilityLogoGroup({ decorative = false }: { decorative?: boolean }) {
  return (
    <div
      className="compatibility-group"
      role={decorative ? undefined : 'list'}
      aria-label={decorative ? undefined : 'Windows, Word, Excel, PowerPoint, and Chrome'}
      aria-hidden={decorative ? true : undefined}
    >
      {compatibilityTools.map((name) => (
        <div className="compatibility-item" role={decorative ? undefined : 'listitem'} key={name}>
          <CompatibilityLogo name={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

function LiquidGlass() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const startDownload = () => {
    setMenuOpen(false);
    setLocation('/thanks');
  };

  if (location === '/thanks') {
    return <ThanksPage downloadUrl={DOWNLOAD_URL} />;
  }

  return (
    <main className="myra-glass">
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
          <a href="#pricing" data-testid="link-pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a className="button button-small" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" data-testid="link-download-header" aria-label="Download Myra for Windows, version 0.1.1" onClick={startDownload}>Download Myra <ArrowRight size={15} /></a>
        </nav>
      </header>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-mark" /> Your Windows work companion</div>
          <h1>Your computer<br />should work<br /><em>for you.</em></h1>
          <p className="hero-description">With Myra, your computer can help organize files, gather useful details from websites, and move supported Office tasks forward. You stay in control—and keep your focus on the work only you can do.</p>
          <div className="hero-actions">
            <a className="button button-dark" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" data-testid="link-download-hero" aria-label="Download Myra for Windows, version 0.1.1" onClick={startDownload}>Download Myra <ArrowRight size={16} /></a>
            <a className="text-link" href="#how" data-testid="link-see-what-she-can-do">See how she helps <ArrowDown size={15} /></a>
          </div>
          <p className="hero-platform"><span className="windows-mark" aria-hidden="true"><i /><i /><i /><i /></span> Available for Windows · v0.1.1</p>
        </div>
        <div className="hero-art">
          <div className="hero-art-paper" />
          <div className="hello-note"><span className="status-dot" /> Here with you.</div>
          <img className="hero-mascot" src={`${ASSETS}character-idle.svg`} alt="Myra, a friendly character with glasses and a pink sweater" />
          <div className="hero-caption">You bring the task.<br /><strong>Myra helps carry it forward.</strong></div>
          <div className="orbit-stamp" aria-hidden="true"><span>YOUR COMPUTER</span><b>on your side</b><span>READY WHEN YOU ARE</span></div>
          <span className="tiny-spark" aria-hidden="true" />
        </div>
      </section>

      <section className="compatibility-strip" aria-labelledby="compatibility-title">
        <div className="compatibility-inner section-wrap">
          <div className="compatibility-copy">
            <h2 className="compatibility-title" id="compatibility-title">Made for your Windows workflow</h2>
            <p className="compatibility-note">Chrome browsing and supported Office tasks depend on your setup.</p>
          </div>
          <div className="compatibility-marquee" aria-label="Compatible apps">
            <div className="compatibility-track">
              <CompatibilityLogoGroup />
              <CompatibilityLogoGroup decorative />
            </div>
          </div>
        </div>
      </section>

      <section className="intro section-wrap" id="how">
        <div className="section-kicker"><span>01</span><span>The little jobs add up</span></div>
        <div className="intro-content">
          <h2>Get back to<br />the work that<br /><em>needs you.</em></h2>
          <div className="intro-aside">
            <p>A folder to sort. A detail to find. A spreadsheet to update. Tell Myra what you need, and she can help move supported tasks along.</p>
            <span className="hand-note">One thing at a time. <span aria-hidden="true">↙</span></span>
          </div>
        </div>
        <div className="task-grid">
          {tasks.map(({ n, icon: Icon, title, body, detail, tone }) => (
            <article className={`task-card ${tone}`} key={n}>
              <div className="task-top"><span>{n}</span><Icon size={19} strokeWidth={1.65} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
              <details className="task-detail" data-testid={`details-task-${n}`}>
                <summary data-testid={`summary-task-${n}`}>What that can look like <ChevronDown size={14} /></summary>
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
              <h2>Keep your<br />day in <em>motion.</em></h2>
              <p className="conversation-description">Type it or say it out loud. Myra can ask a quick question when she needs your input, then help with the next supported step.</p>
              <div className="input-ways"><span><MessageCircle size={16} /> By typing</span><span className="ways-divider" /><span className="voice-icon"><AudioLines size={17} /></span><span>Or by voice</span></div>
            </div>
            <div className="app-photo-wrap">
              <div className="app-photo-label"><span className="status-dot" /> A peek at Myra</div>
              <div className="app-window"><img src={`${ASSETS}myra-app.png`} alt="Screenshot of Myra’s Windows app, showing her welcome screen and chat input" /></div>
              <p className="app-caption">The real thing, just as it is. <span>Myra’s app view</span></p>
            </div>
          </div>
          <div className="stay-note"><span className="stay-line" /> A familiar place to ask for help when another small task comes up.</div>
        </div>
      </section>

      <section className="trust section-wrap" id="control">
        <div className="trust-copy">
          <div className="section-kicker"><span>03</span><span>Still very much your computer</span></div>
          <p className="eyebrow">You stay in control</p>
          <h2>Helpful, not<br /><em>hands-off.</em></h2>
          <p className="trust-body">Myra may ask before a task that needs your approval. She’ll tell you when she needs help, and checks her work before saying she’s finished.</p>
          <p className="trust-foot"><ShieldCheck size={17} /> Your say stays part of the process.</p>
        </div>
        <div className="trust-visual">
          <div className="trust-orbit orbit-one" /><div className="trust-orbit orbit-two" />
          <div className="approval-card">
            <div className="approval-heading"><span className="approval-icon"><Sparkles size={17} /></span><span>MYRA HAS A QUESTION</span><span className="approval-dots" aria-hidden="true">•••</span></div>
            <p>Should I put these<br />in the project folder?</p>
            <div className="file-chips"><span>brief-final.docx</span><span>notes-march.xlsx</span></div>
            <div className="approval-buttons"><span>Not yet</span><b>Yes, please <Check size={14} /></b></div>
          </div>
          <img className="trust-mascot" src={`${ASSETS}character-idle.svg`} alt="" />
          <span className="trust-note">You’re still<br />the boss.</span>
        </div>
        <p className="fine-print">What Myra can do depends on your installed apps, setup, and permissions. She works with supported everyday tasks—not every app or every task automatically.</p>
      </section>

      <section className="pricing section-wrap" id="pricing" aria-labelledby="pricing-title">
        <div className="section-kicker"><span>04</span><span>Simple, human pricing</span></div>
        <div className="pricing-heading">
          <div>
            <p className="eyebrow">Try Myra for three days</p>
            <h2 id="pricing-title">More room for<br /><em>good work.</em></h2>
          </div>
          <p className="pricing-intro">Start with a 3-day free trial, then keep Myra by your side for $9/month. Cancel anytime before your next billing date.</p>
        </div>
        <div className="pricing-card">
          <div className="pricing-card-copy">
            <span className="pricing-badge">Myra membership</span>
            <h3>$9 <small>/ month</small></h3>
            <p>Everything you need to make everyday computer work feel lighter.</p>
          </div>
          <ul className="pricing-list">
            <li><Check size={16} /> 3 days free to try</li>
            <li><Check size={16} /> File, web, and supported Office help</li>
            <li><Check size={16} /> You approve important actions</li>
          </ul>
          <a className="button button-dark" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" data-testid="link-start-trial" onClick={startDownload}>Start free trial <ArrowRight size={16} /></a>
        </div>
        <p className="pricing-note">No charge during your trial. Subscription terms apply after the trial ends.</p>
      </section>

      <section className="legal section-wrap" aria-labelledby="legal-title">
        <div className="section-kicker"><span>05</span><span>Good to know</span></div>
        <div className="legal-heading">
          <h2 id="legal-title">Clear words.<br /><em>No fine-print fog.</em></h2>
          <p>Here is the short version of the policies that keep Myra straightforward to use.</p>
        </div>
        <div className="legal-grid">
          <article id="terms" className="legal-card"><span>Terms of service</span><h3>Use Myra thoughtfully.</h3><p>Myra is a Windows work companion. You are responsible for the instructions you give her, the apps and files you connect, and reviewing results before relying on them.</p><a href="#terms">Read the terms <ArrowRight size={14} /></a></article>
          <article id="privacy" className="legal-card"><span>Privacy notice</span><h3>Your work stays yours.</h3><p>Myra uses the information needed to provide the service, improve reliability, and support your account. We do not sell your personal information.</p><a href="#privacy">Read the privacy notice <ArrowRight size={14} /></a></article>
          <article id="refunds" className="legal-card"><span>Refund policy</span><h3>Fair when plans change.</h3><p>Cancel before your next renewal to avoid another charge. If you were charged unexpectedly, contact support and we will review the situation with you.</p><a href="#refunds">Read the refund policy <ArrowRight size={14} /></a></article>
        </div>
      </section>

      <section className="closing">
        <div className="closing-inner">
          <img src={`${ASSETS}character-idle.svg`} alt="" className="closing-mascot" />
          <p className="eyebrow">A little more room for what matters</p>
          <h2>Let the little things<br />move along with <em>Myra.</em></h2>
          <p>Make space for the work you want to give your attention to.</p>
          <a className="button button-light" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" data-testid="link-download-footer" aria-label="Download Myra for Windows, version 0.1.1" onClick={startDownload}>Download Myra <ArrowRight size={16} /></a>
          <span className="closing-small">Windows app · version 0.1.1</span>
        </div>
        <span className="closing-doodle doodle-left" aria-hidden="true">+</span>
        <span className="closing-doodle doodle-right" aria-hidden="true">+</span>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-home"><img src={`${ASSETS}myra-logo.svg`} alt="" /><span>myra<span className="brand-period">.</span></span></a>
        <span className="footer-tagline">A little more room for good work.</span>
        <nav className="footer-policies" aria-label="Legal policies">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#refunds">Refunds</a>
        </nav>
        <span className="footer-credit">Made by Utterance</span>
        <a className="back-top" href="#top" data-testid="link-back-to-top">Back to top ↑</a>
      </footer>

    </main>
  );
}

export default LiquidGlass;
