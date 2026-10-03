# Yuyang He · 个人学术网站

使用 Jekyll 与 GitHub Pages，网址为 <https://adrianhe-he.github.io/>。三页共用导航、深浅模式和响应式样式：正文与每条科研经历的标题使用 Lato 无衬线字体，名字、章节及论文标题使用 Times New Roman 衬线字体，三毛引语使用字号较小的 Lora 衬线斜体。浅色模式为白底深色文字与酒红色强调色，深色模式使用蓝色强调文字。

## 三个页面

| 页面 | 源文件 | 网址与内容 |
| --- | --- | --- |
| About | `index.html` | `/`：简介与照片、研究兴趣、News、荣誉 |
| Experience | `experience.html` | `/experience/`：科研经历、论文与相关链接 |
| Misc | `misc.html` | `/misc/`：兴趣爱好与引语 |

保留页面开头 `---` 内的 `layout`、`title`、`nav`、`permalink`。导航在 `_config.yml` 的 `nav` 中设置，包含 `id`、`label`、`url`；只改显示名称时修改 `label` 即可。旧首页的 `#experience`、`#publications`、`#hobbies` 等栏目链接由脚本兼容跳转。原 `/publications/` 网址会跳转到 `/experience/#publications`。

## 日常更新：找到文件 → 编辑 → 保存

登录 GitHub，打开 `main` 分支中的文件，点击铅笔 **Edit this file**。修改后点击 **Commit changes**，填写简短说明并提交到 `main`。到 **Actions** 查看 Pages 发布结果，成功后刷新对应页面。

| 内容 | 修改位置 |
| --- | --- |
| 姓名、邮箱、实习/合作意向 | `_config.yml` 的 `author`，意向字段为 `goal`；`role`、`affiliation` 保留在配置中，但不再显示在意向上方 |
| 联系与学术主页链接 | `_config.yml` 的 `links`；空字符串 `""` 隐藏链接 |
| 右侧个人照片 | 上传至 `assets/img/`，然后设置 `_config.yml` 的 `author.photo` |
| About 正文 | `_includes/bio.html` |
| News | `_data/news.yml`：`date`、`text`，可选 `title`、`url` |
| 研究兴趣 | `_data/interests.yml`：`title`、`desc` |
| 科研经历 | `_data/experience.yml` 的 `research`，显示在 Experience 页；`education` 数据保留但不显示 |
| 论文 | `_data/publications.yml`，显示在 Experience 页的 Publications 栏目 |
| 荣誉 | `_data/honors.yml`：`year`、`date`、`title`、`org`，可选 `tier`、`desc` |
| 爱好 | `_data/hobbies.yml`：`title`、`desc` |
| 引语 | `_config.yml` 的 `quote`；隐藏整块使用 `quote: null` |
| 鼠标跟随的小皮卡丘 | `_config.yml` 的 `cursor_pet`；设为 `""` 隐藏跟随图片。名字旁的静态图片已移除 |

### 容易遗漏的地方

- YAML 保留缩进，用空格，不用 Tab。新增一条复制完整列表项，不覆盖既有真实资料。
- News 当前有一条标注 `(example)` 的示例。论文当前为空列表 `[]`；首次添加论文要用条目替换 `[]`，不能接在其后。
- News 日期使用统一的带引号格式，例如 `"2026-10-02"`，按日期倒序。`text` 是正文，`title` 是可选标题；有 `url` 时链接标题，没有标题则链接正文。`title` 与 `text` 至少填写一项。
- 论文按 `year` 倒序分组，年份统一写数字；作者用英文分号 `;` 分隔，以 `**Yuyang He**` 加粗本人名字。`pdf`、`poster`、`arxiv`、`code`、`project`、`bibtex` 只填写真实链接，空值不显示。论文可加 `desc`、`image`、`image_alt` 和 `badge`。
- 经历的分类名只写一次；分类内 `- period:` 前两个空格，其余 `title`、`org`、`desc` 前四个空格。`service` 中是未显示的旧模板示例，不代表本人真实经历。
- 荣誉按 `date` 倒序，格式为 `"YYYY.MM"`，月份补零。研究兴趣、经历、技能和爱好按文件顺序显示。
- 邮箱分别出现在 `author.email` 与 `links.email`。名字还可能写在简介与论文署名中，需分别检查。
- CV 可上传为 `assets/cv.pdf`，再设置 `links.cv: "/assets/cv.pdf"`。图片建议放 `assets/img/`，链接使用 `/assets/…`，避免在子页面中指向错误目录。
- 手册里的模板需要先填真实信息；示例不应原样发布。日常更新无需修改域名、账号或仓库名，也无需删除提交历史。

