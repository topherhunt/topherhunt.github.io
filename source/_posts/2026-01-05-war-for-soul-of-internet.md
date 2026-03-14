---
layout: post
title:  The war for the soul of the internet
date:   2026-01-05
categories:
toc: true
---

Henry.codes' article [A website to destroy all websites](https://henry.codes/writing/a-website-to-destroy-all-websites/) starts with a big promise: "How to win the war for the soul of the internet, and build the Web We Want." I'm intrigued by that promise, and the assumptions embedded in it (The internet has a soul. Different factions are fighting for control of it. We're losing.) — but the article goes on to frame this war in terms that feel a bit too cynical and doomsday for my taste. Here's my thoughts on the matter of how once-promising technologies become corrupted by business incentives (*etcetera? is there a cetera? or does it all come down to money? your answer probably says a lot about your worldview*) and how good things we've lost due to Technological Progress™ can be reclaimed.

## The watershed model

Drawing on Ivan Illich's 1973 book *Tools for Conviviality*, Henry describes a rather cynical two-act "watershed" model of technological development. Act one: A tool emerges and expands human freedom. Act two: industrialization corrupts it, the tool starts extracting value from us, and society ends up serving the tool rather than the reverse. Illich calls the endpoint "radical monopoly" — when you can't participate in society without becoming a user. Henry's answer to this predicament is a return to what Illich called "*convivial tools*": hand-coded, personal websites using open protocols (IndieWeb, RSS, webmentions, POSSE, etc) to publish and connect without surrendering to algorithms.

It's a compelling framework. Henry applies it to automobiles (unprecedented autonomy in travel → car-centric infrastructure now *demands* car ownership), antibiotics (miracle cures → resistance crisis), textiles (cheap clothes → 60 million exploited workers), space exploration (discovery of the final frontier → so much orbital debris we're blinding our own telescopes), and of course the web itself. The pattern is real.

...But this two-phase watershed model feels too clean, and more importantly, too hopeless. It implies a one-way ratchet: liberation, then decay, then... what? Acceptance? Retreat to hand tools and bicycles?

A model that better fits how I see history play out is a three-phase cycle:

  1. **Boom**: a promising technology starts to scale up, delivers real benefits, adoption accelerates
  2. **Reckoning**: the harms or abuses become visible, sparking concern and controversy; enthusiasm curdles
  3. **Coordination**: we collectively organize to address them
  4. **Iterate**: the new equilibrium eases concerns for a bit, then other "corruptions" / harms emerge (with this technology or another one) and the cycle repeats.

You can't tell the story of any widespread tech without mentioning both the backlash and the measures society took to reckon with it. Various diseases of the car era were reined in by emissions standards, catalytic converters, and now the EV transition. Refrigeration gave us CFCs gave us the Montreal Protocol and a recovering ozone layer. The web gave us democratized publishing and instant connection → algorithmic manipulation and data extraction → GDPR, antitrust pressure, and the IndieWeb movement Henry champions.

Under the watershed model, once you cross the threshold, there's no return — only deeper entrenchment until radical monopoly. But a three-phase model offers a different possibility: society notices the harmful externalities, finds various (perhaps incomplete) ways to deal with them, and moves on to a new equilibrium. Under *this* model, Henry's essay isn't describing inevitable decay; it's describing where we are in the cycle. The harms have caught up, and now the coordination is starting. Personal websites and IndieWeb protocols aren't a romantic retreat to pre-industrial craft; they're part of a corrective mechanism ratcheting us towards some unknown future.

## How coordination happens

My proposed model's relative optimism depends on that "collective coordination" actually happening. With cars, the harms were tangible (smog, emissions, traffic deaths) and coordination was regulatory: the Clean Air Act, CAFE standards, government-driven. With the web, the harms are clear enough (algorithmic polarization, mass disinformation, data extraction as a business model) but the offending platforms' power is transnational, whereas regulatory response has been balkanized: GDPR in Europe, content moderation laws in Germany, antitrust rumblings in the US, a patchwork of state privacy laws. Lots of activity, little coordination, mixed results.

Meanwhile, grassroots efforts have tried to route around the Big Tech platforms entirely. The IndieWeb movement promotes personal websites and open protocols. ActivityPub powers the Fediverse — a federated alternative to centralized social media. RSS refuses to die. But mainstream traction isn't happening. Mastodon's monthly active users reportedly quintupled during the post-Musk Twitter exodus, then shed most of those gains within a year, many newcomers drifted back to familiar platforms or just stopped posting. IndieWeb remains a passionate niche; the average user has never heard of webmentions. Bluesky is a possible exception (40 million users and growing!) though engagement has dropped sharply from its 2024 peak[^5], and it's too early to call it a lasting win.

