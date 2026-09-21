# Yuyang He — academic homepage

A single-page Jekyll website for GitHub Pages. The layout uses a white background,
serif headings and body text, restrained blue links, and a narrow reading column.
Dark mode, section navigation, reduced-motion support, and the existing Pikachu
cursor companion are included.

## Update the content

- `_config.yml`: name, affiliation, contact links, navigation, and personal quote.
  Leave a link empty to hide it. Set `cursor_pet: ""` to hide both mascots.
- `index.html`: biography and News text.
- `_data/interests.yml`: research interests.
- `_data/experience.yml`: education and research experience. The unused service
  sample is not displayed.
- `_data/publications.yml`: publications, newest year first. Use `**Yuyang He**`
  in the semicolon-separated authors string to highlight your name. Optional
  links (`pdf`, `arxiv`, `code`, `project`, `bibtex`) appear only when populated.
- `_data/honors.yml`: awards, sorted by `date` newest first. Use `YYYY.MM` dates.
- `_data/skills.yml` and `_data/hobbies.yml`: skills and personal interests.

## Adjust margins and type

`assets/css/style.css` contains all styles. At the top:

```css
--measure: 880px; /* total container width, including its inner margins */
--gutter: 32px;   /* desktop inner margin on each side: 816px of text */
```

Below 760px the inner margin is 24px; below 520px it is 20px. Navigation,
main content, section rules, and footer use the same alignment. Body text is
17px on desktop and 16px on phones, with a 1.75 line height. Browser text-size
settings are respected through rem units. Dark theme tokens are under
`:root.dark`. The footer date reflects the build date.

## Preview locally

With a supported Ruby and Bundler installation:

```sh
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000. GitHub Pages builds the repository using the
`github-pages` dependencies in `Gemfile`; no JavaScript build tool is required.

## Publish

Push the reviewed changes to the branch configured in GitHub Settings → Pages.
The existing site is at https://adrianhe-he.github.io/.
