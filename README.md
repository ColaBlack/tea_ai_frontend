# teaai-frontend

## 介绍

本项目是一个基于Vue全家桶的前端项目，包括用户登录注册、管理员管理审核、普通用户答题和自主创建题库等功能，并集成了AI能力，允许用户用AI自动生成题目和AI判题。

## 软件架构

- 基于Vue3的前端项目
- 使用Vite构建项目
- 使用typescript进行编程
- 使用Pinia进行全局用户登录态管理
- 使用axios进行全局请求调用
- 使用openapi根据文档快速生成请求函数
- 使用Vue Router进行全局路由管理
- 使用arco design制作基础布局页面和各种页面
- 使用SSE技术实现对AI生成的题目信息的实时推送

## 使用教程

1.克隆或下载本仓库

2.使用

```bash
pnpm install
```

或其他node包管理器安装项目依赖

3.修改/src/config/request.ts中的请求地址

```typescript
export const BASE_URL = 'http://localhost:1221' //修改为自己的请求地址
```

4.修改/src/config/openapi.config.js中的后端接口文档地址

```javascript
generateService({
  requestLibPath: 'import request from \'@/config/request\'',
  schemaPath: 'http://localhost:1221/api/v2/api-docs',//修改为自己的接口文档地址
  serversPath: './src'
})

```

5.运行

```bash
pnpm run openapi
```

根据openapi文档生成请求函数（如使用[配套后端](https://gitee.com/colablack/teaai-backend)则不需要运行openapi命令）

6.运行

```bash
pnpm run dev
```

启动项目

## 使用说明

1. 您可以使用与之匹配的Spring Boot后端项目[配套后端](https://gitee.com/colablack/teaai-backend)
2. 请务必修改/src/config/request.ts中的请求地址和/src/config/openapi.config.js中的后端接口文档地址

## 项目演示

#### 欢迎页展示

![欢迎页](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111424592_主页.png)

#### 题库信息展示
![题库信息](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111521003_题库卡片.png)
#### 登录页展示
![登录页](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1727872447917_登录注册.png)

#### AI能力展示
![AI介入1](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111591440_AI介入.png)
![AI介入2](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111587380_AI介入2.png)

AI介入的判题过程
![AI介入3](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111715706_判题AI介入.png)

#### 判题结果展示
![判题结果](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728112139242_判题结果页.png)

#### 查看我曾经的回答记录
![我的回答](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728112233519_我的回答.png)

#### 针对管理员的各种元素的管理
![管理员管理](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728112332923_用户题目题库答题记录管理.png)
#### 404页面展示

![404页面](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1727872621533_404.png)

#### 403页面展示

![403页面](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1727872628832_403.png)

## 参与贡献

1. Fork 本仓库
2. 新建 Feat分支
3. 提交代码
4. 新建 Pull Request
