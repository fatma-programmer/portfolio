import React from 'react';
import './About.css';

const chips = ['React.js','Next.js','TypeScript','Tailwind','Node.js','Figma','Animations','Performance'];

export default function About() {
  return (
    <section id="about">
      <div className="s-tag">who I am</div>
      <h2 className="s-title">About <span>Me</span></h2>
      <div className="aline" />
      <div className="about-wrap">
        <div className="avatar-frame">
          <div className="avatar-bg">👩‍💻</div>
          <div className="ac tl" /><div className="ac tr" />
          <div className="ac bl" /><div className="ac br" />
        </div>
        <div className="about-text">
          <p>Hi! I'm <strong>Fatma Ahmed</strong>, a passionate full-stack Developer from Egypt who loves turning complex problems into elegant, immersive digital experiences.</p>
          <p>With 3+ years building production-grade web apps, I'm obsessed with performance, animation, and UI that makes users go "wow".</p>
          <p>Let's build something extraordinary together.</p>
          <div className="chips">
            {chips.map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <a href="./fatmaahmed(3).pdf" download="Fatma_Ahmed_CV.pdf" style={{ textDecoration: 'none' }}>
              <button className="big-btn btn-outline-big">Download CV ↓</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
