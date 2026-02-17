"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const conversations = [
  {
    user: "帮我把这件连衣裙的背景换成春日樱花场景",
    agent: "冠华 · 图片助手",
    reply: "已识别商品主体，正在生成樱花场景背景... 完成。已生成 3 个方案供你选择。",
  },
  {
    user: "分析一下最近小红书上大衣品类的爆款趋势",
    agent: "时尚CEO · 品牌顾问",
    reply: "近 7 天大衣品类 TOP 50 笔记分析完成：羊绒材质占比 62%，焦糖色系互动率最高...",
  },
  {
    user: "写一篇种草笔记，主推这款羊绒大衣的质感",
    agent: "种草达人 · 内容创作",
    reply: "已生成 3 版笔记，标题 A/B 方案：「入冬第一件大衣，摸到就不想撒手」互动预估最高。",
  },
];

export function ProductDemo() {
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charCount, setCharCount] = useState(0);

  const current = conversations[idx];

  useEffect(() => {
    if (typing && charCount < current.user.length) {
      const t = setTimeout(() => setCharCount(charCount + 1), 45);
      return () => clearTimeout(t);
    }
    if (typing && charCount >= current.user.length) {
      const t = setTimeout(() => setTyping(false), 600);
      return () => clearTimeout(t);
    }
    if (!typing) {
      const t = setTimeout(() => {
        setTyping(true);
        setCharCount(0);
        setIdx((idx + 1) % conversations.length);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [typing, charCount, idx, current.user.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
      className="mx-auto mt-16 max-w-3xl"
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/[0.08]">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-border bg-[#fafafa] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-3 text-xs text-muted">ShopAgent</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="rounded bg-[#f0f0f0] px-2 py-0.5">{current.agent}</span>
          </div>
        </div>

        {/* Chat area */}
        <div className="space-y-4 p-6">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-md rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-white">
              {current.user.slice(0, charCount)}
              {typing && (
                <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-white/70 align-middle" />
              )}
            </div>
          </div>

          {/* Agent reply */}
          <motion.div
            key={`${idx}-reply`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: typing ? 0 : 1, y: typing ? 8 : 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-start"
          >
            <div className="max-w-md rounded-2xl rounded-tl-sm bg-[#f5f5f5] px-4 py-2.5 text-sm text-foreground">
              {current.reply}
            </div>
          </motion.div>
        </div>

        {/* Input bar */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-[#fafafa] px-3 py-2 text-sm text-muted">
            输入消息...
            <span className="ml-auto text-xs text-border">⌘ Enter</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
