
import React from 'react';
import { ImagePreview, Button } from 'vocano-ui';

export default () => {
  const handleClick = () => {
    ImagePreview({
      images: ['https://img01.yzcdn.cn/vant/apple-4.jpg', 'https://img01.yzcdn.cn/vant/apple-2.jpg'],
      startPosition: 1,
    });
  }

  return (
    <Button onClick={handleClick}>预览图片</Button>
  )
};
