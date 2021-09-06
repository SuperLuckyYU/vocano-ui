---
nav:
  title: 组件
  path: /components
group:
  title: Swipe 轮播
---

# Swipe 轮播
## 介绍

> 用于循环播放一组图片或内容。

## 引入

```tsx | pure
import React from 'react';
import { Swipe } from 'vocano-ui';
```

代码演示:

<code src="../../../example/Swipe/index.tsx" hideActions='["CSB"]'></code>

<!-- <API src="./index.tsx" exports='["default"]'></API> -->
## API

| 属性名     | 描述         | 类型                                         | 默认值    |
| ---------- | ------------ | -------------------------------------------- | --------- |
| duration | 动画时长，单位为 ms | `number` 、 `string`                                 | `500`      |
| initialSwipe | 初始位置索引值 | `number` 、 `string` | `0` |
| width | 滑块宽度，单位为 px | `number` 、 `string` | `auto` |
| height | 滑块高度，单位为 px | `number` 、 `string` | `auto` |
| showIndicators | 是否显示指示器 | `boolean` | `true` |
| touchable | 是否可以通过手势滑动 | `boolean` | `true` |
| stopPropagation | 是否阻止滑动事件冒泡 | `boolean` | `true` |
| indicatorColor | 指示器颜色 | `string` | `#1989fa` |
| className | 自定义类名 | `string` | -- |
| style | 自定义样式 | `CSSProperties` | -- |

## Swipe Events

| 事件     | 说明         | 回调参数    |
| ---------- | ------------ | --------- |
| onChange | 切换当前图片时触发 | index: 当前图片的索引 |
| handleClickCallback | 点击时触发 | -- |

## SwipeItem Events

| 事件     | 说明         | 回调参数    |
| ---------- | ------------ | --------- |
| onClick | 点击时触发 | `event: Event` |
