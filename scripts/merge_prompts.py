#!/usr/bin/env python3
"""Merge all prompt sources into unified prompts.json + copy images to gallery."""

import json
import hashlib
import random
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).parent.parent
GALLERY_DIR = BASE_DIR / "public" / "images" / "gallery"
DOCS_DIR = BASE_DIR / "docs"
OUTPUT = BASE_DIR / "src" / "data" / "prompts.json"

WEBP_QUALITY = 80
MAX_WIDTH = 1200


def make_id(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()[:10]


def to_webp(src: Path, dst: Path):
    if dst.exists():
        return True
    try:
        img = Image.open(src)
        img = img.convert('RGBA') if img.mode in ('RGBA', 'P') else img.convert('RGB')
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)
        img.save(dst, 'WEBP', quality=WEBP_QUALITY, method=4)
        return True
    except Exception as e:
        print(f"  ❌ Convert {src.name}: {e}")
        return False


CATEGORY_MAP = {
    "information-viz": "数据可视化",
    "ecommerce-marketing": "电商静物",
    "product-design": "品牌视觉",
    "image-editing": "图像编辑",
    "manga-comic": "漫画动画",
}


def guess_category(tags, title, raw_category=""):
    if raw_category in CATEGORY_MAP:
        return CATEGORY_MAP[raw_category]
    tags_lower = [t.lower() for t in tags]
    title_lower = title.lower()
    all_text = " ".join(tags_lower) + " " + title_lower
    checks = [
        (["product", "产品", "电商", "商品", "food", "美食", "饮品", "coffee", "beverage", "cheese", "营销", "广告"], "电商静物"),
        (["brand", "品牌", "logo", "包装", "packaging", "设计", "工业"], "品牌视觉"),
        (["portrait", "人像", "fashion", "时尚", "模特", "woman", "man", "证件照"], "人像摄影"),
        (["poster", "海报", "社交媒体"], "海报设计"),
        (["3d", "render", "渲染", "clay", "isometric", "unreal"], "3D渲染"),
        (["watercolor", "水彩", "插画", "illustration", "cartoon", "漫画", "动画"], "水彩插画"),
        (["photography", "摄影", "photo", "cinematic", "电影", "胶片", "风格转换"], "摄影感"),
        (["数字艺术", "艺术", "创意", "灵感", "特效"], "创意艺术"),
    ]
    for keywords, cat in checks:
        if any(k in all_text for k in keywords):
            return cat
    return "AI生图"


def load_leaderai():
    results = []
    for subdir, category in [("leaderai_ecommerce", "电商静物"), ("leaderai_brand", "品牌视觉")]:
        data_file = DOCS_DIR / subdir / "full_data.json"
        img_dir = DOCS_DIR / subdir / "images"
        with open(data_file) as f:
            data = json.load(f)
        img_files = {}
        if img_dir.exists():
            img_files = {f.stem: f for f in img_dir.iterdir() if f.suffix in ('.webp', '.jpg', '.png', '.jpeg')}

        for d in data:
            item_id = make_id(d["title"] + d.get("author", ""))
            dst = GALLERY_DIR / f"{item_id}.webp"
            if not dst.exists():
                title_clean = d["title"].replace("/", "_").replace("\\", "_")
                src = img_files.get(title_clean)
                if not src:
                    for fname, fpath in img_files.items():
                        if title_clean[:10] in fname or fname[:10] in title_clean:
                            src = fpath
                            break
                if src:
                    to_webp(src, dst)

            has_image = dst.exists()
            prompt = d.get("prompt_cn", "") or d.get("prompt_origin", "")
            results.append({
                "id": item_id, "title": d["title"],
                "author": d.get("author", "LeaderAI"),
                "image": f"/images/gallery/{item_id}.webp" if has_image else "",
                "category": category,
                "tags": [category],
                "prompt": prompt,
                "prompt_en": d.get("prompt_origin", ""),
                "source": "LeaderAI",
            })
    print(f"  LeaderAI: {len(results)}")
    return results


