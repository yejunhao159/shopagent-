import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "用 AI 重新定义电商运营。6 个专业 AI Agent 协同工作，覆盖从图片生成到内容发布的全流程。",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
