
import React from 'react';
import { Sudoku } from 'vocano-ui';

// const pic = 'https://i1.go2yd.com/image.php?url=0XBLlpdAsV';
const pic = [
    'http://i1.go2yd.com/image.php?url=0XUiaYFeN&type=jpeg_600x400', 
    'http://i1.go2yd.com/image.php?url=0XUiaYFeeN&type=jpeg_400x600',
   ]
const waterMark = 'https://si1.go2yd.com/get-image/0tPBfE2Pei5';

const fillImage = (number, direction?: any) => {
  const arr = direction === 0  ? Array(number).fill(pic[0]) : Array(number).fill(pic[1]) 
  return arr;
}

export default () => (
    <div>
        <Sudoku errImage='http://si1.go2yd.com/get-image/0ppkJ3xv2bh' ratio={1.5} images={[pic[0]]} waterMark={waterMark}/>
        <Sudoku errImage='http://si1.go2yd.com/get-image/0ppkJ3xv2bh' ratio={1} images={[pic[1]]} waterMark={waterMark}/>
        <Sudoku ratio={0.75} images={[pic[1]]} waterMark={waterMark} />
        <Sudoku images='2' waterMark={waterMark}/>
        <Sudoku images={fillImage(3)}  imageClick={(iamges,index) => console.log(iamges,index)}  waterMark={waterMark} />
        <Sudoku images={4} waterMark={waterMark}/>
        <Sudoku images={fillImage(5)} waterMark={waterMark}/>
        <div style={{padding: '20px'}}>
            <Sudoku images={fillImage(6)} waterMark={waterMark}/>
        </div>
        <Sudoku images={fillImage(7, 0)} waterMark={waterMark}/>
        <Sudoku images={fillImage(8, 1)} waterMark={waterMark}/>
        <Sudoku images={fillImage(9, 0)} waterMark={waterMark}/>
        <Sudoku images={fillImage(11, 1)} waterMark={waterMark}/>
        <Sudoku images={fillImage(16, 0)} waterMark={waterMark}/>
        <Sudoku images={fillImage(13, 1)} showAll waterMark={waterMark}/>

    </div>
  );
