import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden py-10 bg-[#050505] border-b border-[#262626]">
      <ContainerScroll
        titleComponent={
          <>
            <span className="text-xs font-tech text-[#8A8A8A] uppercase tracking-widest block mb-3">
              [ PAINEL DE CONTROLE EM TEMPO REAL ]
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#FAFAFA] tracking-tight leading-none mb-6">
              INTELIGÊNCIA CONTÁBIL <br />
              <span className="text-[#8A8A8A]">EM CADA DECISÃO.</span>
            </h2>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          alt="Dashboard Executivo Mariani"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full w-full object-left-top grayscale contrast-125"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
