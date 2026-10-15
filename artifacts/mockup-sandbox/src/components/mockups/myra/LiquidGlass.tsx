import './_group.css';
import './LiquidGlass.css';
import { useState } from 'react';
import { ArrowDown, ArrowRight, AudioLines, Check, ChevronDown, FolderOpen, Globe2, Menu, MessageCircle, ShieldCheck, Sparkles, X } from 'lucide-react';

const ASSETS = '/__mockup/images/';
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

function LiquidGlass() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a className="button button-small" href={DOWNLOAD_URL} data-testid="link-download-header" aria-label="Download Myra for Windows, version 0.1.1" onClick={() => setMenuOpen(false)}>Download Myra <ArrowRight size={15} /></a>
        </nav>
      </header>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-mark" /> Your Windows work companion</div>
          <h1>Your computer<br />should work<br /><em>for you.</em></h1>
          <p className="hero-description">With Myra, your computer can help organize files, gather useful details from websites, and move supported Office tasks forward. You stay in control—and keep your focus on the work only you can do.</p>
          <div className="hero-actions">
            <a className="button button-dark" href={DOWNLOAD_URL} data-testid="link-download-hero" aria-label="Download Myra for Windows, version 0.1.1">Download Myra <ArrowRight size={16} /></a>
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

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track"><span>Your computer, on your side</span><i /><span>You stay in control</span><i /><span>Made to work with you</span><i /><span>Your computer, on your side</span><i /><span>You stay in control</span><i /><span>Made to work with you</span><i /></div>
      </div>

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

      <section className="closing">
        <div className="closing-inner">
          <img src={`${ASSETS}character-idle.svg`} alt="" className="closing-mascot" />
          <p className="eyebrow">A little more room for what matters</p>
          <h2>Let the little things<br />move along with <em>Myra.</em></h2>
          <p>Make space for the work you want to give your attention to.</p>
          <a className="button button-light" href={DOWNLOAD_URL} data-testid="link-download-footer" aria-label="Download Myra for Windows, version 0.1.1">Download Myra <ArrowRight size={16} /></a>
          <span className="closing-small">Windows app · version 0.1.1</span>
        </div>
        <span className="closing-doodle doodle-left" aria-hidden="true">+</span>
        <span className="closing-doodle doodle-right" aria-hidden="true">+</span>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" data-testid="link-footer-home"><img src={`${ASSETS}myra-logo.svg`} alt="" /><span>myra<span className="brand-period">.</span></span></a>
        <span className="footer-tagline">A little more room for good work.</span>
        <span className="footer-credit">Made by Utterance</span>
        <a className="back-top" href="#top" data-testid="link-back-to-top">Back to top ↑</a>
      </footer>

    </main>
  );
}

export default LiquidGlass;
