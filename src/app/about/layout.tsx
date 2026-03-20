import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "用 AI 重新定义电商运营。女娲智能编排 AI 团队，Claude Sonnet 4.6 + Gemini 3.1 Pro 驱动，专属记忆越用越懂你。",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
