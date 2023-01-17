---
title: 设置
order: -1
nav:
  title: 配置项
  order: -1
group:
  title: 框架配置
  order: -1
---

配置只要放在 [`/src/config/index.js`](https://github.com/fxss5201/react-antd/blob/main/src/config/index.js) 文件。

## 配置项

| 参数 | 描述 | 可选值 | 默认值 |类型|
|---|-----------|-----|-----|---|
|`locale`|设置默认语言|`zhCN`/`enGb`|`zhCN`|String|
|`isShowToggleLang`|是否显示切换语言，默认展示，如果设置为`false`，则必须设置`locale`|`true`/`false`|`true`|Boolean|
|`prefixName`|配置添加前缀的名称，未配置则使用`package.json`的`name`|-|`package.json`的`name`|String|
|`phonePattern`|手机号正则|-|`/^1\d{10}$/`|RegExp|
|`verificationPattern`|验证码正则|-|`/^\d{6}$/`|RegExp|
|`secretKey`|密码保存本地时的加解密key，未配置则使用`package.json`的`name`|-|`package.json`的`name`|String|
|`isShowBreadcrumb`|是否展示 面包屑导航，可在`route`的`meta`单个设置`isHideBreadcrumb`隐藏|`true`/`false``true`|Boolean|
|`isShowTabs`|是否展示 Tabs 导航，可在`route`的`meta`单个设置`isHideTabs`隐藏，隐藏之后次`route`也不会在 Tabs 导航中|`true`/`false``true`|Boolean|
|`watermark`|统一设置为[水印组件](https://ant-design.antgroup.com/components/watermark-cn#watermark)的`content`|-|`package.json`的`name`和`author`: `[pkg.name, pkg.author]`|Array|
|`theme`|主题色配置，放开的话，必须配置，否则主题色有问题|`null`/`theme: { colorPrimary: '#00b96b' }`|`null`|Null/Object|
