import React, { FC, CSSProperties } from 'react';
import { classNames, uid } from '../../utils';

export interface SkeletonProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 图片数量或图片数组 */
  images?: string | number | any[];
  /** 九宫格图片水印 */
  waterMark?: string;
}

const componentName = 'sudoku';

const Sudoku: FC<SkeletonProps> = props => {
  const { className, images, waterMark, ...restProps } = props;
  const classes = classNames(componentName, {
    'images-wrapper': true,
    'images-four': images === 4,
    'image-one': images === 1,
    customClassName: className,
  });
  const renderImages = () => {
    if (!images) return null;
    const imageList = Array(images)
      .fill('')
      .map(() => (
        <div key={uid()} className={classNames(componentName, 'image-outer')}>
          <div className={classNames(componentName, 'image')}>
            {waterMark && <img alt={waterMark} src={waterMark} />}
          </div>
        </div>
      ));

    return (
      <div className={classes} {...restProps}>
        {imageList}
        <div className={classNames(componentName, 'image-placeholder')} />
      </div>
    );
  };

  return <>{renderImages()}</>;
};

Sudoku.defaultProps = {
  images: 0,
  waterMark: '',
};

export default Sudoku;
