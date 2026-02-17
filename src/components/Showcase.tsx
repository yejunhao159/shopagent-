"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  { src: "/showcase/seedream-coat.jpg", engine: "Seedream", label: "模特棚拍" },
  { src: "/showcase/qwen-dress-garden.jpg", engine: "Qwen", label: "场景替换" },
  { src: "/showcase/zimage-poster.jpg", engine: "Z-Image", label: "小红书海报" },
  { src: "/showcase/gemini-street.jpg", engine: "Gemini", label: "街拍风格" },
  { src: "/showcase/seedream-shoes.jpg", engine: "Seedream", label: "白底产品图" },
  { src: "/showcase/zimage-promo.jpg", engine: "Z-Image", label: "促销海报" },
  { src: "/showcase/gemini-flatlay.jpg", engine: "Gemini", label: "平铺摆拍" },
  { src: "/showcase/qwen-cherry.jpg", engine: "Qwen", label: "换背景" },
];

const engineColors: Record<string, string> = {
  Seedream: "bg-blue-50 text-blue-700",
  "Z-Image": "bg-amber-50 text-amber-700",
  Gemini: "bg-violet-50 text-violet-700",
  Qwen: "bg-emerald-50 text-emerald-700",
};

export function Showcase() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-base font-semibold leading-7 text-primary">
            AI 生图作品
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            全部由 ShopAgent 生成
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            4 大引擎各有所长，覆盖服装电商全场景
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {showcaseItems.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  {item.label}
                </span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${engineColors[item.engine]}`}
                >
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
