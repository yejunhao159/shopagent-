"use client";

import Image from "next/image";
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
    name: "数据分析与竞争洞察",
    role: "Data Analytics Engine",
    tagline: "笔记分享量 · 博主分析 · 赛道分析 · 竞争定位，全方位数据驱动运营决策",
    border: "border-orange-100",
    gradient: "from-orange-500/10 to-amber-500/10",
    icon: <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600"><BarChart3 className="h-6 w-6" /></div>,
    features: [
      { title: "博主深度分析", desc: "AI 自动生成博主画像，包含选题策略、标题公式、视觉风格、高频话题等全维度拆解" },
      { title: "多博主管理", desc: "批量管理对标博主，按粉丝数、互动率排序，实时追踪竞品动态" },
      { title: "竞争定位对比", desc: "多维度对标头部账号，对比互动率、爆文率、均转等核心指标，生成能力雷达图" },
      { title: "下拉词深度挖掘", desc: "全量采集搜索下拉词，AI 自动分析需求洞察、商业方向与趋势信号" },
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
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
              功能介绍
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              五大核心能力，打造专属运营团队
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              女娲智能编排、顶尖大模型组合拳、小红书深度运营、数据分析与竞争洞察、专属记忆系统——覆盖运营全链路。
            </p>
          </motion.div>
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
              className={`group rounded-2xl sm:rounded-3xl border bg-white p-5 sm:p-8 md:p-10 ${section.border} hover:shadow-lg transition-shadow duration-300`}
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
                  <p className="mt-2 text-muted-foreground leading-relaxed">{section.tagline}</p>
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
                    <div key={f.title} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-5 hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all duration-200">
                      <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {section.video && (
                <div className="mt-6 sm:mt-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <video
                    src={section.video}
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full aspect-video bg-black"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 数据分析截图展示 */}
      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 px-4 py-1.5 text-xs font-semibold mb-4 shadow-sm">
              0.8.2 重磅更新
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">数据分析实战效果</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              独家获取笔记分享量数据，全方位博主画像、赛道竞争定位、多智能体深度分析
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* 博主深度分析 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl border border-purple-100 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">博主深度分析</h3>
                  <p className="text-sm text-muted-foreground">AI 自动生成博主画像、选题策略、标题公式、视觉风格全维度拆解</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/blogger-analysis-top.png" alt="博主分析 - 内容概览与选题策略" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/blogger-analysis-mid.png" alt="博主分析 - 标题公式与视觉风格" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/blogger-analysis-bottom.png" alt="博主分析 - 高频话题与数据趋势" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

            {/* 多博主管理 & 爆款库 */}
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl sm:rounded-3xl border border-blue-100 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">多博主管理</h3>
                    <p className="text-xs text-muted-foreground">批量管理对标博主，实时追踪竞品动态</p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/blogger-management.png" alt="博主管理界面" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl sm:rounded-3xl border border-amber-100 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">爆款库采集</h3>
                    <p className="text-xs text-muted-foreground">按关键词搜索采集爆款笔记，一键复刻</p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/viral-library.png" alt="爆款库采集界面" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
              </motion.div>
            </div>

            {/* 下拉词分析 + AI 需求洞察 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-5 sm:p-8 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">下拉词分析 · AI 需求洞察</h3>
                  <p className="text-sm text-muted-foreground">160+ 高频下拉词深度挖掘，JTBD 任务族分析，商业方向与趋势信号一键生成</p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-teal-100 text-teal-700 px-3 py-1 text-xs font-semibold">
                  全新功能
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/dropdown-keyword-analysis.png" alt="下拉词高频热词与 AI 需求洞察报告" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-teal-50/50 border-t border-gray-100">
                    <p className="text-xs font-medium text-foreground">高频热词 + JTBD 任务族分析</p>
                    <p className="text-xs text-muted-foreground mt-0.5">跨策略交叉命中，按商业潜力排序，自动评估蓝海程度</p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/business-direction-trends.png" alt="商业方向与趋势信号分析" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-teal-50/50 border-t border-gray-100">
                    <p className="text-xs font-medium text-foreground">商业方向 + 趋势信号</p>
                    <p className="text-xs text-muted-foreground mt-0.5">AI 推导引流→培育→转化全链路，识别痛点细分化与消费趋势</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 赛道分析 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">赛道分析 · 机会矩阵</h3>
                  <p className="text-sm text-muted-foreground">需求-供给四象限定位，AI 自动推荐最优赛道与行动计划</p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold">
                  全新功能
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/track-analysis-matrix.png" alt="赛道机会矩阵 - 蓝海红海定位" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-indigo-50/50 border-t border-gray-100">
                    <p className="text-xs font-medium text-foreground">机会矩阵 + 需求族分析</p>
                    <p className="text-xs text-muted-foreground mt-0.5">自动评估蓝海/红海程度，量化需求与供给比</p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/track-analysis-action-plan.png" alt="AI 赛道推荐与行动计划" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-indigo-50/50 border-t border-gray-100">
                    <p className="text-xs font-medium text-foreground">AI 赛道推荐 + 行动计划</p>
                    <p className="text-xs text-muted-foreground mt-0.5">切入策略、内容方向、变现路径、避坑指南一键生成</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 竞争定位 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl border border-rose-100 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">对标头部账号 · 竞争定位</h3>
                  <p className="text-sm text-muted-foreground">多维度对比核心指标，AI 生成对比分析报告与差异化运营建议</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/competitor-comparison.png" alt="对标博主对比 - 数据维度" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group/img">
                  <Image src="/images/features/ai-comparison-report.png" alt="AI 对比分析报告" width={800} height={500} className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
