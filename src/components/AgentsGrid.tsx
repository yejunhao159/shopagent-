"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";

const agents = [
  {
    name: "冠华 · 生图专家",
    role: "Image Creator",
    desc: "4 大 AI 生图引擎，支持文生图、图生图、多轮对话编辑、中文文字渲染。",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
       </div>
    )
  },
  {
    name: "资深运营 · 战略顾问",
    role: "Strategy Lead",
    desc: "品牌定位分析、竞品追踪、经营决策建议、时尚趋势洞察。",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
       </div>
    )
  },
  {
    name: "短视频脚本师",
    role: "Video Script",
    desc: "懂平台算法和用户心理，写出完播率高、能带货的短视频脚本。",
    gradient: "from-orange-500/10 to-red-500/10",
    border: "border-orange-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
       </div>
    )
  },
  {
    name: "小红书种草达人",
    role: "XHS Creator",
    desc: "基于平台算法逻辑，生成高互动率种草文案，智能去 AI 味。",
    gradient: "from-green-500/10 to-teal-500/10",
    border: "border-green-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
       </div>
    )
  },
  {
    name: "小红书评论截流师",
    role: "XHS Interceptor",
    desc: "在热门笔记评论区精准截流，把别人的流量变成你的客户。",
    gradient: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
       </div>
    )
  },
  {
    name: "小红书数据采集师",
    role: "XHS Collector",
    desc: "搜索筛选爆款内容，下载保存到本地知识库，为创作提供灵感。",
    gradient: "from-sky-500/10 to-blue-500/10",
    border: "border-sky-100",
    icon: (
       <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
       </div>
    )
  },
];

export function AgentsGrid() {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">专业分工</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            一支配合默契的 AI 专家团队
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            6 个 Agent 各司其职，覆盖图片生成、内容创作、数据采集、评论截流、视频脚本、市场分析全链路。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border bg-white p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/50 ${agent.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  {agent.icon}
                  <span className="text-xs font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">{agent.role}</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed flex-grow">
                  {agent.desc}
                </p>
                
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