#!/usr/bin/env python3
"""
用 Playwright 自动化浏览器抓取 YouMind 水彩类提示词页面的图片
"""
import json, time, re, urllib.request, urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright

WORKSPACE = Path(__file__).resolve().parent.parent
OUT_DIR = WORKSPACE / "docs" / "youmind_watercolor" / "images"
META_DIR = WORKSPACE / "docs" / "youmind_watercolor" / "meta"
OUT_DIR.mkdir(parents=True, exist_ok=True)

URL = "https://youmind.com/zh-CN/nano-banana-pro-prompts?categories=watercolor"


def safe_name(title, maxlen=60):
    out = []
    for c in title:
        if c.isalnum() or '\u4e00' <= c <= '\u9fff' or c in '_-':
            out.append(c)
        else:
            if out and out[-1] != '_':
                out.append('_')
    return ''.join(out).strip('_')[:maxlen] or 'unnamed'


def download_img(url, dest):
    if dest.exists() and dest.stat().st_size > 0:
        return True
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            dest.write_bytes(resp.read())
        return True
    except Exception as e:
        print(f"  FAIL download: {e}", flush=True)
        return False


def main():
    print("启动 Playwright 浏览器...", flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        print(f"访问 {URL}", flush=True)
        page.goto(URL, wait_until="networkidle", timeout=30000)
        time.sleep(3)

        # Scroll to load all content
        print("滚动加载所有内容...", flush=True)
        prev_count = 0
        for scroll_round in range(30):
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(1.5)

            # Check for "Load more" button
            load_more = page.query_selector('button:has-text("加载更多"), button:has-text("Loading more"), button:has-text("Load")')
            if load_more and load_more.is_visible():
                try:
                    load_more.click()
                    time.sleep(2)
                except:
                    pass

            # Count current images
            imgs = page.query_selector_all('img[src*="youmind"], img[src*="storage"], img[src*="cdn"], img[src*="nano"]')
            current = len(imgs)
            if current == prev_count and scroll_round > 5:
                break
            prev_count = current
            if scroll_round % 5 == 0:
                print(f"  第{scroll_round+1}次滚动, 找到 {current} 张图片", flush=True)

        # Extract all prompt cards with images
        print("\n提取图片和提示词...", flush=True)

        # Use JavaScript to extract image URLs and associated data
        cards_data = page.evaluate("""
        () => {
            const results = [];
            // Find all card/prompt containers
            const allImgs = document.querySelectorAll('img');
            const seen = new Set();
            
            allImgs.forEach(img => {
                const src = img.src || img.getAttribute('data-src') || '';
                if (!src || src.includes('avatar') || src.includes('logo') || src.includes('icon') || 
                    src.includes('favicon') || src.length < 20 || seen.has(src) ||
                    src.includes('data:image')) return;
                
                // Check if it's a prompt-related image (usually larger)
                const rect = img.getBoundingClientRect();
                if (rect.width < 100 || rect.height < 100) return;
                
                seen.add(src);
                
                // Try to find associated title
                let title = img.alt || '';
                let container = img.closest('article, [class*="card"], [class*="prompt"], div');
                if (container) {
                    const h3 = container.querySelector('h3, h2, [class*="title"]');
                    if (h3) title = h3.textContent.trim();
                }
                
                results.push({
                    src: src,
                    alt: img.alt || '',
                    title: title,
                    width: img.naturalWidth || rect.width,
                    height: img.naturalHeight || rect.height,
                });
            });
            return results;
        }
        """)

        print(f"找到 {len(cards_data)} 张可下载图片", flush=True)

        downloaded = 0
        for idx, card in enumerate(cards_data):
            src = card['src']
            title = card['title'] or card['alt'] or f"watercolor_{idx+1}"
            fname = safe_name(title)

            # Determine extension
            ext = 'png'
            if '.jpg' in src or '.jpeg' in src:
                ext = 'jpg'
            elif '.webp' in src:
                ext = 'webp'
            elif '.png' in src:
                ext = 'png'

            img_file = OUT_DIR / f"{fname}.{ext}"
            print(f"  [{idx+1}/{len(cards_data)}] {title[:40]}...", flush=True)

            if download_img(src, img_file):
                downloaded += 1

        browser.close()

    print(f"\n✅ 完成! 下载了 {downloaded}/{len(cards_data)} 张图片", flush=True)
    print(f"   保存在: {OUT_DIR}", flush=True)


if __name__ == "__main__":
    main()
