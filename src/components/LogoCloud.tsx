import React from 'react';
import { CLIENT_SEGMENTS_MARQUEE } from '../data/testimonials';

export const LogoCloud: React.FC = () => {
  return (
    <section className="py-6 border-b border-[#262626] bg-[#050505] overflow-hidden select-none">
      <div className="relative w-full overflow-hidden flex items-center">
        
        {/* Continuous Marquee with Fine Outline Typography */}
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {CLIENT_SEGMENTS_MARQUEE.concat(CLIENT_SEGMENTS_MARQUEE).map((segment, index) => (
            <div
              key={index}
              className="flex items-center gap-6"
            >
              <span className="font-display text-2xl sm:text-3xl text-stroke-outline uppercase tracking-wider transition-colors duration-200">
                {segment}
              </span>
              <span className="text-[#262626] font-tech text-sm">///</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
