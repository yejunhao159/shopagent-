#!/usr/bin/env python3
"""
Trim gallery to ~2000 images for Cloudflare deployment.
Strategy:
1. Read prompts.json, pick top 2000 prompts (diverse categories).
2. Keep only matching images in public/images/gallery/.
3. Remove the rest images.
4. Update prompts.json: mark removed prompts with has_image=false.
"""

import json
import os
import shutil
from collections import defaultdict

PROMPTS_PATH = "src/data/prompts.json"
GALLERY_DIR = "public/images/gallery"
TARGET_COUNT = 2000

def main():
    with open(PROMPTS_PATH, "r", encoding="utf-8") as f:
        prompts = json.load(f)

    print(f"Total prompts: {len(prompts)}")

    # Check which prompts have existing local images
    existing_images = set(os.listdir(GALLERY_DIR))
    print(f"Total images in gallery: {len(existing_images)}")

    prompts_with_images = []
    prompts_without_images = []

    for p in prompts:
        img_path = p.get("image", "")
        filename = os.path.basename(img_path)
        if filename in existing_images:
            p["_filename"] = filename
            prompts_with_images.append(p)
        else:
            prompts_without_images.append(p)

    print(f"Prompts with local images: {len(prompts_with_images)}")
    print(f"Prompts without local images: {len(prompts_without_images)}")

    # Select top TARGET_COUNT prompts, keeping category diversity
    by_category = defaultdict(list)
    for p in prompts_with_images:
        by_category[p.get("category", "其他")].append(p)

    print("\nCategory distribution (before trim):")
    for cat, items in sorted(by_category.items(), key=lambda x: -len(x[1])):
        print(f"  {cat}: {len(items)}")

    # Proportional sampling per category
    total_with_imgs = len(prompts_with_images)
    selected = []
    for cat, items in by_category.items():
        proportion = len(items) / total_with_imgs
        count = max(1, round(proportion * TARGET_COUNT))
        selected.extend(items[:count])

    # Trim or pad to exact target
    if len(selected) > TARGET_COUNT:
        selected = selected[:TARGET_COUNT]
    elif len(selected) < TARGET_COUNT:
        selected_ids = {id(p) for p in selected}
        for p in prompts_with_images:
            if id(p) not in selected_ids:
                selected.append(p)
                if len(selected) >= TARGET_COUNT:
                    break

    print(f"\nSelected {len(selected)} prompts to keep images for")

    # Determine which images to keep
    keep_filenames = {p["_filename"] for p in selected}

    # Also keep images referenced in ProductDemo.tsx
    demo_images = [
        "on_2308.webp", "la_xsqjn5Gcm3.webp", "la_0508YOAAYQ.webp",
        "la_0PUmPZzYbb.webp", "la_lOrCbdLp0z.webp",
        "on_2510.webp", "on_1803.webp", "la_tIhSlHLtb3.webp",
        "on_2343.webp", "la_6c758f2ac9.webp",
        "la_ycuAFAqdrH.webp", "la_03401c9264.webp",
    ]
    keep_filenames.update(demo_images)

    # Delete images not in keep set
    deleted_count = 0
    for filename in existing_images:
        if filename not in keep_filenames:
            os.remove(os.path.join(GALLERY_DIR, filename))
            deleted_count += 1

    print(f"Deleted {deleted_count} images")
    print(f"Kept {len(existing_images) - deleted_count} images")

    # Update prompts.json: keep all prompts but mark which have images
    kept_filenames_after = set(os.listdir(GALLERY_DIR))
    for p in prompts:
        img_path = p.get("image", "")
        filename = os.path.basename(img_path)
        if filename not in kept_filenames_after:
            p["has_image"] = False
        else:
            p["has_image"] = True
        # Clean up temp field
        if "_filename" in p:
            del p["_filename"]

    with open(PROMPTS_PATH, "w", encoding="utf-8") as f:
        json.dump(prompts, f, ensure_ascii=False, indent=2)

    has_img_count = sum(1 for p in prompts if p.get("has_image"))
    no_img_count = sum(1 for p in prompts if not p.get("has_image"))
    print(f"\nUpdated prompts.json:")
    print(f"  With image: {has_img_count}")
    print(f"  Without image (coming soon): {no_img_count}")
    print(f"  Total prompts preserved: {len(prompts)}")

if __name__ == "__main__":
    main()
