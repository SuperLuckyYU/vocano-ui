
import React from 'react';
import { ImagePreview, Button } from 'vocano-ui';

export default () => {
  const handleClick = () => {
    const instance = new ImagePreview({
      images: ['https://si1.go2yd.com/get-image/0tZEF9pNZz2', 'https://si1.go2yd.com/get-image/0tZEIWwvJui'],
      startPosition: 1,
    });
    instance.show();
  }

  return (
    <Button onClick={handleClick}>预览图片</Button>
  )
};
