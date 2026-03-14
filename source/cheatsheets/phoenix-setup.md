---
layout: page
title: Phoenix Setup
permalink: /cheatsheets/phoenix-setup/
toc: "h2"
fold-headers: "h3"
breadcrumbs:
  - title: Cheatsheets
    url: /cheatsheets/
---

Create a new Phoenix app with esbuild, SCSS compilation, React, Jquery, Bootstrap, Bootstrap Icons, and a production-ready Render deployment.

## Basic setup

- `mix phx.new myapp --no-tailwind`
- `cd myapp`
- `git init . && git add --all && git commit -m "Initial commit"`
- `mix ecto.create`
- Create `.tool-versions` and set the tool versions you're using:

```bash
# tool version specification for asdf
elixir 1.17.2
erlang 27.0.1
nodejs 22.14.0
```

- `asdf install` to install the matching elixir, erlang, and node versions
- Install npm packages for SASS and React:
`npm i --save sass@1.77.6 sane react react-dom bootstrap jquery --prefix assets/`
(*Use `sass@1.77.6` because in later versions, Bootstrap causes noisy deprecation warnings.*)
- In `dev.exs`, under the `Endpoint` config, add a watcher script to rebuild any scss files:

```elixir
  watchers: [
    esbuild: ...,
    npm: ["run", "sass-watch", "--prefix", "assets/", into: IO.stream(:stdio, :line), stderr_to_stdout: true]
  ]
```

- Define the sass scripts in `assets/package.json`:

```json
  "scripts": {
    "sass-watch": "node build-sass.js --watch",
    "sass-deploy": "node build-sass.js --deploy"
  }
```

- Add `assets/build-sass.js`:

```js
// Called by dev.exs Endpoint config
// Thanks to https://mfeckie.dev/sass-in-phoenix/

const sass = require("sass");
const sane = require("sane");
const fs = require("fs");
const args = process.argv.slice(2);

function rebuildCss() {
  const before = new Date();
  const {css} = sass.renderSync({file: "css/app.scss", sourceMapEmbed: true});
  const after = new Date();
  const duration = after - before;
  console.log(`✨ CSS rebuilt in ${duration}ms`);
  fs.mkdirSync("../priv/static/assets", {recursive: true});
  fs.writeFileSync("../priv/static/assets/app.css", css);
}

if (args.includes("--watch")) {
  const styleWatcher = sane("css", { glob: ["**/*.scss"] });
  styleWatcher.on("ready", rebuildCss);
  styleWatcher.on("add", rebuildCss);
  styleWatcher.on("delete", rebuildCss);
  styleWatcher.on("change", rebuildCss);
  // Keep the process running until explicitly killed
  process.stdin.on("end", () => process.exit());
  process.stdin.resume();
} else if (args.includes("--deploy")) {
  rebuildCss();
} else {
  console.log("Usage: node build-sass.js --watch|--deploy");
}
```


## CSS & JS

- Create `assets/css/app.scss` and import Bootstrap, Bootstrap Icons, and some custom css:

```scss
@import "node_modules/bootstrap/scss/bootstrap";
@import "vendor/bootstrap-icons";
@import "general";
@import "components";
```

- Add `assets/css/general.scss`:

