document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector("[data-fold-headers]");
  if (!container) return;

  var selector = container.dataset.foldHeaders;
  var headings = container.querySelectorAll(selector);

  headings.forEach(function (heading) {
    // Collect all sibling elements between this heading and the next heading
    // of the same level (or higher), or end of parent.
    var level = parseInt(heading.tagName[1]);
    var contents = [];
    var sibling = heading.nextElementSibling;

    while (sibling) {
      // Stop at a heading of the same or higher level
      if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= level) break;
      contents.push(sibling);
      sibling = sibling.nextElementSibling;
    }

    if (contents.length === 0) return;

    // Wrap contents in a div for easy show/hide
    var wrapper = document.createElement("div");
    wrapper.className = "fold-content";
    wrapper.style.display = "none";
    heading.after(wrapper);
    contents.forEach(function (el) { wrapper.appendChild(el); });

    // Make the heading clickable
    heading.classList.add("foldable", "folded");
    heading.style.cursor = "pointer";

    heading.addEventListener("click", function () {
      var folded = wrapper.style.display === "none";
      wrapper.style.display = folded ? "" : "none";
      heading.classList.toggle("folded", !folded);
    });
  });
});
