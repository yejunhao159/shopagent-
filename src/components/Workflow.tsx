"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "对话式交互", desc: "用自然语言告诉 Agent 你的需求，无需学习复杂操作", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
  { num: "02", title: "Agent 智能执行", desc: "对应领域的 Agent 自动理解意图并完成任务", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg> },
  { num: "03", title: "多引擎协同", desc: "4 大生图引擎 + 小红书工具链，按需调度最优方案",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg> },
  { num: "04", title: "一键发布与同步", desc: "内容直接发布到多平台，支持草稿箱预览与定时发布", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg> },
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
           {/* Connecting Line (Desktop) */}
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