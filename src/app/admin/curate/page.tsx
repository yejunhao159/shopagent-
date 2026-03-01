"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import allPrompts from "@/data/prompts.json";

type Prompt = {
  id: string | number;
  title: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  prompt: string;
  prompt_en: string;
  source: string;
  img2img?: boolean;
  model?: string;
};

type Rating = "excellent" | "good" | "poor" | "delete" | "";

const STORAGE_KEY = "prompt_ratings";

function loadRatings(): Record<string, Rating> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRatings(ratings: Record<string, Rating>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

const RATING_COLORS: Record<Rating | "", string> = {
  excellent: "bg-green-100 border-green-400 text-green-800",
  good: "bg-blue-100 border-blue-400 text-blue-800",
  poor: "bg-yellow-100 border-yellow-400 text-yellow-800",
  delete: "bg-red-100 border-red-400 text-red-800",
  "": "bg-gray-50 border-gray-200 text-gray-600",
};

const RATING_LABELS: Record<Rating, string> = {
  excellent: "优质",
  good: "合格",
  poor: "待优化",
  delete: "删除",
  "": "",
};

export default function CuratePage() {
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [sourceFilter, setSourceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [img2imgOnly, setImg2imgOnly] = useState(false);
  const [modelFilter, setModelFilter] = useState("all");
  const pageSize = 50;

  useEffect(() => {
    setRatings(loadRatings());
  }, []);

  const prompts = allPrompts as Prompt[];

  const sources = useMemo(() => {
    const s = new Set(prompts.map((p) => p.source));
    return ["all", ...Array.from(s).sort()];
  }, [prompts]);

  const categories = useMemo(() => {
    const c = new Set(prompts.map((p) => p.category));
    return ["all", ...Array.from(c).sort()];
  }, [prompts]);

  const models = useMemo(() => {
    const m = new Set(prompts.map((p) => p.model || "未标注"));
    return ["all", ...Array.from(m).sort()];
  }, [prompts]);

  const filtered = useMemo(() => {
    let items = prompts;
    if (sourceFilter !== "all") items = items.filter((p) => p.source === sourceFilter);
    if (categoryFilter !== "all") items = items.filter((p) => p.category === categoryFilter);
    if (modelFilter !== "all") {
      if (modelFilter === "未标注") items = items.filter((p) => !p.model);
      else items = items.filter((p) => p.model === modelFilter);
    }
    if (img2imgOnly) items = items.filter((p) => p.img2img);
    if (ratingFilter !== "all") {
      if (ratingFilter === "unrated") {
        items = items.filter((p) => !ratings[String(p.id)]);
      } else {
        items = items.filter((p) => ratings[String(p.id)] === ratingFilter);
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.prompt.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return items;
  }, [prompts, sourceFilter, categoryFilter, modelFilter, ratingFilter, search, ratings, img2imgOnly]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const setRating = useCallback(
    (id: string, rating: Rating) => {
      const next = { ...ratings, [id]: rating };
      if (!rating) delete next[id];
      setRatings(next);
      saveRatings(next);
    },
    [ratings]
  );

  const stats = useMemo(() => {
    const total = prompts.length;
    let excellent = 0, good = 0, poor = 0, del = 0;
    for (const r of Object.values(ratings)) {
      if (r === "excellent") excellent++;
      else if (r === "good") good++;
      else if (r === "poor") poor++;
      else if (r === "delete") del++;
    }
    return { total, rated: excellent + good + poor + del, excellent, good, poor, delete: del, unrated: total - excellent - good - poor - del };
  }, [prompts, ratings]);

  const exportRatings = () => {
    const data = prompts
      .filter((p) => ratings[String(p.id)])
      .map((p) => ({
        id: p.id,
        title: p.title,
        source: p.source,
        category: p.category,
        rating: ratings[String(p.id)],
        img2img: p.img2img || false,
      }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt_ratings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-20 px-4 py-3">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold">
              提示词质量标注台{" "}
              <span className="text-sm font-normal text-gray-500">
                {stats.rated}/{stats.total} 已标注
              </span>
            </h1>
            <button
              onClick={exportRatings}
              className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"
            >
              导出标注结果
            </button>
          </div>

          {/* Stats bar */}
          <div className="flex gap-3 text-xs mb-3">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
              优质 {stats.excellent}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              合格 {stats.good}
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
              待优化 {stats.poor}
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
              删除 {stats.delete}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
              未标注 {stats.unrated}
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={sourceFilter}
              onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
              className="text-xs border rounded px-2 py-1.5"
            >
              {sources.map((s) => (
                <option key={s} value={s}>{s === "all" ? "全部来源" : s}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="text-xs border rounded px-2 py-1.5"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "all" ? "全部分类" : c}</option>
              ))}
            </select>
            <select
              value={modelFilter}
              onChange={(e) => { setModelFilter(e.target.value); setPage(1); }}
              className="text-xs border rounded px-2 py-1.5"
            >
              {models.map((m) => (
                <option key={m} value={m}>{m === "all" ? "全部模型" : m}</option>
              ))}
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }}
              className="text-xs border rounded px-2 py-1.5"
            >
              <option value="all">全部评级</option>
              <option value="unrated">未标注</option>
              <option value="excellent">优质</option>
              <option value="good">合格</option>
              <option value="poor">待优化</option>
              <option value="delete">删除</option>
            </select>
            <label className="flex items-center gap-1 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={img2imgOnly}
                onChange={(e) => { setImg2imgOnly(e.target.checked); setPage(1); }}
              />
              仅 img2img
            </label>
            <input
              type="text"
              placeholder="搜索..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="text-xs border rounded px-2 py-1.5 w-48"
            />
            <span className="text-xs text-gray-500 ml-auto">
              {filtered.length} 条结果 | 第 {page}/{totalPages || 1} 页
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto p-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 w-16">图片</th>
              <th className="p-2 w-48">标题</th>
              <th className="p-2 w-20">来源</th>
              <th className="p-2 w-24">模型</th>
              <th className="p-2 w-20">分类</th>
              <th className="p-2">提示词预览</th>
              <th className="p-2 w-16">标签</th>
              <th className="p-2 w-48 text-center">标注</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => {
              const id = String(item.id);
              const rating = ratings[id] || "";
              const isExpanded = expandedId === id;
              return (
                <tr
                  key={id}
                  className={`border-b hover:bg-gray-50 cursor-pointer ${RATING_COLORS[rating]} border-l-4`}
                  onClick={() => setExpandedId(isExpanded ? null : id)}
                >
                  <td className="p-2">
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-14 object-cover rounded"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-2">
                    <div className="font-medium text-gray-900 line-clamp-2">{item.title}</div>
                    {item.img2img && (
                      <span className="text-[10px] px-1 py-0.5 bg-amber-200 text-amber-800 rounded mt-0.5 inline-block">
                        img2img
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-gray-600">{item.source}</td>
                  <td className="p-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      item.model === "Nano Banana Pro" ? "bg-blue-100 text-blue-700" :
                      item.model === "Z-Image" ? "bg-green-100 text-green-700" :
                      item.model === "FLUX" ? "bg-purple-100 text-purple-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {item.model || "未标注"}
                    </span>
                  </td>
                  <td className="p-2 text-gray-600">{item.category}</td>
                  <td className="p-2">
                    {isExpanded ? (
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium text-gray-700 mb-1">中文提示词：</div>
                          <div className="whitespace-pre-wrap text-gray-800 bg-white p-2 rounded border max-h-60 overflow-y-auto">
                            {item.prompt}
                          </div>
                        </div>
                        {item.prompt_en && (
                          <div>
                            <div className="font-medium text-gray-700 mb-1">English Prompt：</div>
                            <div className="whitespace-pre-wrap text-gray-600 bg-white p-2 rounded border max-h-40 overflow-y-auto">
                              {item.prompt_en}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-1 flex-wrap">
                          {item.tags?.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600 line-clamp-2">
                        {item.prompt.slice(0, 120)}...
                      </div>
                    )}
                  </td>
                  <td className="p-2">
                    {rating && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${RATING_COLORS[rating]}`}>
                        {RATING_LABELS[rating]}
                      </span>
                    )}
                  </td>
                  <td className="p-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1 justify-center">
                      {(["excellent", "good", "poor", "delete"] as Rating[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRating(id, rating === r ? "" : r)}
                          className={`px-2 py-1 rounded text-[10px] font-medium border transition-all ${
                            rating === r
                              ? RATING_COLORS[r] + " ring-2 ring-offset-1"
                              : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                          }`}
                        >
                          {RATING_LABELS[r]}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 text-xs border rounded disabled:opacity-30"
          >
            上一页
          </button>
          <span className="text-xs text-gray-500">
            {page} / {totalPages || 1}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-xs border rounded disabled:opacity-30"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
