import React, { FC, CSSProperties } from 'react';
import { classNames, uid, getNumber, imgLoad } from '../../utils';

type ImageFn = (images: string[], index: number) => void;
export interface SudokuProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 图片数量或图片数组 */
  images?: string | number | string[];
  /** 九宫格图片水印 */
  waterMark?: string;
  /** 是否全部展示 */
  showAll?: boolean;
  /** 单图时的显示方向 */
  ratio?: number;
  /** 图片加载失败的占位图 */
  errImage?: string;
  /** 图片的点击事件 */
  imageClick?: ImageFn;
}
type IimageClickProps = (iamges: string[], index: number) => void;

const componentName = 'sudoku';

const showRatio = (ratio: number) => {
  if (!ratio) return '';
  if (ratio > 1) return 'horizontal';
  if (ratio < 1) return 'vertical';
  return 'square';
};

/**
 * 数独，用于九宫格布局
 * ### 引用方法
 *
 * ~~~js
 * import { Sudoku } from 'vocano-ui'
 * ~~~
 */
const Sudoku: FC<SudokuProps> = props => {
  const { className, images, waterMark, showAll, ratio, imageClick, errImage, ...restProps } =
    props;
  const getImagesNum = (imagesValue: number | string | string[]) => {
    if (Array.isArray(imagesValue)) {
      return imagesValue.length;
    }
    if (typeof imagesValue === 'string') {
      return getNumber(imagesValue);
    }
    return imagesValue;
  };

  const classes = classNames(
    componentName,
    `images-wrapper-${getImagesNum(images as string[])}`,
    `images-wrapper-${showRatio(ratio as number)}`,
    {
      'images-wrapper': true,
      'images-four': getImagesNum(images as string[]) === 4,
      'image-one': getImagesNum(images as string[]) === 1,
      customClassName: className,
    },
  );

  const imageItemClick: IimageClickProps = (album, index) => {
    (imageClick as ImageFn)(album, index);
  };

  const imageLoadErr = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).onerror = null;
    (e.target as HTMLImageElement).src = errImage || '';
  };

  const imageDisplay = (imagesAll: string[], item: any, index: number) => {
    if (imagesAll.length > 9 && index === 8 && !showAll) {
      return (
        <div className={classNames(componentName, 'image-item-more')}>
          <div className={classNames(componentName, 'image-item-more-mask')} />
          <div className={classNames(componentName, 'image-item-more-number')}>
            +{imagesAll.length - 9}
          </div>
          <img
            className={classNames(componentName, 'image-item')}
            alt={item}
            src={item}
            onError={e => {
              imageLoadErr(e);
            }}
            onLoad={e => {
              imgLoad(e, item);
            }}
          />
        </div>
      );
    }
    return (
      <img
        className={classNames(componentName, 'image-item')}
        onError={e => {
          imageLoadErr(e);
        }}
        onLoad={e => {
          imgLoad(e, item);
        }}
        alt={item}
        src={item}
      />
    );
  };

  const bottomRightCornerBorderRedius = (imageArr: string[], index: number) => {
    if ((index + 1) % 3 === 0 && imageArr.length - (index + 1) < 3) {
      return 'image-border-radius';
    }
    return '';
  };

  const renderImages = () => {
    if (!images) return null;
    const imagesFormat = Array.isArray(images)
      ? images
      : Array(typeof images === 'string' ? parseInt(images, 10) : images).fill('');
    const imagesShowArr =
      !showAll && imagesFormat.length > 9 ? imagesFormat.slice(0, 9) : imagesFormat;
    const imageList = imagesShowArr.map((item: string, index: number) => (
      <div
        key={uid()}
        className={classNames(
          componentName,
          'image-outer',
          bottomRightCornerBorderRedius(imagesShowArr, index),
        )}
        onClick={() => {
          imageItemClick(imagesShowArr, index);
        }}
      >
        <div className={classNames(componentName, 'image')}>
          {item
            ? imageDisplay(imagesFormat, item, index)
            : waterMark && (
                <img
                  className={classNames(componentName, 'image-watermark')}
                  alt={waterMark}
                  src={waterMark}
                />
              )}
        </div>
      </div>
    ));

    return (
      <div className={classes} {...restProps}>
        {imageList}
      </div>
    );
  };
  return <>{renderImages()}</>;
};

Sudoku.defaultProps = {
  images: 0,
  waterMark: '',
  showAll: false,
  imageClick: () => {},
  errImage: 'https://si1.go2yd.com/get-image/0u1NvMxgZkf',
};

export default Sudoku;
