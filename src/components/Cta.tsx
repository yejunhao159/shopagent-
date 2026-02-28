"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Cta() {
  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-3xl" />
      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
              准备好升级您的内容工作流了吗？
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto">
              注册即送 54,000 对话积分 + 18,000 创作积分，无需充值即可体验全部功能。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/download"
                className="w-full sm:w-auto rounded-full bg-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/30 hover:bg-purple-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                免费下载试用
              </Link>
              <Link
                href="mailto:contact@deepractice.ai"
                className="w-full sm:w-auto rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-medium text-foreground hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                联系销售团队
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              无需绑定信用卡 · 注册即送积分 · 支持 Windows & macOS
            </p>
          </motion.div>
      </div>
    </section>
  );
}