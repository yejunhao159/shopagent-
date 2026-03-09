"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type PromptItem = {
  id: string; title: string; author: string; image: string;
  category: string; tags: string[]; prompt: string; prompt_en: string; source: string;
  img2img?: boolean; has_image?: boolean;
};

const categories = [
  { key: "全部", label: "全部" },
  { key: "电商静物", label: "电商静物" },
  { key: "品牌视觉", label: "品牌视觉" },
  { key: "人像摄影", label: "人像摄影" },
  { key: "摄影感", label: "摄影感" },
  { key: "3D渲染", label: "3D渲染" },
  { key: "水彩插画", label: "插画" },
  { key: "数据可视化", label: "数据可视化" },
  { key: "海报设计", label: "海报" },
  { key: "AI生图", label: "AI生图" },
];

function getPromptText(prompt: string): string {
  if (prompt.startsWith("{")) {
    try {
      const obj = JSON.parse(prompt);
      const parts = [
        obj.primary_subject || obj.subject,
        obj.stage_context || obj.context,
        obj.imaging_assumption || obj.style,
      ].filter(Boolean);
      return parts.join(" · ") || prompt.slice(0, 120);
    } catch {
      return prompt.slice(0, 120);
    }
  }
  return prompt.slice(0, 200);
}

export function PromptGallery() {
  const [allPrompts, setAllPrompts] = useState<PromptItem[]>([]);
  const [, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [visibleCount, setVisibleCount] = useState(12);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const COPY_LIMIT = 10;
  const [copyCount, setCopyCount] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("shopagent_copy_count");
    if (stored) {
      setCopyCount(parseInt(stored, 10));
    }
    fetch("/data/prompts.json")
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: PromptItem[]) => { setAllPrompts(data); setLoading(false); })
      .catch((err) => { console.error("Failed to load prompts:", err); setLoading(false); });
  }, []);

  const filteredPrompts = useMemo(() => {
    let items = allPrompts;
    if (activeCategory !== "全部") {
      items = items.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    items = [...items].sort((a, b) => {
      if (a.has_image !== false && b.has_image === false) return -1;
      if (a.has_image === false && b.has_image !== false) return 1;
      return 0;
    });
    return items;
  }, [allPrompts, activeCategory, search]);

  const displayPrompts = filteredPrompts.slice(0, visibleCount);

  const handleCopy = (e: React.MouseEvent, id: string, prompt: string) => {
    e.stopPropagation();

    if (copyCount >= COPY_LIMIT) {
      setShowLimitModal(true);
      return;
    }

    navigator.clipboard.writeText(prompt);
    setCopiedId(id);

    const newCount = copyCount + 1;
    setCopyCount(newCount);
    localStorage.setItem("shopagent_copy_count", newCount.toString());

    setTimeout(() => setCopiedId(null), 2000);
  };

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { "全部": allPrompts.length };
    for (const p of allPrompts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allPrompts]);

  return (
    <section className="py-20 sm:py-24 bg-gray-50/50 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              探索海量<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">高转化提示词</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {allPrompts.length.toLocaleString()}+ 精选生图提示词，覆盖电商、品牌、摄影等场景。一键复制，即刻创作。更多效果图持续更新中。
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="搜索提示词..."
              value={search}
              onChange={e => { setSearch(e.target.value); setVisibleCount(12); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setVisibleCount(12); }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat.key
                  ? "bg-foreground text-white shadow-md"
                  : "bg-white border border-border/60 text-muted-foreground hover:border-purple-200 hover:text-foreground"
              }`}
            >
              {cat.label}
              <span className={`text-xs ${activeCategory === cat.key ? "text-white/70" : "text-muted-foreground/60"}`}>
                {catCounts[cat.key] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayPrompts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="group flex flex-col bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                {item.has_image !== false ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-purple-100/80 flex items-center justify-center">
                      <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                    </div>
                    <span className="text-xs font-medium text-purple-400">敬请期待</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 sm:p-4">
                  <p className="text-white/90 text-[11px] sm:text-xs text-center line-clamp-4 mb-3 font-medium leading-relaxed">
                    {getPromptText(item.prompt)}
                  </p>
                  <div className="flex gap-2 w-full max-w-[160px] justify-center">
                    <button
                      onClick={(e) => handleCopy(e, item.id, item.prompt)}
                      className={`flex-1 py-2 backdrop-blur-md border font-medium text-xs rounded-full flex items-center justify-center gap-1 ${
                        copiedId === item.id
                          ? 'bg-green-500/20 text-green-100 border-green-500/40'
                          : 'bg-white/20 text-white border-white/40 hover:bg-white/30'
                      }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          已复制
                        </>
                      ) : "复制提示词"}
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {item.img2img && (
                    <span className="px-1.5 py-0.5 bg-amber-500/80 backdrop-blur-sm text-[9px] font-medium text-white rounded" title="需上传参考图">
                      img2img
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 bg-black/40 backdrop-blur-sm text-[9px] font-medium text-white/80 rounded">
                    {item.source}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-snug group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-1">
                  <span className="text-[10px] sm:text-xs text-muted-foreground/70 truncate max-w-[120px]">
                    {item.category}
                  </span>
                  <button
                    onClick={(e) => handleCopy(e, item.id, item.prompt)}
                    className="text-purple-600 hover:bg-purple-50 p-1 rounded-md transition-colors"
                    title="复制提示词"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filteredPrompts.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount(v => v + 12)}
              className="px-6 py-3 bg-white border border-border/80 text-sm font-medium text-foreground rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
              加载更多 ({visibleCount} / {filteredPrompts.length})
            </button>
          </div>
        )}
      </div>

      {/* Copy Limit Modal */}
      <AnimatePresence>
        {showLimitModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLimitModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-border/50"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">解锁全部提示词</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  您已体验了 {COPY_LIMIT} 次高级提示词复制。<br/>
                  想要无限制获取海量专业提示词，并在本地一键生成同款大片？
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/download"
                    onClick={() => setShowLimitModal(false)}
                    className="w-full py-3.5 bg-foreground text-white rounded-full font-semibold shadow-lg hover:bg-black/80 hover:scale-[1.02] transition-all"
                  >
                    免费下载客户端
                  </Link>
                  <button
                    onClick={() => setShowLimitModal(false)}
                    className="w-full py-3.5 bg-white text-muted-foreground hover:text-foreground rounded-full font-medium transition-colors"
                  >
                    我再看看
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
