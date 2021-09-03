import { FC } from 'react';
import Swipe, { SwipeProps } from './swipe';
import SwipeItem, { SwipeItemProps } from './swipeItem';

export type ISwipeComponent = FC<SwipeProps> & {
  Item: FC<SwipeItemProps>;
};
const TransSwipe = Swipe as ISwipeComponent;

TransSwipe.Item = SwipeItem;

export default TransSwipe;
