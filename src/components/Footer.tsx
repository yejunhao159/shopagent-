import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0A0908] text-[#FBF8F2]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/images/logo-200.png" alt="ShopAgent Logo" width={28} height={28} className="rounded-lg object-contain" />
              <span className="text-lg font-semibold tracking-tight">ShopAgent</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[#FBF8F2]/55 leading-relaxed">
              <span className="font-serif italic text-[#BD5C3C]/90">女娲</span>为你打造专属 AI 运营团队 — 沉浸式创作、深度数据、记忆中枢。
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-10 sm:gap-16 text-sm">
            <div>
              <p className="font-semibold tracking-wide text-[#FBF8F2] uppercase text-xs">产品</p>
              <ul className="mt-4 space-y-3 text-[#FBF8F2]/55">
                <li><Link href="/features" className="hover:text-[#FBF8F2] transition-colors">功能</Link></li>
                <li><Link href="/pricing" className="hover:text-[#FBF8F2] transition-colors">定价</Link></li>
                <li><Link href="/download" className="hover:text-[#FBF8F2] transition-colors">下载</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-[#FBF8F2] uppercase text-xs">公司</p>
              <ul className="mt-4 space-y-3 text-[#FBF8F2]/55">
                <li><Link href="/about" className="hover:text-[#FBF8F2] transition-colors">关于</Link></li>
                <li><a href="mailto:contact@deepractice.ai" className="hover:text-[#FBF8F2] transition-colors">联系</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-[#FBF8F2] uppercase text-xs">法律</p>
              <ul className="mt-4 space-y-3 text-[#FBF8F2]/40">
                <li><span className="cursor-default">用户协议（即将上线）</span></li>
                <li><span className="cursor-default">隐私政策（即将上线）</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 border-t border-[#FBF8F2]/10 pt-6 sm:pt-8 text-xs text-[#FBF8F2]/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} ShopAgent. All rights reserved.</span>
          <span className="font-serif italic">Built with care.</span>
        </div>
      </div>
    </footer>
  );
}
