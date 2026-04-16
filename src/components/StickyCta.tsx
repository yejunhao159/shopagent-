"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** 移动端吸底 CTA：仅在首页且滚动过 Hero 后显示，减少移动端流失 */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || pathname !== "/") return;
    const onScroll = () => setShow(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, pathname]);

  const isHome = pathname === "/";

  return (
    <AnimatePresence>
      {mounted && isHome && show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-[env(safe-area-inset-bottom)] pt-2 px-4 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        >
          <Link
            href="/download"
            className="block w-full rounded-full bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-all"
          >
            下载 ShopAgent
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
