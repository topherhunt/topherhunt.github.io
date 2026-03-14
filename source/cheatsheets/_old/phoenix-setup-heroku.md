# New Phoenix app (SASS, React, Bootstrap, Heroku) (deprecated)

**This page is deprecated. See "New Phoenix app (SASS, React, Bootstrap, Render deploy)" instead.**

Create a new Phoenix app with esbuild, SCSS compilation, React, Jquery, Bootstrap, Bootstrap Icons, and a Heroku-ready production build.

## Basic setup

- `mix phx.new myapp --no-tailwind`
- `cd myapp`
- `mix ecto.create`
- Create `.tool-versions` and set the tool versions you’re using:

    ```bash
    # tool version specification for asdf
    elixir 1.17.2
    erlang 27.0.1
    nodejs 21.6.1
    ```

- `asdf install` to install the matching elixir, erlang, and node versions
- Install npm packages for SASS and React:
`npm i --save sass@1.77.6 sane react react-dom bootstrap jquery --prefix assets/`
(U*se `sass@1.77.6` because later versions cause noisy deprecation warnings in Bootstrap.*)
- In `dev.exs`, under the `Endpoint` config, add a watcher script to rebuild any scss files:

    ```elixir
      watchers: [
        esbuild: ...,
        npm: ["run", "sass-watch", "--prefix", "assets/", into: IO.stream(:stdio, :line), stderr_to_stdout: true]
      ]
    ```

- Define the sass scripts in `assets/package.json`:

    ```scss
      "scripts": {
        "sass-watch": "node build-sass.js --watch",
        "sass-deploy": "node build-sass.js --deploy"
      }
    ```

- Add `assets/build-sass.js`:

    ```jsx
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
    @import "tooltips";
    ```

- Add `assets/css/general.scss`:

    ```scss
    //
    // Bootstrap overrides
    //

    a { text-decoration: none; }
    a:not(.btn):not(.nav-link):hover { text-decoration: underline; }

    h2, h3, h4 { margin-top: 1em; }

    .navbar { box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1); }

    .text-warning { color: rgb(203, 152, 0) !important; }

    //
    // Utilities
    //

    .em { font-style: italic; }
    .strong { font-weight: bold; }
    .u-hidden { display: none; }
    .u-nowrap { white-space: nowrap; }

    .u-centered-800 { margin-left: auto; margin-right: auto; max-width: 800px; }
    .u-centered-700 { margin-left: auto; margin-right: auto; max-width: 700px; }
    .u-centered-600 { margin-left: auto; margin-right: auto; max-width: 600px; }
    .u-centered-500 { margin-left: auto; margin-right: auto; max-width: 500px; }
    .u-centered-400 { margin-left: auto; margin-right: auto; max-width: 400px; }

    .mt-n1 { margin-top: -0.25rem; }
    .mt-n2 { margin-top: -0.5rem; }
    .mt-n3 { margin-top: -1rem; }
    .ms-n1 { margin-left: -0.25rem; }
    .ms-n2 { margin-left: -0.5rem; }
    .ms-n3 { margin-left: -1rem; }
    .me-n1 { margin-right: -0.25rem; }
    .me-n2 { margin-right: -0.5rem; }
    .me-n3 { margin-right: -1rem; }

    //
    // Components
    //

    /* Simple modals, compatible with either LiveView or JS show/hide. Usage example:
      <div class="phx-modal-wrapper">
        <div class="phx-modal-backdrop" phx-click="hide-modal"></div>
        <div class="phx-modal">
          <a href="#" class="position-absolute top-0 end-0 p-2" phx-click="hide-modal">✖️</a>
          <h3 class="mt-0">Modal Title</h3>
          <p>Modal content</p>
        </div>
      </div> */
    .phx-modal-wrapper {
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

    /* CSS scroll shadows
       (thanks to https://lea.verou.me/blog/2012/04/background-attachment-local/) */
    .scroll-shadows {
      overflow: auto;

      background:
        /* Shadow covers */
        linear-gradient(white 30%, rgba(255,255,255,0)),
        linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,

        /* Shadows */
        radial-gradient(50% 0, farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)),
        radial-gradient(50% 100%,farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
      background:
        /* Shadow covers */
        linear-gradient(white 30%, rgba(255,255,255,0)),
        linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,

        /* Shadows (alternate syntax) */
        radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.2), rgba(0,0,0,0)),
        radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
      background-repeat: no-repeat;
      background-color: white;
      background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;

      /* Opera doesn't support this in the shorthand */
      background-attachment: local, local, scroll, scroll;
    }
    ```

