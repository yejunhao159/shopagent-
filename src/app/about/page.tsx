"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-base font-semibold text-primary">关于我们</h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            用 AI 重新定义电商运营
          </h1>
        </div>
      </section>

      <section className="pb-16 sm:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          {[
            {
              title: "愿景",
              content: [
                "服装电商商家不应该把大量时间花在重复性的运营工作上。图片处理、文案撰写、视频脚本、数据采集——这些工作耗时耗力，但又不可或缺。",
                "AI 可以成为商家最好的运营搭档。不是替代人，而是让人专注于更有创造力的事情——设计更好的产品、建立更深的客户关系、探索更大的市场机会。",
              ],
            },
            {
              title: "为什么是多 Agent",
              content: [
                "电商运营涉及图片生成、内容创作、数据采集、评论截流、视频脚本、战略分析等多个维度。单一的 AI 助手很难在所有领域都做到专业。",
                "6 个 Agent 协作——每个 Agent 都是各自领域的专家，可以独立工作，也可以协同配合。就像一个高效的运营团队，各司其职，又紧密协作。",
              ],
            },
            {
              title: "技术驱动",
              content: [
                "基于大语言模型和多模态 AI 技术，自研 AgentX 引擎，事件驱动的多 Agent 协作架构。集成 4 大 AI 生图引擎（Seedream、Z-Image、Gemini、Qwen），深度对接小红书平台，持续追踪 AI 前沿。",
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t border-border pt-8"
            >
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              {section.content.map((p, j) => (
                <p key={j} className="mt-4 text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl bg-gray-50 p-6 sm:p-10 text-center"
          >
            <h3 className="text-xl font-bold text-foreground">联系我们</h3>
            <p className="mt-2 text-muted-foreground">有任何问题或合作意向，欢迎随时联系</p>
            <a
              href="mailto:contact@shopagent.ai"
              className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 font-semibold text-white hover:bg-black/80 transition-all"
            >
              contact@shopagent.ai
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
