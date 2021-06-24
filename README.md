
## vocano-ui component library

## 使用 React+typescript 打造的一套风格组件库


[![Build Status](https://travis-ci.com/SuperLuckyYU/vocano-ui.svg?branch=master)](https://travis-ci.com/SuperLuckyYU/vocano-ui)

vocano-ui 是一套特色组件库，使用 React Hooks 和 typescript，文档地址是 https://superluckyyu.github.io/vocano-ui

### 安装最后已经发布的组件库来试试

```javascript
npm install vocano-ui --save
```

### 使用

```javascript
// 加载样式
import 'vocano-ui/dist/index.css';
// 引入组件
import { Button } from 'vocano-ui';
```

### 亮点

- 🔥typescript with React Hooks
- ⛑️ 使用 react-testing-library 完成单元测试
- 📚 使用 storybook 本地调试和生成文档页面
- 📚 使用 react-doc-gen 自动生成文档
- 📦 使用第三方库扩充组件-(react-fontawesome, react-transition-group)
- 🎉 涉及全部流程，包括最后的 npm publish，husky 提交发布前验证，travis CI/CD 集成，发布文档站点等

### 一些本地开发命令

```bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm publish
```
