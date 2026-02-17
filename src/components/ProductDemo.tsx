"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const conversations = [
  {
    user: "帮我生成一组高级感的服装模特图，用在小红书首图",
    agent: "冠华 · 生图专家",
    reply: "已用 Seedream + Gemini 双引擎生成 3 个方案，风格各异：",
    agentColor: "bg-blue-50 text-blue-700 border-blue-100",
    images: [
      { src: "/showcase/fashion1.jpg", label: "方案 A · Seedream" },
      { src: "/showcase/fashion3.jpg", label: "方案 B · Gemini" },
      { src: "/showcase/editorial2.jpg", label: "方案 C · Seedream" },
    ],
  },
  {
    user: "把这件大衣的模特换成街拍风格，背景要有城市感",
    agent: "冠华 · 生图专家",
    reply: "已用 Qwen 引擎完成模特替换和背景生成，保持服装不变：",
    agentColor: "bg-blue-50 text-blue-700 border-blue-100",
    images: [
      { src: "/showcase/product1.jpg", label: "原图" },
      { src: "/showcase/fashion4.jpg", label: "街拍风格" },
    ],
  },
  {
    user: "生成一组产品平铺摆拍图，秋冬氛围感，适合电商详情页",
    agent: "冠华 · 生图专家",
    reply: "已生成 3 组不同构图的氛围摆拍，暖色调秋冬风格：",
    agentColor: "bg-blue-50 text-blue-700 border-blue-100",
    images: [
      { src: "/showcase/product2.jpg", label: "构图 A" },
      { src: "/showcase/flatlay1.jpg", label: "构图 B" },
      { src: "/showcase/flatlay2.jpg", label: "构图 C" },
    ],
  },
];

export function ProductDemo() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "reply" | "images">("typing");
  const [charCount, setCharCount] = useState(0);

  const current = conversations[idx];

  useEffect(() => {
    setCharCount(0);
    setPhase("typing");
  }, [idx]);

  useEffect(() => {
    if (phase === "typing" && charCount < current.user.length) {
      const t = setTimeout(() => setCharCount((p) => p + 1), 28);
      return () => clearTimeout(t);
    }
    if (phase === "typing" && charCount >= current.user.length) {
      const t = setTimeout(() => setPhase("reply"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "reply") {
      const t = setTimeout(() => setPhase("images"), 600);
      return () => clearTimeout(t);
    }
    if (phase === "images") {
      const t = setTimeout(() => setIdx((p) => (p + 1) % conversations.length), 6000);
      return () => clearTimeout(t);
    }
  }, [phase, charCount, idx, current.user.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto mt-20 max-w-4xl px-4"
    >
      <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-[3rem]" />

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/[0.04]">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-white/50 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
            </div>
            <div className="h-4 w-[1px] bg-border/60 mx-1" />
            <span className="text-xs font-medium text-muted-foreground/80 tracking-wide">ShopAgent</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.agent}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium ${current.agentColor}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
              </span>
              {current.agent}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chat */}
        <div className="min-h-[460px] bg-white/40 p-6 md:p-8 space-y-5 flex flex-col justify-end">
          {/* User */}
          <div className="flex justify-end w-full">
            <div className="max-w-[85%] md:max-w-[70%]">
              <div className="rounded-2xl rounded-tr-sm bg-black text-white px-5 py-3.5 text-[15px] leading-relaxed shadow-sm">
                {current.user.slice(0, charCount)}
                {phase === "typing" && <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-white/50 align-middle" />}
              </div>
              <div className="mt-1 text-right text-[10px] text-muted-foreground/60 font-medium tracking-wide">YOU</div>
            </div>
          </div>

          {/* AI Reply + Images */}
          <AnimatePresence mode="wait">
            {phase !== "typing" && (
              <motion.div
                key={`${idx}-reply`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-start w-full"
              >
                <div className="max-w-[92%] md:max-w-[85%]">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm mt-1">AI</div>
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-5 py-3.5 text-[15px] text-foreground leading-relaxed shadow-sm">
                        {current.reply}
                      </div>

                      <AnimatePresence>
                        {phase === "images" && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`grid gap-2.5 ${current.images.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                          >
                            {current.images.map((img, i) => (
                              <motion.div
                                key={img.src}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.12, duration: 0.4 }}
                                className="group relative overflow-hidden rounded-xl border border-border/30 bg-white shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                  <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="200px" />
                                </div>
                                <div className="px-2.5 py-2 bg-white">
                                  <span className="text-[11px] font-medium text-muted-foreground">{img.label}</span>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="border-t border-border/50 bg-white/60 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-3 shadow-sm">
            <div className="h-5 w-5 rounded-full border border-border flex items-center justify-center text-muted-foreground">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <span className="text-sm text-muted-foreground/60 select-none">输入你的需求...</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden md:inline-flex items-center rounded border border-border bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘ K</span>
              <div className="h-6 w-6 rounded-md bg-black flex items-center justify-center text-white shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
