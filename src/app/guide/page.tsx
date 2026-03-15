"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// 教学视频链接：上线前替换为实际 B 站/YouTube 等地址
const TUTORIAL_VIDEO_URL = ""; // 例如: "https://www.bilibili.com/video/BV1xx411c7mu"
const TUTORIAL_VIDEO_EMBED_URL = ""; // 若有 iframe 嵌入地址可填

export default function GuidePage() {
  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-primary">使用指南</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            从安装到上手
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            通过教学视频与图文教程，快速掌握 ShopLoop AI 桌面端的使用方法。
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-16">
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
            {TUTORIAL_VIDEO_EMBED_URL ? (
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <iframe
                  src={TUTORIAL_VIDEO_EMBED_URL}
                  title="ShopLoop AI 使用教程"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : TUTORIAL_VIDEO_URL ? (
              <a
                href={TUTORIAL_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video rounded-xl overflow-hidden bg-muted border border-border hover:border-primary/40 transition-colors"
              >
                <div className="w-full h-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="font-medium">点击观看教程视频</span>
                </div>
              </a>
            ) : (
              <div className="aspect-video rounded-xl bg-muted/50 border border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <svg className="w-14 h-14 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-sm font-medium">教学视频即将上线</p>
                <p className="text-xs">可在 docs/TUTORIAL.md 中填写视频链接后，于本页配置展示</p>
              </div>
            )}
          </motion.div>

          {/* 教学图文 */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">教学图文</h2>
            </div>
            <div className="prose prose-gray max-w-none space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">一、安装前准备</h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>安装 <strong className="text-foreground">Git</strong>（Windows 用户可前往<a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">官网</a>下载 64 位安装包）。</li>
                  <li>macOS 用户可在终端执行 <code className="px-1.5 py-0.5 bg-muted rounded text-sm">xcode-select --install</code> 安装命令行工具。</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">二、下载并安装 ShopLoop AI</h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>打开<Link href="/download" className="text-primary hover:underline">下载页</Link>，根据系统选择 Windows 或 macOS 安装包。</li>
                  <li>双击安装包，按提示完成安装。</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">三、注册与使用</h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>首次使用需<strong className="text-foreground">邀请码</strong>注册，可扫码添加客服企业微信获取。</li>
                  <li>登录后即可使用对话、生图、提示词库、批量任务等功能。</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground border-t border-border pt-6">
                更详细的图文步骤与截图将随教程视频一并更新，敬请期待。
              </p>
            </div>
          </motion.div>

          {/* 按场景查看演示（与 Issue/ TUTORIAL_SCENARIOS 对齐） */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
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
              我们将按以下场景提供视频与图文演示，方便你按需跳转。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { group: "入门", items: ["安装与首次启动", "注册与登录"] },
                { group: "生图与创作", items: ["文生图", "图生图与多轮编辑", "提示词库与批量生图"] },
                { group: "内容与运营", items: ["小红书种草文案", "短视频脚本", "评论截流", "数据采集"] },
                { group: "进阶", items: ["战略/运营建议", "常见问题"] },
              ].map(({ group, items }) => (
                <div key={group} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs font-semibold text-primary mb-2">{group}</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              场景清单与排期见仓库 <strong className="text-foreground">TUTORIAL_SCENARIOS.md</strong> 及 Issue「教学 · 不同场景演示」。
            </p>
          </motion.div>

          <div className="text-center">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-white hover:bg-black/80 transition-colors"
            >
              前往下载
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
