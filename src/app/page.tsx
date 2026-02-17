"use client";

import Link from "next/link";
import { ProductDemo } from "@/components/ProductDemo";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/Motion";
import { motion } from "framer-motion";

const agents = [
  {
    name: "冠华 · 图片助手",
    desc: "换背景、换模特、多平台适配",
  },
  {
    name: "时尚CEO · 品牌顾问",
    desc: "品牌定位、竞品分析、经营决策",
  },
  {
    name: "剪辑大师 · 视频制作",
    desc: "短视频脚本、剪辑建议、内容规划",
  },
  {
    name: "种草达人 · 内容创作",
    desc: "爆款文案、标题优化、关键词布局",
  },
];

const steps = [
  { num: "1", title: "上传商品", desc: "导入商品图片和基本信息" },
  { num: "2", title: "AI 处理", desc: "多个 Agent 协同生成素材" },
  { num: "3", title: "多平台适配", desc: "自动适配各电商平台规格" },
  { num: "4", title: "投入使用", desc: "素材直接用于各渠道运营" },
];

const testimonials = [
  {
    quote: "以前一个人做图、写文案、剪视频要忙一整天，现在两小时搞定。",
    name: "李女士",
    title: "杭州 · 女装店主",
  },
  {
    quote: "种草达人写的笔记，互动率比我自己写的高了 3 倍。",
    name: "张先生",
    title: "广州 · 男装品牌运营",
  },
  {
    quote: "图片助手的换背景功能省了大量拍摄成本。",
    name: "王女士",
    title: "深圳 · 童装电商创业者",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted"
          >
            面向服装电商的 AI 多智能体平台
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-[3.5rem]"
          >
            让 AI 帮你做电商运营
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted"
          >
            4 个专业 AI Agent 协同工作，覆盖图片、文案、视频、策略全链路。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link
              href="/download"
              className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-80"
            >
              免费下载
            </Link>
            <Link
              href="/features"
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              了解更多
            </Link>
          </motion.div>

          {/* Product Demo */}
          <ProductDemo />
        </div>
      </section>

      {/* ===== AGENTS ===== */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">四个专业角色</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              每个 Agent 都是各自领域的专家
            </h2>
          </FadeInUp>
          <StaggerContainer className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {agents.map((agent) => (
              <StaggerItem key={agent.name}>
                <div className="bg-surface p-8 transition-colors hover:bg-background">
                  <h3 className="text-base font-medium text-foreground">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{agent.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">工作流程</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              从上传到发布，四步完成
            </h2>
          </FadeInUp>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <StaggerItem key={step.num}>
                <div>
                  <span className="text-sm font-medium text-muted">{step.num}</span>
                  <h3 className="mt-3 text-base font-medium text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">用户反馈</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              商家怎么说
            </h2>
          </FadeInUp>
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="rounded-xl border border-border bg-surface p-6">
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.title}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== METRICS ===== */}
      <FadeInUp>
        <section className="border-t border-border bg-foreground py-20">
          <div className="mx-auto grid max-w-4xl gap-8 px-6 text-center md:grid-cols-4">
            {[
              { value: "500+", label: "内测商家" },
              { value: "4", label: "专业 AI Agent" },
              { value: "10x", label: "效率提升" },
              { value: "50万+", label: "素材已生成" },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-3xl font-semibold text-surface">{m.value}</div>
                <div className="mt-1 text-sm text-surface/50">{m.label}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeInUp>

      {/* ===== CTA ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <FadeInUp>
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
              准备好了吗？
            </h2>
            <p className="mt-3 text-muted">
              免费下载，体验 AI 驱动的电商运营。
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/download"
                className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-80"
              >
                免费下载
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                查看定价
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
