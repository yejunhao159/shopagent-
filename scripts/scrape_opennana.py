#!/usr/bin/env python3
"""Scrape OpenNana API: fetch Nano Banana Pro image prompts + download images."""

import json, asyncio, aiohttp, ssl, os, time
from pathlib import Path
from urllib.parse import quote

BASE_API = "https://api.opennana.com/api/prompts"
IMG_BASE = "https://img.opennana.com"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Origin": "https://opennana.com",
    "Referer": "https://opennana.com/",
}

OUT_DIR = Path(__file__).parent.parent / "docs" / "opennana"
IMG_DIR = OUT_DIR / "images"
GALLERY_DIR = Path(__file__).parent.parent / "public" / "images" / "gallery"

SEMAPHORE_API = 5
SEMAPHORE_IMG = 10


async def fetch_list(session, model="Nano Banana Pro"):
    """Fetch all image prompt slugs for a model."""
    model_encoded = quote(model)
    all_items = []
    page = 1
    while True:
        url = f"{BASE_API}?page={page}&limit=50&sort=created_at&order=DESC&model={model_encoded}"
        async with session.get(url) as resp:
            data = await resp.json()
            items = data["data"]["items"]
            pagination = data["data"]["pagination"]

            for item in items:
                if item.get("media_type") == "image":
                    all_items.append(item)

            img_count = len([i for i in items if i.get("media_type") == "image"])
            print(f"  List page {page}/{pagination['total_pages']}: {img_count} images (total: {len(all_items)})")

            if not pagination["has_more"]:
                break
            page += 1
            await asyncio.sleep(0.2)

    return all_items


async def fetch_detail(session, slug, sem):
    """Fetch full prompt detail for one slug."""
    async with sem:
        url = f"{BASE_API}/{slug}"
        try:
            async with session.get(url) as resp:
                data = (await resp.json())["data"]

                prompt_zh, prompt_en = "", ""
                for p in data.get("prompts", []):
                    if p.get("type") == "zh":
                        prompt_zh = p["text"]
                    elif p.get("type") == "en":
                        prompt_en = p["text"]
                    elif not prompt_en:
                        prompt_en = p["text"]

                return {
                    "id": data["id"],
                    "slug": slug,
                    "title": data["title"],
                    "model": data.get("model", ""),
                    "prompt_zh": prompt_zh,
                    "prompt_en": prompt_en,
                    "images": data.get("images", []),
                    "tags": data.get("tags", []),
                    "source_name": data.get("source_name", ""),
                    "source_url": data.get("source_url", ""),
                }
        except Exception as e:
            print(f"  ✗ Detail error [{slug}]: {e}")
            return None


async def download_image(session, url, dest, sem):
    """Download one image."""
    async with sem:
        if dest.exists():
            return True
        try:
            async with session.get(url) as resp:
                if resp.status == 200:
                    dest.write_bytes(await resp.read())
                    return True
        except Exception as e:
            pass
        return False


async def main():
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    GALLERY_DIR.mkdir(parents=True, exist_ok=True)

    ssl_ctx = ssl.create_default_context()
    conn = aiohttp.TCPConnector(ssl=ssl_ctx, limit=20)

    async with aiohttp.ClientSession(headers=HEADERS, connector=conn) as session:
        # Step 1: Fetch all slugs
        print("📋 Fetching Nano Banana Pro image list...")
        slugs = await fetch_list(session, "Nano Banana Pro")
        print(f"✅ Found {len(slugs)} image prompts\n")

        # Step 2: Fetch all details
        print("📝 Fetching prompt details...")
        sem_api = asyncio.Semaphore(SEMAPHORE_API)

        # Process in batches
        all_data = []
        batch_size = 50
        for i in range(0, len(slugs), batch_size):
            batch = slugs[i:i+batch_size]
            tasks = [fetch_detail(session, item["slug"], sem_api) for item in batch]
            results = await asyncio.gather(*tasks)
            good = [r for r in results if r]
            all_data.extend(good)
            print(f"  Batch {i//batch_size+1}: {len(good)}/{len(batch)} ok (total: {len(all_data)})")
            await asyncio.sleep(0.3)

        print(f"✅ Got {len(all_data)} full prompts\n")

        # Save data
        with open(OUT_DIR / "full_data.json", "w") as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)

        # Step 3: Download images
        print("🖼️ Downloading images...")
        sem_img = asyncio.Semaphore(SEMAPHORE_IMG)
        download_tasks = []

        for item in all_data:
            for img_url in item.get("images", []):
                # Save to both local dir and gallery
                filename = f"on_{item['id']}"
                ext = img_url.rsplit(".", 1)[-1].split("?")[0] if "." in img_url else "jpg"

                local_dest = IMG_DIR / f"{filename}.{ext}"
                gallery_dest = GALLERY_DIR / f"{filename}.webp"

                # Download original
                download_tasks.append((img_url, local_dest, item["id"]))
                break  # Only first image

        success = 0
        batch_size = 50
        for i in range(0, len(download_tasks), batch_size):
            batch = download_tasks[i:i+batch_size]
            tasks = [download_image(session, url, dest, sem_img) for url, dest, _ in batch]
            results = await asyncio.gather(*tasks)
            success += sum(results)
            print(f"  Image batch {i//batch_size+1}: {sum(results)}/{len(batch)} ok (total: {success})")
            await asyncio.sleep(0.3)

        print(f"\n✅ Downloaded {success}/{len(download_tasks)} images")

        # Stats
        with_zh = sum(1 for d in all_data if d["prompt_zh"])
        with_en = sum(1 for d in all_data if d["prompt_en"])
        print(f"\n📊 Stats:")
        print(f"  Total prompts: {len(all_data)}")
        print(f"  With Chinese: {with_zh}")
        print(f"  With English: {with_en}")
        print(f"  With images: {success}")


if __name__ == "__main__":
    asyncio.run(main())
