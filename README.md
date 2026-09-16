# HuangKylin · 个人主页

轻量静态作品集，使用 HTML、CSS 和原生 JavaScript。无需构建步骤。

## 本地预览

在仓库根目录运行 `python -m http.server 8000`，然后访问 `http://localhost:8000`。

## 文件

- `index.html`：个人介绍、任务演示、工程实践与经历。
- `style.css`：浅色布局、响应式样式与减少动画支持。
- `script.js`：视频弹窗、预览播放控制与导航状态。
- `images/`：WebP 视频封面和 SVG favicon。
- `videos/`：网页播放副本；完整演示按需加载，首页使用独立的 14 秒静音预览。

## 媒体

视频来自用户提供的 SOTABOT 演示素材。仅生成网页副本，不修改原始文件。
完整演示保留源视频的完整时间范围，以 H.264 / 960px 宽 / 无音轨压缩，并启用 faststart；封面直接取自原视频。
源素材中已有的拍摄、剪辑或播放速度设定保持其原有时间轴，不据此声明任务成功率或推理性能。

| 网页资源 | 来源文件 |
| --- | --- |
| `objects.mp4` | 万物抓取demo原视频.mp4 |
| `conveyor.mp4` | 传送带抓取demo原视频.mp4 |
| `cups.mp4` | 20260819_PI05叠杯子.mp4 |
| `cloth.mp4` | 叠衣服.mp4 |
| `hero.mp4` | 万物抓取demo原视频.mp4，第 8–22 秒 |

更换演示时，同步更新 `index.html` 中的时长、`script.js` 的标题和简介，以及对应视频与封面。经历与项目表述应随实际验证进展更新。

页面不包含邮箱或简历下载。线上地址：https://huangkylin.github.io/ 。通过 main 分支发布到 GitHub Pages。
