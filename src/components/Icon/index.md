---
nav:
  title: 组件
  path: /components
group:
  title: Icon 图标
---

# Icon 图标
## 介绍

> 基于 `Font Awesome` 字体的图标集，可以通过 `Icon` 组件使用。https://fontawesome.com/

## 引入

```tsx | pure
import React from 'react';
import { Icon } from 'vocano-ui';
```

代码演示:

<code src="../../../example/Icon/index.tsx" hideActions='["CSB"]'></code>

## API

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题设置 | `primary` 、 `secondary` 、 `success` 、 `info` 、 `warning` 、 `danger` 、 `light` 、 `dark` | `--` |
| icon | 按钮类型 | `string` | `(必选)` |
