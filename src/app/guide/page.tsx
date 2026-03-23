"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, MessageSquare, BookOpen, Brain, ImageIcon, PenSquare, Video, Database, MessageCircle, BarChart3 } from "lucide-react";

const R2_BASE = "https://pub-bcbedef262af471aa4b5838cce9ef9e4.r2.dev/videos";

const TUTORIAL_VIDEOS = [
  { title: "产品粗略介绍", desc: "1 分钟了解 ShopLoop AI 是什么", url: `${R2_BASE}/shoploop-intro.mp4` },
  { title: "AI 生图教学", desc: "Nano Banana Pro 文生图、图生图、多轮编辑完整演示", url: `${R2_BASE}/shoploop-image-tutorial.mp4` },
  { title: "功能演示", desc: "ShopLoop AI 核心功能演示", url: `${R2_BASE}/demo.mp4` },
];

const coreGuides = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    color: "purple",
    title: "女娲 · AI 团队编排",
    desc: "用自然语言告诉女娲你的需求，她会自动为你创建最合适的 AI 团队。",
    steps: [
      "打开 ShopLoop AI 客户端，进入对话界面",
      "直接描述你的运营需求，例如「帮我生成一组小红书种草图文」",
      "女娲会根据需求自动调度合适的 AI 能力（生图、文案、数据分析等）",
      "查看生成结果，可以继续对话微调，团队会记住你的偏好",
    ],
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    color: "blue",
    title: "顶尖大模型组合拳",
    desc: "顶尖大模型智能对话 + Nano Banana Pro 生图引擎，每个任务都用最优模型。",
    steps: [
      "顶尖大模型负责文案创作、策略推理、深度分析等语言任务",
      "Nano Banana Pro 引擎负责 AI 生图、图生图、多轮对话编辑等视觉任务",
      "系统根据任务类型自动调度最优模型，无需手动选择",
      "飞书机器人 + 桌面端多入口协同，随时随地管理你的 AI 团队",
    ],
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    color: "rose",
    title: "小红书深度优化",
    desc: "从种草文案到评论截流，全链路覆盖小红书运营。",
    steps: [
      "种草文案：描述产品特点，AI 生成去 AI 味的种草笔记 + 配图",
      "评论截流：指定目标笔记，AI 自动生成自然评论话术进行引流",
      "数据采集：按关键词搜索爆款内容，一键下载到本地知识库",
      "SEO 优化：AI 分析热词并优化笔记标题和正文的关键词布局",
    ],
  },
  {
    icon: <Brain className="w-5 h-5" />,
    color: "emerald",
    title: "专属记忆系统",
    desc: "AI 团队会记住你的品牌调性和偏好，越用越精准。",
    steps: [
      "首次使用时，告诉 AI 你的品牌名称、风格定位、目标人群",
      "每次交互中 AI 会自动学习你的偏好（色调、文案风格、审美取向）",
      "后续任务中 AI 会自动应用记忆，无需重复说明品牌背景",
      "你也可以主动修正记忆，例如「以后生图风格偏日系清新」",
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", light: "bg-purple-50" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", light: "bg-blue-50" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200", light: "bg-rose-50" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", light: "bg-emerald-50" },
};

const scenarioGroups = [
  {
    group: "入门",
    icon: <Sparkles className="w-4 h-4" />,
    items: ["安装与首次启动", "注册与获取邀请码", "认识女娲和你的 AI 团队"],
  },
  {
    group: "生图与创作",
    icon: <ImageIcon className="w-4 h-4" />,
    items: ["Nano Banana Pro 文生图", "图生图与多轮对话编辑", "提示词库与批量生图", "创意模板与风格迁移"],
  },
  {
    group: "小红书运营",
    icon: <BookOpen className="w-4 h-4" />,
    items: ["种草笔记生成（文案+配图）", "评论截流实战", "爆款数据采集与分析", "SEO 关键词优化"],
  },
  {
    group: "内容创作",
    icon: <PenSquare className="w-4 h-4" />,
    items: ["短视频脚本生成", "品牌文案撰写", "电商详情页文案"],
  },
  {
    group: "多端协同",
    icon: <MessageSquare className="w-4 h-4" />,
    items: ["飞书机器人设置与使用", "大模型调度原理", "手机端远程管理团队"],
  },
  {
    group: "进阶功能",
    icon: <Brain className="w-4 h-4" />,
    items: ["专属记忆管理与修正", "竞品分析与战略建议", "常见问题排查"],
  },
];

