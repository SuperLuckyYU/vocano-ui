import React, { FC, CSSProperties, useState } from 'react';
import { classNames } from '../../utils';

type Size = string | number | undefined;
type TextClickFn = (url: string | undefined) => void;
export interface TextWrapperProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 文本内容 */
  content?: string;
  /** 字体大小 */
  fontSize?: Size;
  /** 行高 */
  lineHeight?: Size;
  /** 显示行数 */
  row?: number | string;
  /** 显示更多button */
  showMoreBtn: boolean | string;
  /** 信息的url或者docid */
  url: string;
  /** 文本的点击事件 */
  textClick?: TextClickFn;
}

const componentName = 'text-wrapper';

const TextWrapper: FC<TextWrapperProps> = props => {
  const {
    className,
    style,
    content,
    fontSize,
    lineHeight,
    row,
    showMoreBtn,
    url,
    textClick,
    ...restProps
  } = props;
  const [showMoreButton, setShowMoreButton] = useState(showMoreBtn);
  const initStyle = {
    fontSize,
    lineHeight,
    WebkitLineClamp: showMoreButton === 'hide' ? 'initial' : row,
  };

  const showAllEvent = () => {
    setShowMoreButton('hide');
  };

  const textClickEVent: TextClickFn = docid => {
    (textClick as TextClickFn)(docid);
  };

  const classes = classNames(componentName, componentName, {
    customClassName: className,
  });

  return (
    <div
      className={classes}
      {...restProps}
      style={{ ...initStyle, ...(style as any) }}
      onClick={() => {
        textClickEVent(url);
      }}
    >
      {content}
      {showMoreButton && showMoreButton !== 'hide' && row && (
        <div className={classNames(componentName, 'more')} onClick={showAllEvent}>
          <span>...</span> 全文
        </div>
      )}
    </div>
  );
};

TextWrapper.defaultProps = {
  content: '',
  showMoreBtn: false,
  textClick: () => {},
};

export default TextWrapper;