The tools for a freer web exist! They work amazing!! Yet their adoption curves have flatlined well short of critical mass (speculations on why below). So can bottom-up, opt-in coordination actually bend the curve? Or does the web need its own Clean Air Act moment?

Regulation is the endgame for managing externalities — that's government's core function. But good regulation doesn't emerge from a vacuum. The policymaking process is slow, messy, and prone to misfires when legislators don't understand the technology they're regulating. Cookie consent banners are the poster child: a well-intentioned privacy measure that trained billions of users to click "accept" without reading, while adding friction that hurts small sites more than surveillance giants. Similarly, GDPR is a prominent example of overcorrection: Years of chilling effect on European small tech, nominally in service of reining in Big Tech, with uncertain success at the actual goal.[^4]

This weakness points to one key role for Henry's more organic, bottom-up vision of convivial tools for the web: **Grassroots, opt-in coordination serves as an R&D layer for governance**[^1]. It lets us experiment with possible solutions at lower stakes, build shared knowledge about what actually works, discover which problems self-resolve through good design or happy coincidence, and identify which problems genuinely require enforcement — generating the social awareness and activist pressure to push for it.

Bottom-up movements aren't an alternative to top-down regulation. Nor are they our sole escape hatch from the "corrupted" web, as per Henry's argument. They're a *proving ground* that helps make regulation informed and attuned, rather than reactive.

## The power-user problem

But a proving ground only proves something if people are willing to use it. And here's where the "convivial tools" vision hits a wall: **hand-coded websites and IndieWeb don't seem to scale beyond the passionate power-user crowd.** Henry's poetic call-to-action assumes people want autonomy over their social graph. It assumes they're willing to maintain infrastructure, learn protocols, debug federation issues, and tolerate literally any amount of technical setup complexity beyond the minimum, because they value a free and open internet. It assumes, in short, that most people are power users.

They're not. Most people are content with consuming content and have minimal patience for tech setup. You'll never get widespread adoption if your tech assumes most people are tech geeks. This isn't a moral failing. It's just... how people are. The correct response isn't to lament that the masses won't hand-code their HTML; it's to hammer out solutions whose appeal and user-friendliness hold up as you scale from enthusiasts to lay consumers.

You *can* build solutions that survive the geek-to-lay transition, but they're swimming upstream. Mainstream competitors optimize purely for adoption — frictionless onboarding, addictive loops, network effects. Externalities be damned. Facebook, Twitter, and TikTok exploded *not despite but because of* their toxic algorithms and the societal harm they cause; the harm *is* the product-market fit.[^3] Meanwhile, pro-social alternatives have to compete against that appeal *while also* optimizing for values and principles that often add friction or fail to maximize addictive potential.

The Fediverse shows both the promise and the trap. The architecture is incredibly elegant (open protocols, user ownership, portable data, no central authority) and it shows that user-controlled social networking is technically doable. But technical doability isn't adoption. To a non-geek, the UX is brutal; the whole notion sounds unnecessarily complicated compared to Twitter's centralized model. "Pick a server" is already too many words.

## The Linux trap: an OS of the enthusiasts, by the enthusiasts, for the enthusiasts

*❗NOTE to Linux folks: I feel strongly about my core point here, but I worry that I'm oversimplifying. Pushback and clarifying comments welcome! Help me get this right.*

