# Topher's portfolio site

[![HitCount](http://hits.dwyl.com/topherhunt/topherhunt.github.io.svg)](http://hits.dwyl.com/topherhunt/topherhunt.github.io)

See the site at: https://topherhunt.github.io/

## Setting up the dev environment

  * First time, you'll need to run `bundle install`
  * Start the dev server with: `bundle exec jekyll serve` (or my alias: `j`)


## Deploying

Push the `master` branch and Github Pages will know how to compile and serve the deployed site.


## Jekyll v3 notes

  * Handy tour of Jekyll, Liquid templates, layouts, includes, links, "front matter" and data collections: https://jekyllrb.com/docs/step-by-step/02-liquid/
  * The Jekyll server compiles the final site files to `_site/`.
  * `main.scss` can reference / import any stylesheets in `_sass/`.
  * I can set up an RSS feed by adding a `feed.xml` template.
