---
title: 配置
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

| 参数                  | 描述                                                                                                                                                                                                                 | 可选值                                                                          | 默认值                                                                          | 类型                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------ |
| `locale`              | 设置默认语言                                                                                                                                                                                                         | `zhCN`/`enGb`                                                                   | `zhCN`                                                                          | `String`                             |
| `isShowToggleLang`    | 是否显示切换语言，默认展示，如果设置为`false`，则必须设置`locale`                                                                                                                                                    | `true`/`false`                                                                  | `true`                                                                          | `Boolean`                            |
| `prefixName`          | 配置添加前缀的名称，未配置则使用`package.json`的`name`                                                                                                                                                               | -                                                                               | `package.json`的`name`                                                          | `String`                             |
| `phonePattern`        | 手机号正则                                                                                                                                                                                                           | -                                                                               | `/^1\d{10}$/`                                                                   | `RegExp`                             |
| `verificationPattern` | 验证码正则                                                                                                                                                                                                           | -                                                                               | `/^\d{6}$/`                                                                     | `RegExp`                             |
| `secretKey`           | 密码保存本地时的加解密 key，未配置则使用`package.json`的`name`                                                                                                                                                       | -                                                                               | `package.json`的`name`                                                          | `String`                             |
| `isShowBreadcrumb`    | 是否展示 面包屑导航，可在`route`单个设置`isShowBreadcrumb`覆盖                                                                                                                                                       | `true`/`false`                                                                  | `true`                                                                          | `Boolean`                            |
| `isShowTabs`          | 是否展示 Tabs 导航，可在`route`单个设置`isShowTabs`覆盖，隐藏之后次`route`也不会在 Tabs 导航中                                                                                                                       | `true`/`false`                                                                  | `true`                                                                          | `Boolean`                            |
| `watermark`           | 统一设置为[水印组件](https://ant-design.antgroup.com/components/watermark-cn#watermark)的`content`，支持 `String`/`Array`/`Object`/`Function`，[具体查看设置](/config#watermark)，可在`route`单个设置`watermark`覆盖 | -                                                                               | `package.json`的`name`: `pkg.name`                                              | `String`/`Array`/`Object`/`Function` |
| `isShowSettingTheme`  | 是否显示设置主题，即是否允许用户在页面配置主题                                                                                                                                                                       | `true`/`false`                                                                  | `true`                                                                          | `Boolean`                            |
| `theme`               | 主题默认配置，必须配置                                                                                                                                                                                               | `theme: { token: { colorPrimary: '#1677ff' }, algorithm: 'defaultAlgorithm', }` | `theme: { token: { colorPrimary: '#1677ff' }, algorithm: 'defaultAlgorithm', }` | `Object`                             |
| `noAccessPath`        | 没权限时跳转的 path                                                                                                                                                                                                  | `/403`/`/404`                                                                   | `/403`                                                                          | `String`                             |

## watermark

水印支持 `String`/`Array`/`Object`/`Function` 多种方式设置。

### 水印 `String`/`Array`

水印为 `String`/`Array` 类型时，直接设置为[水印组件](https://ant-design.antgroup.com/components/watermark-cn#watermark)的`content`。

```js
watermark: pkg.name,
// watermark: [pkg.name, pkg.author],
```

### 水印 `Object`

水印为 `Object` 类型时，仅支持 `user` 属性数组配置，用于配置用户信息，且自行保证配置的都是 `store.getState().userInfo.value` 中的 `key` 值，因为此时水印的 `content` 为 `config.watermark.user.map(key => userInfo[key]);`。

```js
watermark: {
  user: ['name']
},
```

### 水印 `Function`

水印为 `Function` 类型时，参数为用户信息，返回为值为 `string | string[]`。

```js
watermark: (userInfo) => {
  return [`${userInfo.name} ${userInfo.access.toString()}`]
},
```
