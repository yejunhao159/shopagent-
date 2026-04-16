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
} from "lucide-react";

const chatPackages = [
  { name: "体验包", credits: "35,000", price: "¥69", originalPrice: "¥109", save: "省¥40", usage: "尝鲜体验，轻松入门" },
  { name: "标准包", credits: "55,000", price: "¥99", originalPrice: "¥159", save: "省¥60", usage: "轻度使用，入门首选", highlight: true },
  { name: "进阶包", credits: "115,000", price: "¥199", originalPrice: "¥329", save: "省¥130", usage: "高频使用，性价比之选" },
  { name: "专业包", credits: "300,000", price: "¥499", originalPrice: "¥799", save: "省¥300", usage: "深度运营，效率翻倍" },
  { name: "旗舰包", credits: "740,000", price: "¥1,199", originalPrice: "¥1,999", save: "省¥800", usage: "重度使用，全量覆盖" },
];

const imagePackages = [
  { name: "基础包", credits: "15,000", price: "¥10", originalPrice: "¥15", save: "省¥5", usage: "约 10 张图" },
  { name: "标准包", credits: "75,000", price: "¥45", originalPrice: "¥70", save: "省¥25", usage: "约 50 张图" },
  { name: "进阶包", credits: "150,000", price: "¥79", originalPrice: "¥130", save: "省¥51", usage: "约 100 张图", highlight: true },
  { name: "专业包", credits: "750,000", price: "¥349", originalPrice: "¥600", save: "省¥251", usage: "约 500 张图" },
];

