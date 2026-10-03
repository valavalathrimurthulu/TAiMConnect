import { Sparkles, Code2 } from 'lucide-react';

export default function WelcomeBanner() {
  return (
    <section className="welcome-banner">
      <div className="welcome-copy">
        <span className="welcome-tag">
          <Sparkles size={14} />
          Learning progress
        </span>
        <h1>Welcome back, thrimurthulu! 👋</h1>
        <p>Keep learning, keep building your future with TAiM.</p>
      </div>

      <div className="banner-illustration" aria-hidden="true">
        <div className="monitor-card">
          <div className="window-bar" />
          <div className="code-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="floating-badge">
          <Code2 size={16} />
          <span>Build</span>
        </div>
      </div>
    </section>
  );
}
