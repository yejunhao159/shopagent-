#!/usr/bin/env python3
"""
读取 docs/ 下的 meta JSON 和图片，生成一个可视化的 HTML 画廊页面。
"""
import json, html, os
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
DOCS = WORKSPACE / "docs"

SECTIONS = [
    ("leaderai_ecommerce", "电商产品虚拟摄影"),
    ("leaderai_brand", "创意广告品牌设计"),
    ("nanoprompts", "NanoPrompts 精选"),
    ("youmind_watercolor", "YouMind 水彩风格"),
]

def load_section(dir_name):
    base = DOCS / dir_name
    meta_dir = base / "meta"
    img_dir = base / "images"
    items = []
    if not meta_dir.exists():
        return items

    for mf in sorted(meta_dir.glob("*.json")):
        try:
            data = json.loads(mf.read_text(encoding="utf-8"))
        except Exception:
            continue
        stem = mf.stem
        # find matching image
        img_path = None
        for ext in ("webp", "png", "jpg", "jpeg"):
            candidate = img_dir / f"{stem}.{ext}"
            if candidate.exists():
                img_path = candidate
                break
        if not img_path and img_dir.exists():
            for f in img_dir.iterdir():
                if f.stem.startswith(stem[:20]):
                    img_path = f
                    break

        items.append({
            "title": data.get("title", stem),
            "author": data.get("author", ""),
            "featured": data.get("collections", False),
            "prompt_cn": data.get("prompt_cn", ""),
            "prompt_origin": data.get("prompt_origin", ""),
            "img_rel": str(img_path.relative_to(DOCS)) if img_path else "",
            "model": data.get("model", ""),
        })
    return items