export default function GuidePage() {
  const [expandedGuide, setExpandedGuide] = useState<number | null>(0);

  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-primary">使用指南</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            快速上手你的 AI 运营团队
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            从安装到精通，掌握女娲团队编排、飞书协同、小红书优化和专属记忆的全部能力。
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-12">
          {/* 教学视频 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">教学视频</h2>
            </div>
            <div className="space-y-8">
              {TUTORIAL_VIDEOS.map((v) => (
                <div key={v.title}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-base font-semibold text-foreground">{v.title}</h3>
                    <span className="text-sm text-muted-foreground">{v.desc}</span>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <video
                      src={v.url}
                      controls
                      preload="metadata"
                      playsInline
                      className="w-full h-full object-contain"
                    >
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 快速开始 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">快速开始</h2>
            </div>
            <div className="space-y-4">
              {[
                { step: "1", title: "安装 Git（必需）", desc: "Windows 用户下载 Git 安装包，macOS 用户终端运行 xcode-select --install" },
                { step: "2", title: "下载 ShopLoop AI", desc: "前往下载页选择对应平台安装包，双击安装" },
                { step: "3", title: "获取邀请码", desc: "扫码添加客服企业微信，备注「ShopLoop」即刻获取" },
                { step: "4", title: "注册并开始", desc: "使用邀请码注册，系统赠送 18,000 对话积分 + 5,000 创作积分，即刻开始使用" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all"
                >
                  前往下载
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 四大核心能力指南 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">核心能力详解</h2>
            </div>

            <div className="space-y-3">
              {coreGuides.map((guide, i) => {
                const colors = colorMap[guide.color];
                const isExpanded = expandedGuide === i;
                return (
                  <div
                    key={guide.title}
                    className={`rounded-2xl border bg-white overflow-hidden transition-all ${isExpanded ? colors.border : 'border-border'}`}
                  >
                    <button
                      onClick={() => setExpandedGuide(isExpanded ? null : i)}
                      className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
                    >
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center flex-shrink-0`}>
                        {guide.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{guide.desc}</p>
                      </div>
                      <svg className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className={`px-5 sm:px-6 pb-5 sm:pb-6`}>
                        <div className={`rounded-xl ${colors.light} p-4 space-y-3`}>
                          {guide.steps.map((step, j) => (
                            <div key={j} className="flex gap-3">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold`}>
                                {j + 1}
                              </div>
                              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* AI 生图引擎对比 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Nano Banana Pro 生图引擎</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { name: "Nano Banana Pro", tag: "AI 生图", desc: "基于 Gemini 驱动，文生图、图生图、多轮对话编辑、高清画质、人脸保持", price: "¥1.00/张" },
              ].map((engine) => (
                <div key={engine.name} className="rounded-xl border border-border/60 bg-gray-50/50 p-4 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{engine.name}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{engine.tag}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{engine.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{engine.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 按场景查看演示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">按场景查看演示</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              我们将按以下场景持续更新视频与图文演示，方便你按需学习。
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {scenarioGroups.map(({ group, icon, items }) => (
                <div key={group} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">{icon}</span>
                    <p className="text-xs font-semibold text-primary">{group}</p>
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 底部 CTA */}
          <div className="text-center space-y-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all"
            >
              免费下载 ShopLoop AI
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-sm text-muted-foreground">
              有问题？<a href="mailto:contact@deepractice.ai" className="text-primary hover:underline">联系我们</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
