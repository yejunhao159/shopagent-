"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ArrowRightIcon = () => (
    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
)

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-sm font-medium text-purple-600 mb-8 hover:bg-purple-500/10 transition-colors cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
            ShopLoop AI 内测进行中
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance"
        >
          让 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">AI 智能体</span> 接管
          <br className="hidden md:block" />
          您的运营全流程
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-balance"
        >
          不仅是工具，而是您的超级员工团队。6 个专业 AI Agent 7x24 小时协同工作，
          从图片生成到爆款内容创作，覆盖电商与自媒体运营全链路。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pb-24"
        >
          <Link
            href="/download"
            className="w-full sm:w-auto rounded-full bg-foreground px-8 py-3.5 text-base font-semibold text-white shadow-xl hover:bg-black/80 hover:scale-[1.02] transition-all"
          >
            立即免费开始
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto rounded-full border border-border bg-white px-8 py-3.5 text-base font-medium text-foreground hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center group"
          >
            查看演示 <ArrowRightIcon />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}