def load_nanoprompts():
    with open(DOCS_DIR / "nanoprompts" / "full_data.json") as f:
        data = json.load(f)
    img_dir = DOCS_DIR / "nanoprompts" / "images"
    img_files = {f.stem: f for f in img_dir.iterdir() if f.suffix in ('.webp', '.jpg', '.png', '.jpeg')}

    results, copied = [], 0
    for d in data:
        item_id = d.get("id", make_id(d["title"]))
        dst = GALLERY_DIR / f"{item_id}.webp"
        if not dst.exists():
            title_clean = d["title"].replace("/", "_").replace("\\", "_")
            src = img_files.get(title_clean)
            if not src:
                for fname, fpath in img_files.items():
                    if title_clean[:10] in fname or fname[:10] in title_clean:
                        src = fpath
                        break
            if src and to_webp(src, dst):
                copied += 1

        results.append({
            "id": item_id, "title": d["title"],
            "author": d.get("author", "NanoPrompts"),
            "image": f"/images/gallery/{item_id}.webp" if dst.exists() else "",
            "category": guess_category([], d["title"], d.get("category", "")),
            "tags": [d["category"]] if d.get("category") else ["AI生图"],
            "prompt": d.get("prompt", ""), "prompt_en": "",
            "source": "NanoPrompts",
        })
    print(f"  NanoPrompts: {len(results)}, {copied} images copied")
    return results


def load_youmind():
    with open(DOCS_DIR / "youmind_watercolor" / "full_data.json") as f:
        data = json.load(f)
    img_dir = DOCS_DIR / "youmind_watercolor" / "images"
    img_files = {f.stem: f for f in img_dir.iterdir() if f.suffix in ('.webp', '.jpg', '.png', '.jpeg')}

    results, copied = [], 0
    for d in data:
        item_id = "ym_" + make_id(d["title"])
        dst = GALLERY_DIR / f"{item_id}.webp"
        if not dst.exists():
            title_clean = d["title"].replace("/", "_").replace("\\", "_").replace("，", ",")
            src = img_files.get(title_clean)
            if not src:
                for fname, fpath in img_files.items():
                    if title_clean[:8] in fname:
                        src = fpath
                        break
            if src and to_webp(src, dst):
                copied += 1

        prompt = d.get("prompt_cn", "") or d.get("prompt_origin", "")
        results.append({
            "id": item_id, "title": d["title"],
            "author": d.get("author", "YouMind"),
            "image": f"/images/gallery/{item_id}.webp" if dst.exists() else "",
            "category": "水彩插画", "tags": ["水彩", "插画"],
            "prompt": prompt, "prompt_en": d.get("prompt_origin", ""),
            "source": "YouMind",
        })
    print(f"  YouMind: {len(results)}, {copied} images copied")
    return results


def load_gemnana():
    with open(DOCS_DIR / "gemnana" / "full_data.json") as f:
        data = json.load(f)
    results, with_img = [], 0
    for d in data:
        item_id = d["id"]
        has_image = (GALLERY_DIR / f"{item_id}.webp").exists()
        if has_image: with_img += 1
        prompt = d.get("prompt_cn", "") or d.get("prompt_en", "")
        results.append({
            "id": item_id, "title": d["title"],
            "author": d.get("source", "GemNana"),
            "image": f"/images/gallery/{item_id}.webp" if has_image else "",
            "category": guess_category(d.get("tags", []), d["title"]),
            "tags": d.get("tags", []), "prompt": prompt,
            "prompt_en": d.get("prompt_en", ""), "source": "GemNana",
            "model": "Nano Banana Pro",
        })
    print(f"  GemNana: {len(results)}, {with_img} with images")
    return results


def load_opennana():
    with open(DOCS_DIR / "opennana" / "full_data.json") as f:
        data = json.load(f)
    results, with_img = [], 0

    img2img_kws = ['原图', '参考图', '附图', '图一', 'original image', 'attached',
                   'uploaded', '上传', '使用原图', 'reference image']

    for d in data:
        item_id = f"on_{d['id']}"
        has_image = (GALLERY_DIR / f"{item_id}.webp").exists()
        if has_image: with_img += 1
        prompt = d.get("prompt_zh", "") or d.get("prompt_en", "")
        is_img2img = any(kw in prompt for kw in img2img_kws)
        cat = guess_category(d.get("tags", []), d["title"])
        entry = {
            "id": item_id, "title": d["title"],
            "author": d.get("source_name", "OpenNana"),
            "image": f"/images/gallery/{item_id}.webp" if has_image else "",
            "category": cat, "tags": d.get("tags", []),
            "prompt": prompt,
            "prompt_en": d.get("prompt_en", ""), "source": "OpenNana",
            "model": d.get("model", "Nano Banana Pro"),
        }
        if is_img2img:
            entry["img2img"] = True
        results.append(entry)
    print(f"  OpenNana: {len(results)}, {with_img} with images")
    return results


