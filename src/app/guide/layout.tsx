import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用指南",
  description:
    "ShopLoop AI 教学视频与图文教程，从安装到上手的完整使用指南。",
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
