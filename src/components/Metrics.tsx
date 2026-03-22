"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/Motion";

export function Metrics() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-foreground to-gray-900 py-16 sm:py-24 text-white overflow-hidden relative">
       <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]"></div>
       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl" />
       <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
       <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 text-center">
            {[
              { value: 0, label: "AI 运营团队", suffix: "", prefix: "", text: "专属你的" },
              { value: 0, label: "生图引擎", suffix: "", prefix: "", text: "Nano Banana Pro" },
              { value: 3, label: "协同入口", suffix: "", prefix: "", text: "多端" },
              { value: 0, label: "充值积分", suffix: "", prefix: "", text: "永不过期" },
            ].map((m) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                  {m.text ? m.text : <CountUp target={m.value} prefix={m.prefix} suffix={m.suffix} />}
                </div>
                <div className="text-sm md:text-base text-gray-400 font-medium">{m.label}</div>
              </motion.div>
            ))}
          </div>
       </div>
    </section>
  );
}