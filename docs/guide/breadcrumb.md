---
title: 面包屑导航
order: -1
nav:
  title: 指南
  order: -1
group:
  title: 详细功能
  order: 1
---

面包屑导航具体实现如下：

```js
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from 'antd';
import { routerList } from '../../router/index';
import { searchRoute } from '../../utils/router';
import { getFinalValue } from '../../utils/index';

const LayoutBreadcrumb = ({ userInfo, sideMenuDefaultOpenKeys }) => {
  const { t } = useTranslation();
  const location = useLocation();

  let breadcrumbList = [];
  breadcrumbList = sideMenuDefaultOpenKeys.map((x) => {
    const curRoute = searchRoute(x, routerList[0].children);

    // 此处是为了防止左侧menu菜单重新渲染的问题
    if (curRoute.redirect && curRoute.children) {
      // 权限筛选
      const accessList = curRoute.children.filter(
        (item) =>
          (!item.requiresAuth && !item.access) ||
          userInfo.access.includes(item.access),
      );
      const accessListPath = accessList.map((y) => y.path);
      let path = curRoute.redirect;
      if (!accessListPath.includes(path) && accessListPath.length) {
        path = accessListPath[0];
      }
      return {
        ...curRoute,
        path,
      };
    }
    return curRoute;
  });

  return (
    <Breadcrumb className="mb-6">
      {breadcrumbList.map((item) => {
        return (
          <Breadcrumb.Item key={item.path}>
            {item.path === location.pathname ? (
              <>
                {item.meta?.icon}
                {getFinalValue(t, item.meta?.title)}
              </>
            ) : (
              <Link to={item.path}>
                {item.meta?.icon}
                {getFinalValue(t, item.meta?.title)}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default LayoutBreadcrumb;
```

参数如下：

```js
const userInfo = useSelector((state) => state.userInfo.value);
const location = useLocation();
const sideMenuDefaultOpenKeys = location.pathname
  .slice(1)
  .split('/')
  .map((x, i, arr) => `/${arr.slice(0, i + 1).join('/')}`);
```

如果页面链接为 `/recommendation/pageCode` ，则：

```js
'/recommendation/pageCode'
  .slice(1)
  .split('/')
  .map((x, i, arr) => `/${arr.slice(0, i + 1).join('/')}`);

// ['/recommendation', '/recommendation/pageCode']
```

再依次获取 `sideMenuDefaultOpenKeys` 中对应每项的 route 对象，就能得到面包屑导航，所以 route 配置必须使用绝对路径。
