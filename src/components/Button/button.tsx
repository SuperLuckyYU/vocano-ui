// import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import React, { FC } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

export interface BaseButtonProps {
  /** 自定义类名 */
  className?: string;
  /** 设置禁用 */
  disabled?: boolean;
  /** 按钮大小，可选值为'lg' || 'sm' */
  size?: ButtonSize;
  /** 类型，可选值为 'primary' || 'default' || 'danger' || 'link' */
  btnType?: ButtonType;
  children: React.ReactNode;
  /** 类型为'link'类型时配置的跳转连接地址 */
  href?: string;
}
// type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'vocano-ui'
 * ~~~
 */
const Button: FC<BaseButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled,
  })
  if (btnType === 'link' && href ) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      type='button'
      className={classes}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'lg',
}

export default Button;
