---
title: 路由扩展
order: 3
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

react-antd 使用的是 [react-router-dom 6+](https://reactrouter.com/en/main) ，路由采用配置式路由：

```js
import React, { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import PageOutlet from '../pages/pageCommon/PageOutlet';

const ErrorPage = lazy(() => import('./../error-page'));
const AllLayout = lazy(() => import('./../layout/AllLayout'));
const HomeLayout = lazy(() => import('./../layout/HomeLayout'));
const PageAnalysis = lazy(() => import('../pages/pageIndex/PageAnalysis'));

export const routerList = [
  {
    path: '/',
    // 使用 redirect 时，并且含有 element 时，element 中必须包含 <Outlet />，且 redirect 必须指向其后代 route 的 path
    redirect: '/home/analysis',
    errorElement: <ErrorPage />,
    element: <AllLayout />,
    children: [
      {
        path: '/',
        redirect: '/home/analysis',
        element: <HomeLayout />,
        // 是否需要用户登录权限
        requiresAuth: true,
        children: [
          {
            path: '/home',
            redirect: '/home/analysis',
            element: <PageOutlet />,
            meta: {
              title: 'dashboard',
              icon: <BankOutlined />,
            },
            children: [
              {
                path: '/home/analysis',
                element: <PageAnalysis />,
                requiresAuth: true,
                // [水印组件](https://ant-design.antgroup.com/components/watermark-cn#watermark)
                // 设置页面是否支持水印，支持 Boolean 和 Array ，如果为 Boolean 默认配置水印组件的 content 为 config.watermark，如果为 Array ，则直接覆盖设置为水印组件的 content
                watermark: true,
                meta: {
                  title: '首页',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createHashRouter(routerList);

export default router;
```

可以看到在 route 上新增了很多自定义，接下来主要是讲解一下自定义的作用。
