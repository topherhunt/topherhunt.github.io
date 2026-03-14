$(function(){
  $(".js-reveal-email").click(function(e){
    e.preventDefault();
    var email = "hunt"+"."+"topher"+"@"+"gmail"+"."+"com"
    $(".js-email-div")
      .html("I'd love to hear from you! You can reach me at: <strong>"+email+"</strong>.")
      .toggle(200);
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
