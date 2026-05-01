import React, { useEffect, useRef } from 'react';
import './Projects.css';

const projectsData = [
  {
    type: 'video', // أو سميه hybrid
    videoUrl: './20260426160439.mp4', 
    liveUrl: 'https://smarthome-blush.vercel.app/', // ضيفي رابط اللايف هنا
    githubUrl: 'https://github.com/fatma-programmer/smarthome',
    tags: ['REACT.JS'],
    title: 'smarthome',
    desc: 'Crafting immersive and interactive digital experiences with clean code',
    pgrad: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(0,150,200,0.07))',
    pglow: 'rgba(0,212,255,0.15)',
   
  },
  {
     type: 'video', // نوع الكارد
    videoUrl: './20260426094402.mp4', // حطي مسار الفيديو هنا
    githubUrl: 'https://github.com/fatma-programmer/my-first-web-project',
    tags: ['PHP','MySQL'],
    title: 'compition system',
    desc: 'Developed a dynamic competition management system using PHP, enabling.',
    pgrad: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(0,150,200,0.07))',
    pglow: 'rgba(0,212,255,0.15)',
    githubUrl: '#',
   
  },
  {
    type: 'video', // أو سميه hybrid
    videoUrl: './20260426101843.mp4', 
    liveUrl: 'https://disney-lemon-seven.vercel.app/', // ضيفي رابط اللايف هنا
    githubUrl: 'https://github.com/fatma-programmer/disney',
    tags: ['REACT.JS'],
    title: 'disney hub web',
    desc: 'Bringing Disneys magic to life, one pixel and animation at a time',
    pgrad: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(0,150,200,0.07))',
    pglow: 'rgba(0,212,255,0.15)',
  },
  {
type: 'video', // أو سميه hybrid
    videoUrl: './20260426183458.mp4', 
 // ضيفي رابط اللايف هنا
    githubUrl: 'https://github.com/fatma-programmer/robomart',
    tags: ['Node.js','mongodb'],
    title: 'robomart cart',
    desc: 'Redefining the future of retail with a modern interface for automated solutions.',
    pgrad: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(0,150,200,0.07))',
    pglow: 'rgba(0,212,255,0.15)',
  },
];

export default function Projects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = cardRefs.current.indexOf(e.target);
        setTimeout(() => e.target.classList.add('visible'), idx * 120);
        observer.unobserve(e.target);
      });
    }, { threshold: 0.12 });

    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects">
      <div className="s-tag">what I built</div>
      <h2 className="s-title">Featured <span>Projects</span></h2>
      <div className="aline" />
      <p className="s-sub">Selected work — from concept to deployed product.</p>

      <div className="proj-grid">
        {projectsData.map((p, i) => (
          <div
            key={i}
            className="proj-card"
            ref={el => cardRefs.current[i] = el}
            style={{ '--pgrad': p.pgrad, '--pglow': p.pglow }}
          >
            <div className="proj-thumb">
              {p.type === 'video' ? (
                /* عرض الفيديو */
                <video className="proj-video" autoPlay muted loop playsInline>
                  <source src={p.videoUrl} type="video/mp4" />
                </video>
              ) : (
                /* عرض التصميم العادي */
                <>
                  <div className="proj-thumb-bg" style={{ background: p.thumbBg }} />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: `radial-gradient(ellipse at 50% 50%, ${p.radial}, transparent 65%)` 
                  }} />
                  <div className="proj-thumb-icon">{p.icon}</div>
                </>
              )}
            </div>

            <div className="proj-body">
              <div className="proj-tags">
                {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
              </div>
              <div className="proj-title">{p.title}</div>
              <p className="proj-desc">{p.desc}</p>
              
              <div className="proj-footer">
                <div style={{ display: 'flex', gap: '1.2rem' }}>
                  {p.liveUrl && <a href={p.liveUrl} className="proj-link">Live →</a>}
                  <a href={p.githubUrl} className="proj-link">GitHub</a>
                </div>
                <div className="proj-arrow">↗</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}