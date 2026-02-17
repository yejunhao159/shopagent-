"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/features", label: "功能" },
  { href: "/pricing", label: "定价" },
  { href: "/download", label: "下载" },
  { href: "/about", label: "关于" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md group-hover:shadow-lg transition-shadow"></div>
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            ShopAgent
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[15px] font-medium transition-colors ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            登录
          </Link>
          <Link
            href="/download"
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-white shadow-lg shadow-black/5 hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            免费试用
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-white md:hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    pathname === item.href ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border/50">
                 <Link
                  href="/download"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-lg bg-foreground px-4 py-3 text-center text-sm font-medium text-white"
                >
                  免费试用
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}