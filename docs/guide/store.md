---
title: 状态管理
order: 4
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

react-antd 状态管理使用的是 [redux](https://redux.js.org/)，如下展示用户信息的状态管理。

首先创建用户信息：

```js
// .src/store/userInfo.js

import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {
      name: '',
      header: '',
      access: [],
    },
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
```

然后在 `.src/store/index.js` 中引入：

```js
// .src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import locale from './locale';
import userInfo from './userInfo';

export default configureStore({
  reducer: {
    locale,
    userInfo,
  },
});
```

在 `.src/index.js` 中配置：

```js
// .src/index.js

import store from './store/index';
import { Provider } from 'react-redux';

console.log(store);
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
);
```

其中 `store` 和 `store.getState()` 打印信息如下：

<!-- ![打印信息](/docs/store.png) -->

![打印信息](https://img.fxss.work/store.png)

最后介绍下在组件中如何使用，在组件中获取用户信息：

```js
import { useSelector } from 'react-redux';

const HomeLayout = () => {
  const userInfo = useSelector((state) => state.userInfo.value);
};
```

设置状态管理中的用户信息：

```js
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/userInfo';

const LayoutHeaderRight = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onTopMenuItemsEvent = ({ key }) => {
    if (key === 'logout') {
      Cookies.remove(addPrefixName('accessToken'));
      window.localStorage.removeItem(addPrefixName('tabs'));

      dispatch(
        setUserInfo({
          name: '',
          Header: '',
          access: [],
        }),
      );
      navigate('/login');
    }
  };
};
```
