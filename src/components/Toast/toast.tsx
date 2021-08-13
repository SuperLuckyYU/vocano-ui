import React, { FC, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Popup from '../Popup'
import { classNames, isFunction } from '../../utils'

const componentName = 'toast'

export interface ToastProps {
  /** 内容 */
  content: string,
  /** 显示时间 */
  duration?: number,
  onClose?():void 
}

const Toast: FC<ToastProps> = ({
  content,
  duration,
  onClose
}) => {
  const classes = classNames(componentName)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
      if(onClose && isFunction(onClose)) {
        onClose()
      }
    }, duration)
  }, [visible])

  const renderContent = () => {
    if (content && isFunction(content)) return content()
    return content
  }

  return (
    <Popup animation={componentName} visible={visible} mask={false}>
      <div className={classes}>
        {renderContent()}
      </div>
    </Popup>
  )
}

export default function toast(
  content: string,
  duration: number,
  onClose?:() => void
) {
  const toast = document.createElement('div')
  document.body.appendChild(toast)
  const handleClose = () => {
    toast.remove()
    if (onClose && isFunction(onClose)) {
      onClose()
    }
  }
  ReactDOM.render(
    <Toast
      duration={duration}
      content={content}
      onClose={handleClose}
    />, 
  toast)
}