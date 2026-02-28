#!/usr/bin/env python3
"""
用 Playwright 批量抓取多个高质量提示词网站的内容和图片
"""
import json, time, re, urllib.request, urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright

WORKSPACE = Path(__file__).resolve().parent.parent
DOCS = WORKSPACE / "docs"


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
        print(f"    FAIL: {e}", flush=True)
        return False


def scroll_and_load(page, max_scrolls=25, wait=1.5):
    prev_h = 0
    for i in range(max_scrolls):
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(wait)
        h = page.evaluate("document.body.scrollHeight")
        # click load more buttons
        for sel in ['button:has-text("加载更多")', 'button:has-text("Load more")', 'button:has-text("Show more")', 'a:has-text("Load more")']:
            btn = page.query_selector(sel)
            if btn and btn.is_visible():
                try:
                    btn.click()
                    time.sleep(2)
                except:
                    pass
        if h == prev_h and i > 3:
            break
        prev_h = h
        if i % 5 == 0:
            print(f"    scroll {i+1}, height={h}", flush=True)


def scrape_nanoprompts(page):
    """抓取 nanoprompts.org"""
    print("\n" + "="*60, flush=True)
    print("抓取 NanoPrompts (nanoprompts.org)", flush=True)
    print("="*60, flush=True)

    out_dir = DOCS / "nanoprompts"
    img_dir = out_dir / "images"
    meta_dir = out_dir / "meta"
    img_dir.mkdir(parents=True, exist_ok=True)
    meta_dir.mkdir(parents=True, exist_ok=True)

    page.goto("https://nanoprompts.org/zh/", wait_until="networkidle", timeout=30000)
    time.sleep(3)
    scroll_and_load(page, max_scrolls=30)

    cards = page.evaluate("""
    () => {
        const results = [];
        const seen = new Set();
        // Try various card selectors
        const containers = document.querySelectorAll('article, [class*="card"], [class*="prompt"], [class*="item"], .grid > div');
        containers.forEach(card => {
            const titleEl = card.querySelector('h2, h3, h4, [class*="title"]');
            const title = titleEl ? titleEl.textContent.trim() : '';
            if (!title || seen.has(title)) return;
            seen.add(title);
            
            const img = card.querySelector('img');
            const imgSrc = img ? (img.src || img.getAttribute('data-src') || '') : '';
            
            // Look for prompt text
            let prompt = '';
            const codeEl = card.querySelector('code, pre, [class*="prompt"], [class*="code"]');
            if (codeEl) prompt = codeEl.textContent.trim();
            if (!prompt) {
                const pEls = card.querySelectorAll('p');
                pEls.forEach(p => {
                    const t = p.textContent.trim();
                    if (t.length > 30 && t.length > prompt.length) prompt = t;
                });
            }
            
            const descEl = card.querySelector('[class*="desc"], [class*="summary"], p');
            const desc = descEl ? descEl.textContent.trim() : '';
            
            if (title && (prompt || imgSrc)) {
                results.push({ title, prompt, desc, imgSrc, imgAlt: img ? img.alt : '' });
            }
        });
        return results;
    }
    """)

    # If card extraction didn't work well, try extracting all visible text blocks
    if len(cards) < 5:
        cards = page.evaluate("""
        () => {
            const results = [];
            const seen = new Set();
            const allImgs = document.querySelectorAll('img');
            allImgs.forEach(img => {
                const src = img.src || '';
                if (!src || src.includes('logo') || src.includes('icon') || src.includes('avatar') || src.includes('data:image')) return;
                const rect = img.getBoundingClientRect();
                if (rect.width < 80 || rect.height < 80) return;
                if (seen.has(src)) return;
                seen.add(src);
                
                let title = img.alt || '';
                let prompt = '';
                let container = img.closest('article, div, section, li');
                if (container) {
                    const h = container.querySelector('h2, h3, h4');
                    if (h) title = h.textContent.trim();
                    const code = container.querySelector('code, pre, [class*="prompt"]');
                    if (code) prompt = code.textContent.trim();
                    if (!prompt) {
                        const ps = container.querySelectorAll('p');
                        ps.forEach(p => { 
                            const t = p.textContent.trim(); 
                            if (t.length > prompt.length && t.length > 20) prompt = t;
                        });
                    }
                }
                if (title || prompt) {
                    results.push({ title: title || 'untitled', prompt, desc: '', imgSrc: src, imgAlt: img.alt || '' });
                }
            });
            return results;
        }
        """)

    print(f"  找到 {len(cards)} 个提示词条目", flush=True)
    return save_items(cards, out_dir, img_dir, meta_dir, "NanoPrompts")


