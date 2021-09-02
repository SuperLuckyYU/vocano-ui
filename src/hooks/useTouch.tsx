import { useState, TouchEvent } from 'react';

const MIN_DISTANCE = 10;

type Direction = '' | 'vertical' | 'horizontal';

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}

export default function useTouch() {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [direction, setDirection] = useState<Direction>('');

  const isVertical = () => direction === 'vertical';
  const isHorizontal = () => direction === 'horizontal';

  const reset = () => {
    setDeltaX(0);
    setDeltaY(0);
    setOffsetX(0);
    setOffsetY(0);
    setDirection('');
  };

  const start = (event: TouchEvent) => {
    reset();
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
  };

  const move = (event: TouchEvent) => {
    const touch = event.touches[0];
    // Fix: Safari back will set clientX to negative number
    const deltaXValue = touch.clientX < 0 ? 0 : touch.clientX - startX;
    const deltaYValue = touch.clientY - startY;
    const offsetXValue = Math.abs(deltaX);
    const offsetYValue = Math.abs(deltaY);
    setDeltaX(deltaXValue);
    setDeltaY(deltaYValue);
    setOffsetX(offsetXValue);
    setOffsetY(offsetYValue);

    if (!direction) {
      const directionValue = getDirection(offsetX, offsetY);
      setDirection(directionValue);
    }
  };

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  };
}
