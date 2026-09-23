import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <main className="page-frame">
      <nav className="topbar">
        <a className="brand" href="/" aria-label="Lumen home"><span className="brand-symbol">L</span><span>LUMEN</span></a>
        <div className="topbar-meta"><span>AI HACKATHON DEMO</span><span className="meta-divider" /><span>BUILD / THINK / SHIP</span></div>
      </nav>
      <div className="content-grid">
        <aside className="intro-panel">
          <p className="eyebrow">THE IDEA ROOM</p>
          <h1>Think<br /><span>forward.</span></h1>
          <p className="intro-copy">A small, clear space for turning an unfinished thought into something you can act on.</p>
          <div className="intro-footer"><span>01</span><span>AI-ASSISTED IDEATION</span></div>
        </aside>
        <ChatWindow />
      </div>
      <footer className="page-footer"><span>POWERED BY A REPLACEABLE LLM PROVIDER</span><span>EST. 2026</span></footer>
    </main>
  );
}
