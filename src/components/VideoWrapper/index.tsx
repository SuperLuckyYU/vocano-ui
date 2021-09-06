import React, { FC, CSSProperties } from 'react';
import { classNames, formatTimestamp, getNumber } from '../../utils';

type Size = string | number | undefined;
type GetDirection = (width: Size, height: Size) => number;
type VideoClickFn = (url: string | undefined) => void;
type FormatTime = (time: string | number) => string;
export interface VideoWrapperProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 视频的宽度 */
  width?: Size;
  /** 视频的高度 */
  height?: Size;
  /** 视频的时间 */
  time?: Size;
  /** 视频的poster预览图 */
  poster?: string;
  /** 视频或者doc地址 */
  url?: string;
  /** 视频的点击事件 */
  videoClick?: VideoClickFn;
}

const componentName = 'video-wrapper';

const VideoWrapper: FC<VideoWrapperProps> = props => {
  const { className, width, height, time, poster, url, videoClick, ...restProps } = props;
  const getDirection: GetDirection = (picWidth, picHeight) => {
    const widthFormat = typeof picWidth === 'string' ? getNumber(picWidth) : width;
    const heightFormat = typeof picHeight === 'string' ? getNumber(picHeight) : width;
    return (widthFormat as number) / (heightFormat as number);
  };

  const formatTime: FormatTime = videoTime => {
    const reg = /:/gi;
    let result = '';
    if (typeof videoTime === 'string') {
      if (reg.test(videoTime)) {
        result = videoTime;
      } else {
        result = formatTimestamp(getNumber(videoTime));
      }
    } else {
      result = formatTimestamp(videoTime);
    }
    return result;
  };

  const classes = classNames(componentName, 'video-wrapper', {
    horizontal: getDirection(width, height) >= 1,
    vertical: getDirection(width, height) < 1,
    customClassName: className,
  });

  const videoClickEvent: VideoClickFn = videoURL => {
    (videoClick as VideoClickFn)(videoURL);
  };

  const style = {
    backgroundImage: `url(${poster})`,
  };

  return (
    <div
      className={classes}
      {...restProps}
      style={style}
      onClick={() => {
        videoClickEvent(url);
      }}
    >
      <img
        className={classNames(componentName, 'play-button')}
        alt="play button"
        src="https://si1.go2yd.com/get-image/0tSYIf996Zt"
      />
      <span className={classNames(componentName, 'time')}>{formatTime(time as string)}</span>
    </div>
  );
};

VideoWrapper.defaultProps = {
  width: 360,
  height: 360,
  poster: '',
  time: '00:00',
  url: '',
  videoClick: () => {},
};

export default VideoWrapper;
