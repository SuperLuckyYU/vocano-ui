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
        默认
      </Button>
    </div>
  );
};
