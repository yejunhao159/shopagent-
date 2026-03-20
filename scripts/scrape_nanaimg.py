#!/usr/bin/env python3
"""Scrape NanaImg.io Nano Banana Pro prompts gallery (all 32 pages)."""

import json
import hashlib
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path
from html import unescape

BASE_DIR = Path(__file__).parent.parent
DOCS_DIR = BASE_DIR / "docs" / "nanaimg"
IMG_DIR = DOCS_DIR / "images"
OUTPUT = DOCS_DIR / "full_data.json"

GALLERY_DIR = BASE_DIR / "public" / "images" / "gallery"

TOTAL_PAGES = 32
BASE_URL = "https://nanaimg.io/nano-banana-pro-prompts/page/{}"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch_page(page_num: int) -> str:
    url = BASE_URL.format(page_num)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8")
    except Exception as e:
        print(f"  Error fetching page {page_num}: {e}")
        return ""


def extract_prompts_from_html(html: str) -> list[dict]:
    """Extract prompt cards from page HTML using regex patterns."""
    results = []

    # Find all CDN image URLs (URL-encoded in Next.js image wrapper)
    img_pattern = re.compile(
        r'cdn\.qwenimageai\.io(?:%2F|/)prompts(?:%2F|/)images(?:%2F|/)([a-f0-9]+)\.jpg'
    )

    # Split by h2 headings to get individual cards
    # Pattern: <h2 ...>TITLE</h2>
    h2_pattern = re.compile(r'<h2[^>]*>(.*?)</h2>', re.DOTALL)
    h2_matches = list(h2_pattern.finditer(html))

    for i, h2_match in enumerate(h2_matches):
        title = re.sub(r'<[^>]+>', '', h2_match.group(1)).strip()
        if title == "NANO BANANA PRO PROMPT GALLERY":
            continue

        # Get the card section (from this h2 to the next h2 or end)
        start = h2_match.start()
        end = h2_matches[i + 1].start() if i + 1 < len(h2_matches) else len(html)
        card_html = html[start:end]

        # Extract author from link with rel="author"
        author_match = re.search(
            r'rel="[^"]*author[^"]*"[^>]*title="@?([^"]+)"', card_html
        )
        author = author_match.group(1) if author_match else ""

        author_url_match = re.search(
            r'<a\s+href="(https://x\.com/[^"]+)"[^>]*rel="[^"]*author', card_html
        )
        author_url = author_url_match.group(1) if author_url_match else ""

        # Extract image URLs from CDN
        images = list(set(img_pattern.findall(card_html)))
        image_urls = [f"https://cdn.qwenimageai.io/prompts/images/{h}.jpg" for h in images]

        # Extract prompt from "Try it now" link's prompt parameter
        prompt_url_match = re.search(
            r'href="[^"]*nano-banana-pro\?prompt=([^"]+)"', card_html
        )
        prompt_from_url = ""
        if prompt_url_match:
            prompt_from_url = urllib.parse.unquote(prompt_url_match.group(1))

        # Also try to extract prompt from visible text after "Original" button
        # The prompt text is typically in a div/span after the button
        prompt_text_match = re.search(
            r'Original</button>\s*(?:<[^>]+>)*\s*(.*?)(?:<button|<a\s+href)',
            card_html, re.DOTALL
        )
        prompt_from_text = ""
        if prompt_text_match:
            raw = prompt_text_match.group(1)
            # Clean HTML tags
            prompt_from_text = re.sub(r'<[^>]+>', '', raw).strip()
            prompt_from_text = unescape(prompt_from_text)

        # Use longer prompt
        prompt = prompt_from_text if len(prompt_from_text) > len(prompt_from_url) else prompt_from_url

        # Detect img2img
        img2img_kws = ['attached image', 'reference image', 'reference photo',
                       'uploaded', 'this image', 'the man from', 'the person',
                       'the woman from', 'your photo', 'your image']
        is_img2img = any(kw in prompt.lower() for kw in img2img_kws)

        if title and (prompt or image_urls):
            item_id = "ni_" + hashlib.md5(title.encode()).hexdigest()[:8]
            results.append({
                "id": item_id,
                "title": title,
                "author": author,
                "author_url": author_url,
                "prompt": prompt,
                "images": image_urls[:2],  # Keep max 2 images
                "img2img": is_img2img,
                "model": "Nano Banana Pro",
            })

    return results


def download_image(url: str, dst: Path) -> bool:
    if dst.exists():
        return True
    import subprocess
    try:
        result = subprocess.run(
            ["curl", "-sS", "-L", "-o", str(dst), "--max-time", "30", url],
            capture_output=True, timeout=35
        )
        if result.returncode == 0 and dst.exists() and dst.stat().st_size > 1000:
            return True
        if dst.exists():
            dst.unlink()
        return False
    except Exception as e:
        print(f"  Failed: {dst.name}: {e}")
        if dst.exists():
            dst.unlink()
        return False


def main():
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    GALLERY_DIR.mkdir(parents=True, exist_ok=True)

    all_prompts = []
    seen_titles = set()

    for page in range(1, TOTAL_PAGES + 1):
        print(f"📄 Fetching page {page}/{TOTAL_PAGES}...")
        html = fetch_page(page)
        if not html:
            continue

        prompts = extract_prompts_from_html(html)
        new_count = 0
        for p in prompts:
            if p["title"] not in seen_titles:
                seen_titles.add(p["title"])
                all_prompts.append(p)
                new_count += 1

        print(f"  Extracted {len(prompts)} prompts, {new_count} new")
        time.sleep(0.5)  # Be polite

    print(f"\n📊 Total unique prompts: {len(all_prompts)}")
    with_prompt = sum(1 for p in all_prompts if p["prompt"])
    img2img_count = sum(1 for p in all_prompts if p["img2img"])
    print(f"  With prompt text: {with_prompt}")
    print(f"  img2img: {img2img_count}")

    # Download first image for each prompt
    print(f"\n🖼️ Downloading images...")
    downloaded = 0
    for p in all_prompts:
        if not p["images"]:
            continue
        img_url = p["images"][0]
        # Save to gallery directly as webp later, for now save jpg
        img_name = p["id"] + ".jpg"
        dst = IMG_DIR / img_name
        if download_image(img_url, dst):
            downloaded += 1
            p["local_image"] = img_name

        if downloaded % 50 == 0 and downloaded > 0:
            print(f"  Downloaded {downloaded} images...")

    print(f"  Total downloaded: {downloaded}")

    # Save data
    with open(OUTPUT, "w") as f:
        json.dump(all_prompts, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Saved {len(all_prompts)} prompts to {OUTPUT}")


if __name__ == "__main__":
    main()
