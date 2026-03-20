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

const featureSections = [
  {
    name: "女娲 · AI 团队编排",
    role: "Nuwa Orchestrator",
    tagline: "动态创建最适合你的 AI 运营团队",
    border: "border-purple-100",
    gradient: "from-purple-500/10 to-pink-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Sparkles className="h-6 w-6" /></div>,
    features: [
      { title: "动态 Agent 创建", desc: "根据你的业务场景，女娲自动编排最合适的 AI Agent 组合" },
      { title: "多引擎生图", desc: "Seedream、Z-Image、Gemini、Qwen 四大引擎按需调度，文生图、图生图、中文文字渲染" },
      { title: "智能文案创作", desc: "种草文案、短视频脚本、品牌文案，针对不同平台风格自动适配" },
      { title: "战略分析", desc: "品牌定位、竞品追踪、趋势洞察，AI 帮你做出数据驱动的决策" },
    ],
  },
  {
    name: "顶尖大模型组合拳",
    role: "Claude Sonnet 4.6 + Gemini 3.1 Pro",
    tagline: "全球最强大模型，双引擎智能调度",
    border: "border-blue-100",
    gradient: "from-blue-500/10 to-cyan-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><MessageSquare className="h-6 w-6" /></div>,
    features: [
      { title: "Claude Sonnet 4.6 深度推理", desc: "Anthropic 全球顶尖语言模型，负责文案创作、策略分析、复杂推理等深度任务" },
      { title: "Gemini 3.1 Pro 多模态", desc: "Google 最强多模态模型，驱动图片理解、视觉生成、图文融合" },
      { title: "双模型智能调度", desc: "系统根据任务类型自动选择最优模型，文案用 Claude、视觉用 Gemini" },
      { title: "飞书 + 多端协同", desc: "飞书机器人、桌面端、Web 多入口，随时随地指挥你的 AI 团队" },
    ],
  },
  {
    name: "小红书深度优化",
    role: "XHS Optimizer",
    tagline: "从内容创作到流量获取的全链路优化",
    border: "border-rose-100",
    gradient: "from-rose-500/10 to-orange-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><BookOpen className="h-6 w-6" /></div>,
    features: [
      { title: "爆款种草文案", desc: "基于平台算法逻辑生成高互动率文案，智能去 AI 味，读起来更真实" },
      { title: "评论精准截流", desc: "在热门笔记评论区精准引流，智能生成自然评论话术" },
      { title: "爆款数据采集", desc: "按关键词、品类搜索爆款内容，一键下载到本地知识库" },
      { title: "SEO 关键词布局", desc: "分析搜索热词，优化笔记标题和正文的关键词覆盖率" },
    ],
  },
  {
    name: "专属记忆系统",
    role: "Memory Engine",
    tagline: "越用越懂你的 AI 运营团队",
    border: "border-emerald-100",
    gradient: "from-emerald-500/10 to-teal-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><Brain className="h-6 w-6" /></div>,
    features: [
      { title: "品牌调性记忆", desc: "记住你的品牌风格、色彩偏好、文案调性，每次输出都保持一致" },
      { title: "目标人群画像", desc: "学习你的客户群体特征，让内容创作更精准触达" },
      { title: "风格偏好学习", desc: "持续学习你对生成内容的反馈，输出越来越符合你的品味" },
      { title: "历史上下文关联", desc: "自动关联过往对话和任务，不用每次重复说明背景" },
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
                <div className="md:w-1/3">
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
