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
    // PARTICLE ENGINE: RESPONSIVE SAMPLING & SHARP WHITE PARTICLES
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

      // Sample pixels with step
      const step = 2.8;
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const index = (Math.floor(y) * sampleWidth + Math.floor(x)) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const brightness = (r + g + b) / 3;

          // The phoenix is black on white background
          if (brightness < 120) {
            // Adaptive scale factor based on screen width
            const posX = (x - sampleWidth / 2) * 1.05;
            const posY = (y - sampleHeight / 2) * 1.05;
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
    // MOUSE & TOUCH TRACKING (MOBILE OPTIMIZED)
    // =========================================================================
    const pointer = {
      x: -1000,
      y: -1000,
      isInside: false,
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.isInside = true;
      setStatusText('INTERAÇÃO // TOQUE ATIVO');
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
      pointer.isInside = false;
      setStatusText('ESTÁTICO // EM ESPERA');
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    let explosionFactor = 0;
    const triggerRebirth = () => {
      explosionFactor = 1.0;
      setStatusText('RENASCIMENTO // DISPERSÃO');
      setTimeout(() => setStatusText('ESTÁTICO // EM ESPERA'), 1200);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('click', triggerRebirth);
    canvas.addEventListener('touchstart', onTouchMove, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', handlePointerLeave, { passive: true });

    // =========================================================================
    // RENDER LOOP (STATIC, RESPONSIVE SCALE, NO OVERFLOW)
    // =========================================================================
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Scale responsiveness: auto shrink on small mobile devices
      const responsiveScale = Math.min(1, (width - 40) / 440);

      // Decay explosion burst
      if (explosionFactor > 0) {
        explosionFactor = Math.max(0, explosionFactor - 0.035);
      }

      if (isLoaded) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Scaled static base position
          let targetX = p.x0 * responsiveScale;
          let targetY = p.y0 * responsiveScale;

          // Pointer interaction (mouse or touch)
          if (pointer.isInside) {
            const screenX = cx + targetX;
            const screenY = cy + targetY;
            const dist = Math.hypot(pointer.x - screenX, pointer.y - screenY);

            const INTERACTION_RADIUS = 85 * responsiveScale;
            if (dist < INTERACTION_RADIUS) {
              const force = Math.pow((1 - dist / INTERACTION_RADIUS), 1.6) * 26 * responsiveScale;
              const angle = Math.atan2(screenY - pointer.y, screenX - pointer.x);
              targetX += Math.cos(angle) * force;
              targetY += Math.sin(angle) * force;
            }
          }

          // Click / Tap explosion
          if (explosionFactor > 0) {
            targetX += p.vx * explosionFactor * 40 * responsiveScale;
            targetY += p.vy * explosionFactor * 40 * responsiveScale;
          }

          // Smooth spring return
          p.curX += (targetX - p.curX) * 0.22;
          p.curY += (targetY - p.curY) * 0.22;

          const finalX = cx + p.curX;
          const finalY = cy + p.curY;

          // Render particle dot
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size * Math.max(0.7, responsiveScale), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 250, 250, ${p.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('click', triggerRebirth);
      canvas.removeEventListener('touchstart', onTouchMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center select-none group cursor-crosshair bg-[#050505] overflow-hidden">
      
      {/* 4 Corner Brackets in CSS (L-shaped borders) */}
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-3.5 sm:h-3.5 border-t border-l border-[#FAFAFA]" />
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 border-t border-r border-[#FAFAFA]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-3.5 sm:h-3.5 border-b border-l border-[#FAFAFA]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 border-b border-r border-[#FAFAFA]" />

      {/* 2D HTML5 Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />

      {/* HUD System Labels */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 bg-[#FAFAFA]" />
        <span className="text-[9px] sm:text-[10px] font-tech text-[#8A8A8A] uppercase tracking-widest">
          SYS.MODEL // PHOENIX.VECTOR
        </span>
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] font-tech text-[#8A8A8A] uppercase tracking-widest">
        {statusText}
      </div>

      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[9px] sm:text-[10px] font-tech text-[#8A8A8A] uppercase tracking-widest hidden md:block">
        INTERAÇÃO: AO TOCAR OU PASSAR CURSOR
      </div>

      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-[9px] sm:text-[10px] font-tech text-[#FAFAFA] uppercase tracking-widest border border-[#262626] px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#0F0F0F]">
        WINGSPAN: {wingspanCounter}%
      </div>

    </div>
  );
};
