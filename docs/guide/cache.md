---
title: 缓存
order: 3
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

缓存包括 路由缓存 和 组件缓存 ，react-antd 中缓存使用的是 [react-activation](https://github.com/CJY0208/react-activation)。

## 路由缓存

路由缓存使用如下：

```js
import KeepAlive from 'react-activation';

// 如果懒加载的话第一次点击不能渲染出组件,要缓存的路由不能懒加载！
// const PageMockUserList = lazy(() => import('../pages/pageMock/PageMockUserList'));
import PageMockUserList from '../pages/pageMock/PageMockUserList';

...
{
  path: '/mock/userList',
  // KeepAlive需要添加唯一的id
  // saveScrollPosition保存滚动位置：https://github.com/CJY0208/react-activation/blob/master/README_CN.md#%E4%BF%9D%E5%AD%98%E6%BB%9A%E5%8A%A8%E4%BD%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E4%B8%BA-true
  element: <KeepAlive id="PageMockUserList" saveScrollPosition="screen"><PageMockUserList /></KeepAlive>,
  requiresAuth: true,
  watermark: true,
  meta: {
    title: 'mock列表',
  }
}
...
```

再次提示：**要缓存的路由不能懒加载！**

## 组件缓存

组件缓存也是一样的，可点击查看 [例子](https://fxss5201.github.io/react-antd/#/keepalive/keepalivecomponent)，代码 如下：

```js
import { Typography, Button } from 'antd';
import { useState } from 'react';
import KeepAlive from 'react-activation';
import KeepAliveDemo from './components/KeepAliveDemo';

const { Title } = Typography;

const PageKeepAliveComponent = () => {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  return (
    <>
      <Title level={3}>使用缓存</Title>
      <Button onClick={() => setShow1(!show1)}>Toggle</Button>
      {show1 && (
        <KeepAlive id="KeepAliveDemo">
          <KeepAliveDemo name="one" />
        </KeepAlive>
      )}

      <Title level={3}>未使用缓存</Title>
      <Button onClick={() => setShow2(!show2)}>Toggle</Button>
      {show2 && <KeepAliveDemo name="two" />}
    </>
  );
};

export default PageKeepAliveComponent;
```
