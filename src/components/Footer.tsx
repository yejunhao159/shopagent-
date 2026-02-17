import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="text-sm font-semibold text-foreground">ShopAgent</p>
            <p className="mt-1 text-sm text-muted">AI 电商智能助手</p>
          </div>

          <div className="flex gap-16 text-sm">
            <div>
              <p className="font-medium text-foreground">产品</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li><Link href="/features" className="hover:text-foreground">功能</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">定价</Link></li>
                <li><Link href="/download" className="hover:text-foreground">下载</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">公司</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li><Link href="/about" className="hover:text-foreground">关于</Link></li>
                <li><a href="mailto:contact@shopagent.ai" className="hover:text-foreground">联系</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">法律</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li><a href="#" className="hover:text-foreground">用户协议</a></li>
                <li><a href="#" className="hover:text-foreground">隐私政策</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} ShopAgent
        </div>
      </div>
    </footer>
  );
}