def build_html():
    all_sections = []
    for dir_name, label in SECTIONS:
        items = load_section(dir_name)
        if items:
            all_sections.append((label, items))

    page = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LeaderAI 提示词画廊</title>
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e0e0e0; }}
.header {{ background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 40px 20px; text-align: center; border-bottom: 1px solid #333; }}
.header h1 {{ font-size: 2rem; color: #fff; margin-bottom: 8px; }}
.header p {{ color: #888; font-size: 0.95rem; }}
.tabs {{ display: flex; gap: 8px; padding: 20px; justify-content: center; flex-wrap: wrap; }}
.tab {{ padding: 8px 20px; border-radius: 20px; border: 1px solid #333; background: transparent; color: #aaa; cursor: pointer; font-size: 0.9rem; transition: all .2s; }}
.tab:hover, .tab.active {{ background: #2563eb; color: #fff; border-color: #2563eb; }}
.stats {{ text-align: center; padding: 10px; color: #666; font-size: 0.85rem; }}
.grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; padding: 20px; max-width: 1400px; margin: 0 auto; }}
.card {{ background: #141414; border-radius: 12px; overflow: hidden; border: 1px solid #222; transition: transform .2s, box-shadow .2s; }}
.card:hover {{ transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,.5); }}
.card.featured {{ border-color: #f59e0b; }}
.card img {{ width: 100%; height: 240px; object-fit: cover; background: #1a1a1a; }}
.card-body {{ padding: 16px; }}
.card-title {{ font-size: 1rem; font-weight: 600; margin-bottom: 6px; color: #fff; display: flex; align-items: center; gap: 6px; }}
.star {{ color: #f59e0b; }}
.card-author {{ font-size: 0.8rem; color: #666; margin-bottom: 10px; }}
.prompt-box {{ position: relative; }}
.prompt-text {{ font-size: 0.82rem; line-height: 1.5; color: #aaa; background: #0d0d0d; border: 1px solid #222; border-radius: 8px; padding: 12px; max-height: 120px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; }}
.prompt-toggle {{ display: flex; gap: 6px; margin-top: 8px; }}
.btn {{ padding: 4px 12px; border-radius: 6px; border: 1px solid #333; background: #1a1a1a; color: #aaa; cursor: pointer; font-size: 0.75rem; transition: all .15s; }}
.btn:hover {{ background: #2563eb; color: #fff; border-color: #2563eb; }}
.btn.active {{ background: #2563eb; color: #fff; border-color: #2563eb; }}
.copy-btn {{ position: absolute; top: 8px; right: 8px; padding: 2px 8px; border-radius: 4px; border: 1px solid #444; background: #222; color: #aaa; cursor: pointer; font-size: 0.7rem; }}
.copy-btn:hover {{ background: #2563eb; color: #fff; }}
.section {{ display: none; }}
.section.active {{ display: block; }}
.no-img {{ display: flex; align-items: center; justify-content: center; height: 240px; background: #1a1a1a; color: #444; font-size: 0.9rem; }}
.search-box {{ display: flex; justify-content: center; padding: 0 20px; }}
.search-box input {{ width: 100%; max-width: 500px; padding: 10px 16px; border-radius: 10px; border: 1px solid #333; background: #141414; color: #e0e0e0; font-size: 0.9rem; outline: none; }}
.search-box input:focus {{ border-color: #2563eb; }}
</style>
</head>
<body>
<div class="header">
  <h1>LeaderAI 提示词画廊</h1>
  <p>电商产品摄影 & 创意广告品牌设计 · 图片 + 完整提示词</p>
</div>
<div class="search-box" style="margin-top:16px;">
  <input type="text" id="search" placeholder="搜索标题或提示词..." oninput="filterCards()">
</div>
<div class="tabs" id="tabs"></div>
<div class="stats" id="stats"></div>
<div id="content"></div>

<script>
const DATA = {json.dumps({label: items for label, items in all_sections}, ensure_ascii=False)};

const tabs = document.getElementById('tabs');
const content = document.getElementById('content');
const stats = document.getElementById('stats');
let activeTab = null;

Object.keys(DATA).forEach((label, i) => {{
  const btn = document.createElement('button');
  btn.className = 'tab' + (i === 0 ? ' active' : '');
  btn.textContent = label + ' (' + DATA[label].length + ')';
  btn.onclick = () => switchTab(label, btn);
  tabs.appendChild(btn);

  const section = document.createElement('div');
  section.className = 'section' + (i === 0 ? ' active' : '');
  section.id = 'sec-' + i;
  section.dataset.label = label;

  const grid = document.createElement('div');
  grid.className = 'grid';

  DATA[label].forEach((item, idx) => {{
    grid.innerHTML += buildCard(item, idx);
  }});

  section.appendChild(grid);
  content.appendChild(section);

  if (i === 0) {{
    activeTab = label;
    updateStats(label);
  }}
}});

function switchTab(label, btn) {{
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.section').forEach(s => {{
    s.classList.toggle('active', s.dataset.label === label);
  }});
  activeTab = label;
  updateStats(label);
}}

function updateStats(label) {{
  const items = DATA[label];
  const featured = items.filter(i => i.featured).length;
  stats.textContent = '共 ' + items.length + ' 个项目，精选 ' + featured + ' 个';
}}

function buildCard(item, idx) {{
  const imgHtml = item.img_rel
    ? '<img src="' + esc(item.img_rel) + '" alt="' + esc(item.title) + '" loading="lazy" onerror="this.outerHTML=\\'<div class=no-img>图片未下载</div>\\'">'
    : '<div class="no-img">图片未下载</div>';
  const star = item.featured ? '<span class="star">★</span>' : '';
  const promptCn = item.prompt_cn || '暂无中文提示词';
  const promptEn = item.prompt_origin || '暂无英文提示词';
  return '<div class="card' + (item.featured ? ' featured' : '') + '" data-search="' + esc((item.title + ' ' + item.prompt_cn + ' ' + item.prompt_origin).toLowerCase()) + '">'
    + imgHtml
    + '<div class="card-body">'
    + '<div class="card-title">' + star + esc(item.title) + '</div>'
    + '<div class="card-author">by ' + esc(item.author) + '</div>'
    + '<div class="prompt-box">'
    + '<div class="prompt-text" id="pt-' + idx + '">' + esc(promptCn) + '</div>'
    + '<button class="copy-btn" onclick="copyPrompt(' + idx + ')">复制</button>'
    + '</div>'
    + '<div class="prompt-toggle">'
    + '<button class="btn active" onclick="showPrompt(' + idx + ',\\'cn\\',this)">中文</button>'
    + '<button class="btn" onclick="showPrompt(' + idx + ',\\'en\\',this)">English</button>'
    + '</div>'
    + '</div></div>';
}}

function esc(s) {{
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}}

const promptData = {{}};
Object.values(DATA).flat().forEach((item, i) => {{
  promptData[i] = {{ cn: item.prompt_cn || '', en: item.prompt_origin || '' }};
}});

function showPrompt(idx, lang, btn) {{
  const el = document.getElementById('pt-' + idx);
  if (el && promptData[idx]) {{
    el.textContent = promptData[idx][lang] || '暂无';
    btn.parentElement.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }}
}}

function copyPrompt(idx) {{
  const el = document.getElementById('pt-' + idx);
  if (el) {{
    navigator.clipboard.writeText(el.textContent).then(() => {{
      const btn = el.parentElement.querySelector('.copy-btn');
      btn.textContent = '已复制!';
      setTimeout(() => btn.textContent = '复制', 1500);
    }});
  }}
}}

function filterCards() {{
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {{
    card.style.display = card.dataset.search.includes(q) ? '' : 'none';
  }});
}}
</script>
</body>
</html>"""
    out = DOCS / "gallery.html"
    out.write_text(page, encoding="utf-8")
    print(f"✅ 画廊已生成: {out}", flush=True)
    print(f"   在浏览器中打开: file://{out}", flush=True)


if __name__ == "__main__":
    build_html()
