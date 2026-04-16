"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart3,
  Flag,
  User,
  Search,
  Target,
  Bot,
  MessageSquare,
  Palette,
  ArrowRight,
  Check,
  Zap,
} from "lucide-react";

const chatPackages = [
  { name: "体验包", credits: "35,000", price: "69", originalPrice: "109", save: "40", usage: "尝鲜体验，轻松入门" },
  { name: "标准包", credits: "55,000", price: "99", originalPrice: "159", save: "60", usage: "轻度使用，入门首选", highlight: true },
  { name: "进阶包", credits: "115,000", price: "199", originalPrice: "329", save: "130", usage: "高频使用，性价比之选" },
  { name: "专业包", credits: "300,000", price: "499", originalPrice: "799", save: "300", usage: "深度运营，效率翻倍" },
  { name: "旗舰包", credits: "740,000", price: "1,199", originalPrice: "1,999", save: "800", usage: "重度使用，全量覆盖" },
];

const imagePackages = [
  { name: "基础包", credits: "15,000", price: "10", originalPrice: "15", save: "5", usage: "约 10 张图" },
  { name: "标准包", credits: "75,000", price: "45", originalPrice: "70", save: "25", usage: "约 50 张图" },
  { name: "进阶包", credits: "150,000", price: "79", originalPrice: "130", save: "51", usage: "约 100 张图", highlight: true },
  { name: "专业包", credits: "750,000", price: "349", originalPrice: "600", save: "251", usage: "约 500 张图" },
];