```scss
//
// Bootstrap overrides
//

a { text-decoration: none; }
a:not(.btn):not(.nav-link):hover { text-decoration: underline; }

h1, h2, h3, h4, h5, h6, h7 { margin-top: 0.5em; margin-bottom: 0.5em; }

// Darker warning text color (the default is very hard to read)
.text-warning { color: rgb(203, 152, 0) !important; }
.btn-outline-warning { color: rgb(203, 152, 0) !important; }
.btn-outline-warning:focus, .btn-outline-warning:hover { color: black !important; }

// Make the emphasis utilities less dark, more pronounced color
.text-primary-emphasis { color: darken($primary, 20%) !important; }
.text-secondary-emphasis { color: darken($secondary, 20%) !important; }
.text-success-emphasis { color: darken($success, 20%) !important; }
.text-info-emphasis { color: darken($info, 20%) !important; }
.text-warning-emphasis { color: darken($warning, 20%) !important; }
.text-danger-emphasis { color: darken($danger, 20%) !important; }

// I customized the `.rounded` utility to a 1rem border-radius. .rounded-md is for the few cases
// where we do NOT want that, instead we want the original medium rounding level.
.rounded-md { border-radius: 0.375rem; }

.form-check-input { border-color: #999; } // The Bootstrap default looks too dimmed / disabled

//
// Utilities
//

.em { font-style: italic; }
.strong { font-weight: bold; }
.u-hidden { display: none; }
.u-nowrap { white-space: nowrap; }
.u-ellipse { overflow: hidden; text-overflow: ellipsis; }

// Use in combination with .mx-auto (or alone)
.max-w-400 { max-width: 400px; }
.max-w-500 { max-width: 500px; }
.max-w-600 { max-width: 600px; }
.max-w-700 { max-width: 700px; }
.max-w-800 { max-width: 800px; }
.max-w-900 { max-width: 900px; }
.max-w-1000 { max-width: 1000px; }
.max-w-1100 { max-width: 1100px; }
.max-w-1200 { max-width: 1200px; }

.border-dashed { border-style: dashed !important; }
.border-subtle { border-color: #eff1f4 !important; }

.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }
.cursor-help { cursor: help; }

.mt-n1 { margin-top: -0.25rem; }
.mt-n2 { margin-top: -0.5rem; }
.mt-n3 { margin-top: -1rem; }
.mb-n1 { margin-bottom: -0.25rem; }
.mb-n2 { margin-bottom: -0.5rem; }
.mb-n3 { margin-bottom: -1rem; }
.ms-n1 { margin-left: -0.25rem; }
.ms-n2 { margin-left: -0.5rem; }
.ms-n3 { margin-left: -1rem; }
.me-n1 { margin-right: -0.25rem; }
.me-n2 { margin-right: -0.5rem; }
.me-n3 { margin-right: -1rem; }

// Useful in PDF printing
.avoid-page-break { break-inside: avoid; }
.page-break-after { break-after: always; page-break-after: always; }
```

- Add `assets/css/components.scss`:

