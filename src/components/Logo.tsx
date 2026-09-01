import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 40 : 32;
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Símbolo da Fênix Oficial */}
      <div 
        className="flex items-center justify-center border border-[#262626] bg-[#0A0A0A] p-1.5 overflow-hidden"
        style={{ width: iconSize, height: iconSize }}
      >
        <img 
          src="/phoenix-new.jpg" 
          alt="Mariani Contábil" 
          className="w-full h-full object-contain invert brightness-200 contrast-125"
        />
      </div>

      {/* Tipografia Brutalista Monocromática */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5 tracking-tighter">
          <span className={`font-display text-[#FAFAFA] ${textSize}`}>
            MARIANI
          </span>
          <span className={`font-tech font-light tracking-widest text-[#8A8A8A] text-xs`}>
            CONTÁBIL
          </span>
        </div>
      </div>
    </div>
  );
};
