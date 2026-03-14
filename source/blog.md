---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Thoughts on tech, society, epistemology, geopolitics, (grits teeth) culture wars, and how they intersect.

**My writing is Claude-assisted**; we are all cyborgs now. Becoming a cyborg doesn't take away from your humanity. Only your decisions can do that.

<div class="text-center m-3">⟡</div>

<ul class="b-post-list">
  {% for post in site.posts %}
    <li>
      <h3 style="margin: 0;">
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h3>
      <span class="b-post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>
