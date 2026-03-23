"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, FlaskConical, SlidersHorizontal, Send } from "lucide-react";

const steps = [
  { num: "01", title: "告诉女娲你的需求", desc: "用自然语言描述目标，女娲自动为你编排最合适的 AI 团队", icon: <MessageCircle className="h-5 w-5" /> },
  { num: "02", title: "AI 团队智能协作", desc: "专属团队自动理解意图并执行，记忆系统让每次都更精准", icon: <FlaskConical className="h-5 w-5" /> },
  { num: "03", title: "顶尖模型驱动", desc: "顶尖大模型 + Nano Banana Pro 生图引擎，文案与视觉各取所长", icon: <SlidersHorizontal className="h-5 w-5" /> },
  { num: "04", title: "一键发布与同步", desc: "内容直接发布到小红书等多平台，深度优化提升流量", icon: <Send className="h-5 w-5" /> },
];

export function Workflow() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-100/70 via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3]" />

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
               <Link href="/features" className="text-sm font-medium text-primary hover:underline underline-offset-4">查看全部功能 &rarr;</Link>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-8 grid-cols-2 md:grid-cols-4 relative">
          <div className="hidden md:block absolute top-7 left-[12.5%] w-[75%] h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 -z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white md:bg-transparent p-6 md:p-0 rounded-2xl border md:border-0 border-gray-100 shadow-sm md:shadow-none"
            >
              <div className="h-14 w-14 rounded-2xl bg-white border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm mb-6 z-10 relative">
                {step.icon}
              </div>
              <span className="text-xs font-mono text-primary/60 mb-1 block">{step.num}</span>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