def load_aibars():
    with open(DOCS_DIR / "aibars" / "full_data.json") as f:
        data = json.load(f)
    results, with_img = [], 0
    for d in data:
        item_id = d["id"]
        has_image = (GALLERY_DIR / f"{item_id}.webp").exists()
        if has_image: with_img += 1
        prompt = d.get("prompt_cn", "") or d.get("prompt_en", "")
        results.append({
            "id": item_id, "title": d["title"],
            "author": d.get("model", "AIBARS"),
            "image": f"/images/gallery/{item_id}.webp" if has_image else "",
            "category": guess_category(d.get("tags", []), d["title"]),
            "tags": d.get("tags", []), "prompt": prompt,
            "prompt_en": d.get("prompt_en", ""), "source": "AIBARS",
            "model": d.get("model", "Nano Banana Pro"),
        })
    print(f"  AIBARS: {len(results)}, {with_img} with images")
    return results


def main():
    GALLERY_DIR.mkdir(parents=True, exist_ok=True)
    print("🔄 Loading all sources...")

    all_prompts = []
    all_prompts.extend(load_leaderai())
    all_prompts.extend(load_nanoprompts())
    all_prompts.extend(load_youmind())
    all_prompts.extend(load_gemnana())
    all_prompts.extend(load_aibars())
    all_prompts.extend(load_opennana())

    # Apply img2img detection and category merging
    img2img_kws = ['原图', '参考图', '附图', '图一', '图二', '原始图像', 'reference image',
                   '使用原图', 'original image', 'attached', 'uploaded', '上传',
                   '原始照片', 'reference photo', '使用图片', '照片中的', '图中的人',
                   '图片中', 'this image', 'your image', 'your photo', '这张图', '这张照片']
    category_merge = {"图像编辑": "AI生图", "创意艺术": "AI生图", "漫画动画": "水彩插画"}

    for p in all_prompts:
        if p["category"] in category_merge:
            p["category"] = category_merge[p["category"]]
        if not p.get("img2img") and any(kw in p.get("prompt", "") for kw in img2img_kws):
            p["img2img"] = True

    # Normalize model names
    model_normalize = {
        "Nano banana pro": "Nano Banana Pro",
        "Nano banana": "Nano Banana Pro",
        "nano banana pro": "Nano Banana Pro",
        "FLUX": "FLUX",
        "z-image": "Z-Image",
    }
    for p in all_prompts:
        raw = p.get("model", "")
        p["model"] = model_normalize.get(raw, raw) if raw else ""

    valid = [p for p in all_prompts if p["prompt"] and p["image"]]
    no_img = [p for p in all_prompts if p["prompt"] and not p["image"]]
    no_prompt = [p for p in all_prompts if not p["prompt"]]

    print(f"\n📊 Summary:")
    print(f"  Total: {len(all_prompts)}")
    print(f"  Valid (prompt+image): {len(valid)}")
    print(f"  Missing image: {len(no_img)}")
    print(f"  Missing prompt: {len(no_prompt)}")

    cats = {}
    for p in valid:
        cats[p["category"]] = cats.get(p["category"], 0) + 1
    print(f"\n📂 Categories:")
    for cat, count in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")

    sources = {}
    for p in valid:
        sources[p["source"]] = sources.get(p["source"], 0) + 1
    print(f"\n🌐 Sources:")
    for src, count in sorted(sources.items(), key=lambda x: -x[1]):
        print(f"  {src}: {count}")

    # Shuffle to ensure diverse first-page display (fixed seed for reproducibility)
    random.seed(42)
    random.shuffle(valid)

    with open(OUTPUT, 'w') as f:
        json.dump(valid, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Written {len(valid)} items to {OUTPUT}")


if __name__ == '__main__':
    main()
