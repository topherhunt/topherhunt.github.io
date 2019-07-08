$(function(){
  if ($('.js-quote').length == 0) return;

  var quotes = [
    "Our suffering is connected with our guidance, and it's better not to try to silence it. The only approach to suffering is to understand it. —A. H. Almaas",
    "If you aren't failing at least a little, you could be learning faster.",
    "The straightest path to continued happiness is to expose yourself to flow.",
    "Clean code is a battle of inches. —Justin Weiss —Justin Weiss",
    "When it comes to knowledge work, you need downtime to process things. True commitment means that when time off comes, the subconscious is still at work turning things over in the background, whereas someone who is overworked and stressed will just be trying to get through the day and then mentally checkout the minute they are done. —Gabe da Silveira",
    "You do need to program a lot to become a good programmer. However in programming it's very easy to be distracted and lose focus on your task, or just never properly get in the zone to begin with. All the more so because programming often involves abstract research or synthesizing new ideas... Time away from the keyboard can recharge and give a significant boost to your productivity as a programmer. If you can summon that excitement and passion every time you sit down to the keyboard, and do so on a regular basis, that is far more important than time card bragging rights. —Gabe da Silveira",
    "Clever code is a symptom of poor understanding. Your clever code does not impress me, your clever code makes me feel stupid. Obvious code is much more impressive than clever code; I'd love to read more obvious code in my life. —<a href=\"https://youtu.be/a6gel0eVeNw?t=27m50s\" target=\"_blank\">Justin Searls</a>",
    "If you think our inability to evaluate code makes <em>us</em> uncomfortable, try talking to a businessperson. How can a non-technical businessperson be sure that they're hiring good developers? A lot of businesses put out Requests For Proposals (RFPs). But they don't realize that <strong>simply asking for proposals drastically biases their decision towards more confident software agencies</strong>, at the expense of others that may be more hesitant, reflective, and quicker to point out assumptions or areas of uncertainty. That's terrible, and I don't know how to fix it. But <strong>the fact that we as developers enjoy these comforting myths that our code is tangible, quantifiable, and easy to evaluate, only perpetuates this bias</strong>. —<a href=\"https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=32m7s\" target=\"_blank\">Justin Searls</a>",
    "I'd love it if we software developers were more willing to admit that software is full of uncertainty; it's actually defined in terms of some total net amount of uncertainty. —<a href=\"https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=32m7s\" target=\"_blank\">Justin Searls</a>",
    "The predominant metaphor for software development is contruction: we're building stuff, we're makers, we're craftspeople. That can be useful to a point, but it only goes so far. Another metaphor I like is surgery. Our software is here to solve a problem, and we can either rush in and make invasive changes that leave you in the hospital for three months, or plan more carefully and do outpatient work that's much less painful for you in the long run. —<a href=\"https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=35m10s\" target=\"_blank\">Justin Searls</a>",
    "If you think of software development as construction, it sets you up to ask the question \"How much time will it take to build this thing with Good Code?\". Whereas if you use a surgery metaphor, it leads you to ask a different question: \"How much net uncertainty and risk does this product / feature pose?\" MBAs are trained to think in terms of risk tolerance; this is a question they\'re really good at answering. So we should try to pull more software project conversations towards this surgery metaphor. —<a href=\"https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=35m50s\" target=\"_blank\">Justin Searls</a>",
    "Metaphors and memes are powerful tools in software development, but they limit your audience to those who already understand them. —<a href=\"https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=40m11s\" target=\"_blank\">Justin Searls</a>",
    "A beginning is the time for taking the most delicate care that the balances are correct. —Frank Herbert (Dune)",
    "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them. —Frank Herbert (Dune)",
    "A process cannot be understood by stopping it. Understanding must move with the flow of the process, must join it and flow with it. —Frank Herbert (Dune)",
    "My father once told me that respect for the truth comes close to being the basis for all morality. \"Something cannot emerge from nothing,\" he said. This is profound thinking if you understand how unstable \"the truth\" can be. —Frank Herbert (Dune)",
    "Science is made up of so many things that appear obvious after they are explained. —Frank Herbert (Dune)",
    "The concept of progress acts as a protective mechanism to shield us from the terrors of the future. —Frank Herbert (Dune)",
    "Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic. —Frank Herbert (Dune)",
    "Beyond a critical point within a finite space, freedom diminishes as numbers increase. This is as true of humans as it is of gas molecules in a sealed flask. The human question is not how many can possibly survive within the system, but what kind of existence is possible for those who so survive. —Frank Herbert (Dune)",
    "Life &mdash; all life &mdash; exists in the service of life. —Frank Herbert (Dune)",
    "The highest function of ecology is the understanding of consequences. —Frank Herbert (Dune)",
    "When a creature has developed into one thing, he will choose death rather than change into his opposite. —Frank Herbert (Dune)",
    "Good government never depends upon laws, but upon the personal qualities of those who govern. The machinery of government is always subordinate to the will of those who administer that machinery. The most important element of government, therefore, is the method of choosing leaders. —Frank Herbert (Dune)",
    "People, not commercial organisations or chains of command, are what make great civilizations work; every civilization depends upon the quality of the individuals it produces. If you overorganize humans, over-legalize them, suppress their urge to greatness — they cannot work and their civilization collapses. —Frank Herbert (Dune)",
    "The machine cannot anticipate every problem of importance to humans. It is the difference between serial bits and an unbroken continuum. We have the one; machines are confined to the other. —Frank Herbert (Dune)",
    "In all of my universe I have seen no law of nature, unchanging and inexorable. This universe presents only changing relationships which are sometimes seen as laws by short-lived awareness. —Frank Herbert (Dune)",
    "The problem of leadership is inevitably: Who will play God? —Frank Herbert (Dune)",
    "Much depends on what people dream in the secrecy of their hearts. I have always been as concerned with the shaping of dreams as with the shaping of actions. —Frank Herbert (Dune)",
    "How persistent it is, this demand that our gods be perfect. The Greeks were much more reasonable about such things. —Frank Herbert (Dune)",
    "Paradox is a pointer telling you to look beyond it. If paradoxes bother you, that betrays your deep desire for absolutes. —Frank Herbert (Dune)",
    "Your beliefs order the unfolding of daily events. If enough of us believe, a new thing can be made to exist. Belief structure creates a filter through which chaos is sifted into order. —Frank Herbert (Dune)",
    "Everything in the universe contains flaws, ourselves included. Even God does not attempt perfection in His creations. Only humankind has such foolish arrogance. —Frank Herbert (Dune)",
    "A tool wielded in ignorance can become the most dangerous of weapons. —Brian Herbert (Dune series)",
    "The wise person views history as a set of lessons to be learned, choices and ramifications to be considered and discussed, and mistakes that should never again be made. —Brian Herbert (Dune series)",
    "Humans are bad at predicting the performance of complex systems. Our ability to create large and complex systems fools us into believing that we're also entitled to understand them. —Carlos Bueno",
  ];

  var quote = quotes[ Math.floor(Math.random() * quotes.length) ]
    .replace(/\,/g, ",^300")
    .replace(/\;/g, ";^300")
    .replace(/\./g, ".^500");
  var autoscroll = true;

  $('.js-quote').typed({
    strings: [quote],
    contentType: "html"
  });

  function jiggle_cursor(){
    $('.typed-cursor').toggle();
    if (autoscroll) { $('.js-quote-container').animate({scrollTop: 999}); }

    setTimeout(jiggle_cursor, 600);
  }

  jiggle_cursor();

  $('.js-quote').hover(function(){
    autoscroll = false;
  }, function(){
    autoscroll = true;
  });
});
