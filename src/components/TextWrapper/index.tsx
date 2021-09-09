import React, { FC, useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import { Property } from 'csstype';
import { classNames, getNumber, pxToVw } from '../../utils';

type TextClickFn = (url?: string) => void;
type unitType = 'vw' | 'px';
export interface TextWrapperProps {
  /** 自定义类名 */
  className?: string;
  /** 文本内容 */
  content: string;
  /** 字体大小 */
  fontSize?: string | number;
  /** 显示行数 */
  row?: number | string;
  /** 显示更多button */
  showMoreBtn: boolean | string;
  /** 信息的url或者docid */
  url?: string;
  /** 是否加粗 */
  bold?: boolean | number;
  /** 单位类型 */
  unit?: unitType;
  /** 文本的点击事件 */
  textClick?: TextClickFn;
}

const componentName = 'text-wrapper';
const fontTimes = 1.625;
const TextWrapper: FC<TextWrapperProps> = props => {
  const {
    className,
    content,
    fontSize,
    row = 3,
    showMoreBtn,
    url,
    bold,
    unit,
    textClick,
    ...restProps
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showMoreButton, setShowMoreButton] = useState(showMoreBtn);

  const boldValue = typeof bold === 'number' ? bold : 'bold';

  const _fontSize = typeof fontSize === 'number' ? fontSize : getNumber(fontSize as string);
  const computedfontSize = unit === 'px' ? fontSize : `${pxToVw(_fontSize)}vw`;

  const computedHeight =
    unit === 'px' ? `${_fontSize * fontTimes}px` : `${pxToVw(_fontSize * fontTimes)}vw`;
  const computedLineHeight = _fontSize > 20 ? computedHeight : 'initial';

  const initStyle: CSSProperties = {
    fontWeight: boldValue,
    fontSize: computedfontSize,
    lineHeight: computedLineHeight,
    WebkitLineClamp: (showMoreButton === 'hide' ? 'initial' : row) as Property.WebkitLineClamp,
  };

  const showMoreBtnStyle = {
    fontSize: computedfontSize,
    height: computedHeight,
  };

  const isShowMoreButton = useCallback(
    (width: number) => {
      let totalSize = 0;
      if (unit === 'px') {
        totalSize = content.length * _fontSize;
        if (totalSize < width * parseInt(row as string, 10)) {
          return 'hide';
        }
      }

      if (unit === 'vw') {
        totalSize = content.length * pxToVw(_fontSize);
        if (totalSize < pxToVw(width) * parseInt(row as string, 10)) {
          return 'hide';
        }
      }

      return showMoreBtn;
    },
    [_fontSize, content.length, row, showMoreBtn, unit],
  );

  const showAllEvent = () => {
    setShowMoreButton('hide');
  };

  const textClickEVent: TextClickFn = docid => {
    (textClick as TextClickFn)(docid);
  };

  const classes = classNames(componentName, '', {
    customClassName: className,
  });

  useEffect(() => {
    if (wrapperRef.current) {
      const { width } = wrapperRef.current.getBoundingClientRect();
      setShowMoreButton(isShowMoreButton(width));
    }
  }, [isShowMoreButton]);

  return (
    <div
      ref={wrapperRef}
      className={classes}
      {...restProps}
      style={{ ...initStyle }}
      onClick={() => {
        textClickEVent(url);
      }}
    >
      {content}
      {showMoreButton && showMoreButton !== 'hide' && row && (
        <div
          style={showMoreBtnStyle}
          className={classNames(componentName, 'more')}
          onClick={showAllEvent}
        >
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
  unit: 'px',
};

export default TextWrapper;
