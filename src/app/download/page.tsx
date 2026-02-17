"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function useOS() {
  const [os, setOS] = useState<"mac" | "win" | "unknown">("unknown");
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) setOS("mac");
    else if (ua.includes("win")) setOS("win");
  }, []);
  return os;
}

const data = {
  mac: { name: "macOS", version: "v0.5.0", desc: "macOS 12.0+", file: "ShopAgent-0.5.0.dmg", size: "~85 MB", url: "#" },
  win: { name: "Windows", version: "v0.5.0", desc: "Windows 10+", file: "ShopAgent-0.5.0-setup.exe", size: "~95 MB", url: "#" },
};

export default function DownloadPage() {
  const os = useOS();
  const primary = os === "win" ? "win" : "mac";
  const secondary = primary === "mac" ? "win" : "mac";

  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-primary">下载</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            获取 ShopAgent
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            选择你的平台，开始 AI 电商运营之旅
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl sm:rounded-3xl border border-primary/20 bg-white p-6 sm:p-10 text-center shadow-lg shadow-blue-500/5"
          >
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-foreground">
              下载 {data[primary].name} 版
            </h2>
            <p className="mt-2 text-muted-foreground">
              {data[primary].version} · {data[primary].size} · {data[primary].desc}
            </p>
            <a
              href={data[primary].url}
              className="mt-6 inline-block rounded-full bg-foreground px-10 py-3.5 font-semibold text-white shadow-xl hover:bg-black/80 hover:scale-[1.02] transition-all"
            >
              下载 {data[primary].file}
            </a>
            <p className="mt-4 text-xs text-muted-foreground">无需信用卡 · 免费开始</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-5 hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-medium text-foreground">{data[secondary].name}</p>
              <p className="text-sm text-muted-foreground">{data[secondary].version} · {data[secondary].size}</p>
            </div>
            <a href={data[secondary].url} className="text-sm font-semibold text-primary hover:underline underline-offset-4">
              下载
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-5 hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-medium text-foreground">Web 版</p>
              <p className="text-sm text-muted-foreground">无需下载，浏览器直接使用</p>
            </div>
            <a href="#" className="text-sm font-semibold text-primary hover:underline underline-offset-4">
              打开
            </a>
          </motion.div>

          <div className="mt-12 rounded-2xl bg-gray-50 p-6">
            <h3 className="font-semibold text-foreground">系统要求</h3>
            <div className="mt-4 grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
              <div>
                <p className="font-medium text-foreground">macOS</p>
                <p className="mt-1">macOS 12.0+ · Apple Silicon 或 Intel · 4GB+ 内存</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Windows</p>
                <p className="mt-1">Windows 10+ · 64 位 · 4GB+ 内存</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
