import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_CONFIG } from '../data/config';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiagnostic }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { num: "01", label: "SERVIÇOS", href: "#servicos", id: "servicos" },
    { num: "02", label: "SIMULADOR", href: "#simulador", id: "simulador" },
    { num: "03", label: "MÉTODO", href: "#comparativo", id: "comparativo" },
    { num: "04", label: "TRANSIÇÃO", href: "#migracao", id: "migracao" },
    { num: "05", label: "AUTORIDADE", href: "#depoimentos", id: "depoimentos" },
    { num: "06", label: "FAQ", href: "#faq", id: "faq" },
  ];

  // Scroll Progress and ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate scroll progress (0 to 100%)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Detect active section for scrollspy
      const sections = ["hero", "servicos", "simulador", "comparativo", "migracao", "depoimentos", "faq"];
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#262626] transition-all">
      
      {/* 1px Scroll Progress Line */}
      <div 
        className="absolute bottom-0 left-0 h-[1.5px] bg-[#FAFAFA] transition-all duration-75 z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="focus:outline-none transition-transform hover:opacity-90"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links with Sliding Interactive Highlight */}
          <nav 
            className="hidden lg:flex items-center gap-1 font-tech text-xs tracking-wider p-1 border border-[#262626] bg-[#0A0A0A] relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredLink === link.id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  className={`relative px-4 py-2 flex items-center gap-2 transition-all duration-150 select-none ${
                    isActive 
                      ? 'text-[#FAFAFA] font-bold bg-[#141414]' 
                      : isHovered
                      ? 'text-[#FAFAFA] bg-[#141414]'
                      : 'text-[#8A8A8A] hover:text-[#FAFAFA]'
                  }`}
                >
                  <span className={`text-[10px] transition-colors ${isActive ? 'text-[#FAFAFA]' : 'text-[#525252]'}`}>
                    {link.num}
                  </span>
                  <span>{link.label}</span>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#FAFAFA]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-xs font-tech text-[#8A8A8A] tracking-wider hidden xl:inline">
              BH // {COMPANY_CONFIG.phoneDisplay}
            </span>

            <button
              onClick={onOpenDiagnostic}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FAFAFA] text-[#050505] font-tech font-bold text-xs uppercase tracking-wider hover:bg-[#E5E5E5] transition-transform active:scale-95 border border-[#FAFAFA]"
            >
              <span>DIAGNÓSTICO FISCAL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onOpenDiagnostic}
              className="sm:hidden px-3 py-1.5 bg-[#FAFAFA] text-[#050505] font-tech text-[10px] font-bold uppercase tracking-wider"
            >
              DIAGNÓSTICO
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#262626] text-[#FAFAFA] hover:bg-[#0F0F0F]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505] border-b border-[#262626] px-6 py-6 font-tech">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className={`flex items-center justify-between text-sm py-2.5 px-3 border transition-colors ${
                  activeSection === link.id
                    ? 'border-[#FAFAFA] bg-[#0F0F0F] text-[#FAFAFA] font-bold'
                    : 'border-[#1A1A1A] text-[#8A8A8A] hover:text-[#FAFAFA]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#8A8A8A]">{link.num}</span>
              </a>
            ))}
            
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDiagnostic();
                }}
                className="w-full py-3 bg-[#FAFAFA] text-[#050505] font-bold text-xs uppercase tracking-wider text-center"
              >
                SOLICITAR DIAGNÓSTICO
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
