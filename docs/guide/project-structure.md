---
title: 目录结构
order: 0
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

下载的项目目录结构如下：

```
.
├── .github
│   └── workflows
│   │   └── gh-pages.yml            # Github Action 自动部署
├── public                          #
│   ├── index.html                  #
│   └── favicon.ico                 #
├── src                             #
│   ├── assets                      # 会被处理的文件
│   ├── components                  # 公用封装组件
│   │   ├── CodeHighlighter.jsx     # 代码高亮显示组件
│   │   ├── DraggableTabsDrop.jsx   # 可拖拽的 Tabs 组件（Drop状态更换）
│   │   ├── DraggableTabsHover.jsx  # 可拖拽的 Tabs 组件（Hover状态更换）
│   │   ├── EchartsModule.jsx       # Echarts 封装组件
│   │   ├── MyIcon.jsx              # 自定义 font 图标
│   │   └── ToggleLang.jsx          # 切换语言组件
│   ├── config                      # 配置目录
│   │   └── index.js                # 配置文件
│   ├── layout                      # layout 公共封装
│   │   ├── AllLayout.jsx           # 总的 layout
│   │   ├── HomeLayout.jsx          # 项目主体 layout
│   │   └── LoginLayout.jsx         # 登录页 layout
│   ├── locales                     # 多语言文件
│   │   ├── enGb.js                 # 英文
│   │   └── zhCN.js                 # 中文
│   ├── pages                       # 页面
│   │   ├── login                   # 登录页面
│   │   ├── pageCommon              # 403/404/500
│   │   └── ...                     #
│   ├── router                      # 路由
│   │   ├── index.js                # 路由主文件
│   │   ├── login.js                # 登录路由
│   │   └── RouterExtend.jsx        # 路由扩展
│   ├── store                       # 公共状态
│   │   ├── index.js                # 公共状态
│   │   ├── locale.js               # 公共语言状态
│   │   └── userInfo.js             # 公共用户信息状态
│   ├── style                       # 样式文件
│   │   ├── index.css               # 自定义公共样式
│   │   └── tailwind.css            # tailwind 样式
│   ├── utils                       # 方法文件
│   │   ├── index.js                # 公共方法
│   │   └── router.js               # 针对路由封装的公共方法
│   │── App.js                      #
│   │── error-page.jsx              # 错误页
│   │── i18.js                      # 多语言
│   └── index.js                    # 项目入口文件
├── package.json                    #
└── tailwind.config.js              # tailwind配置文件
```
