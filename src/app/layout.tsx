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
    "女娲为你打造专属 AI 运营团队。顶尖大模型驱动对话 + Nano Banana Pro 一键生图，专属记忆越用越懂你，小红书深度优化助力爆款。",
  metadataBase: new URL("https://shoploopai.com"),
  openGraph: {
    title: "ShopLoop AI - 智能运营助手",
    description:
      "女娲为你打造专属 AI 运营团队。顶尖大模型驱动对话 + Nano Banana Pro 一键生图，专属记忆越用越懂你，小红书深度优化助力爆款。",
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
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
