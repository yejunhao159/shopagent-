"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const conversations = [
  {
    user: "用 Gemini 引擎帮我把这件大衣的模特换成欧美风格，保持人脸不变",
    agent: "冠华 · 生图专家",
    reply: "已启用 Gemini 人脸保持模式，正在生成欧美风格模特图... 完成，生成了 3 个方案供你选择。",
    agentColor: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    user: "帮我写一篇小红书种草笔记，推这款羊绒大衣的质感，要去 AI 味",
    agent: "小红书种草达人",
    reply: "已生成 3 版笔记，标题方案：「入冬第一件大衣，摸到就不想撒手」预估互动率最高。已做去 AI 味处理。",
    agentColor: "bg-green-50 text-green-700 border-green-100",
  },
  {
    user: "搜一下小红书上最近大衣品类的爆款笔记，下载到知识库",
    agent: "小红书数据采集师",
    reply: "已搜索「大衣」品类近 7 天 TOP 50 笔记，筛选出 12 篇高互动内容，正在下载到本地知识库...",
    agentColor: "bg-sky-50 text-sky-700 border-sky-100",
  },
];

export function ProductDemo() {
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charCount, setCharCount] = useState(0);

  const current = conversations[idx];

  useEffect(() => {
    // Reset typing animation when index changes
    setCharCount(0);
    setTyping(true);
  }, [idx]);

  useEffect(() => {
    if (typing && charCount < current.user.length) {
      const t = setTimeout(() => setCharCount((prev) => prev + 1), 35); // Faster typing
      return () => clearTimeout(t);
    }
    
    if (typing && charCount >= current.user.length) {
      // Finished typing user message, wait a bit then show reply
      const t = setTimeout(() => setTyping(false), 800);
      return () => clearTimeout(t);
    }
    
    if (!typing) {
      // Reply is shown, wait before switching to next conversation
      const t = setTimeout(() => {
        setIdx((prev) => (prev + 1) % conversations.length);
      }, 5000); // Longer read time
      return () => clearTimeout(t);
    }
  }, [typing, charCount, idx, current.user.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto mt-20 max-w-4xl px-4"
    >
      {/* Decorative background glow */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-[3rem]" />
      
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/[0.04]">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-white/50 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
            </div>
            <div className="h-4 w-[1px] bg-border/60 mx-1"></div>
            <span className="text-xs font-medium text-muted-foreground/80 tracking-wide">ShopAgent workspace</span>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.agent}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${current.agentColor}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              {current.agent}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chat Content Area */}
        <div className="min-h-[320px] bg-white/40 p-6 md:p-8 space-y-6 flex flex-col justify-end">
          
          {/* User Message Bubble */}
          <div className="flex justify-end w-full">
            <div className="relative max-w-[85%] md:max-w-[70%]">
              <div className="rounded-2xl rounded-tr-sm bg-black text-white px-5 py-3.5 text-[15px] leading-relaxed shadow-sm">
                {current.user.slice(0, charCount)}
                {typing && (
                  <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-white/50 align-middle" />
                )}
              </div>
              <div className="mt-1 text-right text-[10px] text-muted-foreground/60 font-medium tracking-wide">YOU</div>
            </div>
          </div>

          {/* AI Reply Bubble */}
          <AnimatePresence mode="wait">
            {!typing && (
              <motion.div
                key={`${idx}-reply`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex justify-start w-full"
              >
                <div className="relative max-w-[85%] md:max-w-[70%]">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm mt-1">
                      AI
                    </div>
                    <div>
                       <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-5 py-3.5 text-[15px] text-foreground leading-relaxed shadow-sm">
                        {current.reply}
                      </div>
                      <div className="mt-1.5 flex gap-2">
                         <div className="h-1.5 w-16 bg-slate-200/50 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area (Mock) */}
        <div className="border-t border-border/50 bg-white/60 p-4 backdrop-blur-md">
          <div className="relative flex items-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-3 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-black/5">
            <div className="h-5 w-5 rounded-full border border-border flex items-center justify-center text-muted-foreground">
               <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <span className="text-sm text-muted-foreground/60 select-none">Ask ShopAgent anything...</span>
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