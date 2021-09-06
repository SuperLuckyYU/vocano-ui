import React, { FC, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames, isFunction } from '../../utils';
import { MaskProps, WrapperProps, PopupProps } from './index.d';

const componentName = 'popup';

// 处理遮罩层
const handleMask = ({ mask, visible, maskStyle }: MaskProps) => {
  if (!mask) return;
  const idName = classNames('mask');
  const $mask: HTMLElement | null = document.getElementById(idName);
  const isShowMask = $mask !== null;

  // 显示遮罩层
  if (visible === true) {
    // 已经存在遮罩层
    if (isShowMask) return;
    const divMask = document.createElement('div');
    divMask.id = idName;
    maskStyle && divMask.setAttribute('style', maskStyle);
    document.body.appendChild(divMask);
  }

  // 隐藏遮罩层
  if (visible === false) {
    // 删除遮罩层
    if (isShowMask && $mask && $mask.remove) {
      $mask.remove();
    }
  }
};

const Wrapper: FC<WrapperProps> = ({ children, visible, animation, timeout }) => {
  timeout = timeout || 0;
  const classes = `${animation}-animation`;
  return (
    <CSSTransition
      in={visible}
      timeout={timeout} // 动画执行1秒
      classNames={classes}
    >
      <>{children}</>
    </CSSTransition>
  );
};

const Popup: FC<PopupProps> = ({
  visible,
  children,
  onClick,

  mask,
  maskStyle,

  animation,
  timeout,

  className,
}) => {
  const popupEl = useRef<HTMLDivElement>(null);
  const classes = classNames(componentName, {
    hide: true,
    popup: true,
  });

  const handlePopupClick = (e: any) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (onClick && isFunction(onClick)) {
      onClick();
    }
  };

  useEffect(() => {
    const statusClasses = classNames(componentName, {
      popup: true,
      hide: !visible,
      customClassName: className,
    });
    if (popupEl && popupEl.current) {
      const current = popupEl.current || { className: '' };
      if (visible) {
        current.className = statusClasses;
      } else {
        setTimeout(() => {
          current.className = statusClasses;
        }, timeout);
      }
    }
  }, [visible, timeout]);

  // 处理遮罩层
  handleMask({
    visible,
    mask,
    maskStyle,
  });

  return (
    <div ref={popupEl} className={classes} onClick={handlePopupClick}>
      <Wrapper animation={animation} timeout={timeout} visible={visible}>
        {children}
      </Wrapper>
    </div>
  );
};

Popup.defaultProps = {
  visible: false,
  mask: true,
  timeout: 300,
};

export default Popup;
