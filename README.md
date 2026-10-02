# Yuyang He · 个人学术网站

使用 Jekyll 与 GitHub Pages，网址为 <https://adrianhe-he.github.io/>。三页共用导航、深浅模式和响应式样式：主体使用 Roboto 无衬线字体，白底深色文字与酒红色强调色；引语保留衬线斜体。

## 三个页面

| 页面 | 源文件 | 网址与内容 |
| --- | --- | --- |
| About | `index.html` | `/`：简介、研究兴趣、News、教育与科研经历、技能、荣誉 |
| Publications | `publications.html` | `/publications/`：论文与相关链接 |
| Misc | `misc.html` | `/misc/`：兴趣爱好与引语 |

保留页面开头 `---` 内的 `layout`、`title`、`nav`、`permalink`。导航在 `_config.yml` 的 `nav` 中设置，包含 `id`、`label`、`url`；只改显示名称时修改 `label` 即可。旧首页的 `#publications`、`#hobbies` 等栏目链接由脚本兼容跳转。

## 日常更新：找到文件 → 编辑 → 保存

登录 GitHub，打开 `main` 分支中的文件，点击铅笔 **Edit this file**。修改后点击 **Commit changes**，填写简短说明并提交到 `main`。到 **Actions** 查看 Pages 发布结果，成功后刷新对应页面。

| 内容 | 修改位置 |
| --- | --- |
| 姓名、身份、学校、邮箱、实习/合作意向 | `_config.yml` 的 `author`，意向字段为 `goal` |
| 联系与学术主页链接 | `_config.yml` 的 `links`；空字符串 `""` 隐藏链接 |
| About 正文 | `_includes/bio.html` |
| News | `_data/news.yml`：`date`、`text`，可选 `title`、`url` |
| 研究兴趣 | `_data/interests.yml`：`title`、`desc` |
| 教育/科研经历 | `_data/experience.yml` 的 `education` / `research` |
| 论文 | `_data/publications.yml` |
| 技能 | `_data/skills.yml`：`category`、`items` |
| 荣誉 | `_data/honors.yml`：`year`、`date`、`title`、`org`，可选 `tier`、`desc` |
| 爱好 | `_data/hobbies.yml`：`title`、`desc` |
| 引语 | `_config.yml` 的 `quote`；隐藏整块使用 `quote: null` |
| 小皮卡丘 | `_config.yml` 的 `cursor_pet`；设为 `""` 隐藏名字旁与鼠标跟随图片 |

### 容易遗漏的地方

- YAML 保留缩进，用空格，不用 Tab。新增一条复制完整列表项，不覆盖既有真实资料。
- News 和论文当前空列表以 `[]` 表示。首次添加必须用条目替换 `[]`，不能接在其后。
- News 日期使用统一的带引号格式，例如 `"2026-10-02"`，按日期倒序。`text` 是正文，`title` 是可选标题；有 `url` 时链接标题，没有标题则链接正文。`title` 与 `text` 至少填写一项。
- 论文按 `year` 倒序分组，年份统一写数字；作者用英文分号 `;` 分隔，以 `**Yuyang He**` 加粗本人名字。`pdf`、`arxiv`、`code`、`project`、`bibtex` 只填写真实链接，空值不显示。
- 经历的分类名只写一次；分类内 `- period:` 前两个空格，其余 `title`、`org`、`desc` 前四个空格。`service` 中是未显示的旧模板示例，不代表本人真实经历。
- 荣誉按 `date` 倒序，格式为 `"YYYY.MM"`，月份补零。研究兴趣、经历、技能和爱好按文件顺序显示。
- 邮箱分别出现在 `author.email` 与 `links.email`。名字还可能写在简介与论文署名中，需分别检查。
- CV 可上传为 `assets/cv.pdf`，再设置 `links.cv: "/assets/cv.pdf"`。图片建议放 `assets/img/`，链接使用 `/assets/…`，避免在子页面中指向错误目录。
- 手册里的模板需要先填真实信息；示例不应原样发布。日常更新无需修改域名、账号或仓库名，也无需删除提交历史。

## 样式参数

所有样式在 `assets/css/style.css`：

```css
--measure: 980px; /* 整块内容最大宽度，含两侧内部边距 */
--gutter: 28px;   /* 桌面每侧边距，最大正文宽度 924px */
--accent: #97181e; /* 浅色模式酒红色强调色 */
```

手机宽度不超过 520px 时每侧边距为 20px。桌面正文 17.5px，手机正文 17px，行高均为 1.75。名字字号 `3.25rem`（默认约 52px），手机 `2.375rem`（约 38px），字重 650。标题、日期等有单独的样式；修改正文不一定同步改变它们。

浅色变量在 `:root`，深色变量在 `:root.dark`。深浅模式选择保存在当前浏览器，跨页面沿用；没有手动选择时参考系统主题。CSS 与 JavaScript URL 带构建时间参数，发布成功后如仍看到旧内容，可强制刷新。页脚更新时间自动使用构建月份。

## 恢复与本地预览

改错一个文件时，进入 **History** 找到正确旧版本，在该版本的文件视图用 **Raw** 复制完整原文，再回到 `main` 的当前文件编辑页覆盖提交。不要只复制红绿差异。大改前可用 **Code → Download ZIP** 保存源码备份。

本地预览是可选操作，需要可用的 Ruby 与 Bundler：

```sh
bundle install
bundle exec jekyll serve
```

访问 <http://127.0.0.1:4000>。修改 `_config.yml` 后重新启动本地预览。GitHub Pages 使用 `Gemfile` 中的 `github-pages` 依赖生成网站，无需 JavaScript 构建工具。
