
import React from 'react';
import { Swipe } from 'vocano-ui';
import './index.css';

export default () => (
  <Swipe className="my-swipe" initialSwipe={0} indicatorColor="white">
    <Swipe.Item>1</Swipe.Item>
    <Swipe.Item>2</Swipe.Item>
    <Swipe.Item>3</Swipe.Item>
    <Swipe.Item>4</Swipe.Item>
    <Swipe.Item>5</Swipe.Item>
    <Swipe.Item>6</Swipe.Item>
  </Swipe>
  );
