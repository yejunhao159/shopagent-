import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "定价方案",
  description:
    "ShopLoop AI 积分制按量计费，充值永不过期。注册即送体验积分，免费开始。",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