```scss
// CSS for special-purpose components (as opposed to utility classes) go here.

.u-tooltip-target {
  // CSS-only tooltips compatible with LiveView.
  //
  // Example:
  //   <span class="u-tooltip-target">
  //     Hover on me
  //     <div class="u-tooltip">This tooltip will display when hovered</div>
  //   </span>
  //
  // Customizing:
  // - Override the width on .u-tooltip to fit the context. (e.g. 10em may look better)
  // - Use .u-tooltip.u-tooltip-oneline for short, one-line tooltips (default is multiline)

  position: relative;

  .u-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 20em;
    margin-left: -3em;
    margin-bottom: 5px;
    text-wrap: wrap;
    display: block;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding: 0.3rem 0.3rem;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1rem;
    background-color: #000;
    color: #fff;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.6);
    z-index: 9999;
    pointer-events: none; // prevent clicks on tooltip from clicking the parent element

    &.u-tooltip-oneline {
      width: auto;
      white-space: nowrap;
    }

    &.--bottom {
      bottom: auto;
      top: 100%;
      margin-top: 5px;
    }
  }

  // This bridges the gap so you can mouse into the tooltip without it disappearing
  .u-tooltip::before {
    bottom: -10px;
    content: " ";
    display: block;
    height: 10px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  // CSS Triangles
  .u-tooltip::after {
    position: absolute;
    left: 3em;
    bottom: -6px;
    margin-left: -13px;
    height: 0;
    width: 0;
    content: " ";
    border-left: solid transparent 10px;
    border-right: solid transparent 10px;
    border-top: solid #000 10px;
  }

  .u-tooltip.--bottom::before {
    top: -10px;
    bottom: auto;
  }

  .u-tooltip.--bottom::after {
    top: -6px;
    bottom: auto;
    border-top: none;
    border-bottom: solid #000 10px;
  }

  &:hover .u-tooltip {
    visibility: visible;
    opacity: 1;
  }
}

.phx-modal-wrapper {
  /* Simple modals, compatible with either LiveView or JS show/hide. Usage example:
    <div class="phx-modal-wrapper">
      <div class="phx-modal-backdrop" phx-click="hide-modal"></div>
      <div class="phx-modal">
        <a href="#" class="position-absolute top-0 end-0 p-2" phx-click="hide-modal">✖️</a>
        <h3 class="mt-0">Modal Title</h3>
        <p>Modal content</p>
      </div>
    </div> */

  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  padding: 1rem;
  z-index: 2;

  .phx-modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .phx-modal {
    position: relative;
    max-width: 600px;
    margin-left: auto; margin-right: auto; margin-top: 4rem;
    padding: 1rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    // Syntax: box-shadow(offset-x offset-y blur-radius spread-radius color)
    box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.2);
    max-height: calc(90vh - 6rem);
    overflow-y: auto;
  }
}

/* Scroll shadows — pure CSS using scroll-driven animations.
   Inset box-shadows appear/disappear based on scroll position.
   Works with transparent backgrounds. No JS required.

   Usage: Add class="scroll-shadows" and a max-height + overflow:auto to your element. */

.scroll-shadows {
  overflow: auto;
  animation: scroll-shadows linear both;
  animation-timeline: scroll(self);
}

@keyframes scroll-shadows {
  from {
    box-shadow: inset 0 8px 6px -6px rgba(0,0,0,0),
                inset 0 -8px 6px -6px rgba(0,0,0,0.15);
  }
  1%, 99% {
    box-shadow: inset 0 8px 6px -6px rgba(0,0,0,0.15),
                inset 0 -8px 6px -6px rgba(0,0,0,0.15);
  }
  to {
    box-shadow: inset 0 8px 6px -6px rgba(0,0,0,0.15),
                inset 0 -8px 6px -6px rgba(0,0,0,0);
  }
}
```