## 样式参数

姓名、意向与联系链接横跨顶部两列；下方左侧简介正文与右侧照片顶部对齐。桌面照片位约 248 × 331px，列间距为 `2rem`；窗口宽度不超过 760px 时，照片列为 200px、列间距为 `1.75rem`。上传自己的照片后，在 `author:` 下把 `photo: ""` 改为 `photo: "/assets/img/portrait.jpg"`（保留两个空格缩进，文件名按实际填写）。窗口宽度不超过 520px 时，照片自动排在简介后面。未上传照片时，桌面保留照片位，手机隐藏空位。

顶部链接按配置顺序显示。`cv: "#"` 是待替换的 CV 占位链接；上传 PDF 后改为 `/assets/cv.pdf`。`wechat`、`x`、`scholar` 目前是各服务入口，分别替换成微信二维码图片、X 个人主页、Google Scholar 个人主页地址。News 目前有一条标注 `(example)` 的示例，可改写或删除。研究兴趣以普通段落显示，News 与荣誉以项目符号列表显示。Skills 已从页面移除。Experience 页每条经历按标题、单位与时间、说明排列；同一条记录可加 `status`、`pdf`、`poster`、`code`、`project`、`image`、`image_alt`，填写后才显示状态、按钮和配图。留空或不填写就不显示，不必修改 HTML。 每条经历与未来添加的每篇论文都使用独立的圆角卡片：细边框、轻微阴影和适当内边距；夜间模式自动调整卡片背景与边框。

卡片样式在 `assets/css/style.css` 中搜索 `Each experience or paper`。`padding` 控制卡片内边距，`margin-bottom` 控制卡片间距，`border-radius` 控制圆角，`box-shadow` 控制阴影。相关选择器以 `.experience-page` 开头，仅作用于 Experience 页。宽度不超过 520px 的手机规则另设 `padding: 1.15rem`、`border-radius: 11px`；调整时同时检查深色模式与手机规则。

所有样式在 `assets/css/style.css`：

```css
--measure: 1040px; /* 整块内容最大宽度，含两侧内部边距 */
--gutter: 24px;   /* 桌面每侧边距，最大正文宽度 992px */
--accent: #97181e; /* 浅色模式酒红色强调色 */
```

手机宽度不超过 520px 时每侧边距为 18px。桌面正文 18px，手机正文 17px，默认行高为 1.7；首页简介正文单独设为 1.65，段落间距为 `.9rem`。名字字号 `2.625rem`（默认约 42px），手机 `2.125rem`（约 34px），字重 700。章节标题约 26px，手机约 24px。名字、章节与论文标题由 `--font-heading: 'Times New Roman', Times, serif` 设置，正文与经历标题由 `--font-body` 设置。`.experience-title` 使用 Lato，字号 `1.375rem`（约 22px）、字重 700。标题、日期等有单独的样式；修改正文不一定同步改变它们。

浅色变量在 `:root`，深色变量在 `:root.dark`。深色模式的强调色为 `--accent: #69b8f7`，强调背景为 `--accent-soft: #1d3042`。深浅模式选择保存在当前浏览器，跨页面沿用；没有手动选择时参考系统主题。CSS 与 JavaScript URL 带构建时间参数，发布成功后如仍看到旧内容，可强制刷新。页脚更新时间自动使用构建月份。

## 恢复与本地预览

改错一个文件时，进入 **History** 找到正确旧版本，在该版本的文件视图用 **Raw** 复制完整原文，再回到 `main` 的当前文件编辑页覆盖提交。不要只复制红绿差异。大改前可用 **Code → Download ZIP** 保存源码备份。

本地预览是可选操作，需要可用的 Ruby 与 Bundler：

```sh
bundle install
bundle exec jekyll serve
```

访问 <http://127.0.0.1:4000>。修改 `_config.yml` 后重新启动本地预览。GitHub Pages 使用 `Gemfile` 中的 `github-pages` 依赖生成网站，无需 JavaScript 构建工具。
