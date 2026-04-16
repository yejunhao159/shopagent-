import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "定价方案",
  description:
    "ShopAgent 邀请码 ¥199 开通账号，含体验积分。积分制按量计费，充值永不过期。",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
