import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700" />
              <span className="text-lg font-bold text-foreground">ShopAgent</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI 驱动的服装电商智能运营平台，6 个 Agent 覆盖全链路。
            </p>
          </div>

          <div className="flex gap-16 text-sm">
            <div>
              <p className="font-semibold text-foreground">产品</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">功能</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">定价</Link></li>
                <li><Link href="/download" className="hover:text-foreground transition-colors">下载</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">公司</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">关于</Link></li>
                <li><a href="mailto:contact@shopagent.ai" className="hover:text-foreground transition-colors">联系</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">法律</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">用户协议</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} ShopAgent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
