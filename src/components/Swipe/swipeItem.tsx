import React, { MouseEventHandler } from 'react';
import { classNames } from '../../utils';

const componentName = 'swipe-item';

export interface SwipeItemProps {
  width?: number;
  /** 点击时触发 */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const SwipeItem: React.FC<SwipeItemProps> = props => {
  const { children, width, ...restProps } = props;

  const classes = classNames(componentName);
  return (
    <div className={classes} style={{ width: `${width}px` }} {...restProps}>
      {children}
    </div>
  );
};

SwipeItem.displayName = 'SwipeItem';
export default SwipeItem;
