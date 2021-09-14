import React, { FC, useState } from 'react';
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
}

const componentName = 'image-preview';

const imagePreview = (
  images: string[] | ImagePreviewOptions,
  startPosition: string | number = 0,
) => {
  const options = Array.isArray(images) ? { images, startPosition } : images;
  const imagePreviewEl = document.createElement('div');
  // bad case: compatible doc mobile layout
  const isDocBrowser = document.querySelector('.__dumi-default-mobile-demo-layout');
  if (!isDocBrowser) {
    document.body.appendChild(imagePreviewEl);
  } else {
    isDocBrowser.appendChild(imagePreviewEl);
  }

  document.body.setAttribute('style', 'position: fixed');

  const ImagePreview: FC<InternalProps> = props => {
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
    } = props;
    const [visible, setVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(1);

    const handleClick = () => {
      setVisible(false);
      if (!isDocBrowser) {
        document.body.removeChild(imagePreviewEl);
      } else {
        isDocBrowser.removeChild(imagePreviewEl);
      }
      document.body.removeAttribute('style');
    };

    const handleChange = (index: number) => {
      setCurrentIndex(index + 1);
    };

    return (
      <Popup
        className={popupClasses}
        visible={visible}
        maskStyle="background-color: rgba(0, 0, 0, 0.9) !important; opacity: 1 !important;"
      >
        <Swipe
          className={swipreClasses}
          initialSwipe={initialSwipe as string | number}
          showIndicators={false}
          duration={swipeDuration}
          handleClickCallback={handleClick}
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

  ReactDOM.render(<ImagePreview {...options} />, imagePreviewEl);
};
export default imagePreview;
