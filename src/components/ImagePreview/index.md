---
nav:
  title: 组件
  path: /components
group:
  title: ImagePreview 图片预览
---

# ImagePreview 图片预览
## 介绍

> 图片放大预览，支持函数调用。

## 引入

```tsx | pure
import React from 'react';
import { ImagePreview } from 'vocano-ui';
```

代码演示:

<code src="../../../example/ImagePreview/index.tsx" hideActions='["CSB"]'></code>

## Options

| 属性名     | 描述         | 类型                                         | 默认值    |
| ---------- | ------------ | -------------------------------------------- | --------- |
| images | 需要预览的图片 URL 数组 | `string[]`  | []      |
| startPosition | 图片预览起始位置索引 | `number` 、 `string` | `0` |
| swipeDuration | 动画时长，单位为ms | `number` 、 `string` | `300` |
| showIndex | 是否显示页码 | `boolean` | `true` |
