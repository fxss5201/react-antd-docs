---
title: Mock
order: 5
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
  'GET /api/users': [
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

当 Http 的请求方法是 GET 时，可以省略方法部分，只需要路径即可，例如：

```js
// ./mock/users.js

module.exports = {
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
};
```

也可以用不同的请求方法，例如 `POST`，`PUT`，`DELETE`：

```js
// ./mock/users.js

module.exports = {
  'POST /api/users': [
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
};
```

## 自定义函数

除了直接静态声明返回值，也可以用函数的方式来声明如何计算返回值，例如：

```js
module.exports = {
  // 自定义函数
  'GET /api/users/2': (ctx) => {
    ctx.body = {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    };
  },
};
```

Mock 底层使用的是 [koa](https://github.com/koajs/koa) ，更多 API 查看 [koa](https://github.com/koajs/koa) 。

## 引入 Mock.js

在 Mock 中我们经常使用 [Mock.js](http://mockjs.com/) 来帮我们方便的生成随机的模拟数据，如果你使用了 react-antd 的 Mock 功能，建议你搭配这个库来提升模拟数据的真实性：

```js
const Mock = require('mockjs');

module.exports = {
  'GET /api/usersList': (ctx) => {
    const total = 120;
    const page = ctx.query.page;
    const pageSize = ctx.query.pageSize;
    let mockSize = pageSize;
    if (page * pageSize > total && (page - 1) * pageSize < total) {
      mockSize = total - (page - 1) * pageSize;
    }
    const mocklist = Mock.mock({
      [`list|${mockSize}`]: [
        {
          // 属性 key 是一个自增数，起始值为 1，每次增 1
          'key|+1': (page - 1) * pageSize + 1,
          name: () => Mock.Random.cname(),
          age: () => Mock.Random.natural(),
          address: () => Mock.Random.county(true),
        },
      ],
    });
    ctx.body = {
      list: mocklist.list,
      total,
    };
  },
};
```

如上是一个简单的分页展示信息。

## 代理配置

react-antd 使用的框架是 [create-react-app](https://create-react-app.dev/) ，对应的请求代理配置如下：

```js
// ./src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');
const { port } = require('./../package.json');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // 此处默认指向 mock 服务，如有对应后端接口，请指向后端服务
      target: `http://localhost:${port}`,
      changeOrigin: true,
    }),
  );
};
```

注意此处对 `package.json` 文件增加了两个自定义：

```js
// package.json

  "port": "8888", // 定义 mock 端口及代理配置
  "timeout": "1000", // 定义 mock 接口返回数据的时间，可以方便调节 loading 状态
```

本篇文章参考 **[UmiJS-Mock](https://umijs.org/docs/guides/mock)**。
