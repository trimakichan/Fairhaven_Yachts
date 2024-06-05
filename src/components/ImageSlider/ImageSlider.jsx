import { useCallback, useContext, useState } from "react";
import "./imageSlider.scss";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosCloseCircleOutline,
} from "react-icons/io";

import { Contexts } from "../../contexts/contexts";

const ImageSlider = ({ data: { images, index } }) => {
  const { setIsImageSliderOn } = useContext(Contexts);
  console.log(images);
  const slides = images?.map((item) => item.Uri);

  const [currentIndex, setCurrentIndex] = useState(index);

  const changeSlide = useCallback((direction) => {
    if (direction === "left") {
      if (currentIndex === 0) {
        setCurrentIndex(slides.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (direction === "right") {
      if (currentIndex === slides.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [currentIndex, slides.length])

  if (!images) {
    return <div>No slides available.</div>;
  }

  return (
    <div className="imageSlider">
      {slides && slides.length > 0 && (
        <>
          <IoIosCloseCircleOutline
            className="close-button"
            aria-label="Close Image Slider"
            onClick={() => setIsImageSliderOn(false)}
          />
          <div className="slider-content">
            <IoIosArrowDropleft
              className="arrow"
              aria-label="Previous Slide"
              onClick={() => changeSlide("left")}
            />
            <img src={slides[currentIndex]} alt="one of sliding images" />
            <IoIosArrowDropright
              className="arrow"
              aria-label="Next Slide"
              onClick={() => changeSlide("right")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
