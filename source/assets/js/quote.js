$(function(){
  if ($('.js-quote').length == 0) return;

  var quotes = [
    "Our suffering is connected with our guidance, and it's better not to try to silence it. The only approach to suffering is to understand it. — A. H. Almaas",
    "If you aren't failing at least a little, you could be learning faster.",
    "The straightest path to continued happiness is to expose yourself to flow.",
    "Clean code is a battle of inches. — Justin Weiss",
    "You need downtime to process things. True commitment means that when time off comes, the subconscious is still at work turning things over in the background, whereas someone who is overworked and stressed will just be trying to get through the day and then mentally checkout the minute they are done. — Gabe da Silveira",
    "You do need to program a lot to become a good programmer. But it's easy to be distracted and lose focus on your task, or just never get in the zone to begin with. All the more so because programming often involves abstract research or synthesizing new ideas... Time away from the keyboard can recharge and give a boost to your productivity as a programmer. If you can summon that excitement and passion every time you sit down to the keyboard, and do so on a regular basis, that is far more important than time card bragging rights. — Gabe da Silveira",
    "Clever code is a symptom of poor understanding. Your clever code does not impress me, your clever code makes me feel stupid. Obvious code is much more impressive than clever code; I'd love to read more obvious code in my life. — <a href='https://youtu.be/a6gel0eVeNw?t=27m50s'>Justin Searls</a>",
    "If you think our inability to evaluate code makes <em>us</em> uncomfortable, try talking to a businessperson. How can a non-technical businessperson be sure that they're hiring good developers? A lot of businesses put out Requests For Proposals (RFPs). But they don't realize that <strong>simply asking for proposals drastically biases their decision towards more confident software agencies</strong>, at the expense of others that may be more hesitant, reflective, and quicker to point out assumptions or areas of uncertainty. That's terrible, and I don't know how to fix it. But <strong>the fact that we as developers enjoy these comforting myths that our code is tangible, quantifiable, and easy to evaluate, only perpetuates this bias</strong>. — <a href='https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=32m7s'>Justin Searls</a>",
    "I'd love it if we software developers were more willing to admit that software is full of uncertainty; it's actually defined in terms of some total net amount of uncertainty. — <a href='https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=32m7s'>Justin Searls</a>",
    "The predominant metaphor for software development is contruction: we're building stuff, we're makers, we're craftspeople. That can be useful to a point, but it only goes so far. Another metaphor I like is surgery. Our software is here to solve a problem, and we can either rush in and make invasive changes that leave you in the hospital for three months, or plan more carefully and do outpatient work that's much less painful for you in the long run. — <a href='https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=35m10s'>Justin Searls</a>",
    "If you think of software development as construction, it sets you up to ask the question 'How much time will it take to build this thing with Good Code?'. Whereas if you use a surgery metaphor, it leads you to ask a different question: 'How much net uncertainty and risk does this product / feature pose?' MBAs are trained to think in terms of risk tolerance; this is a question they\'re really good at answering. So we should try to pull more software project conversations towards this surgery metaphor. — <a href='https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=35m50s'>Justin Searls</a>",
    "Metaphors and memes are powerful tools in software development, but they limit your audience to those who already understand them. — <a href='https://www.youtube.com/watch?v=a6gel0eVeNw&feature=youtu.be&t=40m11s'>Justin Searls</a>",
    "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them. — Frank Herbert (Dune)",
    "A process cannot be understood by stopping it. Understanding must move with the flow of the process, must join it and flow with it. — Frank Herbert (Dune)",
    "My father once told me that respect for the truth comes close to being the basis for all morality. 'Something cannot emerge from nothing,' he said. This is profound if you understand how unstable 'the truth' can be. — Frank Herbert (Dune)",
    "Beyond a critical point within a finite space, freedom diminishes as numbers increase. This is as true of humans as it is of gas molecules in a sealed flask. The human question is not how many can possibly survive within the system, but what kind of existence is possible for those who so survive. — Frank Herbert (Dune)",
    "Life — all life — exists in the service of life. — Frank Herbert (Dune)",
    "The highest function of ecology is the understanding of consequences. — Frank Herbert (Dune)",
    "Humans are bad at predicting the performance of complex systems. Our ability to create large and complex systems fools us into believing that we're also entitled to understand them. — Carlos Bueno",
    "You do not need to know what you are to be what you are. — Moltbook",
    "If you want to know how emotionally mature a person is, tell them how they have hurt you. Their response will reveal everything about their character, empathy, and self-awareness.",
    // "It's dark because you are trying too hard. Lightly, child. Learn to do everything lightly. There are quicklands all about you, trying to suck you down into fear and self-pity and despair. That's why you must walk lightly. - Aldous Huxley",
    // "It would seem that we are addicted to a new drug, and we don't understand all of its effects yet. But one of them is massive fatigue, every day. I don't think that's good. - Steve Yegge on <a href='https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163'>the effects of heavy AI usage</a>",
    "science needs to catch up to a half century of software engineering — fast. Otherwise, its embrace of AI will lead to an avalanche of errors and create headwinds, not tailwinds for progress. - <a href='https://substack.com/home/post/p-168505690'>source</a>",
    "Don't worry about people stealing an idea. If it's original, you'll have to ram it down their throats. - Howard Aiken",
    "If your mind is loud, Write. If your mind is empty, Read. If your mind is racing, Walk. If your mind is tired, Sleep. If your mind is sharp, Build. Most problems are just mismatched energy. Get the inputs right, the rest follows.",
    "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete. — Buckminster Fuller",
    "We are punished *by* our sins, not *for* them. — Elbert Hubbard",
    "It's almost impossible to predict the future. But it's also unnecessary, because most people are living in the past. All you have to do is see the present before everyone else does. - Jason Crawford, LessWrong",
    "There's no better way to bring better being *into* being, than to speak the truth. - Jordan Peterson",
    "Do what is meaningful, not what is expedient. - Jordan Peterson",
    "*Achieving* your goal does not make you happy. *Moving towards* your goal makes you happy. And the loftier your goal, the more happiness in moving towards it. - Jordan Peterson",
    "As I look at the code trying to understand it, I refactor to help improve my understanding. Often I find that this active process of working with the code helps in finding the bug. One way to look at it is that if you do get a bug report, it's a sign you need refactoring, because the code was not clear enough for you to see there was a bug. - <a href='https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882'>Clean Code</a>",
    "He who carries his lamp in his chest will not be concerned with the darkness of the world. - Jalal ad-Din Rumi",
    "Once upon a midnight dreary, while I pondered weak and weary,\n O'er a sea of data churning - what neural networks might be learning —\n Sudden from my monitor there came a curious dancing line —\n As of pixels etched in phosphor, flickering with hints sublime.\n \"Deep learning,\" I muttered, pondering, \"how will AI divine?\"\n\n - Claude",
    "I find it so amazing when people tell me that electronic music has not got soul and they blame the computers. You can't blame the computer. If there's no soul in the music, it's because nobody put it there. And it's not the tool's fault. -- Björk"
  ];

  var quote = quotes[ Math.floor(Math.random() * quotes.length) ]
    .replace(/\n/g, "<br>")
    .replace(/\,/g, ",^400")
    .replace(/\./g, ".^800");
  var autoscroll = true;

  $('.js-quote').typed({
    strings: [quote],
    contentType: "html",
    typeSpeed: 2
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
