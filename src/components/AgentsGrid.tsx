"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";
import { ImageIcon, BarChart3, Video, PenSquare, MessageCircle, Database } from "lucide-react";

const agents = [
  {
    name: "冠华 · 生图专家",
    role: "Image Creator",
    desc: "4 大 AI 生图引擎，支持文生图、图生图、多轮对话编辑、中文文字渲染。",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-100",
    icon: <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><ImageIcon className="h-6 w-6" /></div>,
  },
  {
    name: "资深运营 · 战略顾问",
    role: "Strategy Lead",
    desc: "品牌定位分析、竞品追踪、经营决策建议、时尚趋势洞察。",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-100",
    icon: <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><BarChart3 className="h-6 w-6" /></div>,
  },
  {
    name: "短视频脚本师",
    role: "Video Script",
    desc: "懂平台算法和用户心理，写出完播率高、能带货的短视频脚本。",
    gradient: "from-orange-500/10 to-red-500/10",
    border: "border-orange-100",
    icon: <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600"><Video className="h-6 w-6" /></div>,
  },
  {
    name: "小红书种草达人",
    role: "XHS Creator",
    desc: "基于平台算法逻辑，生成高互动率种草文案，智能去 AI 味。",
    gradient: "from-green-500/10 to-teal-500/10",
    border: "border-green-100",
    icon: <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><PenSquare className="h-6 w-6" /></div>,
  },
  {
    name: "小红书评论截流师",
    role: "XHS Interceptor",
    desc: "在热门笔记评论区精准截流，把别人的流量变成你的客户。",
    gradient: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-100",
    icon: <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600"><MessageCircle className="h-6 w-6" /></div>,
  },
  {
    name: "小红书数据采集师",
    role: "XHS Collector",
    desc: "搜索筛选爆款内容，下载保存到本地知识库，为创作提供灵感。",
    gradient: "from-sky-500/10 to-blue-500/10",
    border: "border-sky-100",
    icon: <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600"><Database className="h-6 w-6" /></div>,
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