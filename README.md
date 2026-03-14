# Topher's personal site

Live site: https://topherhunt.github.io/

## Dev setup

- `bundle install` (first-time only)
- Start the dev server: `bundle exec jekyll serve`
- Go to http://127.0.0.1:4000/

## Deploying

Push the `master` branch. A GitHub Actions workflow builds the site with Jekyll 4 and deploys to GitHub Pages.

## Project structure

- `source/` — all site content (pages, posts, layouts, includes, assets)
- `_site/` — build output (gitignored)
- `_config.yml` — Jekyll configuration

## Front matter options

Any markdown page can use the following front matter keys:

### `layout`

Which layout template to use. Options: `default`, `page`, `post`.

```yaml
layout: page
```

### `toc`

Generate a table of contents from all h2–h6 headings. On wide screens (≥1100px), appears as a sticky sidebar in the left gutter with scroll-spy. On narrow screens, appears inline below the first H1.

```yaml
toc: true
```

### `fold-headers`

Make specified heading levels collapsible. Content under each matching heading is hidden by default; clicking the heading toggles it open/closed.

```yaml
fold-headers: "h3,h4"
```

### `breadcrumbs`

Show a breadcrumb trail above the page title. "Home" is always included automatically. Requires `layout: page`.

```yaml
breadcrumbs:
  - title: Cheatsheets
    url: /cheatsheets/
```

### `permalink`

Set a custom URL path for the page.

```yaml
permalink: /cheatsheets/phoenix-setup/
```
