import React, { FC, CSSProperties } from 'react';
import Sudoku from '../Sudoku';

import { classNames, uid } from '../../utils';

export interface SkeletonProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 段落占位图行数 */
  row?: number | string;
  /** 段落占位图宽度段可传数组来设置每一行的宽度 */
  rowWidth?: number | string | (number | string)[];
  /** 是否显示标题占位图 */
  title?: boolean;
  /** 图片占位图个数 */
  image?: number | string;
  /** 图片水印 */
  waterMark?: string;
  /** 是否显示骨架屏，传 false 时会展示子组件内容 */
  loading?: boolean;
  children?: React.ReactNode;
}

const componentName = 'skeleton';
const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_LAST_ROW_WIDTH = '60%';

/**
 * 用于在内容加载过程中展示一组占位图形
 * ### 引用方法
 *
 * ~~~js
 * import { Skeleton } from 'vocano-ui'
 * ~~~
 */
const Skeleton: FC<SkeletonProps> = props => {
  const { className, row, rowWidth, title, image, loading, waterMark, children, ...restProps } =
    props;

  const classes = classNames('skeleton', 'wrapper', {
    customClassName: className,
  });

  const getrowwidth = (index: number) => {
    if (rowWidth === DEFAULT_ROW_WIDTH && index === +(Number(row) - 1)) {
      return DEFAULT_LAST_ROW_WIDTH;
    }

    if (Array.isArray(rowWidth)) {
      return rowWidth[index];
    }

    return rowWidth;
  };

  const renderRows = () =>
    Array(row)
      .fill('')
      .map((_, i) => (
        <div
          key={uid()}
          className={classNames(componentName, 'row')}
          style={{ width: getrowwidth(i) }}
        />
      ));

  const renderTitle = () => {
    if (title) {
      return <div className={classNames(componentName, 'title')} />;
    }
  };

  // const renderImages = () =>
  //   Array(image)
  //     .fill('')
  //     .map(() => <div key={uid()} className={classNames(componentName, 'image')} />);

  // const renderSkeleton = () => {
  //   if (!loading) {
  //     return children;
  //   }
  //   return (
  //     <div className={classes} {...restProps}>
  //       {renderTitle()}
  //       {renderRows()}
  //       {image && <div className={classNames(componentName, 'images-wrapper')}>{renderImages()}</div>}
  //     </div>
  //   )
  // }

  return (
    <>
      {loading ? (
        <div className={classes} {...restProps}>
          {renderTitle()}
          {renderRows()}
          {image && (
            <Sudoku images={image} waterMark={waterMark} />
            /* <div className={classNames(componentName, 'images-wrapper')}>{renderImages()}</div> */
          )}
        </div>
      ) : (
        children
      )}
    </>
  );
};

Skeleton.defaultProps = {
  row: 0,
  image: 0,
  rowWidth: '100%',
  title: false,
  loading: true,
  waterMark: '',
};

export default Skeleton;
