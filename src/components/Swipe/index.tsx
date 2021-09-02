import { FC } from 'react';
import Swipe from './swipe';
import { SwipeProps } from './index.d';
import SwipeItem, { SwipeItemProps } from './swipeItem';

export type ISwipeComponent = FC<SwipeProps> & {
  Item: FC<SwipeItemProps>;
};
const TransSwipe = Swipe as ISwipeComponent;

TransSwipe.Item = SwipeItem;

export default Swipe;
