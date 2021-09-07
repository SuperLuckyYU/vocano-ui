import React, { FC, CSSProperties } from 'react';
import { classNames, uid, getNumber } from '../../utils';

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
  /** 图片的点击事件 */
  imageClick?: ImageFn;
}
type IimageClickProps = (iamges: string[], index: number) => void;

const componentName = 'sudoku';

/**
 * 数独，用于九宫格布局
 * ### 引用方法
 *
 * ~~~js
 * import { Sudoku } from 'vocano-ui'
 * ~~~
 */
const Sudoku: FC<SudokuProps> = props => {
  const { className, images, waterMark, imageClick, ...restProps } = props;
  const getImagesNum = (imagesValue: number | string | string[]) => {
    if (Array.isArray(imagesValue)) {
      return imagesValue.length;
    }
    if (typeof imagesValue === 'string') {
      return getNumber(imagesValue);
    }
    return imagesValue;
  };

  const classes = classNames(componentName, `images-wrapper-${getImagesNum(images as any)}`, {
    'images-wrapper': true,
    'images-four': getImagesNum(images as any) === 4,
    'image-one': getImagesNum(images as any) === 1,
    customClassName: className,
  });

  const imageItemClick: IimageClickProps = (album, index) => {
    (imageClick as ImageFn)(album, index);
  };

  const renderImages = () => {
    if (!images) return null;
    const imagesFormat = Array.isArray(images)
      ? images
      : Array(typeof images === 'string' ? parseInt(images, 10) : images).fill('');
    const imageList = imagesFormat.map((item: string, index: number) => (
      <div
        key={uid()}
        className={classNames(componentName, 'image-outer')}
        onClick={() => {
          imageItemClick(imagesFormat, index);
        }}
      >
        <div className={classNames(componentName, 'image')}>
          {item ? (
            <img className={classNames(componentName, 'image-item')} alt={item} src={item} />
          ) : (
            waterMark && (
              <img
                className={classNames(componentName, 'image-watermark')}
                alt={waterMark}
                src={waterMark}
              />
            )
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
  imageClick: () => {},
};

export default Sudoku;
