"use client";

import { FadeInUp } from "@/components/Motion";

export default function AboutPage() {
  return (
    <>
      <section className="pb-12 pt-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">关于</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              用 AI 重新定义电商运营
            </h1>
          </FadeInUp>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <FadeInUp>
            <div className="border-t border-border pt-10">
              <h2 className="text-lg font-semibold text-foreground">愿景</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                服装电商商家不应该把大量时间花在重复性的运营工作上。图片处理、文案撰写、视频制作、数据分析——这些工作耗时耗力，但又不可或缺。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                AI 可以成为商家最好的运营搭档。不是替代人，而是让人专注于更有创造力的事情——设计更好的产品、建立更深的客户关系、探索更大的市场机会。
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="border-t border-border mt-10 pt-10">
              <h2 className="text-lg font-semibold text-foreground">为什么是多 Agent</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                电商运营涉及视觉、文案、策略、数据等多个维度。单一的 AI 助手很难在所有领域都做到专业。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                多 Agent 协作——每个 Agent 都是各自领域的专家，可以独立工作，也可以协同配合。就像一个高效的运营团队。
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="border-t border-border mt-10 pt-10">
              <h2 className="text-lg font-semibold text-foreground">技术</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                基于大语言模型和多模态 AI 技术，自研 AgentX 引擎，事件驱动的多 Agent 协作架构。持续追踪 AI 前沿，确保商家用上最好的能力。
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="border-t border-border mt-10 pt-10">
              <h2 className="text-lg font-semibold text-foreground">联系</h2>
              <p className="mt-4 text-sm text-muted">
                <a href="mailto:contact@shopagent.ai" className="text-primary hover:underline">
                  contact@shopagent.ai
                </a>
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
