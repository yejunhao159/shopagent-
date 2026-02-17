"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    src: "/showcase/seedream-coat.jpg",
    engine: "Seedream",
    label: "模特棚拍",
    desc: "文生图 · 驼色羊绒大衣",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/showcase/qwen-cherry.jpg",
    engine: "Qwen",
    label: "场景替换",
    desc: "图生图 · 樱花园背景",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/showcase/zimage-poster.jpg",
    engine: "Z-Image",
    label: "小红书海报",
    desc: "文生图 · 中文文字渲染",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/showcase/gemini-street.jpg",
    engine: "Gemini",
    label: "街拍风格",
    desc: "文生图 · 时尚编辑模板",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/showcase/seedream-dress.jpg",
    engine: "Seedream",
    label: "商品展示",
    desc: "文生图 · 红色晚礼服",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/showcase/gemini-flatlay.jpg",
    engine: "Gemini",
    label: "平铺摆拍",
    desc: "文生图 · 产品氛围图",
    aspect: "aspect-square",
  },
  {
    src: "/showcase/seedream-shoes.jpg",
    engine: "Seedream",
    label: "白底产品图",
    desc: "文生图 · 电商主图",
    aspect: "aspect-square",
  },
];

const engineColors: Record<string, string> = {
  Seedream: "bg-blue-50 text-blue-700 border-blue-200",
  "Z-Image": "bg-amber-50 text-amber-700 border-amber-200",
  Gemini: "bg-violet-50 text-violet-700 border-violet-200",
  Qwen: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function Showcase() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">AI 生图作品</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            全部由 ShopAgent 生成
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            4 大引擎各有所长，从白底产品图到小红书海报，覆盖服装电商全场景。
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {showcaseItems.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50"
            >
              <div className={`relative ${item.aspect} overflow-hidden`}>
                <Image
                  src={item.src}
                  alt={item.desc}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className="text-white/70 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${engineColors[item.engine]}`}>
                  {item.engine}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
