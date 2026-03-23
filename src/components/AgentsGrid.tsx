"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { Sparkles, MessageSquare, BookOpen, Brain } from "lucide-react";

const capabilities = [
  {
    name: "女娲 · AI 团队编排",
    role: "Nuwa Orchestrator",
    desc: "不是固定的几个 Agent，而是女娲根据你的需求，动态创建最适合你的 AI 运营团队。图片生成、文案创作、数据分析，按需组合，随用随调。",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-100",
    icon: <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Sparkles className="h-6 w-6" /></div>,
    highlights: ["动态创建专属 Agent", "按需组合能力", "智能任务分配"],
  },
  {
    name: "顶尖大模型组合拳",
    role: "智能对话 + Nano Banana Pro 生图",
    desc: "不拼单一模型，而是组合全球最强。顶尖大模型负责深度推理与文案创作，Nano Banana Pro 引擎驱动 AI 生图与视觉理解，多引擎协同让每个任务都用最优解。",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-100",
    icon: <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><MessageSquare className="h-6 w-6" /></div>,
    highlights: ["智能对话深度推理", "Nano Banana Pro 生图", "多引擎智能调度"],
  },
  {
    name: "小红书深度优化",
    role: "XHS Optimizer",
    desc: "从种草文案、评论截流到数据采集，针对小红书平台算法深度优化。智能去 AI 味、关键词布局、爆款内容分析，全链路覆盖。",
    gradient: "from-rose-500/10 to-orange-500/10",
    border: "border-rose-100",
    icon: <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><BookOpen className="h-6 w-6" /></div>,
    highlights: ["种草文案生成", "评论精准截流", "爆款数据采集"],
  },
  {
    name: "专属记忆系统",
    role: "Memory Engine",
    desc: "AI 团队不再每次从零开始。它记住你的品牌调性、产品风格、目标人群、历史偏好，越用越懂你，真正成为你的专属运营团队。",
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-100",
    icon: <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><Brain className="h-6 w-6" /></div>,
    highlights: ["品牌调性记忆", "风格偏好学习", "越用越精准"],
  },
];

export function AgentsGrid() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/[0.03] rounded-full blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">核心能力</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            不只是工具，是你的专属运营团队
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            女娲动态编排 AI 能力，顶尖大模型 + Nano Banana Pro 生图引擎驱动，小红书深度优化，专属记忆越用越懂你。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border bg-white p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/50 ${cap.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  {cap.icon}
                  <span className="text-xs font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">{cap.role}</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground">{cap.name}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed flex-grow">
                  {cap.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cap.highlights.map((h) => (
                    <span key={h} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 text-muted-foreground border border-gray-100 group-hover:bg-white/80 transition-colors">
                      {h}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  了解更多 <ArrowRightIcon />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
