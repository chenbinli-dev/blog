---
title: Implement of changing this
author: Codercoin
pubDateTime: 2023-09-13
tags: ['Javascript']
description: One of Common interview questions
---

### Function.apply()

```js
Function.prototype._apply_ = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }
  // Sets the called method to a property of the context object
  const fn = Symbol('fn');
  context[fn] = this;
  // execute the called method, delete added property and return result
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
```

### Function.call()

```js
Function.prototype._call_ = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }
  // Sets the called method to a property of the context object
  const fn = Symbol('fn');
  context[fn] = this;
  // execute the called method, delete added property and return result
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
```

### Function.bind()

```js
Function.prototype._bind_ = function (context, ...arges) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }
  // cache this
  const self = this;
  return function F() {
    if (this instanceof F) {
      return new self(...arges, ...arguments);
    }
    return self.apply(context, [...arges, ...arguments]);
  };
};
```
