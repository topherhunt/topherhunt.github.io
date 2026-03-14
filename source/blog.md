---
layout: default
title: Blog
permalink: /blog/
---

<!-- TODO: Maybe link to this page. Maybe not. -->

# Posts

<ul class="b-post-list">
  {% for post in site.posts %}
    <li>
      <span class="b-post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
      <h2>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
  {% endfor %}
</ul>
