"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const plans = [
  {
    name: "免费体验",
    price: "¥0",
    period: "",
    desc: "快速体验 AI Agent 的能力",
    features: ["对话积分 ¥3 额度", "工具积分 ¥1 额度", "4 个 AI Agent 全部可用", "桌面端 + Web 端"],
    cta: "免费开始",
    href: "/download",
    highlight: false,
  },
  {
    name: "专业版",
    price: "¥99",
    period: "/月",
    desc: "适合日常运营的服装商家",
    features: ["对话积分 ¥50 额度", "工具积分 ¥30 额度", "图片生成 300 张/月", "优先客服支持", "历史记录云端同步"],
    cta: "立即订阅",
    href: "/download",
    highlight: true,
  },
  {
    name: "企业版",
    price: "联系我们",
    period: "",
    desc: "适合团队协作和定制需求",
    features: ["不限量对话积分", "不限量工具积分", "图片生成不限量", "专属客户经理", "API 接口开放", "私有化部署可选"],
    cta: "联系销售",
    href: "mailto:sales@shopagent.ai",
    highlight: false,
  },
];

const faqs = [
  { q: "积分是怎么计算的？", a: "积分按实际 AI 调用消耗计算。对话类功能消耗对话积分，图片生成等消耗工具积分。用完可随时充值，不会过期。" },
  { q: "免费版有什么限制？", a: "免费版可以使用全部 4 个 AI Agent，功能完全一致，只是积分额度有限。" },
  { q: "可以随时取消订阅吗？", a: "可以。按月计费，随时取消，当月剩余时间仍可使用。" },
  { q: "企业版支持私有化部署吗？", a: "支持。企业版可以部署在你自己的服务器上，数据完全私有。" },
  { q: "和请运营团队相比，成本怎么样？", a: "一个初级运营月薪 6000-10000 元，ShopAgent 专业版每月 99 元，覆盖图片、文案、视频、策略四个岗位。" },
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
            灵活的积分制计费。一个运营月薪 6000+，ShopAgent 专业版每月仅 ¥99。
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border p-8 transition-shadow hover:shadow-xl ${
                  plan.highlight ? "border-primary bg-white shadow-lg shadow-blue-500/10" : "border-gray-200 bg-white"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                    最受欢迎
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <svg className="h-5 w-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all hover:scale-[1.02] ${
                    plan.highlight
                      ? "bg-primary text-white shadow-lg shadow-blue-500/30 hover:bg-primary/90"
                      : "border border-gray-200 text-foreground hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
