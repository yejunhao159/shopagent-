"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const agentDetails = [
  {
    name: "冠华 · 生图专家",
    role: "Image Creator",
    tagline: "4 大引擎，一站式 AI 生图",
    border: "border-blue-100",
    gradient: "from-blue-500/10 to-cyan-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </div>
    ),
    features: [
      { title: "Seedream 量产引擎", desc: "文生图 + 图生图，支持最多 14 张参考图，4K 超高分辨率" },
      { title: "Z-Image 文字渲染", desc: "中英文文字清晰不变形，适合带文字的海报和 Banner" },
      { title: "Gemini 创意编辑", desc: "多轮对话式编辑，人脸保持换装，多种创意模板" },
      { title: "Qwen 多图融合", desc: "1-3 张参考图输入，换装 / 风格迁移 / 物体增删" },
    ],
  },
  {
    name: "服装CEO · 战略顾问",
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
      { title: "竞品追踪", desc: "追踪竞品动态，分析价格策略和营销打法" },
      { title: "经营决策建议", desc: "库存管理、上新节奏、促销策略的智能建议" },
      { title: "趋势洞察", desc: "实时追踪时尚趋势，提前布局爆款方向" },
    ],
  },
  {
    name: "短视频脚本师",
    role: "Video Script",
    tagline: "写出完播率高、能带货的脚本",
    border: "border-orange-100",
    gradient: "from-orange-500/10 to-red-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      </div>
    ),
    features: [
      { title: "带货脚本", desc: "根据产品卖点自动生成短视频脚本，懂平台算法和用户心理" },
      { title: "多平台适配", desc: "抖音、快手、视频号、小红书，不同平台不同风格" },
      { title: "A/B 测试版本", desc: "同一产品生成多版本脚本，方便测试哪个效果更好" },
      { title: "拍摄建议", desc: "配套画面描述、配乐建议和拍摄提示，拿到就能拍" },
    ],
  },
  {
    name: "小红书种草达人",
    role: "XHS Creator",
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
      { title: "智能去 AI 味", desc: "让 AI 生成的内容读起来更真实自然，不像机器写的" },
      { title: "关键词布局", desc: "智能分析搜索热词，优化笔记 SEO 排名" },
      { title: "标题优化", desc: "A/B 测试风格的标题建议，提升点击率" },
    ],
  },
  {
    name: "小红书评论截流师",
    role: "XHS Interceptor",
    tagline: "把别人的流量变成你的客户",
    border: "border-rose-100",
    gradient: "from-rose-500/10 to-pink-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </div>
    ),
    features: [
      { title: "精准截流", desc: "在热门笔记评论区精准引流，评论互动价值是点赞的 4 倍" },
      { title: "话术生成", desc: "根据笔记内容自动生成自然的评论话术，不像广告" },
      { title: "目标筛选", desc: "智能筛选高流量、高相关性的笔记进行截流" },
      { title: "效果追踪", desc: "追踪评论互动数据，持续优化截流策略" },
    ],
  },
  {
    name: "小红书数据采集师",
    role: "XHS Collector",
    tagline: "爆款内容一键入库",
    border: "border-sky-100",
    gradient: "from-sky-500/10 to-blue-500/10",
    icon: (
      <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
      </div>
    ),
    features: [
      { title: "爆款搜索", desc: "按关键词、品类、互动量搜索小红书爆款内容" },
      { title: "内容下载", desc: "一键下载图文内容到本地知识库，方便参考" },
      { title: "趋势分析", desc: "分析品类热度趋势，发现内容创作方向" },
      { title: "素材管理", desc: "采集的素材自动分类整理，随时调用" },
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
            六个 Agent，覆盖全链路
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            每个 Agent 都在其擅长的领域做到极致，协同配合完成从图片生成到内容发布的全流程。
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-16">
          {agentDetails.map((agent, idx) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl sm:rounded-3xl border bg-white p-5 sm:p-8 md:p-10 ${agent.border}`}
            >
              <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
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