- Add `assets/css/tooltips.scss`:

    ```scss
    //
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
    //
    .u-tooltip-target {
      position: relative;
      cursor: help;

      .u-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        width: 20em;
        margin-left: -3em;
        margin-bottom: 10px;
        text-wrap: wrap;
        display: block;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 0.2rem 0.3rem;
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

      &:hover .u-tooltip {
        visibility: visible;
        opacity: 1;
      }
    }
    ```

- Install Bootstrap Icons:
    - Go to https://icons.getbootstrap.com/#install, download and unpack the .zip.
    - Copy `bootstrap-icons.scss` to `assets/vendor/`, open it, adjust the `font-dir` variable to `"../fonts"`, and delete references to the `.woff` file (we’ll only use the `.woff2`).
    - Copy `bootstrap-icons.woff2` to `priv/static/fonts/`.
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

    ```jsx
    import $ from "jquery"

    $(function(){
      // Generic listener which binds to an arbitrary event to show or hide an arbitrary target.
      $('[data-js-on]').each(function(){
        const el = $(this)
        const [event, action, target] = el.data('js-on').split(':')
        if (!["show", "hide", "toggle"].includes(action))
          throw new Error("Action must be: show, hide, or toggle");
        // console.log("starting data-js-on listener for: ", [event, action, target])

        el.on(event, function(e){
          e.preventDefault()
          $(target)[action](200)
        })
      })
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

- Add a route `/test-page` & page `test-page.html.heex` to test it all:

    ```html
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
    ```

- Now start the app and test it out!
`mix phx.server`
https://localhost:4000/test-page

## LiveView

- *NOTE: The user references assume you’ve done the auth setup. Omit otherwise.*
- Add a route `/test-live` to `PageController#test_live`
- In `MyAppWeb`, under `controller`, add:
`import Phoenix.LiveView.Controller, only: [live_render: 3]`
- In `MyAppWeb`, under `live_view`, replace the `use` and add some aliases:

    ```elixir
          # EXCLUDING layout because liveviews are rendered from controller endpoints.
          use Phoenix.LiveView
          alias MyApp.Repo
          alias MyApp.Data.User
    ```

- Add an endpoint `PageController#test_live`:

    ```elixir
      def test_live(conn, _params) do
        live_render(conn, MyAppWeb.TestLive, session: %{
          "current_user_id" => H.try(conn.assigns[:current_user], :id),
          "count" => 0
        })
      end
    ```

- Add `lib/myapp_web/live/test_live.ex`:

    ```elixir
    defmodule MyAppWeb.TestLive do
      use MyAppWeb, :live_view

      def mount(_params, %{"current_user_id" => user_id} = session, socket) do
        if connected?(socket), do: schedule_tick()
        current_user = if user_id, do: Repo.get(User, user_id)
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

    ```elixir
    <h1>Test liveview</h1>
    Seconds passed: <%= @count %>
    <a href="#" class="btn btn-success" phx-click="add" phx-value-amount="5">+5</a>
    <a href="#" class="btn btn-success" phx-click="subtract" phx-value-amount="5">-5</a>
    ```

- Start the dev server and go to `/test-live`, confirm the counter increments once per second and the buttons react as expected.

## Deploy to Heroku

- `heroku create myapp-staging`
- `heroku buildpacks:add https://github.com/HashNuke/heroku-buildpack-elixir`
- `heroku buildpacks:add https://github.com/gigalixir/gigalixir-buildpack-phoenix-static`
- `heroku addons:create heroku-postgresql:essential-0`
- `heroku config:set SECRET_KEY_BASE=$(mix phx.gen.secret)`
- `heroku git:remote -a myapp-staging` *(but first check `git remote -v`, Heroku might have added this automatically)*
- In `runtime.exs`, replace the repo config:

    ```elixir
      config :myapp, MyApp.Repo,
    		url: System.get_env("DATABASE_URL") || raise("missing env DATABASE_URL"),
        # Required for Heroku DB connection.
        ssl: [verify: :verify_none],
        # Indicate where in my code a query was called when query errors occur.
        # Minor performance hit, but more than worth it.
        stacktrace: true,
        pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")
    ```

