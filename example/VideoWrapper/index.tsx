
import React from 'react';
import { VideoWrapper } from 'vocano-ui';

export default () => (
    <div>
        <VideoWrapper videoClick={(url)=>{console.log(url)}} url='play.mp4' poster='https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_600x800' width='600' height='800' time='03:20'/>
        <VideoWrapper poster='https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_300x400' width='600px' height='800px' time={23802}/>
        <VideoWrapper poster='https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_600x360' width={600} height={400} time='9808'/>
    </div>
  );
