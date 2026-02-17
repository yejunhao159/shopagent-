"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const agentDetails = [
  {
    name: "冠华 · 图片助手",
    role: "Visual Designer",
    tagline: "一张图，搞定全渠道素材",
    border: "border-blue-100",
    gradient: "from-blue-500/10 to-cyan-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </div>
    ),
    features: [
      { title: "AI 换背景", desc: "智能抠图 + 场景生成，从 500+ 电商专属场景库中选择" },
      { title: "AI 换模特", desc: "不用请模特拍摄，AI 生成不同风格的模特展示图" },
      { title: "多平台适配", desc: "一键生成淘宝、抖音、小红书等不同平台尺寸的素材" },
      { title: "批量处理", desc: "上传多张图片，批量完成背景替换和尺寸调整" },
    ],
  },
  {
    name: "时尚CEO · 品牌顾问",
    role: "Strategy Lead",
    tagline: "你的 AI 战略搭档",
    border: "border-purple-100",
    gradient: "from-purple-500/10 to-pink-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
      </div>
    ),
    features: [
      { title: "品牌定位分析", desc: "基于市场数据，帮你找准品牌差异化定位" },
      { title: "竞品分析", desc: "追踪竞品动态，分析价格策略和营销打法" },
      { title: "经营决策建议", desc: "库存管理、上新节奏、促销策略的智能建议" },
      { title: "趋势洞察", desc: "实时追踪时尚趋势，提前布局爆款方向" },
    ],
  },
  {
    name: "剪辑大师 · 视频制作",
    role: "Video Editor",
    tagline: "高效产出爆款短视频",
    border: "border-orange-100",
    gradient: "from-orange-500/10 to-red-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      </div>
    ),
    features: [
      { title: "脚本生成", desc: "根据产品卖点自动生成短视频脚本和分镜" },
      { title: "剪辑建议", desc: "智能分析素材，给出剪辑节奏和转场建议" },
      { title: "内容规划", desc: "制定短视频内容日历，保持稳定更新频率" },
      { title: "热点追踪", desc: "追踪平台热门话题和 BGM，蹭热点不掉队" },
    ],
  },
  {
    name: "种草达人 · 内容创作",
    role: "Content Creator",
    tagline: "篇篇有流量的种草笔记",
    border: "border-green-100",
    gradient: "from-green-500/10 to-teal-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
      </div>
    ),
    features: [
      { title: "爆款文案", desc: "基于平台算法逻辑，生成高互动率的种草文案" },
      { title: "标题优化", desc: "A/B 测试风格的标题建议，提升点击率" },
      { title: "关键词布局", desc: "智能分析搜索热词，优化笔记 SEO" },
      { title: "评论互动", desc: "生成真实感的互动回复，提升笔记权重" },
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
            四个 Agent，覆盖全链路
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            每个 Agent 都在其擅长的领域做到极致，协同配合完成从选品到发布的全流程。
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          {agentDetails.map((agent, idx) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`rounded-3xl border bg-white p-8 md:p-10 ${agent.border}`}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    {agent.icon}
                    <span className="text-xs font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                      {agent.role}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{agent.name}</h2>
                  <p className="mt-2 text-muted-foreground">{agent.tagline}</p>
                  <Link
                    href="/download"
                    className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    开始使用
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  {agent.features.map((f) => (
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
