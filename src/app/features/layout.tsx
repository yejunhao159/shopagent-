import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "功能介绍",
  description:
    "四大核心能力覆盖运营全链路：女娲智能编排、顶尖大模型组合拳、小红书深度优化、专属记忆系统。",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
