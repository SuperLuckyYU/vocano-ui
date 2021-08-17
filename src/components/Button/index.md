---
nav:
  title: 组件
  path: /components
group:
  title: Button 按钮
---

# Button 按钮
## 介绍

> 按钮用于触发一个操作，如提交表单。

## 引入

```tsx | pure
import React from 'react';
import { Button } from 'vocano-ui';
```

代码演示:

<code src="../../../example/Button/index.tsx" hideActions='["CSB"]'></code>

<API src="./index.tsx" exports='["default"]'></API>

## 类型简介

| 属性名     | 描述         | 类型                                         | 默认值    |
| ---------- | ------------ | -------------------------------------------- | --------- |
| ButtonSize | 设置按钮大小 | `lg` 、 `sm`                                 | `lg`      |
| ButtonType | 设置按钮类型 | `primary` 、 `default` 、 `danger` 、 `link` | `default` |
