"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import allPrompts from "@/data/prompts.json";

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
  { key: "AI生图", label: "更多" },
];

function getPromptText(prompt: string): string {
  // If prompt is JSON, extract key fields for display
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
  const [activeCategory, setActiveCategory] = useState("全部");
  const [visibleCount, setVisibleCount] = useState(12);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredPrompts = useMemo(() => {
    let items = allPrompts as Array<{
      id: string; title: string; author: string; image: string;
      category: string; tags: string[]; prompt: string; prompt_en: string; source: string;
    }>;
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
    return items;
  }, [activeCategory, search]);

  const displayPrompts = filteredPrompts.slice(0, visibleCount);

  const handleCopy = (e: React.MouseEvent, id: string, prompt: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { "全部": allPrompts.length };
    for (const p of allPrompts as Array<{ category: string }>) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

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
              {allPrompts.length.toLocaleString()}+ 精选生图提示词，覆盖电商、品牌、摄影等场景。一键复制，即刻创作。
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
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 sm:p-4">
                  <p className="text-white/90 text-[11px] sm:text-xs text-center line-clamp-4 mb-3 font-medium leading-relaxed">
                    {getPromptText(item.prompt)}
                  </p>
                  <div className="flex gap-2 w-full max-w-[160px]">
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
                    <a
                      href={item.image}
                      download={`prompt-${item.id}.webp`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-md text-white border border-white/40 hover:bg-white/30 rounded-full shrink-0"
                      title="下载图片"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                  </div>
                </div>

                {/* Source badge */}
                <div className="absolute top-2 right-2">
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
    </section>
  );
}
