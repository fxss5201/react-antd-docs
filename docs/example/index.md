---
title: 示例说明
order: -1
nav:
  title: 示例
  order: -1
---

示例： [react-antd](https://fxss5201.github.io/react-antd/) ，本篇文章主要是对示例做下大致讲解。

## 示例

<code src="./example-demo"></code>

## 示例说明

这里主要是根据菜单说明路由的扩展配置：

### dashboard

扩展配置菜单名称和图标、重定向、子路由：

1. 首页扩展配置需要登录、显示默认水印、标题;
2. 工作台扩展配置需要登录、配置水印、标题、不显示面包屑导航。

```js
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
      // 设置页面是否支持水印，支持 Boolean/String/Array/Object/Function
      // 如果为 Boolean 默认配置水印组件的 content 为 config.watermark
      // 如果为 String/Array ，则直接覆盖设置为水印组件的 content
      // 如果为 Object，仅支持 user 属性数组配置，用于配置用户信息，且自行保证配置的都是 store.getState().userInfo.value 中的 key 值
      // 如果为 Function，参数为用户信息，返回为值为 string | string[]
      watermark: true,
      // watermark: '8888',
      // watermark: ['aaa', '工作台'],
      // watermark: {
      //   user: ['name', 'header', 'name']
      // },
      // watermark: (userInfo) => {
      //   return `${userInfo.name} 1234`
      // },
      meta: {
        title: '首页',
      }
    },
    {
      path: '/home/workplace',
      element: <PageWorkplace />,
      requiresAuth: true,
      isShowBreadcrumb: false,
      watermark: ['aaa', '工作台'],
      meta: {
        title: '工作台',
      }
    }
  ]
},
```

### echarts 图表

扩展配置菜单名称和图标、不显示面包屑导航、不显示 Tabs 导航栏：

```js
{
  path: '/pageEcharts',
  element: <PageEcharts />,
  isShowBreadcrumb: false,
  isShowTabs: false,
  meta: {
    title: 'echarts图表',
    icon: <AreaChartOutlined />,
  }
},
```

### 用户中心

扩展配置菜单名称和图标、重定向、子路由：

1. 个人中心扩展配置需要登录、配置水印、菜单名称；
2. 用户管理扩展配置需要登录、默认水印、菜单名称。

```js
{
  path: '/user',
  redirect: '/user/userInfo',
  element: <PageOutlet />,
  meta: {
    title: '用户中心',
    icon: <UserOutlined />,
  },
  children: [
    {
      path: '/user/userInfo',
      element: <PageUserInfo />,
      requiresAuth: true,
      watermark: (userInfo) => {
        return `${userInfo.name} 1234`
      },
      meta: {
        title: '个人中心',
      }
    },
    {
      path: '/user/users',
      element: <PageUsers />,
      requiresAuth: true,
      watermark: true,
      meta: {
        title: '用户管理',
      }
    }
  ]
},
```

### mock 示例

扩展配置菜单名称和图标、重定向、子路由：

1. mock 用户扩展配置需要登录、默认水印、菜单名称；
2. mock 列表 1 扩展配置需要登录、默认水印、菜单名称，并且路由缓存；
3. mock 列表 2 扩展配置需要登录、默认水印、菜单名称。

```js
{
  path: '/mock',
  redirect: '/mock/users',
  element: <PageOutlet />,
  meta: {
    title: 'mock示例',
    icon: <ApiOutlined />,
  },
  children: [
    {
      path: '/mock/users',
      element: <PageMockUsers />,
      requiresAuth: true,
      watermark: true,
      meta: {
        title: 'mock用户',
      }
    },
    {
      path: '/mock/userList',
      // KeepAlive需要添加唯一的id
      // saveScrollPosition保存滚动位置：https://github.com/CJY0208/react-activation/blob/master/README_CN.md#%E4%BF%9D%E5%AD%98%E6%BB%9A%E5%8A%A8%E4%BD%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E4%B8%BA-true
      element: <KeepAlive id="PageMockUserList" saveScrollPosition="screen"><PageMockUserList /></KeepAlive>,
      requiresAuth: true,
      watermark: true,
      meta: {
        title: 'mock列表1',
      }
    },
    {
      path: '/mock/userListPost',
      element: <KeepAlive id="PageMockUserListPost" saveScrollPosition="screen"><PageMockUserListPost /></KeepAlive>,
      requiresAuth: true,
      watermark: true,
      meta: {
        title: 'mock列表2',
      }
    },
  ]
},
```

### 权限演示

扩展配置菜单名称和图标、重定向、子路由：

1. normal 用户扩展配置需要登录、配置水印、权限、菜单名称；
2. middle 用户扩展配置配置水印、权限、菜单名称；
3. admin 用户扩展配置需要登录、配置水印、权限、菜单名称。

```js
{
  path: '/access',
  redirect: '/access/pageNormal',
  element: <PageOutlet />,
  meta: {
    title: '权限演示',
    icon: <KeyOutlined />,
  },
  children: [
    {
      path: '/access/pageNormal',
      element: <PageNormal />,
      requiresAuth: true,
      // Object 配置仅支持 user 属性数组配置，且自行保证配置的都是 store.getState().userInfo.value 中的 key 值
      watermark: {
        user: ['name', 'header', 'name']
      },
      access: 'normal',
      meta: {
        title: 'normal用户',
      }
    },
    {
      path: '/access/pageMiddle',
      element: <PageMiddle />,
      watermark: {
        user: ['name']
      },
      access: 'middle',
      meta: {
        title: 'middle用户',
      }
    },
    {
      path: '/access/pageAdmin',
      element: <PageAdmin />,
      requiresAuth: true,
      watermark: {
        user: ['name']
      },
      access: 'admin',
      meta: {
        title: 'admin用户',
      }
    }
  ]
},
```

上面基本上把路由扩展的部分都涉及到了。
