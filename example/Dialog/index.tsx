import React, { useState } from 'react';
import { Button, Dialog, Toast} from 'vocano-ui';


// 默认
function DefaultDallog() {
  const [visible, setVisible] = useState(false)
  const handleShow = () => setVisible(true)
  const hanldeCancel = () => setVisible(false)
  
  return (
    <div>
      <Dialog
        visible={visible}
        onCancel={hanldeCancel}>
        hello world
      </Dialog>
      <Button onClick={handleShow}>
        默认
      </Button>
    </div>
  )
}

// 自定义头部 和 头部关闭按钮
function HeaderDallog() {
  const [visible, setVisible] = useState(false)
  const handleShow = () => setVisible(true)
  const hanldeCancel = () => setVisible(false)
  const headerRender = () => {
    return <div className="my-header">
      header 
      <Button size="sm" btnType="primary"  onClick={hanldeCancel}>
        关闭弹框
      </Button>
    </div>
  }
  return (
    <div>
      <Dialog
        visible={visible}
        onCancel={hanldeCancel}
        header={headerRender}
      >
        主题内容
      </Dialog>
      <Button onClick={handleShow}>
        自定义头部 和 头部关闭按钮
      </Button>
    </div>
  )
}


export default () => {
  const handleToast = () => {
    Toast('21231',123)
  }

  return (
    <div>
      <DefaultDallog />
      <HeaderDallog />

      <Button onClick={handleToast}>
        自定义头部 和 头部关闭按钮
      </Button>
    </div>
  );
};
