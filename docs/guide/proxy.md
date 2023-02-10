---
title: 代理
order: 6
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

> 代理也称网络代理，是一种特殊的网络服务，允许一个终端（一般为客户端）通过这个服务与另一个终端（一般为服务器）进行非直接的连接。- [维基百科](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8)

在项目开发（dev）中，所有的网络请求（包括资源请求）都会通过本地的 server 做响应分发，我们通过使用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 中间件，来代理指定的请求到另一个目标服务器上。如请求 `fetch('/api')` 来取到远程 `http://jsonplaceholder.typicode.com/` 的数据。

我们本地已经安装了 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)，要实现上述的需求我们只需要在 `./src/setupProxy.js` 文件进行配置：

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

上述配置表示，将 `/api` 前缀的请求，代理到 `http://localhost:${port}`，将请求来源修改为目标 url。如请求 `/api/a`，实际上是请求 `http://localhost:${port}/api/a`。

一般我们使用这个能力来解开发中的跨域访问问题。由于浏览器（或者 webview）存在同源策略，之前我们会让服务端配合使用 Cross-Origin Resource Sharing (CORS) 策略来绕过跨域访问问题。现在有了本地的 node 服务，我们就可以使用代理来解决这个问题。

原理其实很简单，就是浏览器上有跨域问题，但是服务端没有跨域问题。我们请求同源的本地服务，然后让本地服务去请求非同源的远程服务。需要注意的是，请求代理，代理的是请求的服务，不会直接修改发起的请求 url。它只是将目标服务器返回的数据传递到前端。所以你在浏览器上看到的请求地址还是 `http://localhost:3000/api/a`。

值得注意的是 proxy 暂时只能解开发时（dev）的跨域访问问题，可以在部署时使用同源部署。如果在生产上（build）的发生跨域问题的话，可以将类似的配置转移到 Nginx 容器上。

本篇文章参考 **[UmiJS-Proxy](https://umijs.org/docs/guides/proxy)**。