- Install Bootstrap Icons:
    - Go to https://icons.getbootstrap.com/#install, download & unpack the Source Code .zip.
    - Copy `font/bootstrap-icons.scss` to `assets/vendor/`, open it, adjust the `font-dir` variable to `"../fonts"`, and delete references to the `.woff` file (we'll only use the `.woff2`).
    - Copy `font/fonts/bootstrap-icons.woff2` to `priv/static/fonts/`.
- At the bottom of `app.js`, add some imports:

```jsx
//
// Non-Phoenix imports
//

// Import all of BS for simplicity. Could reduce bundle size by only importing specific components.
import "bootstrap"
import "./jquery_utilities"
import "./react/_init"
```

- Add `assets/js/jquery_utilities.js`:

```js
import $ from "jquery"

const raise = (msg) => { throw new Error(msg); }

$(function(){

  // Generic listener which binds to an arbitrary event to perform action(s) on a target.
  // Format: "event:action:target" — multiple actions separated by ", "
  // Actions: show, hide, toggle (target is a CSS selector), swap-text (target is "a|b")
  $('[data-js-on]').each(function(){
    const el = $(this)
    el.data('js-on').split(', ').forEach(actionStr => {
      const [event, action, target] = actionStr.split(':')
      const allowedActions = ["show", "hide", "toggle", "swap-text"]
      if (!allowedActions.includes(action))
        throw new Error(`Action '${action}' must be one of: ${allowedActions.join(', ')}`);

      el.on(event, function(e){
        e.preventDefault()
        if (["show", "hide", "toggle"].includes(action)) {
          $(target)[action](200);
        } else if (action === 'swap-text') {
          const [a, b] = target.split('|')
          const text = el.text()
          el.text(text.includes(a) ? text.replace(a, b) : text.replace(b, a))
        } else {
          throw new Error(`Don't know how to handle action: ${action}`);
        }
      })
    })
  });

  // ==============================
  // Batch Select System
  // ==============================
  // A reusable pattern for selecting multiple items in a list and performing batch actions.
  //
  // How to use it:
  // 1. Add a "toggle all" checkbox in your table header with class `.js-batch-select-toggle-all`.
  // 2. Add a checkbox to each row with class `.js-batch-select` and `data-id="{ITEM_ID}"`.
  // 3. (Optional) Add `.js-batch-select-row` to each <tr>, so users can click anywhere on the row
  //    to toggle its checkbox.
  // 4. Add `.js-batch-select-action` to any link that should trigger a batch action. The JS will
  //    collect all checked IDs and POST them to the link's href as `ids=1,2,3`.
  // 5. (Optional) Add `data-confirmation="Delete {COUNT} items?"` to the link, to show a confirm dialog.
  //    Use {COUNT} as a placeholder for the number of selected items.
  //    (We don't use `data-confirm` because that would conflict with Rails UJS.)
  // 6. Server-side: your POST endpoint receives `params[:ids]` as a comma-separated string, e.g. "1,2,3".
  //
  // Example table HTML:
  //   <table>
  //     <thead>
  //       <tr>
  //         <th><input type="checkbox" class="js-batch-select-toggle-all" /></th>
  //         <th>Name</th>
  //         ...
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr class="js-batch-select-row">
  //         <td><input type="checkbox" class="js-batch-select" data-id="123" /></td>
  //         <td>Item Name</td>
  //       </tr>
  //       ...
  //     </tbody>
  //   </table>
  //
  // Example action link HTML:
  //   <a href="/admin/users/batch_delete" class="js-batch-select-action"
  //      data-confirmation="Delete {COUNT} users?">Delete Selected</a>
  //
  // Server-side: The controller receives params[:ids] as a comma-separated string (e.g., "1,2,3").

  $('.js-batch-select-toggle-all').change(function(){
    var checked = $(this).is(':checked');
    $('.js-batch-select').prop('checked', checked);
  });

  $('.js-batch-select-row').click(function(e){
    if (e.target.type === 'checkbox' || $(e.target).closest('a').length) return;
    var checkbox = $(this).find('.js-batch-select');
    checkbox.prop('checked', !checkbox.prop('checked'));
  });

  $('.js-batch-select-action').click(function(e) {
    e.preventDefault();

    var ids = $('.js-batch-select:checked').map((_, el) => $(el).data('id')).get();
    if (ids.length === 0) { alert('No items selected.'); return; }

    if ($(this).data('confirm')) { alert('data-confirm NOT supported on batch actions due to Rails conflict. Use `data-confirmation` instead.'); return; }

    var confirmMsg = $(this).data('confirmation');
    if (confirmMsg) {
      confirmMsg = confirmMsg.replace('{COUNT}', ids.length);
      if (!confirm(confirmMsg)) return;
    }

    var form = $('<form>', {
      // Set `data-batch-method="get"` on the link to submit as GET instead of POST.
      // (Can't use `data-method` because that conflicts with Rails UJS.)
      method: $(this).data('batch-method') || 'POST',
      // The form submits to the link's standard href.
      action: $(this).attr('href')
    });
    form.append($('<input>', { type: 'hidden', name: 'ids', value: ids.join(',') }));
    form.append($('<input>', { type: 'hidden', name: 'authenticity_token', value: $('meta[name="csrf-token"]').attr('content') }));
    form.appendTo('body').submit();
  });

})
```

- Add `assets/js/react/_init.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Counter} from "./Counter"

const renderRoot = (selector, component) => {
  const container = document.getElementById(selector);
  if (!container) return;
  ReactDOM.createRoot(container).render(component);
}

