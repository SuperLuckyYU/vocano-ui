import { CSSProperties, MouseEventHandler } from 'react';

export interface SwipeProps {
  /** 动画时长，单位为 ms */
  duration: number | string;
  /** 初始位置索引值 */
  initialSwipe: number | string;
  /** 滑块宽度，单位为 px */
  width: number | string;
  /** 滑块高度，单位为 px */
  height: number | string;
  /** 是否显示指示器 */
  showIndicators: boolean;
  /** 是否可以通过手势滑动 */
  touchable: boolean;
  /** 是否阻止滑动事件冒泡 */
  stopPropagation: boolean;
  /** 指示器颜色 */
  indicatorColor: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击按钮的点击回调函数 */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type SwipeState = {
  rect: { width: number; height: number } | null;
  width: number;
  height: number;
  offset: number;
  active: number;
  swiping: boolean;
};
