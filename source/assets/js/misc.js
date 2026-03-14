$(function(){
  $(".js-reveal-email").click(function(e){
    e.preventDefault();
    var email = "hunt"+"."+"topher"+"@"+"gmail"+"."+"com"
    $(".js-email-div")
      .html("I'd love to hear from you! You can reach me at: <strong>"+email+"</strong>.")
      .toggle(200);
  });

  // Add copy button to code blocks
  $(".highlighter-rouge:has(pre)").each(function () {
    var block = $(this);
    block.css("position", "relative");
    var btn = $('<button class="code-copy-btn" title="Copy"><i class="bi bi-clipboard"></i></button>');
    block.append(btn);

    btn.on("click", function () {
      var code = block.find("pre").text();
      navigator.clipboard.writeText(code).then(function () {
        var tooltip = $('<span class="code-copy-tooltip">Copied!</span>');
        btn.append(tooltip);
        setTimeout(function () { tooltip.remove(); }, 1500);
      });
    });
  });

  // Highlight the target footnote when clicking a footnote link
  $(document).on("click", "a[href^='#fn:'], a[href^='#fnref:']", function () {
    var targetId = $(this).attr("href").substring(1);
    var target = document.getElementById(targetId);
    if (!target) return;
    target.classList.remove("footnote-highlight");
    // Force reflow so re-adding the class restarts the animation
    void target.offsetWidth;
    target.classList.add("footnote-highlight");
  });
});
