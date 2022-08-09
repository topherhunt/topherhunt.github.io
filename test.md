---
layout: default
title: Test page WIP
permalink: /test/
---

# Test page -- WIP

This is test content. Not meant to be public yet.

<!-- Template syntax references:
  - https://jekyllrb.com/docs/posts/
  - https://stackoverflow.com/a/14148691/1729692
  - https://shopify.github.io/liquid/basics/introduction/
-->
{% for post in site.posts %}
  * [{{post.date | date: "%Y-%m-%d"}} • {{post.title}}]({{post.url}}) {% endfor %}
