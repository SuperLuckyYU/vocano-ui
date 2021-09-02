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
import { classNames, preventDefault, clamp } from '../../utils';
import { SwipeProps, SwipeState } from './index.d';
import { SwipeItemProps } from './swipeItem';
import useTouch from '../../hooks/useTouch';

const componentName = 'swipe';

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
    initialSwipe,
    width,
    height,
    showIndicators,
    touchable,
    stopPropagation,
    indicatorColor,
    className,
    style,
    children,
  } = props;

  const classes = classNames(componentName, '', {
    customClassName: className,
  });

  const [wrapperWidth, setWrapperWidth] = useState(0);

  const root = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<SwipeState>({
    rect: null,
    width: 0,
    height: 0,
    offset: 0,
    active: 0,
    swiping: false,
  });

  const touch = useTouch();

  const count = useMemo(() => React.Children.count(children), [children]);

  const size = useMemo(() => state.width, [state.width]);

  const delta = useMemo(() => touch.deltaX, [touch.deltaX]);

  const minOffset = useMemo(() => {
    if (state.rect) return state.rect.width - size * count;
    return 0;
  }, [state.rect, size, count]);

  const maxCount = useMemo(() => Math.ceil(Math.abs(minOffset) / size), [minOffset, size]);

  const trackSize = useMemo(() => count * size, [count, size]);

  const activeIndicator = useMemo(() => (state.active + count) % count, [state.active, count]);

  const isCorrectDirection = useMemo(() => touch.direction === 'horizontal', [touch.direction]);

  const trackStyle = useMemo(() => {
    const _style: CSSProperties = {
      transitionDuration: `${state.swiping ? 0 : duration}ms`,
      transform: `translateX(${state.offset}px)`,
    };

    if (size) {
      _style.width = `${trackSize}px`;
      _style.height = height ? `${height}px` : '';
    }

    return _style;
  }, [state.swiping, duration, state.offset, size, trackSize, height]);

  const getTargetActive = (pace: number) => {
    const { active } = state;

    if (pace) {
      return clamp(active + pace, 0, maxCount);
    }
    return active;
  };

  const getTargetOffset = useCallback(
    (targetActive: number, offset = 0) => {
      let currentPosition = targetActive * size;
      currentPosition = Math.min(currentPosition, -minOffset);

      let targetOffset = offset - currentPosition;
      targetOffset = clamp(targetOffset, minOffset, 0);

      return targetOffset;
    },
    [minOffset, size],
  );

  const move = ({
    pace = 0,
    offset = 0,
    emitChange,
  }: {
    pace?: number;
    offset?: number;
    emitChange?: boolean;
  }) => {
    if (count <= 1) {
      return;
    }

    const { active } = state;
    const targetActive = getTargetActive(pace);
    const targetOffset = getTargetOffset(targetActive, offset);

    setState({
      ...state,
      active: targetActive,
      offset: targetOffset,
    });

    if (emitChange && targetActive !== active) {
      // change Event
    }
  };

  const correctPosition = () => {
    setState({
      ...state,
      swiping: true,
    });
    if (state.active <= -1) {
      move({ pace: count });
    } else if (state.active >= count) {
      move({ pace: -count });
    }
  };

  // swipe to prev item
  // const prev = () => {
  //   correctPosition();
  //   touch.reset();

  //   doubleRaf(() => {
  //     state.swiping = false;
  //     move({
  //       pace: -1,
  //       emitChange: true,
  //     });
  //   });
  // };

  // swipe to next item
  // const next = () => {
  //   correctPosition();
  //   touch.reset();

  //   doubleRaf(() => {
  //     state.swiping = false;
  //     move({
  //       pace: 1,
  //       emitChange: true,
  //     });
  //   });
  // };

  // initialize swipe position
  const initialize = (active = +initialSwipe) => {
    if (!root.current) {
      return;
    }
    const rect = {
      width: root.current.offsetWidth,
      height: root.current.offsetHeight,
    };
    state.rect = rect;
    state.width = +(width && width !== 'auto' ? width : rect.width);
    state.height = +(height && height !== 'auto' ? height : rect.height);

    if (count) {
      active = Math.min(count - 1, active);
    }

    setState({
      ...state,
      rect,
      width: +(width && width !== 'auto' ? width : rect.width),
      height: +(height && height !== 'auto' ? height : rect.height),
      active,
      swiping: true,
      offset: getTargetOffset(active),
    });
  };

  let touchStartTime: number;
  const onTouchStart = (event: TouchEvent) => {
    if (!touchable) return;
    touch.start(event);
    touchStartTime = Date.now();

    correctPosition();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (touchable && state.swiping) {
      touch.move(event);

      if (isCorrectDirection) {
        preventDefault(event, stopPropagation);
        move({ offset: delta });
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchable || !state.swiping) {
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

    setState({
      ...state,
      swiping: false,
    });
  };

  const renderDot = (_: number, index: number) => {
    const active = index === activeIndicator;
    const _style = active
      ? {
          backgroundColor: indicatorColor,
        }
      : undefined;

    return <i style={_style} className={classNames(componentName, 'indicator', { active })} />;
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
  }, []);

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
