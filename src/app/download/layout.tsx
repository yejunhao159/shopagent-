import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "下载",
  description:
    "下载 ShopLoop AI 桌面客户端，支持 Windows 和 macOS，开始 AI 电商运营之旅。",
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