renderRoot('counter-root', <Counter />)
```

- Add `assets/js/react/Counter.jsx`:

```jsx
import React, {useState} from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="react-counter">
      <h3>React Test</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```


## Testing

Add a route `/test_page` & page `test_page.html.heex` to test it all:

```elixir
# in router.ex:

get "/test-page", PageController, :test_page

# in page_controller.ex:

def test_page(conn, _params) do
  # Run a simple SELECT 1 + 1 postgres query to test the DB connection.
  [[two]] = MyApp.Repo.query!("SELECT 1 + 1") |> Map.fetch!(:rows)
  render(conn, :test_page, query_result: two)
end
```

```heex
<h2>Bootstrap, icons, SCSS</h2>
<div class="alert alert-success">Success message</div>
<div>An icon: <i class="bi bi-person-circle" /></div>
<span class="u-tooltip-target">Hover to see a CSS tooltip.<div class="u-tooltip u-tooltip-oneline">Here's the tooltip!</div></span>
<div><a href="#" data-js-on="click:toggle:#my-modal" class="btn btn-primary">Show modal</a></div>

<div id="my-modal" class="phx-modal-wrapper u-hidden">
  <div class="phx-modal-backdrop" data-js-on="click:toggle:#my-modal"></div>
  <div class="phx-modal">
    <a href="#" class="position-absolute top-0 end-0 p-2" data-js-on="click:toggle:#my-modal">✖️</a>
    <h3 class="mt-0">Modal Title</h3>
    <p>Modal content</p>
  </div>
</div>

<h2 class="mt-3">React</h2>
<div id="counter-root"></div>

<h2>DB connection</h2>
<div>1 + 1 = <%= @query_result %></div>
```

- Search for any `MyApp` instances and replace them with your app name.
- Now start the app and test it out!
`mix phx.server`
[http://localhost:4000/test-page](http://localhost:4000/test-page)

## LiveView

- *NOTE: The user references assume you've done the auth setup. Omit otherwise.*
- In `MyAppWeb`, under `controller`, add:
`import Phoenix.LiveView.Controller, only: [live_render: 3]`
- In `MyAppWeb`, under `live_view`, replace the `use` and add some aliases:

```elixir
      # EXCLUDING layout because liveviews are rendered from controller endpoints.
      use Phoenix.LiveView
      alias MyApp.Repo
```

- Add a route `/test_live` to `PageController#test_live`
- Add an endpoint `PageController#test_live`:

```elixir
  def test_live(conn, _params) do
    live_render(conn, MyAppWeb.TestLive, session: %{"count" => 0})
  end
```

- Add `lib/myapp_web/live/test_live.ex`:

```elixir
defmodule MyAppWeb.TestLive do
  use MyAppWeb, :live_view

  def mount(_params, %{"current_user_id" => user_id} = session, socket) do
    if connected?(socket), do: schedule_tick()
    current_user = nil # to prevent errors when auth system is built
    socket = assign(socket, count: Map.fetch!(session, "count"), current_user: current_user)
    {:ok, socket}
  end

  def handle_event("add", %{"amount" => amount}, socket) do
    {:noreply, assign(socket, count: socket.assigns.count + String.to_integer(amount))}
  end

  def handle_event("subtract", %{"amount" => amount}, socket) do
    {:noreply, assign(socket, count: socket.assigns.count - String.to_integer(amount))}
  end

  def handle_info(:tick, socket) do
    schedule_tick()
    {:noreply, assign(socket, count: socket.assigns.count + 1)}
  end

  defp schedule_tick, do: Process.send_after(self(), :tick, 1000)
end
```

- Add `lib/myapp_web/live/test_live.html.heex`:

```heex
<h1>Test liveview</h1>
Seconds passed: <%= @count %>
<a href="#" class="btn btn-success" phx-click="add" phx-value-amount="5">+5</a>
<a href="#" class="btn btn-success" phx-click="subtract" phx-value-amount="5">-5</a>
```