const faqs = [
  { q: "内测优惠价会一直保持吗？", a: "不会。内测期间享受专属优惠价（低至正式价 6 折），正式上线后恢复原价。趁现在充值最划算，已充值的积分不受涨价影响。" },
  { q: "积分会过期吗？", a: "充值积分永久有效，不限使用期限。新用户赠送积分有效期以产品内提示为准。" },
  { q: "对话积分和创作积分可以互换吗？", a: "不可以。对话积分用于 AI 对话、文案生成、竞品分析等；创作积分专用于 Nano Banana Pro 生图引擎。两者独立充值、独立使用。" },
  { q: "¥99 的标准包大概能做什么？", a: "55,000 对话积分大约可以完成 25-40 篇种草文案，或 12 次竞品分析 + 25 篇文案。对于刚起步的小红书卖家足够用很长一段时间。" },
  { q: "和请运营相比成本怎么样？", a: "一个初级运营月薪 6000-10000 元。ShopAgent 专业包 ¥499 就能覆盖文案撰写、数据分析、SEO 优化等多项工作，成本不到人工的 1%。" },
  { q: "邀请码包含什么？", a: "邀请码 ¥199 包含 ShopAgent 账号开通 + 18,000 对话积分 + 5,000 创作积分。对话积分可以体验 AI 文案、赛道分析、博主分析、下拉词分析等全部能力；创作积分可以生成 3 张 AI 图片。用完可按需充值。" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200/80 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left group">
        <span className="text-[15px] font-medium text-foreground group-hover:text-foreground/70 transition-colors">{q}</span>
        <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${open ? "bg-foreground rotate-180" : "bg-gray-100 group-hover:bg-gray-200"}`}>
          <svg className={`h-3 w-3 transition-colors ${open ? "text-white" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[15px] text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

function PriceCard({ pkg, delay }: { pkg: typeof chatPackages[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={`group relative flex flex-col rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${
        pkg.highlight
          ? "border-foreground/20 bg-foreground text-white shadow-2xl shadow-black/20 scale-[1.02]"
          : "border-gray-200 bg-white hover:shadow-xl hover:border-gray-300"
      }`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-foreground shadow-md">
          推荐
        </span>
      )}
      <h3 className={`text-sm font-semibold tracking-wide uppercase ${pkg.highlight ? "text-white/70" : "text-muted-foreground"}`}>{pkg.name}</h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-[15px] opacity-60">¥</span>
        <span className={`font-serif text-4xl tracking-tight ${pkg.highlight ? "text-white" : "text-foreground"}`}>{pkg.price}</span>
        <span className={`text-sm line-through ${pkg.highlight ? "text-white/30" : "text-muted-foreground/40"}`}>¥{pkg.originalPrice}</span>
      </div>
      <span className={`mt-2 inline-block text-xs font-semibold rounded-full px-2.5 py-0.5 w-fit ${
        pkg.highlight ? "bg-amber-400/20 text-amber-300" : "bg-orange-50 text-orange-600 border border-orange-100"
      }`}>
        省¥{pkg.save}
      </span>
      <div className={`mt-5 pt-5 border-t space-y-2 flex-1 ${pkg.highlight ? "border-white/10" : "border-gray-100"}`}>
        <p className={`text-sm font-semibold ${pkg.highlight ? "text-white" : "text-foreground"}`}>{pkg.credits} 积分</p>
        <p className={`text-sm ${pkg.highlight ? "text-white/60" : "text-muted-foreground"}`}>{pkg.usage}</p>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-background overflow-hidden">
      {/* Hero — editorial style with serif accent */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f7f4] -z-20" />
        <div className="absolute inset-0 -z-10 opacity-[0.4] bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(124,58,237,0.04),transparent_50%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 text-foreground/70 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase mb-6 border border-foreground/10">
              Pricing
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              用多少，<span className="font-serif italic text-foreground/80">付多少</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              邀请码 ¥199 开通账号，含体验积分。<br className="hidden sm:block" />积分制按量计费，充值永不过期。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 邀请码开通 — 双栏布局 */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl bg-foreground text-white p-8 sm:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-tr-full" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              {/* 左侧：价格 */}
              <div className="md:w-2/5 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-white/80">全面升级</span>
                </div>
                <h3 className="text-2xl font-bold">邀请码开通账号</h3>
                <p className="mt-2 text-white/50 text-sm">一次购买，永久使用</p>
                <div className="mt-6">
                  <span className="font-serif text-xl text-white/40">¥</span>
                  <span className="font-serif text-7xl sm:text-8xl tracking-tighter text-white">199</span>
                </div>
                <div className="mt-6 flex justify-center md:justify-start gap-8">
                  <div>
                    <p className="text-2xl font-bold tracking-tight">18,000</p>
                    <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                      <MessageSquare className="h-3 w-3" /> 对话积分
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight">5,000</p>
                    <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                      <Palette className="h-3 w-3" /> 创作积分
                    </p>
                  </div>
                </div>
              </div>

              {/* 右侧：功能清单 */}
              <div className="flex-1 md:border-l md:border-white/10 md:pl-12">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">包含能力</p>
                <div className="space-y-3">
                  {[
                    "博主分析 · 赛道分析 · 竞争定位",
                    "下拉词深度挖掘 · 需求洞察",
                    "AI 文案创作 · 竞品分析 · SEO 优化",
                    "Nano Banana Pro AI 生图",
                    "专属记忆系统 · 越用越懂你",
                    "即将上线：抖音分析能力",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/download"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-foreground shadow-xl hover:bg-white/90 hover:scale-[1.02] transition-all"
                >
                  立即开通 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 核心能力 */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#f8f7f4]/50" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-xs font-semibold mb-4">
              <Zap className="h-3 w-3" /> 0.8.2 重磅更新
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              核心<span className="font-serif italic">能力</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">全面数据分析 + 多智能体协同，助你精准运营</p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: <BarChart3 className="h-5 w-5" />, color: "text-orange-600 bg-orange-50", title: "笔记分享量", desc: "独家获取分享数据" },
              { icon: <Flag className="h-5 w-5" />, color: "text-indigo-600 bg-indigo-50", title: "赛道分析", desc: "竞争格局与机会" },
              { icon: <User className="h-5 w-5" />, color: "text-blue-600 bg-blue-50", title: "博主分析", desc: "全维度数据画像" },
              { icon: <Search className="h-5 w-5" />, color: "text-teal-600 bg-teal-50", title: "下拉词分析", desc: "全量深度挖掘" },
              { icon: <Target className="h-5 w-5" />, color: "text-rose-600 bg-rose-50", title: "差异化运营", desc: "多主体运营策略" },
              { icon: <Bot className="h-5 w-5" />, color: "text-violet-600 bg-violet-50", title: "多智能体", desc: "Agent 协同分析" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-10 w-10 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 对话积分套餐 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">对话积分</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 text-[11px] font-semibold">
              <Zap className="h-3 w-3" /> 内测优惠
            </span>
          </div>
          <p className="text-muted-foreground mb-10">AI 智能体对话、文案生成、竞品分析、内容策划等</p>
          <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {chatPackages.map((pkg, i) => (
              <PriceCard key={pkg.name} pkg={pkg} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* 创作积分套餐 */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#f8f7f4]/30" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">创作积分（生图）</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 text-[11px] font-semibold">
              <Zap className="h-3 w-3" /> 内测优惠
            </span>
          </div>
          <p className="text-muted-foreground mb-10">Nano Banana Pro 生图引擎，1,500 积分 = 1 张图，内测期间 ¥1.00/张</p>
          <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-4">
            {imagePackages.map((pkg, i) => (
              <PriceCard key={pkg.name} pkg={pkg} delay={i * 0.08} />
            ))}
          </div>

          {/* 生图引擎说明 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-foreground">Nano Banana Pro</h3>
                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded font-mono">Powered by Gemini</span>
              </div>
              <p className="text-sm text-muted-foreground">专业级 AI 生图引擎，内测价 ¥1.00/张，正式价 ¥1.50/张</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["文生图", "图生图", "多轮编辑", "高清画质", "人脸保持"].map((f) => (
                <span key={f} className="text-xs text-foreground/70 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">{f}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 企业用户专属服务 */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-amber-200/60 bg-gradient-to-br from-[#fffbeb] to-[#fef3c7]/30 p-8 sm:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-300/15 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">企业用户专属服务</h3>
                  <p className="text-sm text-muted-foreground">累计充值达 ¥1,199（旗舰包）解锁</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: <Search className="w-5 h-5" />, color: "bg-blue-50 text-blue-600", title: "下拉词全量分析", desc: "深度挖掘搜索下拉词，洞察用户搜索意图", freq: "每月 3 次" },
                  { icon: <Zap className="w-5 h-5" />, color: "bg-rose-50 text-rose-600", title: "一周热点爆点分析", desc: "追踪行业热点与爆款内容，抢占流量先机", freq: "每周 3 次" },
                  { icon: <Target className="w-5 h-5" />, color: "bg-violet-50 text-violet-600", title: "专属标签池", desc: "小红书高转化标签池，提升内容曝光率", freq: "持续更新" },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/80 backdrop-blur-sm p-5 border border-amber-100/60 hover:shadow-md transition-shadow duration-300">
                    <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    <p className="mt-3 text-xs font-bold text-amber-600">{item.freq}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  下载体验 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#f8f7f4]/50" />
        <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              常见<span className="font-serif italic">问题</span>
            </h2>
            <p className="mt-2 text-muted-foreground">关于定价和使用的常见疑问</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
