import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoCloud } from './components/LogoCloud';
import { HeroScrollDemo } from './components/HeroScrollDemo';
import { BentoGrid } from './components/BentoGrid';
import { TaxSimulator } from './components/TaxSimulator';
import { ComparisonTable } from './components/ComparisonTable';
import { MigrationSteps } from './components/MigrationSteps';
import { MetricsAndTestimonials } from './components/MetricsAndTestimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { DiagnosticModal } from './components/DiagnosticModal';
import { LgpdModal } from './components/LgpdModal';

export function App() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isLgpdOpen, setIsLgpdOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] relative overflow-x-hidden selection:bg-[#FAFAFA] selection:text-[#050505]">
      
      {/* Noise / Grain Texture Overlay (4-5% Opacity, Fixed) */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Header / Navbar */}
      <Navbar onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 1. Hero: Headline Gigante 70% + Asymmetric Particle Shape + Glitch Moment */}
        <Hero onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

        {/* 2. Marquee: Texto Outline Fino de Segmentos Atendidos */}
        <LogoCloud />

        {/* 3. Container Scroll Animation Demo: Painel Interativo 3D com Scroll */}
        <HeroScrollDemo />

        {/* 4. Grid Rígido 3 Colunas: Arquitetura de Serviços com Hairline Borders */}
        <BentoGrid onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

        {/* 4. Simulador Tributário de Alta Precisão Monocromático */}
        <TaxSimulator />

        {/* 5. Matriz Comparativa Estrutural */}
        <ComparisonTable onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

        {/* 6. Protocolo Sequencial de Migração em 4 Etapas */}
        <MigrationSteps onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

        {/* 7. Prova Técnica, Métricas e Autoridade (+30 Anos) */}
        <MetricsAndTestimonials />

        {/* 8. Base de Conhecimento e FAQ */}
        <FaqSection />
      </main>

      {/* Footer Editorial com Dados Oficiais de Belo Horizonte */}
      <Footer 
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        onOpenLgpd={() => setIsLgpdOpen(true)}
      />

      {/* Trigger de Atendimento Flutuante */}
      <FloatingWhatsapp />

      {/* Modais de Parecer Fiscal e LGPD */}
      <DiagnosticModal 
        isOpen={isDiagnosticOpen} 
        onClose={() => setIsDiagnosticOpen(false)} 
      />

      <LgpdModal 
        isOpen={isLgpdOpen} 
        onClose={() => setIsLgpdOpen(false)} 
      />
    </div>
  );
}

export default App;
