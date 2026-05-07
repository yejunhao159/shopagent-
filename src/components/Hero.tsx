import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-32 md:pt-32 lg:pt-40 overflow-hidden bg-[#F3ECE4]">
      {/* Soft warm radial wash — Anthropic-style ambient warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] opacity-60 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E9DDC9]/80 via-transparent to-transparent" />
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] opacity-40 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#BD5C3C]/8 via-transparent to-transparent" />

      {/* Subtle paper-grain dot pattern (replaces sharp grid) */}
      <div className="absolute inset-0 -z-20 opacity-[0.45] bg-[radial-gradient(#C9BFB1_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_55%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-[#BD5C3C]/25 bg-[#BD5C3C]/5 px-4 py-1.5 text-sm font-medium text-[#BD5C3C] mb-8 hover:bg-[#BD5C3C]/10 transition-colors cursor-pointer animate-fade-in-up"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BD5C3C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BD5C3C]"></span>
          </span>
            v0.9.1 已发布 · 沉浸式创作 + 评论采集 10x 提速
        </div>

        <h1
          className="text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-semibold leading-[1.05] tracking-tight text-foreground text-balance animate-fade-in-up [animation-delay:100ms]"
        >
          <span className="font-serif italic font-normal text-[#BD5C3C]">女娲</span>打造
          <br className="hidden md:block" />
          专属你的 <span className="font-serif italic font-normal">AI 运营团队</span>
        </h1>

        <p
          className="mx-auto mt-7 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-balance animate-fade-in-up [animation-delay:200ms]"
        >
          不只是工具，而是一支懂你的超级团队。沉浸式创作工作台让一个角色开多个对话、AI 自动看图配文，
          评论采集 1000 条仅需 100 秒，叠加赛道/博主/下拉词分析与 Nano Banana Pro 生图，专属记忆越用越懂你。
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 pb-6 animate-fade-in-up [animation-delay:300ms]"
        >
          <Link
            href="/download"
            className="w-full sm:w-auto rounded-full bg-[#BD5C3C] px-8 py-3.5 text-base font-semibold text-[#FBF8F2] shadow-sm hover:bg-[#A24B30] transition-colors"
          >
            立即开始
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto rounded-full border border-[#141414]/15 bg-transparent px-8 py-3.5 text-base font-medium text-foreground hover:bg-[#141414]/5 transition-colors flex items-center justify-center group"
          >
            查看演示 <ArrowRightIcon />
          </Link>
        </div>
        <p className="mt-4 pb-24 text-sm text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
          邀请码 ¥199 开通 · 含 18,000 对话积分 + 5,000 创作积分 · 支持 Windows 与 macOS
        </p>
      </div>
    </section>
  );
}
