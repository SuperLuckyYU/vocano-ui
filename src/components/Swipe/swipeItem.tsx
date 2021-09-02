import React from 'react';
import { classNames } from '../../utils';

const componentName = 'swipe-item';

export interface SwipeItemProps {
  width?: number;
}

const SwipeItem: React.FC<SwipeItemProps> = props => {
  const { children, width } = props;

  const classes = classNames(componentName);
  return (
    <div className={classes} style={{ width: `${width}px` }}>
      {children}
    </div>
  );
};

SwipeItem.displayName = 'SwipeItem';
export default SwipeItem;
