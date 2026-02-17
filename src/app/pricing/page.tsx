"use client";

import Link from "next/link";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/Motion";
import { useState } from "react";

const plans = [
  {
    name: "免费体验",
    price: "¥0",
    period: "",
    desc: "快速体验 AI Agent 的能力",
    features: [
      "对话积分 ¥3 额度",
      "工具积分 ¥1 额度",
      "4 个 AI Agent 全部可用",
      "桌面端 + Web 端",
    ],
    cta: "免费开始",
    href: "/download",
    highlight: false,
  },
  {
    name: "专业版",
    price: "¥99",
    period: "/月",
    desc: "适合日常运营的服装商家",
    features: [
      "对话积分 ¥50 额度",
      "工具积分 ¥30 额度",
      "图片生成 300 张/月",
      "优先客服支持",
      "历史记录云端同步",
    ],
    cta: "立即订阅",
    href: "/download",
    highlight: true,
  },
  {
    name: "企业版",
    price: "联系我们",
    period: "",
    desc: "适合团队协作和定制需求",
    features: [
      "不限量对话积分",
      "不限量工具积分",
      "图片生成不限量",
      "专属客户经理",
      "API 接口开放",
      "私有化部署可选",
    ],
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
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left">
        <span className="text-sm font-medium text-foreground">{q}</span>
        <svg className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="pb-4 text-sm text-muted">{a}</p>}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="pb-12 pt-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">定价</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              用多少付多少
            </h1>
          </FadeInUp>
        </div>
      </section>

      <section className="pb-24">
        <StaggerContainer className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-xl border border-border bg-border px-6 md:grid-cols-3 md:px-0">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`flex h-full flex-col bg-surface p-8 ${plan.highlight ? "md:bg-background" : ""}`}>
                {plan.highlight && (
                  <span className="mb-4 w-fit rounded-full bg-foreground px-3 py-0.5 text-xs font-medium text-surface">
                    推荐
                  </span>
                )}
                <h3 className="text-base font-medium text-foreground">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-3xl font-semibold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{plan.desc}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1 text-foreground">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-medium transition-opacity ${
                    plan.highlight
                      ? "bg-foreground text-surface hover:opacity-80"
                      : "border border-border text-foreground hover:bg-background"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-2xl px-6">
          <FadeInUp>
            <h2 className="text-xl font-semibold text-foreground">常见问题</h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <div className="mt-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
