---
title: 路由
order: 2
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

## 路由配置

react-antd 使用的是 [react-router-dom 6+](https://reactrouter.com/en/main) ，路由采用配置式路由（此处使用[React.lazy](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)按路由进行代码分割）：

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

可以看到在 route 上新增了很多自定义，[react-router-dom 6+](https://reactrouter.com/en/main) 中 route 定义如下：

```ts
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject['handle'];
  shouldRevalidate?: ShouldRevalidateFunction;
}
```

react-antd 在其基础上新增了如下配置：

```ts
interface LastRouteObject extends RouteObject {
  redirect?: string;
  requiresAuth?: boolean;
  access?: string;
  isShowBreadcrumb?: boolean;
  isShowTabs?: boolean;
  watermark?:
    | boolean
    | string[]
    | {
        user: string[];
      };
  meta?: {
    title?: string;
    icon?: React.ReactNode | null;
  };
}
```

### 注意项

在 react-antd 中 route 的 `path` 和 `redirect` 都必须为绝对路由，并且子路由的 `path` 必须包含父路由的 `path` 。

### redirect

路由重定向，使用 `redirect` 时，并且含有 `element` 时，`element` 中必须包含 `<Outlet />`，且 `redirect` 必须指向其后代 route 的 `path`。

### requiresAuth

是否需要权限，默认值是 `false`，需要则配置为 `true`，最基础的登录权限，如果，如果需要更高级的权限，请配置 `access` 。

### access

配置对应的权限，例如系统权限有 `normal`/`middle`/`admin` 三种权限，页面 A 的权限为 `normal` ，页面 B 的权限为 `middle`，页面 C 的权限为 `admin`，如果用户对应的权限为 `['normal']` ，则拥有 route 配置为 `requiresAuth: true` 及 页面 A 的权限，如果用户对应的权限为 `['normal', 'middle', 'admin']` ，则拥有 route 配置为 `requiresAuth: true` 及 页面 A、页面 B、页面 C 的权限。

配置 `access` 则一定拥有 `requiresAuth` 对应的权限，配置 `requiresAuth` 无 `access` 的权限。

### isShowBreadcrumb

是否显示面包屑导航，用于覆盖 `/src/config/index.js` 文件中的 `isShowBreadcrumb` 。

### isShowTabs

是否显示 Tabs 导航栏，用于覆盖 `/src/config/index.js` 文件中的 `isShowTabs` 。

### watermark

配置路由对应的水印，用于覆盖 `/src/config/index.js` 文件中的 `watermark` ，支持 `Boolean`/`String`/`Array`/`Object`/`Function`。

1. 如果为 `Boolean` 默认配置[水印组件](https://ant-design.antgroup.com/components/watermark-cn#watermark)的 `content` 为 `config.watermark`；
2. 如果为 `String/Array` ，则直接覆盖设置为水印组件的 `content`；
3. 如果为 `Object`，仅支持 `user` 属性数组配置，用于配置用户信息，且自行保证配置的都是 `store.getState().userInfo.value` 中的 `key` 值；
4. 如果为 `Function`，参数为用户信息，返回为值为 `string | string[]`。

```js
watermark: true,
// watermark: '8888',
// watermark: ['aaa', '工作台'],
// watermark: {
//   user: ['name', 'header']
// },
// watermark: (userInfo) => {
//   return `${userInfo.name} 1234`
// },
```

### meta

元数据，支持 `title` 标题 和 `icon` 图标配置，`title` 标题配置页面标题和导航菜单，`icon` 图标配置导航图标。