### Testing

- Start the dev server and go to `/test_live`, confirm the counter increments once per second and the buttons react as expected.

## Deploy to Render

- In `prod.exs`, update the Endpoint config and add a Repo config:

```elixir
config :myapp, MyAppWeb.Endpoint,
  cache_static_manifest: "priv/static/cache_manifest.json",
  http: [port: String.to_integer(System.get_env("PORT") || "4000")],
  url: [host: System.get_env("PHX_HOST") || raise("missing PHX_HOST"), scheme: "https", port: 443],
  secret_key_base: System.get_env("SECRET_KEY_BASE") || raise("missing env SECRET_KEY_BASE")

config :playbl, Playbl.Repo,
  url: System.get_env("DATABASE_URL") || raise("missing env DATABASE_URL"),
  # Trace where in my code a query was called when query errors occur.
  # Minor performance hit, but more than worth it.
  stacktrace: true,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")
```

- Delete `runtime.exs`, we won't use it.
- In `endpoint.ex` under `plug Plug.Static` set `gzip: true` so Phoenix will compress assets.
- Add `./build.sh`:

```bash
#!/usr/bin/env bash
#
# Render's build script that compiles the app & assets on each deploy.
# Adapted from https://render.com/docs/deploy-phoenix-distillery, but
# I'm not using Distillery anymore, the build process was causing problems.
#
# You can test it locally:
#   > export MIX_ENV=prod DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/playbl_phoenix_dev SECRET_KEY_BASE=$(mix phx.gen.secret) PHX_HOST=localhost MAILGUN_API_KEY=abc MAILGUN_DOMAIN=playbl.com
#   > sh build.sh
#   > mix phx.server
#
# Then run this to clear out all digested assets:
#   > mix phx.digest.clean --all
#

echo "Build starting."

# exit on error
set -o errexit

# Remove existing builds first if a stale build is causing problems.
# rm -rf "_build"

# error and exit unless MIX_ENV == "prod"
if [ "$MIX_ENV" != "prod" ]; then
  echo "MIX_ENV must be set to 'prod' to build the app."
  exit 1
fi

mix deps.get --only prod
mix compile
npm install --prefix assets/

# Build app.css
npm run sass-deploy --prefix assets/

# Build app.js
NODE_PATH=./deps mix esbuild default assets/js/app.js --bundle --minify --target=es2017 --outdir=./priv/static/assets

# Create digested assets
mix phx.digest

echo "Build complete. Ready to start."
```

