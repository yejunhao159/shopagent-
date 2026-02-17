"use client";

import { FadeInUp } from "@/components/Motion";
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
    <>
      <section className="pb-12 pt-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">下载</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              获取 ShopAgent
            </h1>
          </FadeInUp>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <FadeInUp>
            <div className="rounded-xl border border-border bg-surface p-10 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                {data[primary].name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {data[primary].version} · {data[primary].size} · {data[primary].desc}
              </p>
              <a
                href={data[primary].url}
                className="mt-6 inline-block rounded-lg bg-foreground px-8 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-80"
              >
                下载 {data[primary].file}
              </a>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">{data[secondary].name}</p>
                <p className="text-xs text-muted">{data[secondary].version} · {data[secondary].size}</p>
              </div>
              <a href={data[secondary].url} className="text-sm font-medium text-primary hover:underline">
                下载
              </a>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.15}>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Web 版</p>
                <p className="text-xs text-muted">无需下载，浏览器直接使用</p>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                打开
              </a>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="mt-10 border-t border-border pt-8">
              <h3 className="text-sm font-medium text-foreground">系统要求</h3>
              <div className="mt-4 grid gap-6 text-sm text-muted md:grid-cols-2">
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
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
