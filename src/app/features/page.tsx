"use client";

import Link from "next/link";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/Motion";

const agentDetails = [
  {
    name: "冠华 · 图片助手",
    tagline: "一张图，搞定全渠道素材",
    features: [
      { title: "AI 换背景", desc: "智能抠图 + 场景生成，商品图秒变大片" },
      { title: "AI 换模特", desc: "不用请模特拍摄，AI 生成不同风格的模特展示图" },
      { title: "多平台适配", desc: "一键生成淘宝、抖音、小红书等不同平台尺寸的素材" },
      { title: "批量处理", desc: "上传多张图片，批量完成背景替换和尺寸调整" },
    ],
  },
  {
    name: "时尚CEO · 品牌顾问",
    tagline: "你的 AI 战略搭档",
    features: [
      { title: "品牌定位分析", desc: "基于市场数据，帮你找准品牌差异化定位" },
      { title: "竞品分析", desc: "追踪竞品动态，分析价格策略和营销打法" },
      { title: "经营决策建议", desc: "库存管理、上新节奏、促销策略的智能建议" },
      { title: "趋势洞察", desc: "实时追踪时尚趋势，提前布局爆款方向" },
    ],
  },
  {
    name: "剪辑大师 · 视频制作",
    tagline: "高效产出爆款短视频",
    features: [
      { title: "脚本生成", desc: "根据产品卖点自动生成短视频脚本和分镜" },
      { title: "剪辑建议", desc: "智能分析素材，给出剪辑节奏和转场建议" },
      { title: "内容规划", desc: "制定短视频内容日历，保持稳定更新频率" },
      { title: "热点追踪", desc: "追踪平台热门话题和 BGM，蹭热点不掉队" },
    ],
  },
  {
    name: "种草达人 · 内容创作",
    tagline: "篇篇有流量的种草笔记",
    features: [
      { title: "爆款文案", desc: "基于平台算法逻辑，生成高互动率的种草文案" },
      { title: "标题优化", desc: "A/B 测试风格的标题建议，提升点击率" },
      { title: "关键词布局", desc: "智能分析搜索热词，优化笔记 SEO" },
      { title: "评论互动", desc: "生成真实感的互动回复，提升笔记权重" },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pb-12 pt-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInUp>
            <p className="text-sm text-muted">功能介绍</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              四个 Agent，覆盖全链路
            </h1>
          </FadeInUp>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          {agentDetails.map((agent, idx) => (
            <FadeInUp key={agent.name}>
              <div className={`border-t border-border py-16 ${idx === agentDetails.length - 1 ? "border-b" : ""}`}>
                <div className="flex flex-col gap-10 md:flex-row md:items-start">
                  <div className="md:w-1/3">
                    <h2 className="text-xl font-semibold text-foreground">
                      {agent.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{agent.tagline}</p>
                    <Link
                      href="/download"
                      className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      开始使用 →
                    </Link>
                  </div>
                  <StaggerContainer className="grid flex-1 gap-4 sm:grid-cols-2">
                    {agent.features.map((f) => (
                      <StaggerItem key={f.title}>
                        <div className="rounded-lg border border-border bg-surface p-4">
                          <h3 className="text-sm font-medium text-foreground">{f.title}</h3>
                          <p className="mt-1 text-sm text-muted">{f.desc}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>
    </>
  );
}
