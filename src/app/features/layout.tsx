import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "功能介绍",
  description:
    "6 个 AI 智能体覆盖电商全链路：图片生成、文案创作、视频脚本、评论截流、数据采集、战略分析。",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
