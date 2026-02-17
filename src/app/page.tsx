"use client";

import Link from "next/link";
import { ProductDemo } from "@/components/ProductDemo";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/Motion";
import { motion } from "framer-motion";

// Icons
const CheckIcon = () => (
  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = () => (
    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
)

const agents = [
  {
    name: "冠华 · 图片助手",
    role: "Visual Designer",
    desc: "智能抠图、场景合成、模特替换。一键生成高转化率商品图。",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
       </div>
    )
  },
  {
    name: "时尚CEO · 品牌顾问",
    role: "Strategy Lead",
    desc: "全网竞品分析、定价策略建议、流行趋势预测。",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
       </div>
    )
  },
  {
    name: "剪辑大师 · 视频制作",
    role: "Video Editor",
    desc: "自动提取高光时刻、智能配乐、多尺寸裁切适配。",
    gradient: "from-orange-500/10 to-red-500/10",
    border: "border-orange-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
       </div>
    )
  },
  {
    name: "种草达人 · 内容创作",
    role: "Content Creator",
    desc: "多风格文案生成、SEO 关键词优化、话题标签推荐。",
    gradient: "from-green-500/10 to-teal-500/10",
    border: "border-green-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
       </div>
    )
  },
];

const steps = [
  { num: "01", title: "上传商品", desc: "拖拽上传商品图，AI 自动提取特征" },
  { num: "02", title: "选择场景", desc: "从 500+ 电商专属场景库中选择或自定义" },
  { num: "03", title: "一键生成", desc: "多 Agent 协同，并发生成图文视素材" },
  { num: "04", title: "多端发布", desc: "自动适配淘宝、抖音、小红书发布规格" },
];

const testimonials = [
  {
    quote: "ShopAgent 彻底改变了我们的上新流程。以前需要一周的工作量，现在只要半天。",
    name: "李薇",
    title: "独立设计师品牌主理人",
    avatar: "bg-pink-100 text-pink-600",
  },
  {
    quote: "文案生成的质量惊人，特别是针对小红书的语气把握，简直比我招的运营还专业。",
    name: "张浩",
    title: "资深电商运营总监",
    avatar: "bg-blue-100 text-blue-600",
  },
  {
    quote: "对于我们这种中小卖家来说，ShopAgent 是性价比最高的『员工』。",
    name: "陈明",
    title: "跨境电商卖家",
    avatar: "bg-green-100 text-green-600",
  },
];

export default function Home() {
  return (
    <div className="bg-background overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-24 pb-32 md:pt-32 lg:pt-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            ShopAgent 2.0 现已发布
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance"
          >
            让 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI 智能体</span> 接管
            <br className="hidden md:block" />
            您的电商运营全流程
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance"
          >
            不仅是工具，而是您的超级员工团队。4 个专业 AI Agent 7x24 小时协同工作，
            从选品分析到内容分发，自动闭环。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
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

          {/* Product Demo */}
          <div className="relative mt-20">
             <ProductDemo />
          </div>
        </div>
      </section>

      {/* ===== COMPANIES / TRUST ===== */}
      <section className="py-12 border-y border-border/40 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">深受 500+ 创新电商团队信赖</p>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-5 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for logos - simplified as text for now but styled to look like logos */}
             {['NextShop', 'FashionAI', 'TrendLine', 'GlobalMall', 'SmartRetail'].map(brand => (
                 <div key={brand} className="flex items-center justify-center text-lg font-bold text-foreground/40 hover:text-foreground/80 cursor-default">{brand}</div>
             ))}
          </div>
        </div>
      </section>

      {/* ===== AGENTS (Bento Grid) ===== */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">专业分工</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              一支配合默契的 AI 专家团队
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              告别单点工具，ShopAgent 提供的是一整套自动化的工作流。每个 Agent 都在其擅长的领域做到极致。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/50 ${agent.border}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    {agent.icon}
                    <span className="text-xs font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">{agent.role}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed flex-grow">
                    {agent.desc}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    了解更多 <ArrowRightIcon />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="md:flex md:items-end md:justify-between mb-16">
            <div className="max-w-xl">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                化繁为简的工作流
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                以前需要几个通宵的工作，现在喝杯咖啡的时间就能完成。
              </p>
            </div>
            <div className="hidden md:block">
                 <Link href="/docs" className="text-sm font-medium text-primary hover:underline underline-offset-4">查看完整文档 &rarr;</Link>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative">
             {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10" />

            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white md:bg-transparent p-6 md:p-0 rounded-2xl border md:border-0 border-gray-100 shadow-sm md:shadow-none"
              >
                <div className="h-12 w-12 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center text-lg font-bold text-primary shadow-sm mb-6 z-10 relative">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-16">
              深受商家喜爱
           </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                   <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(star => (
                       <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     ))}
                   </div>
                   <p className="text-base text-foreground/80 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${t.avatar}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METRICS ===== */}
      <section className="bg-foreground py-20 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
         <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 text-center">
              {[
                { value: "500+", label: "合作商家" },
                { value: "4", label: "AI 智能体" },
                { value: "12x", label: "ROI 提升" },
                { value: "100W+", label: "生成素材" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">{m.value}</div>
                  <div className="text-sm md:text-base text-gray-400 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              准备好升级您的电商生意了吗？
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              立即加入 ShopAgent，体验 AI 驱动的高效运营。前 100 名注册用户享首月免费。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/download"
                className="w-full sm:w-auto rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-primary/90 hover:scale-[1.02] transition-all"
              >
                免费下载试用
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-medium text-foreground hover:bg-gray-50 transition-all"
              >
                联系销售团队
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              无需信用卡 · 14 天免费试用 · 随时取消
            </p>
        </div>
      </section>
    </div>
  );
}