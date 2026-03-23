"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  Sparkles,
  MessageSquare,
  BookOpen,
  Brain,
  Play,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const DOCS_URL = "https://docs.shoploopai.com";

const R2_BASE = "https://pub-bcbedef262af471aa4b5838cce9ef9e4.r2.dev/videos";

const TUTORIAL_VIDEOS = [
  { title: "产品介绍", desc: "1 分钟了解 ShopLoop AI 是什么", url: `${R2_BASE}/shoploop-intro.mp4`, duration: "1:00" },
  { title: "AI 生图教学", desc: "Nano Banana Pro 文生图、图生图、多轮编辑完整演示", url: `${R2_BASE}/shoploop-image-tutorial.mp4`, duration: "3:20" },
  { title: "功能演示", desc: "ShopLoop AI 核心功能完整演示", url: `${R2_BASE}/demo.mp4`, duration: "5:00" },
];

const capabilities = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    color: "purple",
    title: "女娲 · AI 团队编排",
    desc: "一句话描述需求，女娲自动创建最合适的 AI 团队组合，统筹文案、生图、数据分析等全部能力。",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    color: "blue",
    title: "顶尖大模型 + Nano Banana Pro 生图",
    desc: "顶尖大语言模型驱动智能对话与文案创作，Nano Banana Pro 引擎一键生图、图生图、多轮编辑，系统根据任务自动调度。",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    color: "rose",
    title: "小红书深度优化",
    desc: "去 AI 味种草文案、评论截流、爆款数据采集、SEO 关键词优化，覆盖小红书全链路。",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    color: "emerald",
    title: "专属记忆系统",
    desc: "AI 团队记住你的品牌调性、风格偏好和目标人群，越用越懂你，无需重复说明。",
  },
];

const colorStyles: Record<string, { bg: string; text: string; border: string }> = {
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
};

export default function GuidePage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const switchVideo = useCallback((index: number) => {
    setActiveVideo(index);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, []);

  return (
    <div className="bg-background overflow-hidden">
      {/* ─── Header ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-primary">使用指南</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            快速上手你的 AI 运营团队
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            看视频、跟步骤、5 分钟开始使用。想深入了解？查看完整文档。
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        {/* ─── 教学视频 ─── */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-white p-5 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">教学视频</h2>
                <p className="text-xs text-muted-foreground">看完就会用，持续更新中</p>
              </div>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                key={TUTORIAL_VIDEOS[activeVideo].url}
                src={TUTORIAL_VIDEOS[activeVideo].url}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-contain"
              >
                您的浏览器不支持视频播放
              </video>
            </div>

            <div className="mt-4 mb-5">
              <h3 className="text-lg font-semibold text-foreground">{TUTORIAL_VIDEOS[activeVideo].title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{TUTORIAL_VIDEOS[activeVideo].desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TUTORIAL_VIDEOS.map((v, i) => (
                <button
                  key={v.title}
                  onClick={() => switchVideo(i)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeVideo === i
                      ? "bg-primary/5 border border-primary/20 shadow-sm"
                      : "bg-muted/30 border border-transparent hover:bg-muted/50 hover:border-border"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeVideo === i ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Play className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${activeVideo === i ? "text-primary" : "text-foreground"}`}>
                      {v.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{v.duration}</p>
                  </div>
                  {activeVideo === i && (
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                      播放中
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── 快速开始 ─── */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mb-16">
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
                { step: "1", title: "安装 Git（必需）", desc: "Windows 下载安装包，macOS 终端运行 xcode-select --install" },
                { step: "2", title: "下载 ShopLoop AI", desc: "前往下载页选择对应平台安装包，双击安装" },
                { step: "3", title: "获取邀请码", desc: "扫码添加客服企业微信，备注「ShopLoop」即刻获取" },
                { step: "4", title: "注册并开始", desc: "使用邀请码注册，系统赠送 18,000 对话积分 + 5,000 创作积分，即刻开始" },
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
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── 核心能力卡片 ─── */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">核心能力</h2>
            <p className="mt-2 text-muted-foreground">
              了解 ShopLoop AI 能做什么，点击查看详细教程。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((cap, i) => {
              const cs = colorStyles[cap.color];
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl ${cs.bg} ${cs.text} flex items-center justify-center mb-4`}>
                    {cap.icon}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── 文档站 CTA ─── */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-purple-50 to-white p-8 sm:p-10 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">完整教程文档</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              从入门到精通，包含每个功能的详细图文教程、使用技巧、实战案例和常见问题解答。
            </p>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all"
            >
              前往文档中心
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="text-center space-y-4">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all"
          >
            免费下载 ShopLoop AI
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-muted-foreground">
            有问题？<a href="mailto:contact@deepractice.ai" className="text-primary hover:underline">联系我们</a>
          </p>
        </div>
      </section>
    </div>
  );
}
