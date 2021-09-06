import React, { FC, CSSProperties, useState, useRef, useEffect } from 'react';
import { classNames, getNumber } from '../../utils';

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
  url?: string;
  /** 是否加粗 */
  bold?: boolean | number;
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
    bold,
    textClick,
    ...restProps
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showMoreButton, setShowMoreButton] = useState(showMoreBtn);

  const isShowMoreButton = (width: number) => {
    const TextTotalWidth = (content as string).length * getNumber((fontSize as any) || 16);
    if (TextTotalWidth < width * parseInt(row as string, 10)) {
      return 'hide';
    }
    return showMoreBtn;
  };

  const boldValue = typeof bold === 'number' ? bold : 'bold';
  const initStyle = {
    fontWeight: bold ? boldValue : 400,
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

  useEffect(() => {
    if (wrapperRef.current) {
      const { width } = wrapperRef.current.getBoundingClientRect();
      setShowMoreButton(isShowMoreButton(width));
    }
  }, []);
  return (
    <div
      ref={wrapperRef}
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
  bold: 400,
  row: 3,
  fontSize: 16,
};

export default TextWrapper;