const engine = {
  name: "Nano Banana Pro",
  model: "Powered by Gemini",
  cost: "1,500 积分/张",
  desc: "专业级 AI 生图引擎，内测价 ¥1.00/张，正式价 ¥1.50/张",
  features: "文生图 · 图生图 · 多轮对话编辑 · 高清画质 · 多分辨率 · 人脸保持 · 创意模板",
};

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
    <div className="border-b border-border/50">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left group">
        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{q}</span>
        <svg className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="pb-5 text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-primary">定价方案</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            用多少付多少
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            邀请码 ¥199 开通账号，含体验积分。积分制按量计费，充值永不过期。
          </p>
        </div>
      </section>

      {/* 新用户赠送 */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl border border-primary/20 bg-white p-6 sm:p-8 text-center shadow-lg shadow-blue-500/5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-700">全面升级</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">邀请码开通账号</h3>
            <p className="mt-2 text-muted-foreground">一次购买，永久使用，含体验积分</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-foreground">¥199</span>
              <span className="text-sm text-muted-foreground ml-2">/ 邀请码</span>
            </div>
            <div className="mt-6 flex justify-center gap-8">
              <div>
                <p className="text-3xl font-bold text-foreground">18,000</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> 对话积分
                </p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">5,000</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  <Palette className="h-3.5 w-3.5" /> 创作积分
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">购买邀请码即获得 ShopAgent 账号 + 默认体验积分，积分用完可按需充值</p>
            <Link
              href="/download"
              className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 font-semibold text-white shadow-xl hover:bg-black/80 hover:scale-[1.02] transition-all"
            >
              立即开通
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 核心能力 */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">核心能力</h2>
            <span className="rounded-full bg-purple-100 text-purple-600 px-2.5 py-0.5 text-xs font-semibold">0.8.2 重磅更新</span>
          </div>
          <p className="text-muted-foreground mb-8">全面数据分析 + 多智能体协同，助你精准运营</p>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: <BarChart3 className="h-5 w-5" />, color: "bg-orange-100 text-orange-600", title: "笔记分享量", desc: "独家获取图文笔记分享数据" },
              { icon: <Flag className="h-5 w-5" />, color: "bg-indigo-100 text-indigo-600", title: "赛道分析", desc: "赛道竞争格局与机会洞察" },
              { icon: <User className="h-5 w-5" />, color: "bg-blue-100 text-blue-600", title: "博主分析", desc: "全方位博主数据画像分析" },
              { icon: <Search className="h-5 w-5" />, color: "bg-teal-100 text-teal-600", title: "下拉词分析", desc: "搜索下拉词全量深度挖掘" },
              { icon: <Target className="h-5 w-5" />, color: "bg-rose-100 text-rose-600", title: "差异化运营", desc: "多主体差异化运营策略" },
              { icon: <Bot className="h-5 w-5" />, color: "bg-purple-100 text-purple-600", title: "多智能体", desc: "多 Agent 协同智能分析" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 hover:shadow-md hover:border-purple-200 transition-all"
              >
                <div className={`h-10 w-10 rounded-lg ${item.color} flex items-center justify-center mb-2`}>
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 对话积分套餐 */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">对话积分</h2>
            <span className="rounded-full bg-orange-100 text-orange-600 px-2.5 py-0.5 text-xs font-semibold">内测优惠</span>
          </div>
          <p className="text-muted-foreground mb-8">AI 智能体对话、文案生成、竞品分析、内容策划等</p>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {chatPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl sm:rounded-3xl border p-4 sm:p-6 transition-shadow hover:shadow-xl ${
                  pkg.highlight ? "border-primary bg-white shadow-lg shadow-blue-500/10" : "border-gray-200 bg-white"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                    推荐
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground/60 line-through">{pkg.originalPrice}</span>
                </div>
                {pkg.save && (
                  <span className="mt-1.5 inline-block text-xs font-medium text-orange-600 bg-orange-50 rounded-full px-2 py-0.5 w-fit">
                    {pkg.save}
                  </span>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 flex-1">
                  <p className="text-sm font-medium text-foreground">{pkg.credits} 积分</p>
                  <p className="text-sm text-muted-foreground">{pkg.usage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 创作积分套餐 */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">创作积分（生图）</h2>
            <span className="rounded-full bg-orange-100 text-orange-600 px-2.5 py-0.5 text-xs font-semibold">内测优惠</span>
          </div>
          <p className="text-muted-foreground mb-8">Nano Banana Pro 生图引擎，1,500 积分 ≈ 1 张图，内测期间 ¥1.00/张</p>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-4">
            {imagePackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl sm:rounded-3xl border p-4 sm:p-6 transition-shadow hover:shadow-xl ${
                  pkg.highlight ? "border-primary bg-white shadow-lg shadow-blue-500/10" : "border-gray-200 bg-white"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                    推荐
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground/60 line-through">{pkg.originalPrice}</span>
                </div>
                {pkg.save && (
                  <span className="mt-1.5 inline-block text-xs font-medium text-orange-600 bg-orange-50 rounded-full px-2 py-0.5 w-fit">
                    {pkg.save}
                  </span>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 flex-1">
                  <p className="text-sm font-medium text-foreground">{pkg.credits} 积分</p>
                  <p className="text-sm text-muted-foreground">{pkg.usage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 生图引擎 */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-bold text-foreground">{engine.name}</h3>
              <span className="text-sm font-semibold text-primary">{engine.cost}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{engine.model}</p>
            <p className="text-base font-medium text-foreground">{engine.desc}</p>
            <p className="mt-3 text-sm text-muted-foreground">{engine.features}</p>
          </motion.div>
        </div>
      </section>

      {/* 企业用户专属服务 */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">企业用户专属服务</h3>
                <p className="text-sm text-muted-foreground">累计充值达到企业旗舰版本用户专享</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-amber-100">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">下拉词全量分析</h4>
                  <p className="mt-1 text-sm text-muted-foreground">深度挖掘搜索下拉词，获取行业关键词全量数据，洞察用户搜索意图</p>
                  <p className="mt-2 text-xs font-medium text-primary">每月 3 次</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-amber-100">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">一周热点爆点分析</h4>
                  <p className="mt-1 text-sm text-muted-foreground">追踪行业热点与爆款内容，预测下一周潜在爆点，抢占流量先机</p>
                  <p className="mt-2 text-xs font-medium text-primary">每周 3 次</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-amber-100">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">专属标签池</h4>
                  <p className="mt-1 text-sm text-muted-foreground">获取小红书专属高转化标签池，涵盖各行业热门标签，提升内容曝光率</p>
                  <p className="mt-2 text-xs font-medium text-primary">持续更新</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-amber-200 text-center">
              <p className="text-sm text-muted-foreground">
                累计充值达 <span className="font-semibold text-foreground">¥1,199</span>（旗舰包）即可解锁企业专属服务
              </p>
              <Link
                href="/download"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载体验
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">常见问题</h2>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
}
