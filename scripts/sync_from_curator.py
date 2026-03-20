#!/usr/bin/env python3
"""
Sync prompts data from prompt-curator to shopagent-website.

Reads prompt-curator/data/input/prompts-full.json (source of truth)
and writes shopagent-website/src/data/prompts.json (for the website).

Also syncs any missing images from prompt-curator gallery.
"""

import json
import shutil
import random
from pathlib import Path

SHOPAGENT_DIR = Path(__file__).parent.parent
CURATOR_DIR = Path("/Users/yezhi/prompt-curator")

CURATOR_PROMPTS = CURATOR_DIR / "data" / "input" / "prompts-full.json"
CURATOR_GALLERY = CURATOR_DIR / "data" / "images" / "gallery"

SHOPAGENT_OUTPUT = SHOPAGENT_DIR / "src" / "data" / "prompts.json"
SHOPAGENT_GALLERY = SHOPAGENT_DIR / "public" / "images" / "gallery"


def main():
    print("📥 Reading prompt-curator prompts-full.json...")
    with open(CURATOR_PROMPTS) as f:
        data = json.load(f)
    print(f"  Loaded: {len(data)} items")

    # Sync missing images
    print("\n🖼️  Syncing images...")
    copied = 0
    missing = 0
    SHOPAGENT_GALLERY.mkdir(parents=True, exist_ok=True)

    for item in data:
        img_path = item.get("image", "")
        if not img_path:
            continue
        filename = img_path.split("/")[-1]
        src = CURATOR_GALLERY / filename
        dst = SHOPAGENT_GALLERY / filename
        if not dst.exists() and src.exists():
            shutil.copy2(src, dst)
            copied += 1
        elif not dst.exists() and not src.exists():
            missing += 1

    print(f"  Copied: {copied} new images")
    if missing:
        print(f"  Missing from both: {missing}")

    # Apply img2img detection (additional keywords)
    img2img_kws = ['原图', '参考图', '附图', '图一', '图二', '原始图像', 'reference image',
                   '使用原图', 'original image', 'attached', 'uploaded', '上传',
                   '原始照片', 'reference photo', '使用图片', '照片中的', '图中的人',
                   '图片中', 'this image', 'your image', 'your photo', '这张图', '这张照片']

    for p in data:
        if not p.get("img2img") and any(kw in p.get("prompt", "") for kw in img2img_kws):
            p["img2img"] = True

    # Category merge (consolidate small categories)
    category_merge = {"图像编辑": "AI生图", "创意艺术": "AI生图", "漫画动画": "水彩插画"}
    for p in data:
        if p["category"] in category_merge:
            p["category"] = category_merge[p["category"]]

    # Shuffle for diverse display (fixed seed)
    random.seed(42)
    random.shuffle(data)

    # Write output
    with open(SHOPAGENT_OUTPUT, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Stats
    from collections import Counter
    cats = Counter(p["category"] for p in data)
    sources = Counter(p["source"] for p in data)
    img2img_count = sum(1 for p in data if p.get("img2img"))

    print(f"\n✅ Written {len(data)} items to {SHOPAGENT_OUTPUT}")
    print(f"  img2img: {img2img_count}")

    print(f"\n📂 Categories:")
    for cat, count in cats.most_common():
        print(f"  {cat}: {count}")

    print(f"\n📦 Sources:")
    for src, count in sources.most_common():
        print(f"  {src}: {count}")


if __name__ == "__main__":
    main()