- In `endpoint.ex`, under `plug Plug.Static`, set `gzip:` to `true`.
- Create `./elixir_buildpack.config` to match your asdf versions:

    ```bash
    # See https://github.com/HashNuke/heroku-buildpack-elixir

    erlang_version=27.0.1
    elixir_version=1.17.2
    ```

- Create `./phoenix_static_buildpack.config`:

    ```bash
    # See https://github.com/gjaldon/heroku-buildpack-phoenix-static#configuration

    compile="phoenix_static_buildpack.sh"
    clean_cache=true
    phoenix_ex=phx
    node_version=21.6.1
    npm_version=10.2.4
    ```

- Create `./phoenix_static_buildpack.sh`:

    ```bash
    # See https://github.com/gjaldon/heroku-buildpack-phoenix-static#compile
    # and https://hexdocs.pm/phoenix/heroku.html#adding-the-phoenix-static-buildpack
    #
    # Usage:
    # - phoenix_static_buildpack.config references this build script so Heroku will run it on deploy.
    # - To do a test-run of the build process in dev, run:
    #   phoenix_dir=. sh phoenix_static_buildpack.sh
    # - To clear out all digested & compressed versions of assets, run:
    #   mix phx.digest.clean --all

    cd $phoenix_dir

    # Compile CSS
    npm run sass-deploy --prefix assets/

    # Compile JS
    NODE_PATH=./deps mix esbuild default assets/js/app.js --bundle --minify --target=es2017 --outdir=./priv/static/assets

    # Compress and digest asset files
    mix phx.digest
    mix phx.digest.clean
    ```

- Optionally set up one-line HTTP request logging per [these steps](https://stackoverflow.com/questions/56600637/elixir-phoenix-how-to-customize-http-request-log-format).
- Commit all changes
- `git push myapp-staging main`
- *If the deploy fails, your Erlang version may not be compatible with the latest Heroku stack. Try switching to an older stack:* `heroku stack:set heroku-22 -a myapp-staging`
- `heroku run -a myapp-staging mix ecto.migrate`
- Visit the heroku app URL, confirm the `/test-page` renders correctly
- Add Papertrail logging:
    - Go to Papertrail.com → "Add system" → System logs → Heroku → Standalone, and run the command to add a log drain. Then load the heroku app url to send some web logs.
    - Once logs are received at that drain destination, run `heroku drains` to get the drain id and confirm that it matches the "Logs received from" id shown in Papertrail.
    - Go to the dashboard, find that drain id under "Systems", click "Edit" and edit the source name to describe the app.
    - Optionally set up a search alert for error logs.
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

    - Add `lib/myapp/helpers.ex`, [copy from here](https://www.notion.so/Full-featured-auth-system-fa170c57ae2b465aae81db9aeb08e2a8?pvs=21).
    - Add a `/test-error` endpoint which raises an exception.
    - Commit & deploy changes
    - Go to `/test-error` and confirm the error is reported.
    - *Note: This doesn’t report errors in LiveView processes, [see here](https://chatgpt.com/share/5624792d-8105-4ceb-98b3-235b0e697099) for that.*
