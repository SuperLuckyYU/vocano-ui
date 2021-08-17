import React, { FC, CSSProperties, MouseEventHandler } from 'react';
// import classNames from 'classnames'
import { classNames } from '../../utils';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

export interface BaseButtonProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 设置禁用 */
  disabled?: boolean;
  /** 设置按钮大小 */
  size?: ButtonSize;
  /** 设置按钮类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  /** 类型为'link'类型时配置的跳转连接地址 */
  href?: string;
  /** 点击按钮的点击回调函数 */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
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
const Button: FC<BaseButtonProps> = props => {
  const { btnType, className, disabled, size, children, href, ...restProps } = props;

  const classes = classNames('button', {
    button: true,
    btnType,
    size,
    disabled: btnType === 'link' && disabled,
    customClassName: className,
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'lg',
  onClick: () => {},
};

export default Button;
