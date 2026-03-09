"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, FlaskConical, SlidersHorizontal, Send } from "lucide-react";

const steps = [
  { num: "01", title: "对话式交互", desc: "用自然语言告诉 Agent 你的需求，无需学习复杂操作", icon: <MessageCircle className="h-5 w-5" /> },
  { num: "02", title: "Agent 智能执行", desc: "对应领域的 Agent 自动理解意图并完成任务", icon: <FlaskConical className="h-5 w-5" /> },
  { num: "03", title: "多引擎协同", desc: "4 大生图引擎 + 小红书工具链，按需调度最优方案", icon: <SlidersHorizontal className="h-5 w-5" /> },
  { num: "04", title: "一键发布与同步", desc: "内容直接发布到多平台，支持草稿箱预览与定时发布", icon: <Send className="h-5 w-5" /> },
];

export function Workflow() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
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
