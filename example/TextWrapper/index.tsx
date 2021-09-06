
import React from 'react';
import { TextWrapper, VideoWrapper, Sudoku } from 'vocano-ui';

export default () => (
    <div style={{padding:'15px'}}>
        <TextWrapper textClick={(docid)=>{console.log('docid:', docid)}} url={'abcdefg'} showMoreBtn={true} row={1}  content='上朗上朗月高悬，地上花高悬，地上花灯万盏' />
        <VideoWrapper videoClick={(url)=>{console.log(url)}} url='play.mp4' poster='https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_600x800' width='600' height='800' time='03:20'/>
        <TextWrapper showMoreBtn={true} row={4}  content='天上朗月高悬，地上花灯万盏,天上朗月高悬,地上花灯万盏,天上朗月高悬,地上花灯万盏,天上朗地上花灯万盏,天上朗月高悬地上花灯万盏,天上朗月高悬月高悬地上花灯万盏,天上朗月高悬,地上花灯万盏,天上朗月高悬地上花灯万盏,天上朗月高悬，地上花灯万盏' />
        <VideoWrapper videoClick={(url)=>{console.log(url)}} url='play.mp4' poster='https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_600x800' width='600' height='800' time='03:20'/>
        <TextWrapper url={'docid'} showMoreBtn={true} row={4} content='天上朗月高悬，地上花灯万盏，元宵佳节各式花灯绚丽多彩，明亮璀璨宛若火树银花不夜天。一起来看看故宫的宫廷夜景。天上朗月高悬，地上花灯万盏，元宵佳节各式花灯绚丽多彩，明亮璀璨宛若火树银，天网约车驾驶月份网约'/>
        <Sudoku imageClick={(iamges,index) => console.log(iamges,index)} images={['https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_360x360', 'https://i1.go2yd.com/image.php?url=0X604KAvRU&type=jpeg_360x360', 'https://i1.go2yd.com/image.php?url=0XBLlp2Buz&type=jpeg_360x360']} waterMark={'https://si1.go2yd.com/get-image/0tPBfE2Pei5'} />
        <TextWrapper  row={3} content='天上朗月高悬，地上花灯万盏，元宵佳节各式花灯绚丽多彩，明亮璀璨宛若火树银花不夜天。一起来看看故宫的宫廷夜景。天上朗月高悬，地上花灯万盏，元宵佳节各式花灯绚丽多彩，明亮璀璨宛若火树银，天网约车驾驶月份网约车' />

    </div>
  );
