export interface ToastProps {
    /** 内容 */
    content: string,
    /** 显示时间 */
    duration?: number,
    /** toast关闭后的回调 */
    onClose?():void 
  }
  