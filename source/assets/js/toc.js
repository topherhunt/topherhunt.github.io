document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector("[data-toc]");
  if (!container) return;

  var levels = container.dataset.toc.split(",").map(function (s) { return s.trim(); });
  var headings = container.querySelectorAll(levels.join(","));

  if (headings.length === 0) return;

  // Ensure every heading has an id for linking
  headings.forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
    }
  });

  // Determine the shallowest level present, for indentation offsets
  var minLevel = Math.min.apply(null, Array.from(headings).map(function (h) {
    return parseInt(h.tagName[1]);
  }));

  var toc = document.createElement("nav");
  toc.className = "toc";
  var list = document.createElement("ul");

  headings.forEach(function (h) {
    var li = document.createElement("li");
    var depth = parseInt(h.tagName[1]) - minLevel;
    if (depth > 0) li.style.paddingLeft = depth + "em";
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });

  toc.appendChild(list);

  // Insert after the first H1, or at the top of the container
  var firstH1 = container.querySelector("h1");
  if (firstH1) {
    firstH1.after(toc);
  } else {
    container.prepend(toc);
  }
});
