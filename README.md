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

- **`layout`** — which template to use: `default`, `page`, or `post`
- **`toc: true`** — generate a table of contents from h2–h6. Sticky sidebar on wide screens, inline on narrow.
- **`fold-headers: "h3,h4"`** — make specified heading levels collapsible (click to toggle)
- **`permalink: /my/path/`** — custom URL path for the page
- **`breadcrumbs`** — breadcrumb trail above the title (requires `layout: page`). Posts get Home > Blog automatically.
  ```yaml
  breadcrumbs:
    - title: Cheatsheets
      url: /cheatsheets/
  ```

## To do

- Figure out a compelling design for my homepage.
  - Re-include things I love + things I'm worried about. As a random JS selection of 3 items? But first, come up with an updated list of things I love + things I'm worried about.
  - Include a pic of me with a cool subtle mouse-cursor-tilt JS/CSS & shadow
