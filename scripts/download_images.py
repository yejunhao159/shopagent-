#!/usr/bin/env python3
"""Download images from GemNana and AIBARS, convert to optimized webp."""

import json
import os
import sys
import time
import hashlib
import asyncio
import aiohttp
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("⚠️  Pillow not installed, will save original format")

BASE_DIR = Path(__file__).parent.parent
GALLERY_DIR = BASE_DIR / "public" / "images" / "gallery"
DOCS_DIR = BASE_DIR / "docs"

WEBP_QUALITY = 80
MAX_WIDTH = 1200
MAX_CONCURRENT = 10
TIMEOUT = 30


def convert_to_webp(src_path: Path, dst_path: Path):
    """Convert image to optimized webp."""
    if not HAS_PIL:
        return False
    try:
        img = Image.open(src_path)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGBA')
        else:
            img = img.convert('RGB')
        # Resize if too large
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)
        img.save(dst_path, 'WEBP', quality=WEBP_QUALITY, method=4)
        return True
    except Exception as e:
        print(f"  ❌ Convert failed: {e}")
        return False


async def download_one(session, url, item_id, source_name, semaphore, stats):
    """Download a single image."""
    dst_webp = GALLERY_DIR / f"{item_id}.webp"
    if dst_webp.exists():
        stats['skipped'] += 1
        return

    async with semaphore:
        try:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=TIMEOUT)) as resp:
                if resp.status != 200:
                    stats['failed'] += 1
                    print(f"  ❌ {item_id}: HTTP {resp.status}")
                    return
                data = await resp.read()
        except Exception as e:
            stats['failed'] += 1
            print(f"  ❌ {item_id}: {e}")
            return

    # Save temp file then convert
    tmp_path = GALLERY_DIR / f"{item_id}.tmp"
    tmp_path.write_bytes(data)

    if HAS_PIL:
        ok = convert_to_webp(tmp_path, dst_webp)
        tmp_path.unlink(missing_ok=True)
        if ok:
            stats['downloaded'] += 1
        else:
            stats['failed'] += 1
    else:
        tmp_path.rename(dst_webp)
        stats['downloaded'] += 1

    if stats['downloaded'] % 50 == 0:
        print(f"  📦 {source_name}: {stats['downloaded']} downloaded...")


async def download_source(source_name, data_file):
    """Download all images for a source."""
    with open(data_file) as f:
        items = json.load(f)

    items_with_images = [(d, d['images'][0]) for d in items if d.get('images')]
    print(f"\n🔽 {source_name}: {len(items_with_images)} images to process")

    stats = {'downloaded': 0, 'skipped': 0, 'failed': 0}
    semaphore = asyncio.Semaphore(MAX_CONCURRENT)

    async with aiohttp.ClientSession() as session:
        tasks = [
            download_one(session, url, item['id'], source_name, semaphore, stats)
            for item, url in items_with_images
        ]
        await asyncio.gather(*tasks)

    print(f"  ✅ {source_name}: {stats['downloaded']} new, {stats['skipped']} skipped, {stats['failed']} failed")
    return stats


async def main():
    GALLERY_DIR.mkdir(parents=True, exist_ok=True)

    sources = {
        'GemNana': DOCS_DIR / 'gemnana' / 'full_data.json',
        'AIBARS': DOCS_DIR / 'aibars' / 'full_data.json',
    }

    # Filter to requested sources
    if len(sys.argv) > 1:
        sources = {k: v for k, v in sources.items() if k.lower() in [a.lower() for a in sys.argv[1:]]}

    total = {'downloaded': 0, 'skipped': 0, 'failed': 0}
    for name, path in sources.items():
        if not path.exists():
            print(f"⚠️  {name}: {path} not found, skipping")
            continue
        stats = await download_source(name, path)
        for k in total:
            total[k] += stats[k]

    print(f"\n📊 Total: {total['downloaded']} downloaded, {total['skipped']} skipped, {total['failed']} failed")
    print(f"📁 Gallery: {sum(1 for _ in GALLERY_DIR.glob('*.webp'))} webp files")


if __name__ == '__main__':
    asyncio.run(main())
