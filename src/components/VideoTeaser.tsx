"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VIDEOS = [
  {
    title: "产品介绍",
    desc: "1 分钟了解 ShopAgent 是什么",
    duration: "1:00",
    gradient: "from-purple-600/80 to-purple-900/90",
  },
  {
    title: "AI 生图教学",
    desc: "Nano Banana Pro 文生图、图生图演示",
    duration: "3:20",
    gradient: "from-blue-600/80 to-indigo-900/90",
  },
  {
    title: "功能演示",
    desc: "ShopAgent 核心功能完整演示",
    duration: "5:00",
    gradient: "from-orange-600/80 to-rose-900/90",
  },
];

export function VideoTeaser() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="md:flex md:items-end md:justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              视频教程
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              观看视频，快速掌握 ShopAgent 的核心能力。
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              href="/features"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              查看全部功能 &rarr;
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href="/features" className="block group">
                <div
                  className={`aspect-video rounded-2xl bg-gradient-to-br ${v.gradient} relative overflow-hidden cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all shadow-lg">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 text-[11px] font-medium text-white/70 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {v.duration}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-white text-sm font-semibold">{v.title}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{v.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden text-center mt-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            查看全部功能
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
