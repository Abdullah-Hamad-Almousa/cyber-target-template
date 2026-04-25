import { useRef, useEffect } from 'react';
import styles from './ThreatRadar.module.scss';

export default function ThreatRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    let rafId: number;
    const blips: { angle: number; dist: number; alpha: number }[] = [];

    for (let i = 0; i < 8; i++) {
      blips.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 0.8 + 0.1,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) / 2 - 10;

      const theme = document.documentElement.getAttribute('data-theme') || 'company';
      const accent = theme === 'company' ? '0, 200, 255' : '255, 93, 54';

      // Rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent}, ${0.06 * i})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.strokeStyle = `rgba(${accent}, 0.06)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sweep
      angle += 0.008;
      const sweepGrad = ctx.createConicGradient(angle - Math.PI / 2, cx, cy);
      sweepGrad.addColorStop(0, `rgba(${accent}, 0)`);
      sweepGrad.addColorStop(0.85, `rgba(${accent}, 0)`);
      sweepGrad.addColorStop(1, `rgba(${accent}, 0.15)`);

      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = `rgba(${accent}, 0.4)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Blips
      blips.forEach((blip) => {
        const bx = cx + Math.cos(blip.angle) * maxR * blip.dist;
        const by = cy + Math.sin(blip.angle) * maxR * blip.dist;

        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${blip.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent}, ${blip.alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
