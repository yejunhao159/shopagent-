#!/usr/bin/env python3
"""
批量下载 LeaderAI 提示词和图片
- 从 category_02.json / category_03.json 读取项目列表
- 下载每个项目的完整 meta.json（包含完整提示词）
- 下载每个项目的预览图片
- 生成汇总的 Markdown 文档
"""

import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
DOCS_DIR = WORKSPACE / "docs"

CATEGORIES = {
    "category_02.json": {
        "output_dir": "leaderai_ecommerce",
        "label": "电商产品虚拟摄影",
    },
    "category_03.json": {
        "output_dir": "leaderai_brand",
        "label": "创意广告品牌设计",
    },
}


def safe_filename(name: str, max_len: int = 60) -> str:
    keep = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
    out = []
    for ch in name:
        if ch in keep:
            out.append(ch)
        elif '\u4e00' <= ch <= '\u9fff':
            out.append(ch)
        else:
            if out and out[-1] != "_":
                out.append("_")
    result = "".join(out).strip("_")
    return result[:max_len] if result else "unnamed"


def log(msg: str):
    print(msg, flush=True)


def download(url: str, dest: Path, retries: int = 3) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    for attempt in range(retries):
        try:
            encoded = urllib.parse.quote(url, safe=":/?&=%#@")
            req = urllib.request.Request(encoded, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return True
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(0.5)
            else:
                log(f"  [FAIL] {dest.name}: {e}")
                return False
    return False


def process_category(cat_file: str, cfg: dict):
    src = WORKSPACE / cat_file
    if not src.exists():
        print(f"[SKIP] {cat_file} not found")
        return

    out_dir = DOCS_DIR / cfg["output_dir"]
    img_dir = out_dir / "images"
    meta_dir = out_dir / "meta"
    img_dir.mkdir(parents=True, exist_ok=True)
    meta_dir.mkdir(parents=True, exist_ok=True)

    with open(src, "r", encoding="utf-8") as f:
        data = json.load(f)

    projects = data.get("projects", [])
    total = len(projects)
    log(f"\n{'='*60}")
    log(f"分类: {cfg['label']}  ({total} 个项目)")
    log(f"{'='*60}")

    results = []

    for idx, proj in enumerate(projects, 1):
        title = proj.get("title", "unnamed")
        fname = safe_filename(title)
        author = proj.get("author", "unknown")
        is_featured = proj.get("collections", False)
        meta_url = proj.get("meta_path", "")
        img_urls = proj.get("imgs", [])
        prompt_origin_short = proj.get("prompt_origin", "")
        prompt_cn_short = proj.get("prompt_cn", "")

        log(f"[{idx}/{total}] {'★ ' if is_featured else ''}{title}")

        # Download meta.json for full prompts
        full_prompt_origin = prompt_origin_short
        full_prompt_cn = prompt_cn_short
        meta_file = meta_dir / f"{fname}.json"

        if meta_url:
            if download(meta_url, meta_file):
                try:
                    with open(meta_file, "r", encoding="utf-8") as mf:
                        meta = json.load(mf)
                    full_prompt_origin = meta.get("prompt_origin", prompt_origin_short)
                    full_prompt_cn = meta.get("prompt_cn", prompt_cn_short)
                except Exception:
                    pass

        # Download images
        downloaded_imgs = []
        for i, img_url in enumerate(img_urls):
            ext = img_url.rsplit(".", 1)[-1] if "." in img_url else "webp"
            suffix = f"_{i+1}" if len(img_urls) > 1 else ""
            img_file = img_dir / f"{fname}{suffix}.{ext}"
            if download(img_url, img_file):
                downloaded_imgs.append(img_file.relative_to(out_dir))

        results.append({
            "title": title,
            "author": author,
            "featured": is_featured,
            "prompt_origin": full_prompt_origin,
            "prompt_cn": full_prompt_cn,
            "images": [str(p) for p in downloaded_imgs],
            "meta_url": meta_url,
        })

        # Rate limiting
        if idx % 5 == 0:
            time.sleep(0.3)

    # Generate Markdown summary
    md_path = out_dir / "README.md"
    featured = [r for r in results if r["featured"]]
    normal = [r for r in results if not r["featured"]]

    with open(md_path, "w", encoding="utf-8") as md:
        md.write(f"# LeaderAI {cfg['label']} 提示词合集\n\n")
        md.write(f"共 {len(results)} 个项目，其中精选 {len(featured)} 个\n\n")
        md.write("---\n\n")

        if featured:
            md.write("## ★ 精选项目\n\n")
            for r in featured:
                write_project_md(md, r)

        md.write("## 全部项目\n\n")
        for r in normal:
            write_project_md(md, r)

    # Generate complete JSON with full prompts
    full_json_path = out_dir / "full_data.json"
    with open(full_json_path, "w", encoding="utf-8") as jf:
        json.dump(results, jf, ensure_ascii=False, indent=2)

    log(f"\n✅ 完成! 已保存到 {out_dir}")
    log(f"   - {len(results)} 个项目的完整提示词")
    log(f"   - 图片保存在 {img_dir}")
    log(f"   - Markdown 文档: {md_path}")
    log(f"   - 完整 JSON: {full_json_path}")


def write_project_md(md, r):
    md.write(f"### {r['title']}\n\n")
    md.write(f"**作者**: {r['author']}\n\n")
    if r["images"]:
        for img in r["images"]:
            md.write(f"![{r['title']}]({img})\n\n")
    if r["prompt_cn"]:
        md.write("**中文提示词**:\n")
        md.write(f"```\n{r['prompt_cn']}\n```\n\n")
    if r["prompt_origin"]:
        md.write("**原始提示词 (English)**:\n")
        md.write(f"```\n{r['prompt_origin']}\n```\n\n")
    md.write("---\n\n")


def main():
    log("LeaderAI 批量下载工具")
    log(f"工作目录: {WORKSPACE}")
    log(f"输出目录: {DOCS_DIR}")

    for cat_file, cfg in CATEGORIES.items():
        process_category(cat_file, cfg)

    log("\n" + "=" * 60)
    log("全部下载完成!")
    log("=" * 60)


if __name__ == "__main__":
    main()
