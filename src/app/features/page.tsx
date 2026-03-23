"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  BookOpen,
  Brain,
  ArrowRight,
  ImageIcon,
  PenSquare,
  MessageCircle,
  Database,
  BarChart3,
  Video,
} from "lucide-react";

const R2_BASE = "https://pub-bcbedef262af471aa4b5838cce9ef9e4.r2.dev";

const featureSections = [
  {
    name: "女娲 · AI 团队编排",
    role: "Nuwa Orchestrator",
    tagline: "动态创建最适合你的 AI 运营团队",
    border: "border-purple-100",
    gradient: "from-purple-500/10 to-pink-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Sparkles className="h-6 w-6" /></div>,
    video: `${R2_BASE}/videos/nuwa-intro.mp4`,
    features: [
      { title: "动态 Agent 创建", desc: "根据你的业务场景，女娲自动编排最合适的 AI Agent 组合" },
      { title: "AI 生图", desc: "Nano Banana Pro 生图引擎，基于 Gemini 驱动，文生图、图生图、多轮对话编辑" },
      { title: "智能文案创作", desc: "种草文案、短视频脚本、品牌文案，针对不同平台风格自动适配" },
      { title: "战略分析", desc: "品牌定位、竞品追踪、趋势洞察，AI 帮你做出数据驱动的决策" },
    ],
  },
  {
    name: "顶尖大模型组合拳",
    role: "Claude 4.6 Sonnet + Gemini + Nano Banana Pro",
    tagline: "多引擎智能调度，文案与视觉各取所长",
    border: "border-blue-100",
    gradient: "from-blue-500/10 to-cyan-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><MessageSquare className="h-6 w-6" /></div>,
    video: `${R2_BASE}/videos/shoploop-image-tutorial.mp4`,
    features: [
      { title: "多轮深度打磨", desc: "文案和图片都支持多轮对话式修改，反复打磨直到满意，不是一次性生成" },
      { title: "Nano Banana Pro 生图", desc: "专业级 AI 生图引擎，文生图、图生图、多轮编辑，一张图反复迭代" },
      { title: "多引擎智能调度", desc: "Claude 4.6 Sonnet + Gemini 多模型协同，系统根据任务自动选择最优模型" },
      { title: "飞书 ShopClaw 机器人", desc: "在飞书中 @ShopClaw 即可调用全部 AI 能力，随时随地指挥你的 AI 团队" },
    ],
  },
  {
    name: "小红书深度运营",
    role: "XHS Deep Analyzer",
    tagline: "深度分析 + 定制化文案，数据驱动每一篇内容",
    border: "border-rose-100",
    gradient: "from-rose-500/10 to-orange-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><BookOpen className="h-6 w-6" /></div>,
    video: `${R2_BASE}/videos/memory-xhs-demo.mp4`,
    features: [
      { title: "对标账号深度分析", desc: "锁定竞品和标杆账号，拆解爆款逻辑、内容结构、发布节奏，找到可复制的增长路径" },
      { title: "定制化种草文案", desc: "基于分析结果量身打造文案，智能去 AI 味，多轮打磨直到完美匹配品牌调性" },
      { title: "爆款数据采集", desc: "按关键词、品类搜索爆款内容，一键采集到本地知识库，构建你的内容弹药库" },
      { title: "SEO 关键词布局", desc: "分析搜索热词和品类趋势，优化笔记标题和正文的关键词覆盖率" },
    ],
  },
  {
    name: "记忆系统 + 知识库",
    role: "Memory & Knowledge Engine",
    tagline: "越用越懂你，数据越积累内容越精准",
    border: "border-emerald-100",
    gradient: "from-emerald-500/10 to-teal-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><Brain className="h-6 w-6" /></div>,
    video: `${R2_BASE}/videos/memory-xhs-demo.mp4`,
    features: [
      { title: "品牌调性记忆", desc: "记住你的品牌风格、色彩偏好、文案调性，每次输出都保持一致" },
      { title: "本地知识库", desc: "采集的爆款数据、竞品分析、历史文案全部沉淀到知识库，AI 基于你的数据生成内容" },
      { title: "目标人群画像", desc: "学习你的客户群体特征，让内容创作更精准触达目标用户" },
      { title: "上下文深度关联", desc: "自动关联过往对话和任务，持续学习你的反馈，输出越来越懂你" },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-base font-semibold text-primary">功能介绍</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            四大核心能力，打造专属运营团队
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            女娲智能编排、顶尖大模型组合拳、小红书深度优化、专属记忆系统——覆盖运营全链路。
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-16">
          {featureSections.map((section) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl sm:rounded-3xl border bg-white p-5 sm:p-8 md:p-10 ${section.border}`}
            >
              <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
                <div className="md:w-1/3 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    {section.icon}
                    <span className="text-xs font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                      {section.role}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{section.name}</h2>
                  <p className="mt-2 text-muted-foreground">{section.tagline}</p>
                  <Link
                    href="/download"
                    className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    开始使用
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                  {section.video && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <video
                        src={section.video}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full aspect-video bg-black"
                      />
                    </div>
                  )}
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  {section.features.map((f) => (
                    <div key={f.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 hover:bg-white hover:shadow-sm transition-all">
                      <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
