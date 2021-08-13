import React, { useState } from 'react';
import {Toast, Button} from 'vocano-ui';



export default () => {

  const handleToast = () => {
    Toast('21231',2000)
  }

  return (
    <div>
     
      <Button onClick={handleToast}>
        自定义头部 和 头部关闭按钮
      </Button>
    </div>
  );
};
