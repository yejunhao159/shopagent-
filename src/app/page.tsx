import { Hero } from "@/components/Hero";
import { AgentsGrid } from "@/components/AgentsGrid";
import { PromptGallery } from "@/components/PromptGallery";
import { Metrics } from "@/components/Metrics";
import { Cta } from "@/components/Cta";
import { Workflow } from "@/components/Workflow";
import { Testimonials } from "@/components/Testimonials";
import { ProductDemo } from "@/components/ProductDemo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background overflow-hidden">
      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== SOFTWARE DEMO INTERFACE ===== */}
      <div className="-mt-16 sm:-mt-24 md:-mt-32 relative z-20 pb-20">
         <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl border border-border/50 bg-white/50 p-2 shadow-2xl backdrop-blur-xl">
              <div className="overflow-hidden rounded-xl border border-border/50 bg-white aspect-[16/10] relative">
                 {/* Image Background */}
                 <div className="absolute inset-0">
                    <Image 
                      src="/images/software-bg-sm.png"
                      alt="ShopLoop AI Interface" 
                      fill
                      className="object-cover opacity-10"
                    />
                 </div>
                 
                 {/* Overlay Demo */}
                 <div className="absolute inset-0 z-10">
                     <ProductDemo />
                 </div>
              </div>
            </div>
         </div>
      </div>

      {/* ===== PROMPT GALLERY ===== */}
      <PromptGallery />

      {/* ===== AGENTS (Bento Grid) ===== */}
      <AgentsGrid />

      {/* ===== HOW IT WORKS ===== */}
      <Workflow />

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />

      {/* ===== METRICS ===== */}
      <Metrics />

      {/* ===== CTA ===== */}
      <Cta />
    </div>
  );
}