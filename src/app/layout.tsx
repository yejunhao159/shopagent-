import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: "ShopLoop AI - 智能运营助手",
    template: "%s | ShopLoop AI",
  },
  description:
    "面向电商商家与自媒体创作者的 AI 多智能体平台，提供图片处理、内容创作、视频剪辑、账号运营等一站式智能服务",
  metadataBase: new URL("https://shoploopai.com"),
  openGraph: {
    title: "ShopLoop AI - 智能运营助手",
    description:
      "面向电商商家与自媒体创作者的 AI 多智能体平台，提供图片处理、内容创作、视频剪辑、账号运营等一站式智能服务",
    url: "https://shoploopai.com",
    siteName: "ShopLoop AI",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/images/logo-200.png", width: 200, height: 200 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
