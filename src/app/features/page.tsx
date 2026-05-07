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
  Layers,
  Eye,
  MessageSquareQuote,
  ShieldAlert,
  Gauge,
  IdCard,
  Wand2,
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
    features: [
      { title: "品牌调性记忆", desc: "记住你的品牌风格、色彩偏好、文案调性，每次输出都保持一致" },
      { title: "本地知识库", desc: "采集的爆款数据、竞品分析、历史文案全部沉淀到知识库，AI 基于你的数据生成内容" },
      { title: "目标人群画像", desc: "学习你的客户群体特征，让内容创作更精准触达目标用户" },
      { title: "上下文深度关联", desc: "自动关联过往对话和任务，持续学习你的反馈，输出越来越懂你" },
    ],
  },
];

const demoVideos = [
  { title: "女娲 · AI 团队编排", src: `${R2_BASE}/videos/nuwa-intro.mp4` },
  { title: "AI 生图教学", src: `${R2_BASE}/videos/shoploop-image-tutorial.mp4` },
  { title: "记忆系统 + 小红书运营", src: `${R2_BASE}/videos/memory-xhs-demo.mp4` },
];

export default function FeaturesPage() {
  return (
    <div className="bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f7f4] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase mb-4">
              Features
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              五大核心能力，打造专属<span className="font-serif italic">运营团队</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              女娲智能编排、顶尖大模型组合拳、小红书深度运营、数据分析与竞争洞察、专属记忆系统——覆盖运营全链路。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== v0.9.1 三大重磅更新 ===== */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#BD5C3C]/8 text-[#BD5C3C] border border-[#BD5C3C]/20 px-4 py-1.5 text-xs font-semibold mb-4">
              v0.9.1 重磅更新 · 2026-05-08
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
              三大能力<span className="font-serif italic font-normal"> 同步上线</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              沉浸式创作工作台、评论采集飞跃式提速、运营主体记忆中枢，全部加入桌面端
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {/* 卡片 1 — 沉浸式创作 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl border border-[#E2D9CC] bg-[#FBF8F2] p-6 sm:p-10 hover:border-[#BD5C3C]/40 transition-colors duration-300"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#BD5C3C]/10 flex items-center justify-center text-[#BD5C3C]">
                      <Layers className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-[#EDE5DA] px-2 py-1 rounded">
                      Immersive Workspace
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground"><span className="font-serif italic font-normal">沉浸式</span>创作</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    一个角色开多条对话线程，AI 自动看图配文，告别一次性生成、不断切窗的旧工作流。
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BD5C3C]/25 bg-[#BD5C3C]/8 text-[#BD5C3C] px-3 py-1.5 text-xs font-semibold">
                    <Wand2 className="h-3.5 w-3.5" />
                    全新工作流
                  </div>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">多 thread 并行</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      主笔、选题策划师、博主分析师每个角色都能同时挂多条对话，A 笔记打磨中可随手开 B 笔记新对话，互不串味。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">AI 自动看图</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      开局并发下载草稿配图，本地路径直接注入 systemPrompt，子 Agent 真的“看图说话”，封面与正文协同打磨。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquareQuote className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">引用即上下文</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      支持引用爆款笔记，AI 自动看见配图与文案，一键“分析共性”，把对标拆解直接喂给创作。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Wand2 className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">右栏可视化</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      草稿配图可点改图、拖拽排序，生图任务在 ~300px 紧凑右栏实时跑，左聊右创作不打断。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 卡片 2 — 评论采集 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl sm:rounded-3xl border border-[#E2D9CC] bg-[#FBF8F2] p-6 sm:p-10 hover:border-[#BD5C3C]/40 transition-colors duration-300"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#BD5C3C]/10 flex items-center justify-center text-[#BD5C3C]">
                      <Gauge className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-[#EDE5DA] px-2 py-1 rounded">
                      Comment Harvester
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">评论采集<span className="font-serif italic font-normal"> 飞跃</span></h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    全新 header replay 引擎，1000 条评论 100 秒拉完，且无数量上限。竞品评论区不再是黑箱。
                  </p>
                  <div className="mt-5 inline-flex items-baseline gap-2">
                    <span className="text-4xl font-semibold text-[#BD5C3C] tabular-nums">10×</span>
                    <span className="text-sm text-muted-foreground">vs 旧方案</span>
                  </div>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">100 条仅 3 秒</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      旧方案靠真滚轮 + DOM 合并，100 条要 15 秒、1000 条根本拉不完。新签名复用方案 100 条 3 秒、1000 条 100 秒。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">无上限 · 全量模式</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      不再卡 500 条上限，传 0 即“采到 hasMore=false 自然停”。爆款笔记十万评论也能完整入库。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">风控自检</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      命中小红书风控立即停采 + 红色独立态告警，避免账号被进一步限流，自动重新触发新签名续命。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">全局进度浮层</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      挂在主界面顶层的实时浮层：进度条 / shimmer 全量动画 / 风控告警三态自动切换，切页不丢进度。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 卡片 3 — 运营主体 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl sm:rounded-3xl border border-[#E2D9CC] bg-[#FBF8F2] p-6 sm:p-10 hover:border-[#BD5C3C]/40 transition-colors duration-300"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#BD5C3C]/10 flex items-center justify-center text-[#BD5C3C]">
                      <IdCard className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-[#EDE5DA] px-2 py-1 rounded">
                      Operator Profile
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground"><span className="font-serif italic font-normal">运营主体</span>记忆</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    一处填写、全 Agent 同步：账号体量、推广项、品牌调性都进了 AI 的“档案”，按账号当前阶段自动调档生成。
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BD5C3C]/25 bg-[#BD5C3C]/8 text-[#BD5C3C] px-3 py-1.5 text-xs font-semibold">
                    <Brain className="h-3.5 w-3.5" />
                    新版 /profile 页面
                  </div>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">「我的账号」一键同步</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      点 ✨ 按钮，AI 自动同步当前账号的粉丝量、互动率、定位关键词，运营主体随之更新——无需手填。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">按体量调档生成</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AI 知道你是 0-1 起号还是 10w+ 进阶，文案语气、选题难度、互动钩子自动差异化适配。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <PenSquare className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">Auto-save 即所见即所得</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      停手 1.5 秒自动保存；编辑态裸 markdown，浏览态实时渲染 `##/-` 为标题与列表，编辑顺滑且可读。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#E2D9CC] bg-[#F3ECE4]/60 p-5 hover:bg-[#F3ECE4] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-[#BD5C3C]" />
                      <h4 className="text-sm font-semibold text-foreground">支持非电商场景</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      推广项不再绑定“货盘”概念——KOL 个人 IP、本地服务商、知识付费同样能填，运营场景全覆盖。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 数据分析截图展示（放在最前面）===== */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-4 py-1.5 text-xs font-semibold mb-4">
              数据分析能力
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              数据分析<span className="font-serif italic">实战效果</span>
            </h2>
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
              className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
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
                className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
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
                className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
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
                <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">下拉词分析 · AI 需求洞察</h3>
                  <p className="text-sm text-muted-foreground">160+ 高频下拉词深度挖掘，JTBD 任务族分析，商业方向与趋势信号一键生成</p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 text-xs font-semibold">
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
                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">赛道分析 · 机会矩阵</h3>
                  <p className="text-sm text-muted-foreground">需求-供给四象限定位，AI 自动推荐最优赛道与行动计划</p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 text-xs font-semibold">
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
              className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
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

      {/* ===== 五大核心能力（功能卡片，无视频）===== */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-[#f8f7f4]/50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              五大核心<span className="font-serif italic">能力</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">每项能力都为电商运营深度优化</p>
          </div>

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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== 视频演示（放在最后）===== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              视频<span className="font-serif italic">演示</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">观看视频，快速了解 ShopAgent 核心功能</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {demoVideos.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="rounded-t-2xl overflow-hidden">
                  <video
                    src={v.src}
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full aspect-video bg-black"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground">{v.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
