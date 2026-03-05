"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function useOS() {
  const [os, setOS] = useState<"mac" | "win" | "unknown">("unknown");
  const [arch, setArch] = useState<"arm" | "x64" | "unknown">("unknown");
  
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) {
      setOS("mac");
      if (ua.includes("arm") || navigator.platform.includes("Mac") && navigator.maxTouchPoints > 2) {
         setArch("arm");
      } else {
         setArch("x64");
      }
    }
    else if (ua.includes("win")) setOS("win");
  }, []);
  
  return { os, arch };
}

const DOWNLOAD_BASE = "https://download.yongs.top/shopagent-desktop";

type PlatformFile = {
  platform: string;
  file: string;
  size: string;
  available: boolean;
};

type VersionInfo = {
  version: string;
  date: string;
  changelog: string;
  platforms: PlatformFile[];
};

const GIT_DOWNLOAD_URL = `${DOWNLOAD_BASE}/git/Git-2.49.0-64-bit.exe`;

const versions: VersionInfo[] = [
  {
    version: "0.5.4",
    date: "2026-03-04",
    changelog: "新增 macOS 支持，性能优化，修复已知问题",
    platforms: [
      { platform: "Windows x64", file: "ShopAgent-0.5.4-windows-x64-setup.exe", size: "~310 MB", available: true },
      { platform: "macOS (Apple Silicon) DMG", file: "ShopAgent-0.5.4-mac-arm64-2026-03-04.dmg", size: "~280 MB", available: true },
      { platform: "macOS (Apple Silicon) ZIP", file: "ShopAgent-0.5.4-mac-arm64-2026-03-04.zip", size: "~280 MB", available: true },
    ],
  },
  {
    version: "0.5.3",
    date: "2026-02-28",
    changelog: "性能优化，修复已知问题，提升生图速度",
    platforms: [
      { platform: "Windows x64", file: "ShopAgent-0.5.3-windows-x64-setup.exe", size: "308 MB", available: true },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-02-16",
    changelog: "全新 UI 改版，新增批量生图、提示词库功能",
    platforms: [
      { platform: "Windows x64", file: "ShopAgent-0.5.0-windows-x64-setup.exe", size: "355 MB", available: true },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-02-07",
    changelog: "新增多 Agent 协同、小红书一键发布",
    platforms: [
      { platform: "Windows x64", file: "ShopAgent-0.4.0-windows-x64-setup.exe", size: "~300 MB", available: true },
    ],
  },
  {
    version: "0.3.5",
    date: "2026-02-03",
    changelog: "修复图片生成偶发失败的问题",
    platforms: [
      { platform: "Windows x64", file: "ShopAgent-0.3.5-windows-x64-setup.exe", size: "~280 MB", available: true },
    ],
  },
  {
    version: "0.3.4",
    date: "2026-02-01",
    changelog: "优化启动速度，减少内存占用",
    platforms: [
      { platform: "Windows x64", file: "ShopAgent-0.3.4-windows-x64-setup.exe", size: "~280 MB", available: true },
    ],
  },
];

const latest = versions[0];

function getDownloadUrl(version: string, file: string) {
  return `${DOWNLOAD_BASE}/${version}/${file}`;
}

export default function DownloadPage() {
  const { os, arch } = useOS();
  const [showHistory, setShowHistory] = useState(false);

  const latestWin = latest.platforms.find(p => p.platform === "Windows x64");
  const latestMacDmg = latest.platforms.find(p => p.platform.includes("DMG"));
  const latestMacZip = latest.platforms.find(p => p.platform.includes("ZIP"));

  let primary = latestWin!;
  let primaryLabel = "Windows";
  if (os === "mac") {
    primary = latestMacDmg!;
    primaryLabel = "macOS (Apple Silicon)";
  }

  const otherPlatforms = latest.platforms.filter(p => p !== primary);

  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-primary">下载</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            获取 ShopLoop AI
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            选择你的平台，开始 AI 电商运营之旅
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-2xl px-6">
          {/* Latest Version - Primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl sm:rounded-3xl border border-primary/20 bg-white p-6 sm:p-10 text-center shadow-lg shadow-blue-500/5"
          >
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-700">最新版本</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-foreground">
              v{latest.version} · {primaryLabel}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              发布于 {latest.date} · {latest.changelog}
            </p>

            {primary.available ? (
              <a
                href={getDownloadUrl(latest.version, primary.file)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-10 py-3.5 font-semibold text-white shadow-xl hover:bg-black/80 hover:scale-[1.02] transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载 {primary.file}
              </a>
            ) : (
              <div className="mt-6 inline-block rounded-full bg-gray-200 px-10 py-3.5 font-semibold text-gray-500 cursor-not-allowed">
                macOS 版即将上线
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              {primary.available ? `${primary.size} · ` : ""}邀请码注册 · 免费开始
            </p>
          </motion.div>

          {/* Other platforms for latest */}
          {otherPlatforms.map((item, index) => (
            <motion.div
              key={item.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="mt-3 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                  {item.platform.includes("Windows") ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.platform}</p>
                  <p className="text-xs text-muted-foreground">v{latest.version} · {item.size}</p>
                </div>
              </div>
              {item.available ? (
                <a href={getDownloadUrl(latest.version, item.file)} className="text-sm font-semibold text-primary hover:underline underline-offset-4">
                  下载
                </a>
              ) : (
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">即将上线</span>
              )}
            </motion.div>
          ))}

          {/* Installation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 rounded-2xl sm:rounded-3xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground">安装引导</h3>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">先安装 Git（必需）</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ShopLoop AI 依赖 Git 进行模型管理和版本控制，请先安装 Git。
                  </p>
                  <a
                    href={GIT_DOWNLOAD_URL}
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white px-5 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载 Git (Windows 64位)
                  </a>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    macOS 用户可通过终端运行 <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">xcode-select --install</code> 安装
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">安装 ShopLoop AI</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    下载上方安装包，双击运行安装程序，按提示完成安装即可。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">获取邀请码</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    注册需要邀请码，请扫码添加客服企业微信获取。
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold">4</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">启动并注册</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    打开 ShopLoop AI，使用邀请码注册账号即可免费使用，新用户赠送体验积分。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invitation Code - WeChat QR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-4 rounded-2xl sm:rounded-3xl border border-green-200 bg-green-50/50 p-6 sm:p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.108.24-.243 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zM14.022 13.248c.533 0 .963.44.963.982a.973.973 0 01-.963.982.973.973 0 01-.963-.982c0-.542.43-.982.963-.982zm4.827 0c.533 0 .963.44.963.982a.973.973 0 01-.963.982.973.973 0 01-.963-.982c0-.542.43-.982.963-.982z"/>
              </svg>
              <h3 className="text-lg font-bold text-foreground">获取邀请码</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              注册 ShopLoop AI 需要邀请码，扫码添加客服企业微信即可免费获取
            </p>
            <div className="inline-block rounded-2xl bg-white p-3 shadow-sm border border-gray-100">
              <Image
                src="/images/wechat-work-qr.jpg"
                alt="添加客服企业微信获取邀请码"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              扫码添加企业微信 · 备注「ShopLoop」· 即刻获取邀请码
            </p>
          </motion.div>

          {/* Web Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Web 版</p>
                <p className="text-xs text-muted-foreground">无需下载，浏览器直接使用</p>
              </div>
            </div>
            <a href="#" className="text-sm font-semibold text-primary hover:underline underline-offset-4">
              打开
            </a>
          </motion.div>

          {/* Version History Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {showHistory ? "收起历史版本" : `查看历史版本 (${versions.length - 1} 个)`}
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-2">
                    {versions.slice(1).map((ver) => (
                      <div
                        key={ver.version}
                        className="rounded-2xl border border-gray-200 bg-white overflow-hidden"
                      >
                        <div className="px-6 py-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-foreground">v{ver.version}</span>
                              <span className="text-xs text-muted-foreground">{ver.date}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{ver.changelog}</p>
                          <div className="flex flex-wrap gap-2">
                            {ver.platforms.map((p) => (
                              <a
                                key={p.file}
                                href={p.available ? getDownloadUrl(ver.version, p.file) : undefined}
                                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                  p.available
                                    ? "border-gray-200 text-foreground hover:border-purple-300 hover:bg-purple-50"
                                    : "border-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {p.platform} · {p.size}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* System Requirements */}
          <div className="mt-8 rounded-2xl bg-gray-50 p-6">
            <h3 className="font-semibold text-foreground">系统要求</h3>
            <div className="mt-4 grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
              <div>
                <p className="font-medium text-foreground">macOS</p>
                <p className="mt-1">macOS 12.0+ · Apple Silicon · 4GB+ 内存</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Windows</p>
                <p className="mt-1">Windows 10+ · 64 位 · 4GB+ 内存</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-medium text-foreground text-sm">前置依赖</p>
              <p className="mt-1 text-sm">需要安装 <a href={GIT_DOWNLOAD_URL} className="text-primary hover:underline font-medium">Git</a> 用于模型管理和版本控制</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
