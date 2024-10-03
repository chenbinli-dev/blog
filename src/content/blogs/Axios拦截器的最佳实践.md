---
title: 使用发布订阅模式解耦Axios处理逻辑
author: Codercoin
pubDateTime: 2024-10-03
tags: ['Axios', 'Design Pattern']
description: 通过发布订阅模式替代传统的Axios拦截器逻辑处理，实现模块的功能解耦和可维护性提升
---

# 使用发布订阅模式解耦Axios处理逻辑

通常情况下，我们会在Axios的拦截器中针对请求或者响应做一些额外的处理，例如路由跳转、token失效处理、弹出悬浮窗等等，如果将这些处理逻辑都集中在一个拦截器中，那么当业务逻辑变更时，我们需要修改整个拦截器的代码，这将导致代码的可维护性降低。

下面我们以`request.ts`中登录模块的路由跳转、弹出悬浮窗为例，来看看如何使用发布订阅模式解耦Axios处理逻辑：

```ts
import axios from 'axios';
import { message } from 'antd';
const axiosInstance = axios.create({
  baseURL: 'https://example.com',
  timeout: 5000
});
function requestInterceptor(config) {
  // 路由跳转
  if (config.url === '/login') {
    window.location.href = '/login';
    return Promise.reject(new Error('Login required'));
  }
  return config;
}
function responseInterceptor(response) {
  // 弹出悬浮窗
  if (response.data.code === 401) {
    message.error('Token expired, please login again');
    window.location.href = '/login';
  }
  return response;
}
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);
```

从上面代码可以看出，随着后续功能和业务的添加，整个拦截器的逻辑会越来越复杂并且充斥着其他模块的函数，这非常不利于我们维护代码。 为了提升代码的可维护性，我们可以采用发布订阅模式，将这些处理逻辑抽离出来，通过订阅者模式订阅这些处理逻辑，然后在请求或者响应时发布消息，让订阅者进行处理。这样，每个模块都只需要关注自己的功能实现，从而达到解耦的效果。

## 使用发布订阅模式

首先，定义我们需要的事件名，便于统一管理：

```ts
export const EVENT_NAMES = [
  'NOT_FOUND',
  'UN_AUTHORIZED',
  'TOKEN_EXPIRED',
  'LOGIN_REQUIRED'
] as const;

export type EventName = (typeof EVENT_NAMES)[number];
```

在`eventEmitter.ts`中定义事件中心：

```ts
class EventEmitter {
  private events: Listeners = EVENT_NAMES.reduce((acc, cur) => {
    acc[cur] = new Set();
    return acc;
  }, {} as Listeners);

  on(eventName: EventName, listener: (...args: any[]) => void) {
    this.events[eventName].add(listener);
  }

  emit(eventName: EventName, ...args: any[]) {
    this.events[eventName].forEach((listener) => listener(...args));
  }
}
export default new EventEmitter();
```
注册事件：

```ts
import eventEmitter from './eventEmitter';

eventEmitter.on("LOGIN_REQUIRED",() => {
    window.location.href = '/login';
})

eventEmitter.on("UN_AUTHORIZED",() => {
    message.error('Token expired, please login again');
    window.location.href = '/login';
})

```

改造后的`request.ts`的代码：

```ts
import axios from 'axios';
import eventEmitter from './eventEmitter';
const axiosInstance = axios.create({
  baseURL: 'https://example.com',
  timeout: 5000
});
function requestInterceptor(config) {
  // 路由跳转
  if (config.url === '/login') {
    eventEmitter.emit('LOGIN_REQUIRED');
    return Promise.reject(new Error('Login required'));
  }
  return config;
}
function responseInterceptor(response) {
  // 弹出悬浮窗
  if (response.data.code === 401) {
    eventEmitter.emit("UN_AUTHORIZED");
  }
  return response;
}
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);
```

## 总结

1. 发布订阅模式可以解耦Axios拦截器的处理逻辑，使得代码的可维护性提升。

2. 事件中心可以统一管理事件，使得订阅者和发布者之间的耦合度降低。

3. 订阅者只需要关注自己的功能实现，从而达到解耦的效果。