def scrape_gemnana(page):
    """抓取 gemnana.com"""
    print("\n" + "="*60, flush=True)
    print("抓取 Gem Nana (gemnana.com/image/)", flush=True)
    print("="*60, flush=True)

    out_dir = DOCS / "gemnana"
    img_dir = out_dir / "images"
    meta_dir = out_dir / "meta"
    img_dir.mkdir(parents=True, exist_ok=True)
    meta_dir.mkdir(parents=True, exist_ok=True)

    page.goto("https://gemnana.com/image/", wait_until="networkidle", timeout=30000)
    time.sleep(3)
    scroll_and_load(page, max_scrolls=40, wait=2)

    cards = page.evaluate("""
    () => {
        const results = [];
        const seen = new Set();
        const containers = document.querySelectorAll('article, [class*="card"], [class*="prompt"], [class*="item"], .grid > div, [class*="post"]');
        containers.forEach(card => {
            const titleEl = card.querySelector('h2, h3, h4, [class*="title"], a[href]');
            let title = titleEl ? titleEl.textContent.trim() : '';
            if (!title || title.length < 3 || seen.has(title)) return;
            seen.add(title);
            
            const img = card.querySelector('img');
            const imgSrc = img ? (img.src || img.getAttribute('data-src') || '') : '';
            
            let prompt = '';
            const codeEl = card.querySelector('code, pre, [class*="prompt"]');
            if (codeEl) prompt = codeEl.textContent.trim();
            
            const link = card.querySelector('a[href]');
            const href = link ? link.href : '';
            
            if (imgSrc && !imgSrc.includes('data:image') && !imgSrc.includes('logo')) {
                results.push({ title, prompt, desc: '', imgSrc, imgAlt: img ? img.alt : '', href });
            }
        });
        return results;
    }
    """)

    print(f"  列表页找到 {len(cards)} 个条目", flush=True)

    # Visit detail pages to get full prompts (sample first 50)
    detail_items = []
    for i, card in enumerate(cards[:80]):
        href = card.get('href', '')
        if not href or not href.startswith('http'):
            detail_items.append(card)
            continue

        try:
            page.goto(href, wait_until="networkidle", timeout=15000)
            time.sleep(1)
            detail = page.evaluate("""
            () => {
                let prompt = '';
                const codeEls = document.querySelectorAll('code, pre, [class*="prompt"], [class*="code-block"]');
                codeEls.forEach(el => {
                    const t = el.textContent.trim();
                    if (t.length > prompt.length) prompt = t;
                });
                if (!prompt) {
                    const pEls = document.querySelectorAll('p, [class*="content"]');
                    pEls.forEach(p => {
                        const t = p.textContent.trim();
                        if (t.length > 50 && t.length > prompt.length && !t.includes('©')) prompt = t;
                    });
                }
                
                const imgs = document.querySelectorAll('img');
                let bestImg = '';
                imgs.forEach(img => {
                    const src = img.src || '';
                    if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar') && !src.includes('data:image')) {
                        const r = img.getBoundingClientRect();
                        if (r.width > 200) bestImg = src;
                    }
                });
                
                return { prompt, imgSrc: bestImg };
            }
            """)
            card['prompt'] = detail.get('prompt', '') or card.get('prompt', '')
            if detail.get('imgSrc'):
                card['imgSrc'] = detail['imgSrc']
        except Exception as e:
            print(f"    skip detail {i}: {e}", flush=True)

        detail_items.append(card)
        if i % 10 == 0:
            print(f"    [{i+1}/{min(len(cards),80)}] 获取详情...", flush=True)

    print(f"  获取到 {len(detail_items)} 个完整条目", flush=True)
    return save_items(detail_items, out_dir, img_dir, meta_dir, "GemNana")


