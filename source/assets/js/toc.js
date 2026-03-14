document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector("[data-toc]");
  if (!container) return;

  var headings = container.querySelectorAll("h2,h3,h4,h5,h6");
  if (headings.length === 0) return;

  // Ensure every heading has an id for linking
  headings.forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
    }
  });

  var minLevel = Math.min.apply(null, Array.from(headings).map(function (h) {
    return parseInt(h.tagName[1]);
  }));

  function buildToc(className) {
    var nav = document.createElement("nav");
    nav.className = "toc " + className;
    var ul = document.createElement("ul");

    headings.forEach(function (h) {
      var li = document.createElement("li");
      var depth = parseInt(h.tagName[1]) - minLevel;
      if (depth > 0) li.style.paddingLeft = depth + "em";
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    return nav;
  }

  // Inline TOC: inserted after first H1 (shown on narrow screens)
  var inlineToc = buildToc("toc--inline");
  var firstH1 = container.querySelector("h1");
  if (firstH1) {
    firstH1.after(inlineToc);
  } else {
    container.prepend(inlineToc);
  }

  // Sidebar TOC: appended to body (shown on wide screens)
  var sidebarToc = buildToc("toc--sidebar");
  if (firstH1) {
    var title = document.createElement("a");
    title.className = "toc-title";
    title.href = "#";
    title.textContent = firstH1.textContent;
    sidebarToc.prepend(title);
  }
  document.body.appendChild(sidebarToc);

  // Position sidebar in the left gutter
  var wrapper = container.closest(".wrapper");
  var sidebarPadding = 15; // px from left edge
  var sidebarGap = 0; // px between sidebar and content

  function positionSidebar() {
    if (!wrapper) return;
    var gutterWidth = wrapper.getBoundingClientRect().left;
    sidebarToc.style.left = sidebarPadding + "px";
    sidebarToc.style.width = (gutterWidth - sidebarPadding - sidebarGap) + "px";
  }
  positionSidebar();
  window.addEventListener("resize", positionSidebar);

  // Scroll-spy: find the last heading that has scrolled past a threshold near
  // the top of the viewport. This correctly tracks which section you're "in"
  // regardless of scroll direction.
  var sidebarLinks = sidebarToc.querySelectorAll("a");
  var inlineLinks = inlineToc.querySelectorAll("a");
  var headingArray = Array.from(headings);
  var scrollOffset = 100; // px from top of viewport

  function updateActiveHeading() {
    var current = null;
    for (var i = 0; i < headingArray.length; i++) {
      if (headingArray[i].getBoundingClientRect().top <= scrollOffset) {
        current = headingArray[i];
      } else {
        break;
      }
    }

    var activeId = current ? current.id : null;
    [sidebarLinks, inlineLinks].forEach(function (links) {
      links.forEach(function (a) {
        if (activeId && a.getAttribute("href") === "#" + activeId) {
          a.classList.add("is-active");
        } else {
          a.classList.remove("is-active");
        }
      });
    });
  }

  window.addEventListener("scroll", updateActiveHeading, { passive: true });
  updateActiveHeading();

  // Smooth scroll with controlled duration for TOC link clicks
  var scrollDuration = 200; // ms

  function smoothScrollTo(targetY) {
    var startY = window.scrollY;
    var distance = targetY - startY;
    var startTime = null;

    function step(time) {
      if (!startTime) startTime = time;
      var progress = Math.min((time - startTime) / scrollDuration, 1);
      var ease = progress * (2 - progress); // ease-out
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  [sidebarToc, inlineToc].forEach(function (toc) {
    toc.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      var href = link.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        smoothScrollTo(0);
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target.getBoundingClientRect().top + window.scrollY);
      }
    });
  });
});
