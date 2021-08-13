import React from 'react';
import {Toast, Button} from 'vocano-ui';

export default () => {
  const handleToast = () => {
    Toast('hello world',2000, () => {
      alert('close')
    })
  }

  return (
    <div>
      <Button onClick={handleToast}>
        自定义头部 和 头部关闭按钮
      </Button>
    </div>
  );
};
