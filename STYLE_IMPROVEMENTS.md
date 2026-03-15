# 样式与体验优化建议

本地已运行：`pnpm run dev` → http://localhost:3000

以下为可选的样式/体验优化项，可按优先级转为 GitHub Issue 或直接改代码。

---

## 一、全局与主题

| 建议 | 说明 | 涉及文件 |
|------|------|----------|
| 品牌渐变统一 | 将 `globals.css` 中 `.text-gradient` 改为与 Hero 一致的紫→橙渐变，统一全站强调色 | `src/app/globals.css` |
| 焦点环可访问性 | 为所有可点击元素增加 `focus-visible:ring-2 focus-visible:ring-primary`，方便键盘与无障碍 | 各 Link/Button 组件 |
| 深色模式（可选） | 增加 `prefers-color-scheme: dark` 或切换按钮，扩展 `:root` / `.dark` 变量 | `globals.css`、`layout.tsx` |

---

## 二、首页

| 建议 | 说明 | 涉及文件 |
|------|------|----------|
| Hero 副按钮图标 | 「查看演示」右侧箭头可增加 `group-hover:translate-x-1` 微动效 | `Hero.tsx` |
| 产品演示区阴影 | 软件截图外框可加强 `shadow-2xl` 或轻微 `ring`，增强层次 | `page.tsx` 首页 |
| 区块间距统一 | 各 section 的 `py-20 sm:py-32` 与内层 `max-w-*` 可抽成常量或 Tailwind 段落类 | 各页面 |

---

## 三、下载页

| 建议 | 说明 | 涉及文件 |
|------|------|----------|
| 历史版本移动端 | 小屏下版本卡片内「平台+下载」可改为纵向堆叠，避免横向挤压 | `download/page.tsx` |
| 主 CTA 按钮 | 主下载按钮可加 `focus-visible:ring-2 focus-visible:ring-offset-2` | `download/page.tsx` |
| 系统要求区块 | 使用 `bg-muted/50` 与全站 `--muted` 统一，替代硬编码 `bg-gray-50` | `download/page.tsx` |

---

## 四、使用指南页

| 建议 | 说明 | 涉及文件 |
|------|------|----------|
| 视频占位图 | 无视频时可用插画或品牌色渐变占位，替代纯灰+虚线框 | `guide/page.tsx` |
| 图文步骤配图 | 每步增加占位图或实拍截图，提升可读性 | `guide/page.tsx` |
| 步骤列表样式 | 使用 `list-decimal` 或自定义数字样式，与关于页统一 | `guide/page.tsx` |

---

## 五、功能 / 定价 / 关于

| 建议 | 说明 | 涉及文件 |
|------|------|----------|
| 功能页卡片 hover | Agent 卡片可加 `hover:shadow-lg hover:border-primary/20` 过渡 | `features/page.tsx` |
| 定价页表格 | 移动端表格可改为卡片式布局，避免横向滚动 | `pricing/page.tsx` |
| 关于页段落 | 长段落可设 `max-w-prose` 提升可读性 | `about/page.tsx` |

---

## 六、通用组件

| 建议 | 说明 | 涉及文件 |
|------|------|----------|
| Footer 链接分组 | 法律类「即将上线」可改为 `cursor-default` + 灰字，或单独「即将上线」标签 | `Footer.tsx` |
| Header 移动端菜单 | 展开时 body 可加 `overflow-hidden` 防止背景滚动 | `Header.tsx` |
| CTA 按钮一致性 | 主 CTA 统一用紫色渐变或 `bg-foreground`，与 Hero 主按钮二选一并统一 | `Cta.tsx`、`Hero.tsx` |

---

## 如何增加 Issue（GitHub）

1. **打开仓库 Issues**  
   进入 `https://github.com/yejunhao159/shopagent-（你的仓库名）/issues`，点击 **New issue**。

2. **选模板（若有）**  
   若仓库配置了 Issue 模板，选择「功能建议」或「Bug」等。

3. **标题与描述**  
   - 标题示例：`[官网] 使用指南页视频占位样式优化`、`[样式] 下载页历史版本移动端布局`。  
   - 描述中可写：优化点、涉及文件（如 `src/app/guide/page.tsx`）、可选设计方案。

4. **标签与里程碑（可选）**  
   使用标签如 `enhancement`、`ui`、`docs` 等；若有项目看板，可关联到「官网优化」等。

5. **与本文件联动**  
   将上述表格中的某一行复制到 Issue 描述，或在本文件中注明「已创建 Issue #编号」，便于追踪。

---

## 更新记录

- 2026-03-15：初版，基于当前首页、下载页、使用指南页、功能/定价/关于页与全局样式整理。
