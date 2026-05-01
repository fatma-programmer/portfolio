import React, { useEffect, useRef } from 'react';

const layers = [
  { count: 320, speed: 0.00008, size: [0.3, 0.9],  alpha: [0.2, 0.55] },
  { count: 180, speed: 0.00018, size: [0.7, 1.5],  alpha: [0.4, 0.85] },
  { count: 80,  speed: 0.00035, size: [1.2, 2.4],  alpha: [0.6, 1.0]  },
  { count: 25,  speed: 0.0006,  size: [2.0, 3.5],  alpha: [0.7, 1.0]  },
];

function mkStar(layer) {
  return {
    angle:   Math.random() * Math.PI * 2,
    dist:    Math.pow(Math.random(), 0.6),
    sz:      layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
    al:      layer.alpha[0] + Math.random() * (layer.alpha[1] - layer.alpha[0]),
    tw:      Math.random() * Math.PI * 2,
    twSpeed: 0.005 + Math.random() * 0.02,
    warm:    Math.random() < 0.12,
  };
}

export default function GalaxyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let GW, GH, galaxyAngle = 0, rafId;
    const layerData = layers.map(l => ({ ...l, r: 0, stars: [] }));

    function init() {
      GW = canvas.width  = window.innerWidth;
      GH = canvas.height = window.innerHeight;
      layerData.forEach((l, i) => {
        l.r = Math.min(GW, GH) * 0.52 + 60;
        if (!l.stars.length) l.stars = Array.from({ length: layers[i].count }, () => mkStar(layers[i]));
      });
    }

    function drawMilkyWay(cx, cy, angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle + Math.PI / 5);
      const bw = Math.max(GW, GH) * 1.6;
      const bh = Math.max(GW, GH) * 0.22;
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, bh);
      grd.addColorStop(0,   'rgba(80,120,200,0.045)');
      grd.addColorStop(0.4, 'rgba(60,90,160,0.025)');
      grd.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.scale(bw / bh, 1);
      ctx.beginPath(); ctx.arc(0, 0, bh, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, GW, GH);
      const cx = GW / 2, cy = GH / 2;

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(GW, GH) * 0.5);
      core.addColorStop(0,   'rgba(20,30,80,0.18)');
      core.addColorStop(0.4, 'rgba(5,10,30,0.08)');
      core.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = core; ctx.fillRect(0, 0, GW, GH);

      drawMilkyWay(cx, cy, galaxyAngle);

      layerData.forEach((layer, li) => {
        const baseAngle = galaxyAngle * (1 + li * 0.4);
        layer.stars.forEach(s => {
          const a = s.angle + baseAngle;
          const r = s.dist * layer.r;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.72;
          const sx = ((x % GW) + GW) % GW;
          const sy = ((y % GH) + GH) % GH;

          s.tw += s.twSpeed;
          const twinkle = 0.55 + 0.45 * Math.sin(s.tw);
          const finalAlpha = s.al * twinkle;
          let col;
          if (s.warm)       col = `rgba(255,220,180,${finalAlpha})`;
          else if (s.sz > 2) col = `rgba(180,220,255,${finalAlpha})`;
          else               col = `rgba(210,230,255,${finalAlpha})`;

          ctx.beginPath(); ctx.arc(sx, sy, s.sz, 0, Math.PI * 2);
          ctx.fillStyle = col; ctx.fill();

          if (s.sz > 2.5 && twinkle > 0.8) {
            const fl = s.sz * 6;
            const fg = ctx.createRadialGradient(sx, sy, 0, sx, sy, fl);
            fg.addColorStop(0, `rgba(180,220,255,${finalAlpha * 0.4})`);
            fg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.beginPath(); ctx.arc(sx, sy, fl, 0, Math.PI * 2);
            ctx.fillStyle = fg; ctx.fill();
          }
        });
      });

      if (Math.random() < 0.007) {
        const sx2 = Math.random() * GW, sy2 = Math.random() * GH * 0.5;
        const len = 90 + Math.random() * 160;
        const ang = 0.3 + Math.random() * 0.5;
        const sg = ctx.createLinearGradient(sx2, sy2, sx2 + len * Math.cos(ang), sy2 + len * Math.sin(ang));
        sg.addColorStop(0,   'rgba(0,212,255,0)');
        sg.addColorStop(0.3, 'rgba(180,230,255,0.95)');
        sg.addColorStop(1,   'rgba(0,212,255,0)');
        ctx.beginPath();
        ctx.moveTo(sx2, sy2);
        ctx.lineTo(sx2 + len * Math.cos(ang), sy2 + len * Math.sin(ang));
        ctx.strokeStyle = sg; ctx.lineWidth = 1.5; ctx.stroke();
      }

      galaxyAngle += 0.00025;
      rafId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', init); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxyCanvas"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
