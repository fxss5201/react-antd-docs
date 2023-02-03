---
title: Mock
order: 4
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

## Mock 说明

react-antd 提供了开箱即用的 Mock 功能，能够用方便简单的方式来完成 Mock 数据的设置。

:::info
什么是 Mock 数据：在前后端约定好 API 接口以后，前端可以使用 Mock 数据来在本地模拟出 API 应该要返回的数据，这样一来前后端开发就可以同时进行，不会因为后端 API 还在开发而导致前端的工作被阻塞。
:::

## 目录约定

约定 `/mock` 目录下的所有文件为 [Mock 文件](/guide/mock#mock-文件)，例如这样的目录结构：

```
.
├── mock
    ├── todos.js
    ├── items.js
    └── users.js
└── src
    └── pages
```

则 `/mock` 目录中的 `todos.js`, `items.js` 和 `users.js` 就会被视为 [Mock 文件](/guide/mock#mock-文件) 来处理。

## Mock 文件

Mock 文件默认导出一个对象，而对象的每个 Key 对应了一个 Mock 接口，值则是这个接口所对应的返回数据，例如这样的 Mock 文件：

```js
// ./mock/users.js

module.exports = {
  // 返回值可以是数组形式
  '/api/users': [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ],
  // 返回值也可以是对象形式
  'GET /api/users/1': {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
};
```

就声明了两个 Mock 接口，透过 `GET /api/users` 可以拿到一个带有两个用户数据的数组，透过 `GET /api/users/1` 可以拿到某个用户的模拟数据。

## 请求方法

本篇文章参考 **[UmiJS-Mock](https://umijs.org/docs/guides/mock)**。
