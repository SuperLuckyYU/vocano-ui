/* eslint-disable class-methods-use-this */
import React, { FC, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Popup from '../Popup';
import Swipe from '../Swipe';
import { classNames, uid } from '../../utils';

interface ImagePreviewOptions {
  /** 需要预览的图片 URL 数组 */
  images: string[];
  /** 图片预览起始位置索引 */
  startPosition?: number | string;
  /** 动画时长，单位为ms */
  swipeDuration?: number | string;
  /** 是否显示页码 */
  showIndex?: boolean;
}

interface InternalProps extends ImagePreviewOptions {
  startPosition?: string | number;
  onClose?: () => void;
}

const componentName = 'image-preview';
const wrapperEl = document.createElement('div');

const ImagePreviewWrapper: FC<InternalProps> = props => {
  const popupClasses = classNames(componentName, 'popup');
  const swipreClasses = classNames(componentName, 'swipe');
  const swipreItemClasses = classNames(componentName, 'swipe-item');
  const imgClasses = classNames(componentName, 'img');
  const previewImageClasses = classNames(componentName, 'image');
  const previewIndexClasses = classNames(componentName, 'index');
  const {
    startPosition: initialSwipe,
    images: imageList,
    showIndex = true,
    swipeDuration = '300',
    onClose = () => {},
  } = props;

  const [currentIndex, setCurrentIndex] = useState(1);

  const handleChange = useCallback((index: number) => {
    setCurrentIndex(index + 1);
  }, []);

  return (
    <Popup
      className={popupClasses}
      visible
      maskStyle="background-color: rgba(0, 0, 0, 0.9) !important; opacity: 1 !important;"
    >
      <Swipe
        className={swipreClasses}
        initialSwipe={initialSwipe as string | number}
        showIndicators={false}
        duration={swipeDuration}
        handleClickCallback={onClose}
        onChange={handleChange}
      >
        {imageList.map(item => (
          <Swipe.Item className={swipreItemClasses} key={uid()}>
            <div className={previewImageClasses}>
              <img className={imgClasses} src={item} alt={item} />
            </div>
          </Swipe.Item>
        ))}
      </Swipe>
      {imageList.length && showIndex && (
        <div className={previewIndexClasses}>
          {currentIndex} / {imageList.length}
        </div>
      )}
    </Popup>
  );
};

class ImagePreview {
  private options: InternalProps = {
    images: [],
  };

  private isDocBrowser = document.querySelector('.__dumi-default-mobile-demo-layout');

  constructor(images: string[] | ImagePreviewOptions, startPosition: string | number = 0) {
    this.options = Array.isArray(images) ? { images, startPosition } : images;
  }

  show() {
    // bad case: compatible doc mobile layout
    if (!this.isDocBrowser) {
      document.body.appendChild(wrapperEl);
    } else {
      this.isDocBrowser.appendChild(wrapperEl);
    }

    document.body.setAttribute('style', 'position: fixed');
    ReactDOM.render(<ImagePreviewWrapper {...this.options} onClose={this.close} />, wrapperEl);
  }

  close() {
    ReactDOM.unmountComponentAtNode(wrapperEl);
    const maskEl = document.getElementById('vo-mask');
    if (maskEl) document.body.removeChild(maskEl);
    document.body.removeAttribute('style');
  }
}

export default ImagePreview;
