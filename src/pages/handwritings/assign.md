---
layout: /src/layouts/md.layout.astro
title: Implement of Object.assign()
author: Codercoin
pubDate: 2023-09-07
tags: ['Javascript', 'Handwriting', 'Object']
---

```js
Object.prototype._assign_ = function (target, ...sources) {
  if (target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const to = Object(target)
  for (const source of sources) {
    if (source !== null) {
      for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
          to[key] = source[key]
        }
      }
    }
  }
  return to
}
// test
const res = Object._assign_({}, 's', { a: 2 })
console.log(res)
```
