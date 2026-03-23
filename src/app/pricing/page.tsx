"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const chatPackages = [
  { name: "标准包", credits: "20,000", price: "¥99", originalPrice: "¥159", save: "省¥60", usage: "轻度使用，入门首选", highlight: true },
  { name: "进阶包", credits: "50,000", price: "¥199", originalPrice: "¥329", save: "省¥130", usage: "高频使用，性价比之选" },
  { name: "专业包", credits: "120,000", price: "¥499", originalPrice: "¥799", save: "省¥300", usage: "深度运营，效率翻倍" },
  { name: "旗舰包", credits: "300,000", price: "¥1,199", originalPrice: "¥1,999", save: "省¥800", usage: "重度使用，全量覆盖" },
];

const imagePackages = [
  { name: "基础包", credits: "10,000", price: "¥10", originalPrice: "¥15", save: "省¥5", usage: "约 10 张图" },
  { name: "标准包", credits: "50,000", price: "¥45", originalPrice: "¥70", save: "省¥25", usage: "约 50 张图" },
  { name: "进阶包", credits: "100,000", price: "¥79", originalPrice: "¥130", save: "省¥51", usage: "约 100 张图", highlight: true },
  { name: "专业包", credits: "500,000", price: "¥349", originalPrice: "¥600", save: "省¥251", usage: "约 500 张图" },
];

const engine = {
  name: "Nano Banana Pro",
  model: "Powered by Gemini",
  cost: "1,000 积分/张",
  desc: "专业级 AI 生图引擎，内测价 ¥1.00/张，正式价 ¥1.50/张",
  features: "文生图 · 图生图 · 多轮对话编辑 · 高清画质 · 多分辨率 · 人脸保持 · 创意模板",
};

const faqs = [
  { q: "内测优惠价会一直保持吗？", a: "不会。内测期间享受专属优惠价（低至正式价 6 折），正式上线后恢复原价。趁现在充值最划算，已充值的积分不受涨价影响。" },
  { q: "积分会过期吗？", a: "充值积分永久有效，不限使用期限。新用户赠送积分有效期以产品内提示为准。" },
  { q: "对话积分和创作积分可以互换吗？", a: "不可以。对话积分用于 AI 对话、文案生成、竞品分析等；创作积分专用于 Nano Banana Pro 生图引擎。两者独立充值、独立使用。" },
  { q: "¥99 的标准包大概能做什么？", a: "20,000 对话积分大约可以完成 10-15 篇种草文案，或 5 次竞品分析 + 10 篇文案。对于刚起步的小红书卖家足够用一阵子。" },
  { q: "和请运营相比成本怎么样？", a: "一个初级运营月薪 6000-10000 元。ShopLoop AI 专业包 ¥499 就能覆盖文案撰写、数据分析、SEO 优化等多项工作，成本不到人工的 1%。" },
  { q: "免费积分能做什么？", a: "注册即送 18,000 对话积分 + 5,000 创作积分。对话积分可以体验 AI 文案、竞品分析等全部能力；创作积分可以免费生成 5 张以上 AI 图片。" },
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
            积分制按量计费，充值永不过期。注册即送 18,000 对话积分 + 5,000 创作积分，无需付费即可开始。
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
            <h3 className="text-xl font-bold text-foreground">注册即送积分</h3>
            <p className="mt-2 text-muted-foreground">无需充值，免费体验 AI 对话与生图功能</p>
            <div className="mt-6 flex justify-center gap-8">
              <div>
                <p className="text-3xl font-bold text-foreground">18,000</p>
                <p className="text-sm text-muted-foreground">💬 对话积分</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">5,000</p>
                <p className="text-sm text-muted-foreground">🎨 创作积分</p>
              </div>
            </div>
            <Link
              href="/download"
              className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 font-semibold text-white shadow-xl hover:bg-black/80 hover:scale-[1.02] transition-all"
            >
              免费开始
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 对话积分套餐 */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">💬 对话积分</h2>
            <span className="rounded-full bg-orange-100 text-orange-600 px-2.5 py-0.5 text-xs font-semibold">内测优惠</span>
          </div>
          <p className="text-muted-foreground mb-8">AI 智能体对话、文案生成、竞品分析、内容策划等</p>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-4">
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
            <h2 className="text-2xl font-bold text-foreground">🎨 创作积分（生图）</h2>
            <span className="rounded-full bg-orange-100 text-orange-600 px-2.5 py-0.5 text-xs font-semibold">内测优惠</span>
          </div>
          <p className="text-muted-foreground mb-8">Nano Banana Pro 生图引擎，1,000 积分 ≈ 1 张图，内测期间 ¥1.00/张</p>
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