def scrape_aibars(page):
    """抓取 aibars.net"""
    print("\n" + "="*60, flush=True)
    print("抓取 AIBARS (aibars.net/zh/prompt/image)", flush=True)
    print("="*60, flush=True)

    out_dir = DOCS / "aibars"
    img_dir = out_dir / "images"
    meta_dir = out_dir / "meta"
    img_dir.mkdir(parents=True, exist_ok=True)
    meta_dir.mkdir(parents=True, exist_ok=True)

    page.goto("https://www.aibars.net/zh/prompt/image", wait_until="networkidle", timeout=30000)
    time.sleep(3)
    scroll_and_load(page)

    cards = page.evaluate("""
    () => {
        const results = [];
        const seen = new Set();
        const containers = document.querySelectorAll('article, [class*="card"], [class*="prompt"], [class*="item"], .grid > div');
        containers.forEach(card => {
            const titleEl = card.querySelector('h2, h3, h4, [class*="title"]');
            let title = titleEl ? titleEl.textContent.trim() : '';
            if (!title || title.length < 3 || seen.has(title)) return;
            seen.add(title);
            
            const img = card.querySelector('img');
            const imgSrc = img ? (img.src || img.getAttribute('data-src') || '') : '';
            
            let prompt = '';
            const codeEl = card.querySelector('code, pre, [class*="prompt"]');
            if (codeEl) prompt = codeEl.textContent.trim();
            if (!prompt) {
                const ps = card.querySelectorAll('p');
                ps.forEach(p => { const t = p.textContent.trim(); if (t.length > prompt.length && t.length > 20) prompt = t; });
            }
            
            if (imgSrc && !imgSrc.includes('data:image')) {
                results.push({ title, prompt, desc: '', imgSrc, imgAlt: img ? img.alt : '' });
            }
        });
        return results;
    }
    """)

    print(f"  找到 {len(cards)} 个条目", flush=True)
    return save_items(cards, out_dir, img_dir, meta_dir, "AIBARS")


