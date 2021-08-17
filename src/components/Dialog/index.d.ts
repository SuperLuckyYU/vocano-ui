export interface DialogWrapperProps {
  /** 对话框内容 */
  children: React.ReactNode;
}

export interface DialogContentProps {
  /** 对话框是否可见 */
  visible?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 对话框头部 */
  header?: React.ReactNode | Function;
  /** 对话框内容 */
  content?: React.ReactNode;
  /** 对话框底部 */
  footer?: React.ReactNode;

  children?: React.ReactNode;

  /** 取消/关闭弹框 */
  onCancel?(): void;
}

export interface DialogProps extends DialogContentProps {
  /** 对话框是否可见 */
  visible: boolean;
  /** 是否展示遮罩 */
  mask?: boolean;
}
