"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const conversations = [
  {
    id: 0,
    history: [
      { role: "user", content: "hi" },
      { role: "agent", content: "您好！我是您的视觉引擎顾问，今天想做什么风格的图？" }
    ],
    user: "帮我生成一组高级感的服装模特图，用在小红书首图",
    agent: "视觉引擎 · 极简美学",
    reply: "已调度 Seedream 引擎，为您生成 3 个不同风格的高级感方案：",
    agentColor: "bg-purple-50 text-purple-700 border-purple-100",
    images: [
      { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", label: "方案 A · 极简棚拍" },
      { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", label: "方案 B · 杂志封面" },
      { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop", label: "方案 C · 先锋情绪" },
    ],
    postTitle: "极简风穿搭｜高级感拉满的早秋OOTD",
    postDesc: "今天这套真的是我的心头好！极简的剪裁加上高级的质感，随便一拍就是大片既视感。#极简穿搭 #高级感 #OOTD",
  },
  {
    id: 1,
    history: [
      { role: "user", content: "这件大衣太难拍了，感觉怎么拍都不出效果" },
      { role: "agent", content: "没问题，交给我。您可以上传一张基础的白底图或者随手拍，我来帮您重构场景。" }
    ],
    user: "把这件大衣的模特换成街拍风格，背景要有城市感",
    agent: "视觉引擎 · 场景重构",
    reply: "已使用深度图控制技术，完美保持服装质感，重构城市街拍背景：",
    agentColor: "bg-purple-50 text-purple-700 border-purple-100",
    images: [
      { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop", label: "巴黎街头 · 午后" },
      { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop", label: "纽约都会 · 冷调" },
    ],
    postTitle: "城市漫游指南｜这件大衣太出片了",
    postDesc: "穿上这件大衣，走在城市的街头，感觉自己就是电影女主角。版型绝了，超级显瘦！#城市街拍 #大衣穿搭 #秋冬好物",
  },
  {
    id: 2,
    history: [
      { role: "user", content: "我们要上一批秋季新品的香薰蜡烛和配饰" },
      { role: "agent", content: "收到。香薰和配饰非常适合用带有光影的静物平铺来展现氛围感。需要我提供什么风格的参考？" }
    ],
    user: "生成一组产品平铺摆拍图，秋冬氛围感，适合电商详情页",
    agent: "视觉引擎 · 静物叙事",
    reply: "已生成 3 组具有光影呼吸感的平铺构图，温暖克制：",
    agentColor: "bg-purple-50 text-purple-700 border-purple-100",
    images: [
      { src: "https://images.unsplash.com/photo-1550614000-4b95f4e4bf7e?q=80&w=800&auto=format&fit=crop", label: "构图 A · 留白" },
      { src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop", label: "构图 B · 错落" },
      { src: "https://images.unsplash.com/photo-1434389678369-182328dd7125?q=80&w=800&auto=format&fit=crop", label: "构图 C · 叠层" },
    ],
    postTitle: "提升幸福感的秋冬好物清单",
    postDesc: "给生活加点温度，这些秋冬好物你绝对不能错过。质感满满，看着就让人心情变好。#秋冬好物 #好物分享 #生活美学",
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
    <div className="w-full h-full flex bg-white/60 backdrop-blur-md">
      {/* Left Sidebar (Agents List) - Hidden on small screens to emphasize chat & results */}
      <div className="w-56 shrink-0 bg-white/90 border-r border-border/50 hidden md:flex flex-col">
        <div className="p-4 border-b border-border/30 flex items-center gap-2">
           <div className="h-6 w-6 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">S</div>
           <span className="font-semibold text-sm">ShopLoop AI</span>
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
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col justify-end space-y-6">
          
          {/* History Messages */}
          {current.history.map((msg, i) => (
             <motion.div 
                key={`hist-${current.id}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className="max-w-[85%]">
                 {msg.role === 'user' ? (
                   <div className="rounded-2xl rounded-tr-sm bg-gray-100 text-gray-800 px-4 py-3 text-[14px] leading-relaxed shadow-sm w-fit ml-auto break-words text-left">
                     {msg.content}
                   </div>
                 ) : (
                   <div className="flex items-start gap-3 w-full opacity-70">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold mt-1">AI</div>
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-4 py-3 text-[14px] text-foreground leading-relaxed shadow-sm w-fit max-w-full break-words">
                        {msg.content}
                      </div>
                   </div>
                 )}
               </div>
             </motion.div>
          ))}

          {/* Current User Message typing */}
          <div className="flex justify-end w-full">
            <div className="max-w-[85%]">
              <div className="rounded-2xl rounded-tr-sm bg-purple-600 text-white px-4 py-3 text-[14px] leading-relaxed shadow-sm w-fit ml-auto break-words text-left">
                {current.user.slice(0, charCount)}
                {phase === "typing" && <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-white/50 align-middle" />}
              </div>
            </div>
          </div>

          {/* AI Reply */}
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
                <div className="max-w-[90%] md:max-w-[85%] w-full">
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow-sm mt-1">AI</div>
                    <div className="space-y-3 flex-1">
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-border/50 px-4 py-3 text-[14px] text-foreground leading-relaxed shadow-sm w-fit max-w-full break-words">
                        {current.reply}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

      {/* Right Panel (Results / Drafts) */}
      <div className="w-[320px] shrink-0 bg-gray-50/90 flex flex-col border-l border-border/50">
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
                              <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="avatar" fill className="object-cover" />
                           </div>
                           <span className="text-xs font-medium text-gray-800">ShopLoop 主理人</span>
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
             <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                </div>
                <p className="text-sm text-muted-foreground">等待 AI 生成内容...</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
