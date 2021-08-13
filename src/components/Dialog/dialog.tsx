import Popup from '../Popup'
import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { classNames, isFunction } from '../../utils'
import Icon from '../Icon'

import { DialogProps, DialogWrapperProps, DialogContentProps } from './index.d'

const componentName = 'dialog'

const DialogContent: FC<DialogContentProps> = ({
  visible,
  onCancel,
  header,
  content,
  footer
}) => {
  const VNodes = {
    header: () => {
      if (header === null) return null
      const classes = classNames(componentName, 'header')
      if (isFunction(header)) {
        return header()
      }
      if (React.isValidElement(header)) {
        return <div className={classes}> {header} </div>
      }

      // defaultHeader
      return <div className={classes}>
        <div
          onClick={onCancel}
          className={classNames(componentName, 'cancel-btn')}
        >
          <Icon
            icon='times'
            className={classNames(componentName, 'cancel-icon')}
          />
        </div>
      </div>
    },
    content: () => {
      if (content === null) return null
      const classes = classNames(componentName, 'content')
      return <div className={classes}>
        {content}
      </div>
    },
    footer: () => {
      if (footer === null) return null
      const classes = classNames(componentName, 'footer')
      return <div className={classes}></div>
    }
  }

  const children = Object.keys(VNodes).map(key => VNodes[key]())
  const classes = classNames(componentName)

  return <div className={classes}> {children} </div>
}



const Dialog: FC<DialogProps> = ({
  className,

  visible,

  header,
  children, //内容
  footer,

  onCancel
  // onOK,
  // okText
}) => {
  return (
    <Popup
      animation={componentName}
      visible={visible}
    >
      <DialogContent
        visible={visible}
        onCancel={onCancel}
        className={className}
        header={header}
        content={children}
        footer={footer}
      />
    </Popup>
  )
}


Dialog.defaultProps = {
  visible: false,
}


export default Dialog;
