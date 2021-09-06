import React, {
  FC,
  TouchEvent,
  useMemo,
  useState,
  CSSProperties,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { classNames, preventDefault, clamp, uid, isFunction } from '../../utils';
import { SwipeItemProps } from './swipeItem';
import useTouch from '../../hooks/useTouch';

const componentName = 'swipe';

export interface SwipeProps {
  /** 动画时长，单位为 ms */
  duration?: number | string;
  /** 初始位置索引值 */
  initialSwipe: number | string;
  /** 滑块宽度，单位为 px */
  width?: number | string;
  /** 滑块高度，单位为 px */
  height?: number | string;
  /** 是否显示指示器 */
  showIndicators?: boolean;
  /** 是否可以通过手势滑动 */
  touchable?: boolean;
  /** 是否阻止滑动事件冒泡 */
  stopPropagation?: boolean;
  /** 指示器颜色 */
  indicatorColor?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击时触发 */
  handleClickCallback?(): void;
  /** 切换当前图片时触发 */
  onChange?: (index: number) => void;
}

/**
 * 轮播，用于循环播放一组图片或内容
 * ### 引用方法
 *
 * ~~~js
 * import { Swipe } from 'vocano-ui'
 * ~~~
 */
const Swipe: FC<SwipeProps> = props => {
  const {
    duration,
    width,
    height,
    showIndicators,
    touchable,
    stopPropagation,
    indicatorColor,
    className,
    style,
    children,
    handleClickCallback,
    onChange,
  } = props;
  const initialSwipe = Number(props.initialSwipe);

  const classes = classNames(componentName, '', {
    customClassName: className,
  });

  const [wrapperWidth, setWrapperWidth] = useState(0);

  const root = useRef<HTMLDivElement>(null);

  const [currentActived, setCurrentActived] = useState(initialSwipe);
  const [rectWidth, setRectWidth] = useState(0);
  // const [rectHeight, setRectHeight] = useState(0);
  const [stateWidth, setStateWidth] = useState(0);
  // const [stateHeight, setStateHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const touch = useTouch();

  const count = useMemo(() => React.Children.count(children), [children]);

  const size = useMemo(() => stateWidth, [stateWidth]);

  const delta = useMemo(() => touch.deltaX, [touch.deltaX]);

  const minOffset = useMemo(() => {
    if (rectWidth) return rectWidth - size * count;
    return 0;
  }, [rectWidth, size, count]);

  const maxCount = useMemo(() => Math.ceil(Math.abs(minOffset) / size), [minOffset, size]);

  const trackSize = useMemo(() => count * size, [count, size]);

  const activeIndicator = useMemo(() => (currentActived + count) % count, [currentActived, count]);

  const isCorrectDirection = useMemo(() => touch.direction === 'horizontal', [touch.direction]);

  const trackStyle = useMemo(() => {
    const _style: CSSProperties = {
      transitionDuration: `${swiping ? 0 : duration}ms`,
      transform: `translateX(${offset}px)`,
    };

    if (size) {
      _style.width = `${trackSize}px`;
      _style.height = height ? `${height}px` : '';
    }

    return _style;
  }, [swiping, duration, offset, size, trackSize, height]);

  const getTargetActive = (pace: number) => {
    if (pace) {
      return clamp(currentActived + pace, 0, maxCount);
    }
    return currentActived;
  };

  const getTargetOffset = useCallback(
    (targetActive: number, _offset = 0) => {
      let currentPosition = targetActive * size;
      currentPosition = Math.min(currentPosition, -minOffset);

      let targetOffset = _offset - currentPosition;
      targetOffset = clamp(targetOffset, minOffset, 0);

      return targetOffset;
    },
    [size, minOffset],
  );

  const move = ({
    pace = 0,
    _offset = 0,
    emitChange,
  }: {
    pace?: number;
    _offset?: number;
    emitChange?: boolean;
  }) => {
    if (count <= 1) {
      return;
    }
    const targetActive = getTargetActive(pace);
    const targetOffset = getTargetOffset(targetActive, _offset);

    setOffset(targetOffset);
    setCurrentActived(targetActive);
    if (emitChange && targetActive !== currentActived) {
      // change Event
    }
  };

  const correctPosition = () => {
    setSwiping(true);
    if (currentActived <= -1) {
      move({ pace: count });
    } else if (currentActived >= count) {
      move({ pace: -count });
    }
  };

  // initialize swipe position
  const initialize = useCallback(
    (active = +initialSwipe) => {
      if (!root.current) {
        return;
      }
      const _rectWidth = root.current.offsetWidth;
      // const _rectHeight = root.current.offsetHeight;
      setRectWidth(_rectWidth);
      // setRectHeight(_rectHeight);

      const _width = +(width && width !== 'auto' ? width : _rectWidth);
      // const _height = +(height && height !== 'auto' ? height : _rectHeight);
      setStateWidth(_width);
      // setStateHeight(_height);

      if (count) {
        active = Math.min(count - 1, active);
      }

      setCurrentActived(active);
      setSwiping(true);
      setOffset(getTargetOffset(active));
    },
    [count, getTargetOffset, initialSwipe, width],
  );

  const [touchStartTime, setTouchStartTime] = useState(0);
  const onTouchStart = (event: TouchEvent) => {
    if (!touchable) return;
    touch.start(event);

    setTouchStartTime(Date.now());
    correctPosition();
    preventDefault(event, stopPropagation);
  };

  const onTouchMove = (event: TouchEvent) => {
    if (touchable && swiping) {
      touch.move(event);
      if (isCorrectDirection) {
        preventDefault(event, stopPropagation);
        move({ _offset: delta });
      }
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (!touchable || !swiping) {
      return;
    }

    const _duration = Date.now() - touchStartTime;

    const speed = delta / _duration;
    const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > size / 2;

    if (shouldSwipe && isCorrectDirection) {
      let pace = 0;
      pace = -Math[delta > 0 ? 'ceil' : 'floor'](delta / size);
      move({
        pace,
        emitChange: true,
      });
    } else if (delta) {
      move({ pace: 0 });
    }

    setSwiping(false);
    preventDefault(event, stopPropagation);
    // Determined as a click event
    if (delta === 0 && handleClickCallback && isFunction(handleClickCallback)) {
      handleClickCallback();
    }
  };

  const renderDot = (_: number, index: number) => {
    const active = index === activeIndicator;
    const _style = active
      ? {
          backgroundColor: indicatorColor,
        }
      : undefined;
    return (
      <i
        style={_style}
        key={uid()}
        className={classNames(componentName, 'indicator', { active })}
      />
    );
  };

  const renderIndicator = () => {
    if (showIndicators && count > 1) {
      return (
        <div className={classNames(componentName, 'indicators')}>
          {Array(count).fill('').map(renderDot)}
        </div>
      );
    }
  };

  useEffect(() => {
    if (root.current?.offsetWidth) {
      setWrapperWidth(root.current.offsetWidth);
    }
  }, [root.current?.offsetWidth]);

  const renderSwipeItems = () =>
    React.Children.map(children, child => {
      const childElement = child as React.FunctionComponentElement<SwipeItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'SwipeItem') {
        return React.cloneElement(childElement, {
          width: wrapperWidth,
        });
      }
    });

  useEffect(() => {
    initialize(+initialSwipe);
  }, [initialize, size, root.current?.offsetWidth, initialSwipe]);

  useEffect(() => {
    if (onChange && isFunction(onChange)) {
      onChange(activeIndicator);
    }
  }, [onChange, activeIndicator]);

  return (
    <div ref={root} className={classes} style={style}>
      <div
        style={trackStyle}
        className={classNames(componentName, 'track')}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {renderSwipeItems()}
      </div>
      {renderIndicator()}
    </div>
  );
};

Swipe.defaultProps = {
  duration: 500,
  initialSwipe: 0,
  width: 'auto',
  height: 'auto',
  showIndicators: true,
  touchable: true,
  stopPropagation: true,
  indicatorColor: '#1989fa',
};

export default Swipe;
