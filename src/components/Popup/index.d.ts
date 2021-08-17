import { ReactNode } from 'react';

export interface MaskProps {
  /** 是否需要遮罩层 */
  mask?: boolean;
  /** 遮罩样式 */
  maskStyle?: string;
  /** 显示内容 */
  visible?: boolean;
}

export interface WrapperProps {
  /** 弹框的内容 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 内容是否可见  */
  visible?: boolean;
  /** 内容动画时间  */
  timeout?: number;
  /** 动画名称  */
  animation?: string;
}

export interface PopupProps extends MaskProps, WrapperProps {
  onClick?(): void;
}
