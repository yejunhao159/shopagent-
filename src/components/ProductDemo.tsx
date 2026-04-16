"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { conversations } from "@/data/conversations";

export function ProductDemo() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"history" | "typing" | "thinking" | "reply" | "images">("history");
  const [charCount, setCharCount] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(1);

  const current = conversations[idx];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to generate mock timestamps
  const getMockTime = (index: number, total: number) => {
    if (!mounted) return ""; // 避免水合不一致
    const now = new Date();
    // Start from e.g. 10 minutes ago, each message adds 1-2 minutes
    const time = new Date(now.getTime() - (total - index) * 60000);
    // 强制使用统一的格式，避免服务器和客户端区域设置不一致导致报错
    return time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    setCharCount(0);
    setHistoryIndex(1);
    setPhase("history");
  }, [idx]);

  useEffect(() => {
    if (phase === "history") {
      if (historyIndex < current.history.length) {
        // Mock realistic reading/typing delay (user messages slightly faster than agent)
        const delay = current.history[historyIndex].role === 'user' ? 800 : 1500;
        const t = setTimeout(() => setHistoryIndex((p) => p + 1), delay);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("typing"), 500);
        return () => clearTimeout(t);
      }
    }
    if (phase === "typing" && charCount < current.user.length) {
      const t = setTimeout(() => setCharCount((p) => p + 1), 28);
      return () => clearTimeout(t);
    }
    if (phase === "typing" && charCount >= current.user.length) {
      const t = setTimeout(() => setPhase("thinking"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("reply"), 1200);
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
  }, [phase, charCount, historyIndex, idx, current.user.length, current.history]);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [charCount, phase, idx, historyIndex]);

  return (
    <div className="w-full h-full flex bg-white/60 backdrop-blur-md">
      {/* Left Sidebar (Agents List) - Hidden on small screens to emphasize chat & results */}
      <div className="w-56 shrink-0 bg-white/90 border-r border-border/50 hidden md:flex flex-col">
        <div className="p-4 border-b border-border/30 flex items-center gap-2">
           <div className="h-6 w-6 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">S</div>
           <span className="font-semibold text-sm">ShopAgent</span>
        </div>
        <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {["小红书种草达人", "视觉引擎 · 极简美学", "短视频脚本师", "资深运营顾问"].map((agent, i) => (
             <div key={agent} className={`h-12 rounded-lg flex items-center px-3 gap-3 cursor-pointer transition-colors ${i === 0 ? 'bg-purple-50 border border-purple-100' : 'hover:bg-gray-50 border border-transparent'}`}>
                <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${i === 0 ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                  {agent.charAt(0)}
                </div>
                <div className={`text-sm font-medium ${i === 0 ? 'text-purple-700' : 'text-gray-600'}`}>{agent}</div>
             </div>
          ))}
        </div>
      </div>

      {/* Middle Chat Area */}
      <div className="flex-[2] flex flex-col relative bg-[#FDFDFD]/95 min-w-[320px]">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-white/50 px-5 py-3.5 backdrop-blur-sm h-14">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">小红书种草达人</span>
            <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-medium border border-green-100">就绪</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto scrollbar-custom flex flex-col space-y-6 scroll-smooth" id="chat-container">
          <div className="mt-auto flex flex-col space-y-6">
          {/* History Messages */}
          {current.history.slice(0, historyIndex).map((msg, i) => (
             <motion.div 
                key={`hist-${current.id}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className="max-w-[85%] group">
                 {msg.role === 'user' ? (
                   <div className="flex flex-col items-end gap-1">
                     <div className="rounded-2xl rounded-tr-sm bg-gray-100 text-gray-800 px-4 py-3 text-[14px] leading-relaxed shadow-sm w-fit ml-auto break-words text-left">
                       {msg.content}
                       {msg.images && (
                         <div className="flex gap-2 mt-2 flex-wrap">
                           {msg.images.map((img, idx) => (
                             <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                               <Image src={img} alt="reference" fill className="object-cover" />
                             </div>
                           ))}
                         </div>
                       )}
                     </div>
                     <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">{getMockTime(i, current.history.length)}</span>
                   </div>
                 ) : (
                   <div className="flex items-start gap-3 w-full opacity-90">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold mt-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-4 py-3 text-[14px] text-foreground leading-relaxed shadow-sm w-fit max-w-full break-words">
                          {msg.content}
                          {msg.images && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                              {msg.images.map((img, idx) => (
                                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border shadow-sm">
                                  <Image src={img} alt="reference" fill className="object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">{getMockTime(i, current.history.length)}</span>
                      </div>
                   </div>
                 )}
               </div>
             </motion.div>
          ))}

          {/* Current User Message typing */}
          <div className="flex justify-end w-full">
            <div className="max-w-[85%] group">
              <div className="flex flex-col items-end gap-1">
                <div className="rounded-2xl rounded-tr-sm bg-purple-600 text-white px-4 py-3 text-[14px] leading-relaxed shadow-sm w-fit ml-auto break-words text-left">
                  {current.user.slice(0, charCount)}
                  {phase === "typing" && <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-white/50 align-middle" />}
                </div>
                <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">现在</span>
              </div>
            </div>
          </div>

          {/* AI Thinking */}
          <AnimatePresence>
            {phase === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-start w-full"
              >
                <div className="max-w-[90%] md:max-w-[85%] w-full">
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow-sm mt-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-4 py-4 shadow-sm w-fit flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Reply */}
          <AnimatePresence mode="wait">
            {(phase === "reply" || phase === "images") && (
              <motion.div
                key={`${idx}-reply`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-start w-full"
              >
                <div className="max-w-[90%] md:max-w-[85%] w-full group">
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow-sm mt-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                    </div>
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-4 py-3 text-[14px] text-foreground leading-relaxed shadow-sm w-fit max-w-full break-words">
                        {current.reply}
                      </div>
                      <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">现在</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white/60 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-3 shadow-sm focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
            <span className="text-sm text-muted-foreground/60 select-none flex-1">向小红书种草达人发送指令...</span>
            <div className="h-7 w-7 rounded-md bg-purple-600 flex items-center justify-center text-white shadow-sm cursor-pointer hover:bg-purple-700 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Results / Drafts) — hidden on mobile, shown on lg+ */}
      <div className="hidden lg:flex w-[320px] shrink-0 bg-gray-50/90 flex-col border-l border-border/50">
        <div className="flex items-center gap-6 border-b border-border/40 bg-white/50 px-5 h-14 text-sm font-medium text-muted-foreground">
          <div className="text-purple-600 border-b-2 border-purple-600 h-full flex items-center">✨ 生成结果</div>
          <div className="hover:text-foreground cursor-pointer h-full flex items-center">草稿箱</div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
           <AnimatePresence>
              {phase === "images" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Mock XHS Post Card */}
                  <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border/40 overflow-hidden flex flex-col">
                     
                     {/* XHS Top Bar */}
                     <div className="flex items-center justify-between p-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                              <Image src="/images/gallery/la_0508YOAAYQ.webp" alt="avatar" fill className="object-cover" />
                           </div>
                           <span className="text-xs font-medium text-gray-800">ShopAgent 主理人</span>
                        </div>
                        <button className="text-[10px] text-[#ff2442] border border-[#ff2442] px-3 py-0.5 rounded-full font-medium">
                           关注
                        </button>
                     </div>

                     {/* Image Area */}
                     <div className="aspect-[3/4] relative bg-gray-100 group">
                        <Image src={current.images[0].src} alt="Cover" fill className="object-cover" />
                        <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                          1 / {current.images.length}
                        </div>
                        {/* Fake Carousel Dots */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                           {current.images.map((_, dotIdx) => (
                             <div key={dotIdx} className={`h-1.5 rounded-full ${dotIdx === 0 ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`} />
                           ))}
                        </div>
                     </div>

                     {/* Content Area */}
                     <div className="p-4 space-y-3">
                        <h4 className="font-semibold text-sm leading-snug text-gray-900">{current.postTitle}</h4>
                        <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {current.postDesc}
                        </p>
                        
                        {/* Hashtags Mock */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {current.postTitle.includes('极简') ? (
                            <><span className="text-[12px] font-medium text-[#134985]">#极简穿搭</span><span className="text-[12px] font-medium text-[#134985]">#OOTD</span><span className="text-[12px] font-medium text-[#134985]">#高级感</span></>
                          ) : current.postTitle.includes('漫游') ? (
                            <><span className="text-[12px] font-medium text-[#134985]">#街拍</span><span className="text-[12px] font-medium text-[#134985]">#氛围感</span><span className="text-[12px] font-medium text-[#134985]">#周末去哪儿</span></>
                          ) : (
                            <><span className="text-[12px] font-medium text-[#134985]">#静物</span><span className="text-[12px] font-medium text-[#134985]">#好物分享</span><span className="text-[12px] font-medium text-[#134985]">#居家美学</span></>
                          )}
                        </div>

                        {/* XHS Interactions */}
                        <div className="flex items-center gap-4 pt-2 text-gray-500">
                           <div className="flex items-center gap-1.5 hover:text-gray-800 transition-colors cursor-pointer">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                              <span className="text-xs font-medium">1.2w</span>
                           </div>
                           <div className="flex items-center gap-1.5 hover:text-gray-800 transition-colors cursor-pointer">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                              <span className="text-xs font-medium">8k</span>
                           </div>
                           <div className="flex items-center gap-1.5 hover:text-gray-800 transition-colors cursor-pointer">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                              <span className="text-xs font-medium">326</span>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4 border-t border-border/40 mt-2">
                           <button className="flex-1 bg-purple-50 text-purple-600 text-xs font-semibold py-2.5 rounded-lg hover:bg-purple-100 transition-colors">
                             编辑图文
                           </button>
                           <button className="flex-[2] bg-[#ff2442] text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-[#e61e38] shadow-sm transition-colors flex justify-center items-center gap-1">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                             一键发布小红书
                           </button>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
           </AnimatePresence>
           
           {phase !== "images" && (
             <div className="h-full w-full p-4">
                <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border/40 overflow-hidden flex flex-col h-full opacity-60">
                   {/* Top Bar Skeleton */}
                   <div className="flex items-center justify-between p-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-gray-200 animate-shimmer" />
                         <div className="h-3 w-24 bg-gray-200 rounded animate-shimmer" />
                      </div>
                      <div className="h-4 w-10 bg-gray-200 rounded-full animate-shimmer" />
                   </div>

                   {/* Image Area Skeleton */}
                   <div className="aspect-[3/4] bg-gray-100 animate-shimmer relative flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gray-300" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      {phase === "thinking" && (
                         <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="flex gap-1.5 bg-black/40 px-3 py-2 rounded-full shadow-lg">
                               <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                               <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                               <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                         </div>
                      )}
                   </div>

                   {/* Content Area Skeleton */}
                   <div className="p-4 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full animate-shimmer" />
                        <div className="h-3 bg-gray-200 rounded w-5/6 animate-shimmer" />
                        <div className="h-3 bg-gray-200 rounded w-4/6 animate-shimmer" />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-shimmer" />
                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-shimmer" />
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-gray-100">
                         <div className="flex-1 h-8 bg-gray-200 rounded-lg animate-shimmer" />
                         <div className="flex-[2] h-8 bg-gray-200 rounded-lg animate-shimmer" />
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