def scrape_imagepromptlib(page):
    """抓取 imagepromptlibrary.com"""
    print("\n" + "="*60, flush=True)
    print("抓取 Image Prompt Library (imagepromptlibrary.com)", flush=True)
    print("="*60, flush=True)

    out_dir = DOCS / "imagepromptlib"
    img_dir = out_dir / "images"
    meta_dir = out_dir / "meta"
    img_dir.mkdir(parents=True, exist_ok=True)
    meta_dir.mkdir(parents=True, exist_ok=True)

    page.goto("https://imagepromptlibrary.com/", wait_until="networkidle", timeout=30000)
    time.sleep(3)
    scroll_and_load(page)

    cards = page.evaluate("""
    () => {
        const results = [];
        const seen = new Set();
        const containers = document.querySelectorAll('article, [class*="card"], [class*="prompt"], [class*="item"], .grid > div, [class*="post"]');
        containers.forEach(card => {
            const titleEl = card.querySelector('h2, h3, h4, [class*="title"]');
            let title = titleEl ? titleEl.textContent.trim() : '';
            if (!title || title.length < 3 || seen.has(title)) return;
            seen.add(title);
            
            const img = card.querySelector('img');
            const imgSrc = img ? (img.src || img.getAttribute('data-src') || '') : '';
            
            let prompt = '';
            const codeEl = card.querySelector('code, pre, [class*="prompt"]');
            if (codeEl) prompt = codeEl.textContent.trim();
            
            const link = card.querySelector('a[href]');
            const href = link ? link.href : '';
            
            if (title) {
                results.push({ title, prompt, desc: '', imgSrc, imgAlt: img ? img.alt : '', href });
            }
        });
        return results;
    }
    """)

    # Get detail pages for full prompts
    for i, card in enumerate(cards[:60]):
        href = card.get('href', '')
        if not href or not href.startswith('http'):
            continue
        try:
            page.goto(href, wait_until="networkidle", timeout=15000)
            time.sleep(1)
            detail = page.evaluate("""
            () => {
                let prompt = '';
                const codeEls = document.querySelectorAll('code, pre, [class*="prompt"], blockquote');
                codeEls.forEach(el => {
                    const t = el.textContent.trim();
                    if (t.length > prompt.length) prompt = t;
                });
                
                const imgs = document.querySelectorAll('img');
                let bestImg = '';
                imgs.forEach(img => {
                    const src = img.src || '';
                    if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('data:image')) {
                        const r = img.getBoundingClientRect();
                        if (r.width > 200) bestImg = src;
                    }
                });
                return { prompt, imgSrc: bestImg };
            }
            """)
            if detail.get('prompt'):
                card['prompt'] = detail['prompt']
            if detail.get('imgSrc'):
                card['imgSrc'] = detail['imgSrc']
        except:
            pass
        if i % 10 == 0:
            print(f"    [{i+1}/{min(len(cards),60)}] 获取详情...", flush=True)

    print(f"  找到 {len(cards)} 个条目", flush=True)
    return save_items(cards, out_dir, img_dir, meta_dir, "ImagePromptLib")


def save_items(items, out_dir, img_dir, meta_dir, source):
    saved = 0
    for item in items:
        title = item.get('title', 'untitled')
        fname = safe_name(title)
        if not fname:
            continue

        # Save image
        img_url = item.get('imgSrc', '')
        if img_url and img_url.startswith('http'):
            ext = 'png'
            for e in ['webp', 'jpg', 'jpeg', 'png', 'gif']:
                if f'.{e}' in img_url.lower():
                    ext = e
                    break
            img_file = img_dir / f"{fname}.{ext}"
            download_img(img_url, img_file)

        # Save meta
        meta = {
            'title': title,
            'prompt_origin': item.get('prompt', ''),
            'prompt_cn': '',
            'source': source,
            'description': item.get('desc', ''),
        }
        meta_file = meta_dir / f"{fname}.json"
        meta_file.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
        saved += 1

    # Save full data
    full_path = out_dir / "full_data.json"
    full_path.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')

    print(f"  ✅ 保存 {saved} 个条目到 {out_dir}", flush=True)
    return saved


def main():
    print("="*60, flush=True)
    print("批量抓取高质量提示词网站", flush=True)
    print("="*60, flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        totals = {}
        
        try:
            totals['NanoPrompts'] = scrape_nanoprompts(page)
        except Exception as e:
            print(f"  NanoPrompts 失败: {e}", flush=True)
            totals['NanoPrompts'] = 0

        try:
            totals['GemNana'] = scrape_gemnana(page)
        except Exception as e:
            print(f"  GemNana 失败: {e}", flush=True)
            totals['GemNana'] = 0

        try:
            totals['AIBARS'] = scrape_aibars(page)
        except Exception as e:
            print(f"  AIBARS 失败: {e}", flush=True)
            totals['AIBARS'] = 0

        try:
            totals['ImagePromptLib'] = scrape_imagepromptlib(page)
        except Exception as e:
            print(f"  ImagePromptLib 失败: {e}", flush=True)
            totals['ImagePromptLib'] = 0

        browser.close()

    print("\n" + "="*60, flush=True)
    print("抓取完成!", flush=True)
    for site, count in totals.items():
        print(f"  {site}: {count} 个", flush=True)
    print("="*60, flush=True)


if __name__ == "__main__":
    main()
