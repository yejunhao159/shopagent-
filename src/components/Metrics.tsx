"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/Motion";

export function Metrics() {
  return (
    <section className="bg-foreground py-14 sm:py-20 text-white overflow-hidden relative">
       <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
       <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
       <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 text-center">
            {[
              { value: 6, label: "AI 智能体", suffix: "", prefix: "" },
              { value: 4, label: "生图引擎", suffix: "", prefix: "" },
              { value: 40, label: "最低每张图", suffix: "", prefix: "¥0." },
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