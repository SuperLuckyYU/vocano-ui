
import React from 'react';
import { Sudoku } from 'vocano-ui';

const pic = 'https://i1.go2yd.com/image.php?url=0XBLlpdAsV&type=jpeg_360x360';
const waterMark = 'https://si1.go2yd.com/get-image/0tPBfE2Pei5';

const fillImage = (number) => {
    return Array(number).fill(pic);
}

export default () => (
    <div>
        <Sudoku ratio={1.5} images={1} waterMark={waterMark}/>
        <Sudoku ratio={1} images={1} waterMark={waterMark}/>
        <Sudoku ratio={0.75} images={1} waterMark={waterMark} />
        <Sudoku images={'2'} waterMark={waterMark}/>
        <Sudoku images={fillImage(3)}  imageClick={(iamges,index) => console.log(iamges,index)}  waterMark={waterMark} />
        <Sudoku images={4} waterMark={waterMark}/>
        <Sudoku images={fillImage(5)} waterMark={waterMark}/>
        <div style={{padding: '20px'}}>
            <Sudoku images={fillImage(6)} waterMark={waterMark}/>
        </div>
        <Sudoku images={fillImage(7)} waterMark={waterMark}/>
        <Sudoku images={fillImage(8)} waterMark={waterMark}/>
        <Sudoku images={fillImage(9)} waterMark={waterMark}/>
        <Sudoku images={fillImage(11)} waterMark={waterMark}/>
        <Sudoku images={fillImage(16)} waterMark={waterMark}/>
        <Sudoku images={fillImage(13)} showAll={true} waterMark={waterMark}/>

    </div>
  );
