import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const roles = ['Full-stack-developer', 'React Specialist', 'Node.js', 'Laravel', 'Creative coder'];

function useTyping(words) {
  const [text, setText] = useState('');
  const state = useRef({ ri: 0, ci: 0, del: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { ri, ci, del } = state.current;
      const cur = words[ri];
      if (!del) {
        const newCi = ci + 1;
        setText(cur.slice(0, newCi));
        if (newCi === cur.length) {
          state.current = { ri, ci: newCi, del: true };
          timer = setTimeout(tick, 2200);
        } else {
          state.current = { ri, ci: newCi, del: false };
          timer = setTimeout(tick, 95);
        }
      } else {
        const newCi = ci - 1;
        setText(cur.slice(0, newCi));
        if (newCi === 0) {
          state.current = { ri: (ri + 1) % words.length, ci: 0, del: false };
          timer = setTimeout(tick, 95);
        } else {
          state.current = { ri, ci: newCi, del: true };
          timer = setTimeout(tick, 55);
        }
      }
    }
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

export default function Hero() {
  const planetRef = useRef(null);
  const typedText = useTyping(roles);

  useEffect(() => {
    const canvas = planetRef.current;
    const ctx = canvas.getContext('2d');
    let PW, PH, moonAngle = 0, rafId;

   function resize() {
  const hero = document.getElementById('hero');
  if (!hero || !canvas) return;

  const rect = hero.getBoundingClientRect();
  PW = canvas.width  = rect.width;
  PH = canvas.height = rect.height;
  
  canvas.style.width  = PW + 'px';
  canvas.style.height = PH + 'px';
}

    function draw() {
      ctx.clearRect(0, 0, PW, PH);
      const cx = PW / 2, cy = PH / 2;
      const PR = Math.min(PW, PH) * 0.22;

      // Planet body
      const pb = ctx.createRadialGradient(cx - PR * 0.3, cy - PR * 0.3, PR * 0.05, cx, cy, PR);
      pb.addColorStop(0,   '#1a2a4a');
      pb.addColorStop(0.35,'#0d1a30');
      pb.addColorStop(0.7, '#080f1e');
      pb.addColorStop(1,   '#030810');
      ctx.beginPath(); ctx.arc(cx, cy, PR, 0, Math.PI * 2);
      ctx.fillStyle = pb; ctx.fill();

      // Atmosphere bands
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, PR, 0, Math.PI * 2); ctx.clip();
      for (let i = 0; i < 5; i++) {
        const ly = cy - PR * 0.6 + i * PR * 0.3;
        const lw = Math.sqrt(Math.max(0, PR * PR - (ly - cy) * (ly - cy))) * 2;
        const g = ctx.createLinearGradient(cx - lw / 2, ly, cx + lw / 2, ly);
        g.addColorStop(0,   'rgba(0,212,255,0)');
        g.addColorStop(0.4, 'rgba(0,212,255,0.05)');
        g.addColorStop(0.6, 'rgba(100,180,255,0.06)');
        g.addColorStop(1,   'rgba(0,212,255,0)');
        ctx.beginPath();
        ctx.ellipse(cx, ly, lw / 2, PR * 0.025, 0, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
      ctx.restore();

      // Rim glow
      const rim = ctx.createRadialGradient(cx, cy, PR * 0.85, cx, cy, PR * 1.18);
      rim.addColorStop(0, 'rgba(0,212,255,0)');
      rim.addColorStop(0.5,'rgba(0,212,255,0.07)');
      rim.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, PR * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = rim; ctx.fill();

      // Specular
      const spec = ctx.createRadialGradient(cx - PR * 0.35, cy - PR * 0.35, 0, cx - PR * 0.35, cy - PR * 0.35, PR * 0.5);
      spec.addColorStop(0, 'rgba(100,200,255,0.12)');
      spec.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, PR, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();

      // Rings
      const rRX = PR * 1.8, rRY = PR * 0.45;
      ctx.save(); ctx.translate(cx, cy);
      ctx.beginPath(); ctx.ellipse(0, 0, rRX, rRY, 0, Math.PI, Math.PI * 2);
      const rg1 = ctx.createLinearGradient(-rRX, 0, rRX, 0);
      rg1.addColorStop(0,   'rgba(0,212,255,0)');
      rg1.addColorStop(0.3, 'rgba(0,212,255,0.12)');
      rg1.addColorStop(0.5, 'rgba(120,180,255,0.2)');
      rg1.addColorStop(0.7, 'rgba(0,212,255,0.12)');
      rg1.addColorStop(1,   'rgba(0,212,255,0)');
      ctx.strokeStyle = rg1; ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, rRX, rRY, 0, 0, Math.PI);
      const rg2 = ctx.createLinearGradient(-rRX, 0, rRX, 0);
      rg2.addColorStop(0,   'rgba(0,212,255,0)');
      rg2.addColorStop(0.3, 'rgba(0,212,255,0.18)');
      rg2.addColorStop(0.5, 'rgba(150,200,255,0.28)');
      rg2.addColorStop(0.7, 'rgba(0,212,255,0.18)');
      rg2.addColorStop(1,   'rgba(0,212,255,0)');
      ctx.strokeStyle = rg2; ctx.lineWidth = 5; ctx.stroke();
      ctx.restore();

      // Moon 1
      const oR = PR * 2.4;
      const mx = cx + Math.cos(moonAngle) * oR;
      const my = cy + Math.sin(moonAngle) * oR * 0.35;
      const mR = PR * 0.1;
      const mg = ctx.createRadialGradient(mx, my, 0, mx, my, mR * 5);
      mg.addColorStop(0, 'rgba(0,212,255,0.18)');
      mg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(mx, my, mR * 5, 0, Math.PI * 2);
      ctx.fillStyle = mg; ctx.fill();
      const mb = ctx.createRadialGradient(mx - mR * 0.3, my - mR * 0.3, 0, mx, my, mR);
      mb.addColorStop(0, '#8ad4f0'); mb.addColorStop(0.5, '#4ab0d8'); mb.addColorStop(1, '#1a4a60');
      ctx.beginPath(); ctx.arc(mx, my, mR, 0, Math.PI * 2);
      ctx.fillStyle = mb; ctx.fill();
      for (let i = 0; i < 18; i++) {
        const ta = moonAngle - i * 0.15;
        const tx = cx + Math.cos(ta) * oR;
        const ty = cy + Math.sin(ta) * oR * 0.35;
        const ta2 = (18 - i) / 18;
        ctx.beginPath(); ctx.arc(tx, ty, mR * 0.3 * ta2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${ta2 * 0.25})`; ctx.fill();
      }

      // Moon 2
      const oR2 = PR * 1.5;
      const m2a = moonAngle * 1.7 + Math.PI;
      const m2x = cx + Math.cos(m2a) * oR2 * 0.7;
      const m2y = cy + Math.sin(m2a) * oR2 * 0.22;
      const m2R = mR * 0.55;
      const m2g = ctx.createRadialGradient(m2x, m2y, 0, m2x, m2y, m2R * 4);
      m2g.addColorStop(0, 'rgba(123,47,255,0.2)'); m2g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(m2x, m2y, m2R * 4, 0, Math.PI * 2);
      ctx.fillStyle = m2g; ctx.fill();
      const m2b = ctx.createRadialGradient(m2x - m2R * 0.3, m2y - 0.3, 0, m2x, m2y, m2R);
      m2b.addColorStop(0, '#c0a0ff'); m2b.addColorStop(1, '#5020a0');
      ctx.beginPath(); ctx.arc(m2x, m2y, m2R, 0, Math.PI * 2);
      ctx.fillStyle = m2b; ctx.fill();

      moonAngle += 0.005;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div id="hero">
      <canvas ref={planetRef} id="planetCanvas" />
      <div className="hero-content">
        <div className="status-pill">
          <div className="pring" />
          Available for work
        </div>

        <h1 className="hero-name">
          <span className="hn-plain">Fatma</span>
          <span className="hn-glow">Ahmed</span>
        </h1>

        <div className="hero-role">
          &gt;&nbsp;<span>{typedText}</span><span className="rc" />
        </div>

        <p className="hero-desc">
          Full-Stack Developer — I combine the power of logic with the beauty of design.
          Specialist in building modern web applications using the latest technologies.
          I believe that great code isn't just about functionality, but about solving
          problems with intelligence and elegance.
        </p>

        <div className="hero-btns">
          <button className="big-btn btn-primary-big" onClick={() => scrollTo('projects')}>
            View My Work ↓
          </button>
          <button className="big-btn btn-outline-big" onClick={() => scrollTo('contact')}>
            Let's Talk →
          </button>
        </div>
      </div>
    </div>
  );
}