- Make it executable: `chmod a+x build.sh`
- Create a Github repo, push all changes.
- Log into Render. Add a Postgres DB in a new project + environment for this app.
- Then add a web service in the same project + environment, linked to your Github repo:
    - Build command: `./build.sh`
    - Pre-deploy command: `mix ecto.migrate`
    - Start command: `mix phx.server`
    - Set environment variables:
        - `SECRET_KEY_BASE` (run `mix phx.gen.secret`)
        - `DATABASE_URL` (The internal database URL of the database you created above)
        - Also set `ELIXIR_VERSION`, `ERLANG_VERSION`, and `NODE_VERSION` vars to match `.tool-versions`. [More info](https://render.com/docs/elixir-erlang-versions).
    - Click Create and watch the build logs to ensure it builds and deploys successfully.
    - Go to the web service's internal URL to test that the site runs correctly.
- Optionally set up one-line HTTP request logging per [these steps](https://stackoverflow.com/questions/56600637/elixir-phoenix-how-to-customize-http-request-log-format).
- Add Papertrail logging:
    - Go to Papertrail.com → "Add systems", copy the url (eg `logs.papertrailapp.com:12345`)
    - In Render's main dashboard, go to Integrations → Observability → Log Streams → Add Default. Paste in the Papertrail destination URL (no token needed) and click Save.
    - Load pages in the app to generate some logs, wait a minute, then check Papertrail, you should see new systems appear for those log sources. Optionally create a Group so you can view these Render log sources separately from your other apps.
    - Optionally set up a search alert for error logs.
    - In `config/config.exs`, alter the `:logger` config to remove `$time` and `:request_id` to make the logs less noisy.
- Add Rollbar error reporting:
    - Go to rollbar.com, log in, and create a new "account" (aka project)
    - Click "Complete the setup" for the autocreated project, select Elixir, and copy the server-side access token
    - Rename the Rollbar project to describe this app
    - `heroku config:set ROLLBAR_SERVER_SIDE_TOKEN={paste in token}`
    - In `mix.exs` add the `{:rollbax, "~> 0.11"}` dep, then run `mix deps.get`
    - In `dev.exs`, add: `config :rollbax, enabled: false`
    - In `prod.exs`, add:

```elixir
config :rollbax,
  enabled: true,
  access_token: System.get_env("ROLLBAR_SERVER_SIDE_TOKEN"),
  environment: "prod"
```

- In `router.ex`, add: `use Plug.ErrorHandler # see handle_errors() below` and at the bottom: `defp handle_errors(conn, data), do: PolaritiesWeb.ErrorPlugs.handle_errors(conn, data)`
- Add `lib/myapp_web/plugs/error_plugs.ex`:

```elixir
defmodule PolaritiesWeb.ErrorPlugs do
  @moduledoc """
  Report controller request errors to Rollbar.
  This does NOT auto-report errors in unlinked background jobs, liveviews, etc.
  # See https://hexdocs.pm/rollbax/using-rollbax-in-plug-based-applications.html
  """
  def handle_errors(conn, %{kind: kind, reason: reason, stack: stacktrace}) do
    conn =
      conn
      |> Plug.Conn.fetch_cookies()
      |> Plug.Conn.fetch_query_params()

    user = conn.assigns[:current_user]
    user_string = if user, do: "#{user.id}"

    params =
      case conn.params do
        %Plug.Conn.Unfetched{aspect: :params} -> "unfetched"
        other -> other
      end

    request_data = %{
      "request" => %{
        "cookies" => conn.req_cookies,
        "url" => "#{conn.scheme}://#{conn.host}:#{conn.port}#{conn.request_path}",
        "user_ip" => List.to_string(:inet.ntoa(conn.remote_ip)),
        "headers" => Enum.into(conn.req_headers, %{}),
        "method" => conn.method,
        "params" => params,
        "user" => user_string
      }
    }

    Rollbax.report(kind, reason, stacktrace, _custom_data = %{}, request_data)

    # Explicitly log certain types of errors that Phoenix hides from the logs by default.
    if reason.__struct__ in [Phoenix.ActionClauseError] do
      msg = Exception.message(reason) |> H.truncate(2000, " (exception message truncated)")
      Logger.log(:error, "%#{reason.__struct__}{}: #{msg}\n\nStacktrace:\n#{format_stacktrace(stacktrace)}")
    end
  end

  defp format_stacktrace(stacktrace) do
    stacktrace |> Enum.map(& exclude_args(&1)) |> Exception.format_stacktrace()
  end

  # Skip logging the args for each stacktrace line to make it less verbose.
  defp exclude_args({module, atom, _args, location}), do: {module, atom, [], location}
end
```

- Add `lib/myapp/helpers.ex` (copy from your auth system setup doc).
- Add a `/test-error` endpoint which raises an exception.
- Commit & deploy changes
- Go to `/test-error` and confirm the error is reported.
- *Note: This doesn't report errors in LiveView processes. See Rollbax docs for LiveView error reporting.*
- Add TelemetryUI
    - https://hexdocs.pm/telemetry_ui/4.4.0/readme.html
    - TODO: Copy changes from the relevant commit — it's super quick to throw together a basic dashboard with request count + latency over time.