Linux is a great example of this dynamic. The Linux OS dominates servers and powers billions of phones via Android, but as a consumer desktop OS it has perpetually fizzled despite "Year of the Linux Desktop" [becoming](https://www.channelinsider.com/news-and-trends/2004-wont-be-the-year-of-the-linux-desktop/) [an](https://limulus.wordpress.com/2007/08/13/2010-the-year-of-the-linux-desktop/) [annual](https://tuxtweaks.com/2010/02/the-perennial-year-of-the-linux-desktop/) [ritual](https://linux.slashdot.org/story/22/01/15/0224235/are-we-getting-closer-to-the-year-of-the-linux-desktop) [and then](https://hackaday.com/2024/12/31/why-2025-will-not-be-the-year-of-linux-on-the-desktop/) [a meme](https://yotld.com/). The usual explanation is "the UX isn't quite good enough yet", but that misses the deeper issue. **It's not just that Linux UX is lacking; its development model and culture have a "misaligned incentives" problem making its UX structurally hard to fix.**

Apple nailed "Just Works"[^2] through ruthless prioritization: saying no to features that add complexity, obsessive QA on common hardware, and central authority to enforce consistency. That's what lay-friendly UX demands. Linux's decentralized, volunteer-driven, scratch-your-own-itch culture rewards the opposite: feature proliferation, support for interesting edge cases rather than common ones, and organic consensus that resists top-down mandates.

Now, Linux *does* have gatekeepers and powerful leaders—Linus himself has BDFL-style veto power, maintainers control what gets merged, politics and path dependencies favor established contributors. It's not some purely meritocratic commune. But here's the thing: those gatekeepers emerged from and are embedded in the scratch-your-own-itch culture. They *could* coordinate to prioritize "it's gotta Just Work for ordinary people" as the North Star. They mostly don't, because that's not what scratches *their* itch or the itch of the community they're accountable to. The Year of the Linux Desktop remains perpetually next year not because there's no one with authority to make it happen, but because the people with authority are optimizing for different values—and changing that would require reshaping the culture that made Linux successful in the first place.[^6]

But there's an even deeper structural problem: **Linux is fighting entrenched economic interests with total control over distribution channels.** Microsoft and Apple pre-install their ecosystems on virtually every consumer PC shipped; Google does the same with Android. You don't *choose* Windows—you have to actively *un*choose it, which requires technical confidence most people lack. These companies have enormous economic incentives to capture and lock in users: switching costs, network effects, data moats. The alternatives aren't just competing on features; they're fighting for oxygen in a market where the incumbents control the air supply.

This creates a vicious filtering effect. PC vendors systematically sideline Linux, so only tech enthusiasts with the persistence to install it ever encounter it. Those enthusiasts then become the Linux community—and naturally, they build for themselves. The OS isn't polished enough to get mainstream vendor endorsement, so it stays confined to committed techies, so the UX problems that matter to lay users don't get prioritized, so it can't get mainstream endorsement. Classic chicken-and-egg trap, supercharged by incumbents actively hostile to alternatives gaining ground.

## Two failure modes, one design challenge

The IndieWeb & Linux "geek trap" and the Twitterbooktok mainstream web's "dark patterns trap" are flip sides of the same problem. Obligatory spectrum diagram:

```
Power-user Trap ←—————————————————→ Dark Patterns Trap
(IndieWeb, POSSE, Linux, etc.)      (TikTok, FB, X, etc.)
- principled, wholesome             - mass-adopted, successful
- inaccessible, no traction         - externality-ridden
```

This is the tension underneath Henry's whole argument. The platforms he's understandably fleeing sit on the right: wildly popular, terrible for society. The convivial tools he champions sit on the left: principled, empowering, more-or-less ignored by the mainstream. The war for the soul of the internet is really a question of whether anything can thread the needle: can you build web platforms/systems/protocols that are simple and appealing enough for lay adoption, while principled enough to avoid toxic externalities?

The projects that succeed — Wikipedia?[^8] Signal? Maybe Bluesky, jury's still out? — seem to require both strong centralized design vision *and* structural luck. Wikipedia had Jimmy Wales's specific philosophy *and* arrived at the right moment *and* achieved enough scale to become the default before alternatives could entrench. Signal has Moxie Marlinspike's uncompromising cryptographic standards *and* happened to catch a wave of post-Snowden privacy concern *and* got endorsed by the right people at the right time.

Can you engineer that? Partially. You can improve your odds with good design principles: open standards, user-friendliness as a first-class concern, sustainable funding models that don't depend on engagement maximization. But I worry that a lot of the answer is "be in the right time at the right place". Please prove me wrong.

## There's no going back

Henry's article includes a disclaimer: "I'm not trying to *Good Old Days* the internet." Yet he spends 600 words describing how it "used to feel" to go online. I don't think he fully escapes the nostalgia trap — not that I blame him, I miss it too. The early web had a scrappy, frontier energy: hand-built pages, webrings, ICQ, communities small enough to feel human-scale, forums full of genuine enthusiastic debate instead of closed-hearted tribal screaming. No algorithms deciding what you'd see, no engagement metrics optimizing for outrage. Just people making weird stuff, sharing it, tinkering with how to express and communicate in this newborn medium.

But there's no going back. The conditions that created that web no longer exist. The user base is a thousand times larger and expects frictionless experiences, the standards have changed, the economics have shifted. And, frankly, nostalgia exaggerates how good the Good Old Web was. That internet worked for a tiny minority of technical enthusiasts and tinkerers — the rest of the population either wasn't yet clued in or hadn't gone through the hoops and the learning curve to participate.

So it's important to distinguish between *articulating what was good about what we lost*, versus *trying to return to what we lost*. The former is valuable — it gives us design principles and goals: autonomy, ownership, human-scale community, serendipity over algorithmic curation. The latter is a trap: It solves for yesterday's constraints. It builds for an untenably tiny audience of early adopters. It misdirects energy into reenacting the old forms (hand-coded HTML, webrings, systems requiring high technical knowhow) when we could be using twenty years of UX research and modern tooling to achieve those same human-centered goals in ways that actually scale and break the geek-to-lay barrier.

New systems can embody those values and principles. But they won't *feel like* the old web — they'll feel like something new, built for a different era, with their own emergent problems that nobody other than Neal Stephenson has even imagined yet. That's how progress works, it spirals forward, rhyming but never repeating.

## ...so what CAN we do?

Henry's answer is to Stick It To The Man and move your life to convivial tools: build personal websites, join the IndieWeb, reclaim ownership of your digital life. I don't disagree that these are fantastic tools worth endorsing, but _as a societal solution_, his pitch feels underwhelming. The IndieWeb is only an escape hatch for the technical minority who have the competence, confidence, and patience to wire it up.

The fuller answer, I suspect, has multiple layers:

- **For people who can:** Yes, build personal websites. Incorporate IndieWeb protocols. Create proof-of-concepts for how social technology could work differently. Dialogue to help refine and evolve them. Evangelize them. This is immensely valuable R&D.
- **For builders:** Build for the geek-to-lay transition as a central design constraint from day one. Your values and principles won't fulfill their potential if only power users can access them. Friction is the enemy.
- **For everyone:** Don't shrug and count on grassroots bottom-up solutions to win over the mainstream Internet. Support and pressure for regulation to rein in the parts of the web that alarm you. Some externalities — algorithmic radicalization, attention hijacking, data exploitation — are features for the platform, but bugs for society. The incentives are too misaligned for opt-in bottom-up solutions to make a dent. We need Clean Air Act moments for the attention economy.[^7]
- **For our expectations:** Accept that we're not going back to the old web. Whatever patterns dominate the Internet 4.0 will be something novel and strange, hopefully informed by the things we miss and the mistakes we've made.

Henry's right that the internet feels awful right now. He's right that personal ownership and open protocols are part of the answer. But the war for the soul of the internet won't be won by a vanguard of hand-coders retreating to their personal domains and cargo-culting the web of 1999. It'll be won (if it's won) by building *platforms* that appeal to muggles, that resist the dark patterns, and that can survive contact with the mass market without corrupting and becoming the thing they set out to replace.

[^1]: Among others, eg: academic policy research, think tanks, government pilot programs, regulatory sandboxes.
[^2]: It was good while it lasted.
[^3]: Disagree? Let's talk it out on Twitter like civilized people.
[^4]: My sense is that GDPR was probably worth it? I feel like it set a desperately-needed precedent, but in a counterproductive bumbling way.
[^5]: Sources: [odwyerpr.com](https://www.odwyerpr.com/story/public/23127/2025-06-10/bluesky-engagement-slips.html), [webpronews.com](https://www.webpronews.com/bluesky-surges-to-38m-users-post-election-but-engagement-falls/), [businesstechweekly.com](https://www.businesstechweekly.com/technology-news/blueskys-user-growth-challenges-addressing-declining-engagement-amid-competitive-landscape/)
[^6]: Edited to more clearly acknowledge that the Linux dev community _does_ have power structures, it's not purely meritocratic, and more clearly highlight the chicken-and-egg problem created by vested interests (Apple/MS etc). Thanks [Jonathan](https://github.com/tensiondriven/)!
[^7]: Yes, heavy-handed regulation can misfire, and a Clean Air Act for the web could have harmful side effects like the GDPR. That's why I feel regulation needs to be informed by R&D efforts and experience gained from bottom-up experimentation as argued above.
[^8]: Wikipedia is an interesting example of open-source success: on one hand it's a wildly successful, massively popular platform that's empowered billions with free knowledge and single-handedly replaced the whole product category of "encyclopedias". On the other hand, I understand it struggles with serious imbalances and internal problems: editor burnout, toxic power struggles over edits, increased levels of editor consolidation & gatekeeping, systematic distortion in what knowledge gets included and how it's represented. I'm not saying it's perfect.
