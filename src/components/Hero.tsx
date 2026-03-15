import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-32 md:pt-32 lg:pt-40 overflow-hidden bg-[#FAFAFA]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-40 mix-blend-multiply pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] opacity-30 mix-blend-multiply pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] opacity-20 mix-blend-multiply pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />

      {/* Grid Pattern overlay for texture */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-sm font-medium text-purple-600 mb-8 hover:bg-purple-500/10 transition-colors cursor-pointer animate-fade-in-up"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
            ShopLoop AI 内测进行中
        </div>

        <h1
          className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance animate-fade-in-up [animation-delay:100ms]"
        >
          让 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">AI 智能体</span> 接管
          <br className="hidden md:block" />
          您的运营全流程
        </h1>

        <p
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-balance animate-fade-in-up [animation-delay:200ms]"
        >
          不仅是工具，而是您的超级员工团队。6 个专业 AI Agent 7x24 小时协同工作，
          从图片生成到爆款内容创作，覆盖电商与自媒体运营全链路。
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pb-6 animate-fade-in-up [animation-delay:300ms]"
        >
          <Link
            href="/download"
            className="w-full sm:w-auto rounded-full bg-foreground px-8 py-3.5 text-base font-semibold text-white shadow-xl hover:bg-black/80 hover:scale-[1.02] transition-[background-color,transform]"
          >
            立即免费开始
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto rounded-full border border-border bg-white px-8 py-3.5 text-base font-medium text-foreground hover:bg-gray-50 hover:border-gray-300 transition-[background-color,border-color] flex items-center justify-center group"
          >
            查看演示 <ArrowRightIcon />
          </Link>
        </div>
        <p className="mt-4 pb-24 text-sm text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
          无需信用卡 · 注册即送 54,000 积分 · 支持 Windows 与 macOS
        </p>
      </div>
    </section>
  );
}
