import React, { useEffect, useRef } from 'react';
import './Skills.css';

const skillsData = [
  { name: 'JavaScript', icon: '⚡', level: 80,  grad: 'linear-gradient(135deg,rgba(240,219,79,0.1),rgba(240,160,0,0.08))', glow: 'rgba(240,200,0,0.15)',  bar: 'linear-gradient(90deg,#f0db4f,#e8a000)', iconBg: 'rgba(240,219,79,0.12)' },
  { name: 'React.js',   icon: '⚛', level: 88,  grad: 'linear-gradient(135deg,rgba(97,218,251,0.1),rgba(0,180,255,0.08))', glow: 'rgba(97,218,251,0.18)',  bar: 'linear-gradient(90deg,#61dafb,#0090cc)',  iconBg: 'rgba(97,218,251,0.12)' },
  { name: 'Node.js',    icon: '🌿', level: 80,  grad: 'linear-gradient(135deg,rgba(200,200,200,0.08),rgba(150,150,150,0.05))', glow: 'rgba(200,200,200,0.12)', bar: 'linear-gradient(90deg,#fff,#aaa)', iconBg: 'rgba(180,180,180,0.08)' },
  { name: 'HTML & CSS', icon: '🎨', level: 96,  grad: 'linear-gradient(135deg,rgba(255,100,40,0.1),rgba(255,60,0,0.07))',   glow: 'rgba(255,80,30,0.18)',   bar: 'linear-gradient(90deg,#ff6428,#e63000)',  iconBg: 'rgba(241,101,41,0.12)' },
  { name: 'Tailwind',   icon: '💧', level: 85,  grad: 'linear-gradient(135deg,rgba(56,189,248,0.1),rgba(14,165,233,0.08))', glow: 'rgba(56,189,248,0.18)',  bar: 'linear-gradient(90deg,#38bdf8,#0ea5e9)',  iconBg: 'rgba(56,189,248,0.1)' },
  { name: 'Bootstrap',  icon: '🔷', level: 90,  grad: 'linear-gradient(135deg,rgba(49,120,198,0.12),rgba(0,90,180,0.08))', glow: 'rgba(49,120,198,0.2)',   bar: 'linear-gradient(90deg,#3178c6,#0050b0)',  iconBg: 'rgba(49,120,198,0.12)' },
  { name: 'PHP',        icon: '🐘', level: 90,  grad: 'linear-gradient(135deg,rgba(255,149,0,0.1),rgba(255,100,0,0.07))',  glow: 'rgba(255,149,0,0.18)',   bar: 'linear-gradient(90deg,#ff9500,#ff5500)',  iconBg: 'rgba(255,149,0,0.1)' },
  { name: 'Laravel',    icon: '🚀', level: 82,  grad: 'linear-gradient(135deg,rgba(123,47,255,0.12),rgba(80,0,255,0.08))', glow: 'rgba(123,47,255,0.2)',   bar: 'linear-gradient(90deg,#7b2fff,#5000ff)',  iconBg: 'rgba(68,76,247,0.1)' },
  { name: 'SQL',        icon: '🗄️', level: 82,  grad: 'linear-gradient(135deg,rgba(123,47,255,0.12),rgba(80,0,255,0.08))', glow: 'rgba(123,47,255,0.2)',   bar: 'linear-gradient(90deg,#7b2fff,#5000ff)',  iconBg: 'rgba(68,76,247,0.1)' },
  { name: 'Python',     icon: '🐍', level: 90,  grad: 'linear-gradient(135deg,rgba(123,47,255,0.12),rgba(80,0,255,0.08))', glow: 'rgba(123,47,255,0.2)',   bar: 'linear-gradient(90deg,#7b2fff,#5000ff)',  iconBg: 'rgba(68,76,247,0.1)' },
  { name: 'Tkinter',    icon: '🖥️', level: 82,  grad: 'linear-gradient(135deg,rgba(123,47,255,0.12),rgba(80,0,255,0.08))', glow: 'rgba(123,47,255,0.2)',   bar: 'linear-gradient(90deg,#7b2fff,#5000ff)',  iconBg: 'rgba(68,76,247,0.1)' },
  { name: 'C',          icon: '⚙️', level: 80,  grad: 'linear-gradient(135deg,rgba(123,47,255,0.12),rgba(80,0,255,0.08))', glow: 'rgba(123,47,255,0.2)',   bar: 'linear-gradient(90deg,#7b2fff,#5000ff)',  iconBg: 'rgba(68,76,247,0.1)' },
  { name: 'GitHub',     icon: '🐙', level: 82,  grad: 'linear-gradient(135deg,rgba(123,47,255,0.12),rgba(80,0,255,0.08))', glow: 'rgba(123,47,255,0.2)',   bar: 'linear-gradient(90deg,#7b2fff,#5000ff)',  iconBg: 'rgba(68,76,247,0.1)' },
];

export default function Skills() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = cardRefs.current.indexOf(e.target);
        setTimeout(() => e.target.classList.add('visible'), idx * 100);
        observer.unobserve(e.target);
      });
    }, { threshold: 0.12 });

    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills">
      <div className="s-tag">what I know</div>
      <h2 className="s-title">Skills & <span>Technologies</span></h2>
      <div className="aline" />
      <p className="s-sub">Tools I've mastered to build exceptional, performant digital products.</p>
      <div className="skills-wrap">
        {skillsData.map((sk, i) => (
          <div
            key={sk.name}
            className="sk-card"
            ref={el => cardRefs.current[i] = el}
            style={{
              '--card-grad': sk.grad,
              '--card-glow': sk.glow,
              '--card-bar':  sk.bar,
            }}
          >
            <div className="sk-icon" style={{ background: sk.iconBg }}>{sk.icon}</div>
            <div className="sk-name">{sk.name}</div>
            <div className="sk-bar">
              <div className="sk-fill" style={{ width: `${sk.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
