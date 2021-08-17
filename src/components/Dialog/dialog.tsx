import React, { ReactNode, FC } from 'react';
import Popup from '../Popup';
import { classNames, isFunction } from '../../utils';
import Icon from '../Icon';

import { DialogProps, DialogContentProps } from './index.d';

const componentName = 'dialog';

const DialogContent: FC<DialogContentProps> = ({ onCancel, header, content, footer }) => {
  const VNodes = {
    header: () => {
      if (header === null) return null;
      if (isFunction(header)) {
        return (header as () => ReactNode)();
      }
      if (header) {
        return header;
      }
      // defaultHeader
      return (
        <>
          <div onClick={onCancel} className={classNames(componentName, 'cancel-btn')}>
            <Icon icon="times" className={classNames(componentName, 'cancel-icon')} />
          </div>
        </>
      );
    },
    content: () => {
      if (content === null) return null;
      return content;
    },
    footer: () => {
      if (footer === null) return null;
      return footer;
    },
  };

  const children = Object.keys(VNodes).map(k => {
    const classes = classNames(componentName, k);
    return (
      <div key={k} className={classes}>
        {VNodes[k as keyof typeof VNodes]()}
      </div>
    );
  });
  const classes = classNames(componentName);

  return <div className={classes}> {children} </div>;
};

const Dialog: FC<DialogProps> = ({
  className,

  visible,

  header,
  children,
  footer,

  onCancel,
  // onOK,
  // okText
}) => (
  <Popup animation={componentName} visible={visible}>
    <DialogContent
      visible={visible}
      onCancel={onCancel}
      className={className}
      header={header}
      content={children}
      footer={footer}
    />
  </Popup>
);

Dialog.defaultProps = {
  visible: false,
  onCancel: () => {},
};

export default Dialog;
