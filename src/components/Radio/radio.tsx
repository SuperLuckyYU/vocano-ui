import React, { FC, CSSProperties } from 'react';
import classNames from 'classnames';

export interface RadioProps {
  /** 根据 value 进行比较，判断是否选中 */
  value?: any;
  /** 初始是否选中 */
  defaultChecked?: boolean;
  /** 单选框是否选中 */
  checked?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * 为网站提供的单选按钮。
 * ~~~js
 * import { Radio } from 'vocano-ui'
 * ~~~
 */
const Radio: FC<RadioProps> = props => {
  const { defaultChecked, checked, className, style, children } = props;

  const classes = classNames('circle', className, {
    active: defaultChecked || checked,
  });

  return (
    <div className="vo-radio-wrap" style={style}>
      <div className="left">
        <div className={classes}>
          <div className="fork" />
        </div>
        <div className="label">{children}</div>
      </div>
    </div>
  );
};

Radio.defaultProps = {
  defaultChecked: false,
  checked: false,
};

Radio.displayName = 'Radio';

export default Radio;
