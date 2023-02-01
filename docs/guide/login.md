---
title: 注册登录
order: 1
nav:
  title: 指南
  order: -1
group:
  title: 基础
  order: 0
---

## 说明

在 `src/pages/login` 有提供的注册、登录、忘记密码等功能，使用的是多语言配置。

```
...
├── login                                   # 登录页面
│   ├── components                          # 公用封装组件
│   │   ├── ForgetPasswordReset.jsx         # 忘记密码重置密码
│   │   ├── ForgetPasswordVerification.jsx  # 忘记密码验证
│   │   ├── PasswordLogin.jsx               # 密码登录页面
│   │   └── VerificationLogin.jsx           # 验证码登录页面
│   ├── ForgetPassword.jsx                  # 忘记密码页面
│   ├── index.jsx                           # 登录页面
│   └── Register.jsx                        # 注册页面
└── ...                                     #
...
```
