# teaai-frontend

**Read this in Chinese: [中文](README.md)**

**For English documentation, please click here: [English](README_en.md)**

> This README document is translated from Chinese to English by chat-glm 4,and I haven't checked the correctness of the translation.Therefore,if there is any error in the translation, please let me know.

## Introduction

This project is a frontend project based on the Vue ecosystem, which includes features such as user login and registration, administrator management and auditing, regular user question answering, and the ability to create a question bank autonomously. It also integrates AI capabilities, allowing users to generate questions and AI-based judging automatically.

## Software Architecture

- Frontend project based on Vue3
- Project built using Vite
- Programming with TypeScript
- Global user login state management using Pinia
- Global request calls using axios
- Rapid generation of request functions based on documentation using openapi
- Global route management using Vue Router
- Basic layout pages and various pages created using Arco Design
- Real-time push of AI-generated question information using SSE technology

## Usage Instructions

1. Clone or download this repository.

2. Use the following command to install project dependencies:

3.Considering the diversity of file upload implementation solutions, this project only provides a component that I personally use to upload to my private image hosting service. If you wish to use it, please replace the upload logic in the code accordingly.

```bash
pnpm install

```
Or use another node package manager to install the dependencies.

3.Modify the request address in /src/config/request.ts

```typescript
export const BASE_URL = 'http://localhost:1221' // Change to your own request address
```

4.Modify the backend API documentation address in /src/config/openapi.config.js:

```javascript
generateService({
  requestLibPath: 'import request from \'@/config/request\'',
  schemaPath: 'http://localhost:1221/api/v2/api-docs',// Change to your own API documentation address
  serversPath: './src'
})

```

5.Run the following command to generate request functions based on the openapi documentation (if using the [matching backend](https://gitee.com/colablack/teaai-backend), you do not need to run the openapi command):

```bash
pnpm run openapi
```

6.Run the following command to start the project:

```bash
pnpm run dev
```

## Usage Instructions

1. You can use the [matching Spring Boot backend project](https://gitee.com/colablack/teaai-backend) .
2. Make sure to modify the request address in /src/config/request.ts and the backend API documentation address in /src/config/openapi.config.js.

## Project Demonstration

#### Homepage

![Homepage](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111424592_主页.png)

#### Question Bank Information
![Question Bank](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111521003_题库卡片.png)
#### Login Page
![Login Page](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1727872447917_登录注册.png)

#### AI Capability
![AI1](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111591440_AI介入.png)
![AI2](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111587380_AI介入2.png)

AI intervention in the judging process
![AI3](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728111715706_判题AI介入.png)

#### Judging Results Display
![Judging Result](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728112139242_判题结果页.png)

#### View My Past Answer Records
![My Past Answer](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728112233519_我的回答.png)

#### Management of Various Elements for Administrators
![Admin Pages](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1728112332923_用户题目题库答题记录管理.png)

#### 404 Page

![404 Page](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1727872621533_404.png)

#### 403 Page

![403 Page](https://2f7171c5.cloudflare-imgbed-bo7.pages.dev/file/1727872628832_403.png)

## Contributing
1. Fork this repository.
2. Create a new Feat branch.
3. Commit your code.
4. Create a Pull Request.