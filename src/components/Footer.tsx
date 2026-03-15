import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 sm:gap-12 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/images/logo-200.png" alt="ShopLoop AI Logo" width={28} height={28} className="rounded-lg shadow-sm object-cover" />
              <span className="text-lg font-bold text-foreground">ShopLoop AI</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI 驱动的服装电商智能运营平台，6 个 Agent 覆盖全链路。
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8 sm:gap-16 text-sm">
            <div>
              <p className="font-semibold text-foreground">产品</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">功能</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">定价</Link></li>
                <li><Link href="/download" className="hover:text-foreground transition-colors">下载</Link></li>
                <li><Link href="/guide" className="hover:text-foreground transition-colors">使用指南</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">公司</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">关于</Link></li>
                <li><a href="mailto:contact@deepractice.ai" className="hover:text-foreground transition-colors">联系</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">法律</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li><span className="text-muted-foreground/60 cursor-default">用户协议（即将上线）</span></li>
                <li><span className="text-muted-foreground/60 cursor-default">隐私政策（即将上线）</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 border-t border-border/40 pt-6 sm:pt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} ShopLoop AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
