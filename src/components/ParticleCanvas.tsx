import React, { useEffect, useRef, useState } from 'react';

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wingspanCounter, setWingspanCounter] = useState(0);
  const [statusText, setStatusText] = useState('ESTÁTICO // EM ESPERA');

  // Counter animation on load (0% to 100%)
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setWingspanCounter(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    requestAnimationFrame(animateCounter);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 540);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 580);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // PARTICLE ENGINE: SAMPLING THE NEW BLACK SILHOUETTE AS WHITE PARTICLES
    // =========================================================================
    interface PhoenixDot {
      x0: number;
      y0: number;
      curX: number;
      curY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: PhoenixDot[] = [];
    let isLoaded = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '/phoenix-new.jpg';

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const sampleWidth = 480;
      const sampleHeight = 480;
      offscreen.width = sampleWidth;
      offscreen.height = sampleHeight;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

      // Sample pixels with high precision step (step = 2.8)
      const step = 2.8;
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const index = (Math.floor(y) * sampleWidth + Math.floor(x)) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const brightness = (r + g + b) / 3;

          // The phoenix is black (dark pixels) on white background in the image
          if (brightness < 120) {
            const posX = (x - sampleWidth / 2) * 1.15;
            const posY = (y - sampleHeight / 2) * 1.15;

            // Density opacity based on dark pixel intensity
            const alphaVal = 1 - (brightness / 255);

            particles.push({
              x0: posX,
              y0: posY,
              curX: posX,
              curY: posY,
              vx: (Math.random() - 0.5) * 14,
              vy: (Math.random() - 0.5) * 14,
              size: Math.random() * 0.5 + 0.8,
              alpha: Math.min(1, Math.max(0.45, alphaVal * 0.95)),
            });
          }
        }
      }
      isLoaded = true;
    };

    // =========================================================================
    // MOUSE TRACKING: 100% STATIC BY DEFAULT, ONLY INTERACTS ON HOVER / TOUCH
    // =========================================================================
    const mouse = {
      x: -1000,
      y: -1000,
      isInside: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isInside = true;
      setStatusText('INTERAÇÃO // CURSOR ATIVO');
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isInside = false;
      setStatusText('ESTÁTICO // EM ESPERA');
    };

    let explosionFactor = 0;
    const handleClick = () => {
      explosionFactor = 1.0;
      setStatusText('RENASCIMENTO // DISPERSÃO');
      setTimeout(() => setStatusText('ESTÁTICO // EM ESPERA'), 1200);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // =========================================================================
    // RENDER LOOP (STATIC, SHARP, ELASTIC RETURN)
    // =========================================================================
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Decay explosion burst
      if (explosionFactor > 0) {
        explosionFactor = Math.max(0, explosionFactor - 0.035);
      }

      if (isLoaded) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // 100% Static base position
          let targetX = p.x0;
          let targetY = p.y0;

          // Only interact when cursor is inside and near the particle
          if (mouse.isInside) {
            const screenX = cx + targetX;
            const screenY = cy + targetY;
            const distToMouse = Math.hypot(mouse.x - screenX, mouse.y - screenY);

            const INTERACTION_RADIUS = 90;
            if (distToMouse < INTERACTION_RADIUS) {
              const force = Math.pow((1 - distToMouse / INTERACTION_RADIUS), 1.6) * 28;
              const angle = Math.atan2(screenY - mouse.y, screenX - mouse.x);
              targetX += Math.cos(angle) * force;
              targetY += Math.sin(angle) * force;
            }
          }

          // Click explosion
          if (explosionFactor > 0) {
            targetX += p.vx * explosionFactor * 45;
            targetY += p.vy * explosionFactor * 45;
          }

          // Smooth spring return (0.22)
          p.curX += (targetX - p.curX) * 0.22;
          p.curY += (targetY - p.curY) * 0.22;

          const finalX = cx + p.curX;
          const finalY = cy + p.curY;

          // Draw white particle dot on dark canvas
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 250, 250, ${p.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center select-none group cursor-crosshair bg-[#050505]">
      
      {/* 4 Corner Brackets in CSS (L-shaped borders) */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-[#FAFAFA]" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-[#FAFAFA]" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-[#FAFAFA]" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-[#FAFAFA]" />

      {/* 2D HTML5 Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />

      {/* HUD System Labels */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#FAFAFA]" />
        <span className="text-[10px] font-tech text-[#8A8A8A] uppercase tracking-widest">
          SYS.MODEL // PHOENIX.VECTOR.MATRIX
        </span>
      </div>

      <div className="absolute top-4 right-4 text-[10px] font-tech text-[#8A8A8A] uppercase tracking-widest">
        STATE: {statusText}
      </div>

      <div className="absolute bottom-4 left-4 text-[10px] font-tech text-[#8A8A8A] uppercase tracking-widest hidden sm:block">
        INTERAÇÃO: APENAS AO PASSAR O CURSOR
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] font-tech text-[#FAFAFA] uppercase tracking-widest border border-[#262626] px-2.5 py-1 bg-[#0F0F0F]">
        WINGSPAN: {wingspanCounter}%
      </div>

      {/* Subtle Central Crosshairs */}
      <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[9px] font-tech text-[#262626] pointer-events-none">
        +
      </div>
      <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[9px] font-tech text-[#262626] pointer-events-none">
        +
      </div>

    </div>
  );
};
