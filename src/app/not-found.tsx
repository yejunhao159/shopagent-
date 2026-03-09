import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-7xl font-bold text-foreground/10">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">页面未找到</h1>
        <p className="mt-2 text-muted-foreground">
          您访问的页面不存在或已被移除
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-white hover:bg-black/80 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
