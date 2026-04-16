import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "下载",
  description:
    "下载 ShopAgent 桌面客户端或浏览器插件，支持 Windows、macOS 和 Chrome，开始 AI 电商运营之旅。",
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
