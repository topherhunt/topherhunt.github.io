$(function(){
  $(".js-reveal-email").click(function(e){
    e.preventDefault();
    var email = "hunt"+"."+"topher"+"@"+"gmail"+"."+"com"
    $(".js-email-div")
      .html("I'd love to hear from you! You can reach me at: <strong>"+email+"</strong>.")
      .toggle(200);
  });
});
