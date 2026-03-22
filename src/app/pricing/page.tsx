"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const chatPackages = [
  { name: "标准包", credits: "72,000", price: "¥79", usage: "高频使用，性价比之选", highlight: true },
  { name: "进阶包", credits: "144,000", price: "¥149", usage: "深度运营，效率翻倍" },
  { name: "专业包", credits: "360,000", price: "¥349", usage: "团队协作，全量覆盖" },
  { name: "旗舰包", credits: "720,000", price: "¥599", usage: "重度使用，长期无忧" },
  { name: "企业包", credits: "1,200,000", price: "¥999", usage: "多人协同，极致性价比" },
];

const imagePackages = [
  { name: "10 张", price: "¥10", usage: "¥1.00/张" },
  { name: "50 张", price: "¥50", usage: "¥1.00/张" },
  { name: "100 张", price: "¥100", usage: "¥1.00/张", highlight: true },
  { name: "500 张", price: "¥500", usage: "¥1.00/张" },
  { name: "1000 张", price: "¥1000", usage: "¥1.00/张" },
];

const engine = {
  name: "Nano Banana Pro",
  model: "Powered by Gemini",
  cost: "¥1.00/张",
  desc: "专业级 AI 生图引擎，一块钱一张图",
  features: "文生图 · 图生图 · 多轮对话编辑 · 高清画质 · 多分辨率 · 人脸保持 · 创意模板",
};

const faqs = [
  { q: "积分会过期吗？", a: "充值积分永久有效。新用户赠送积分有效期以产品内提示为准。" },
  { q: "对话积分和创作积分可以互换吗？", a: "不可以。对话积分用于 AI 对话、文案生成、竞品分析等；创作积分专用于 Nano Banana Pro 生图引擎。两者独立充值、独立使用。" },
  { q: "免费赠送的积分能做什么？", a: "注册即送对话积分和创作积分，可以体验全部 AI 对话能力和 Nano Banana Pro 生图引擎，功能完全一致。" },
  { q: "内测价格会一直保持吗？", a: "内测期间享受优惠价，正式上线后恢复正式价。已充值的积分不受影响。" },
  { q: "和请运营团队相比，成本怎么样？", a: "一个初级运营月薪 6000-10000 元，ShopLoop AI 标准包 ¥79 即可获得 72,000 对话积分，覆盖文案、视频脚本、策略分析等多个岗位的工作。" },
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
            积分制按量计费，充值永不过期。注册即送体验积分，无需付费即可开始。
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
            <h3 className="text-xl font-bold text-foreground">注册即送体验积分</h3>
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
          <h2 className="text-2xl font-bold text-foreground mb-2">💬 对话积分</h2>
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
                <div className="mt-3">
                  <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                </div>
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
          <h2 className="text-2xl font-bold text-foreground mb-2">🎨 创作积分（生图）</h2>
          <p className="text-muted-foreground mb-8">Nano Banana Pro 生图引擎，¥1.00/张，按张购买</p>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
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
                <div className="mt-3">
                  <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
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
