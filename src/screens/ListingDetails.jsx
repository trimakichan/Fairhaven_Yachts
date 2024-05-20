import { useEffect, useState, useRef, useContext } from 'react';
import { motion } from "framer-motion";
import { useFadeInAnimSettings } from '../animations/animationHooks';
import { listingData } from '../data/dammyData';
import { useParams } from 'react-router-dom';
import { Contexts } from '../contexts/contexts';

import { GrLocation } from "react-icons/gr";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ListingDetails = () => {

  const fadeInAnimSettings = useFadeInAnimSettings();

  const params = useParams();
  const { isSliderOn, setIsSliderOn } = useContext(Contexts);
  const [data, setData] = useState([]);
  //  console.log(data.image)
  const [mainImage, setMainImage] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderMobileRef = useRef(null);
  let touchStart = 0;
  let touchEnd = 0;

  useEffect(() => {

    if (params.id) {
      const list = listingData.filter(item => item.id === Number(params.id));
      if (list.length > 0) {
        setData(list[0]);
        setMainImage(list[0].image[0])
      }
    }
  }, [params])




  //Scroll Horizontally on Mobile by touching. 
  const handleTouchStart = (e) => {
    // get the initial touch position
    touchStart = e.targetTouches[0].clientX;
    // console.log(touchStart)
  }

  const handleTouchMove = (e) => {
    // update the touch position
    touchEnd = e.targetTouches[0].clientX;

  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      moveSlide('touch', 'right');
    } else if (touchEnd - touchStart > 50) {
      moveSlide('touch', 'left')
    }
  }


  // This function is use for both mobile and desktop scrolls
  const moveSlide = (type, direction) => {
    const scrollAmount = 350;

    type === 'touch' && direction === 'right' ? changeImageIndex('right') : changeImageIndex('left')

    if (sliderRef.current || sliderMobileRef.current) {
      if (direction === 'left') {
        sliderRef.current.scrollLeft -= scrollAmount;
      } else {

        sliderRef.current.scrollLeft += scrollAmount;
      }
    }
  }


  // mobile 
  const changeImageIndex = (direction) => {

    if (direction === 'left') {
      if (imageIndex === 0) {
        setImageIndex(data.image.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    }

    if (direction === 'right') {
      if (imageIndex === data.image.length - 1) {
        setImageIndex(0)
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  }

  return (
    <main className='listingDetails'>
      <div className="wrapper listingDetails-title-bg">
        <motion.div
          className="listingDetails__title"
          {...fadeInAnimSettings}
        >
          <h1><span>{data?.name}</span></h1>
          <div className='textMJost listingDetails__title__info '>
            <div>$ {data.price}</div>
            <div className='info-location'><GrLocation className="iconStyles" /> {data.city}, {data.state}</div>
          </div>
        </motion.div>
      </div>

      <div className="listingDetails__images">
        <div className="wrapper">

          <div className="listingDetails__images__main">
            <img src={mainImage} alt={`${data.name} image`} />
          </div>
          <div className="listingDetails__images__slider">
            <IoIosArrowDropleft className='arrowStyles' onClick={() => moveSlide('click', 'left')} />
            <div className="slider-container"
              ref={sliderRef}
            // onTouchStart={handleTouchStart}
            // onTouchMove={handleTouchMove}
            // onTouchEnd={handleTouchEnd}

            >
              {data?.image?.map((image, index) => {
                return <div key={index} className="image-container" onClick={() => setMainImage(image)}><img key={index} src={image} alt='' /> </div>
              })}
            </div>
            <IoIosArrowDropright className='arrowStyles' onClick={() => moveSlide('click', 'right')} />

          </div>

          {/* mobile screen */}

          <div className='listingDetails__images__mobile'>
            <div className={isSliderOn ? "mobile-fullSlider" : ""}>
              <div
                className="main-image"
                ref={sliderMobileRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {isSliderOn && <IoIosCloseCircleOutline className='close-icon' onClick={() => setIsSliderOn(!isSliderOn)} />}
                <IoIosArrowDropleft className='arrow-left' onClick={() => changeImageIndex('left')} />
                <img src={data?.image?.[imageIndex]} alt={`${data.name} Image`} onClick={() => setIsSliderOn(!isSliderOn)} />
                <IoIosArrowDropright className='arrow-right' onClick={() => changeImageIndex('right')} />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="wrapper">
        <motion.div
          className="listingDetails__description"
          {...fadeInAnimSettings}
        >
          <div className='test'><h2>Description</h2><div className='line'></div></div>
          <p>{data.description}</p>

          <div className="listingDetails-button-container">
            <a href="tel:1-206-940-9088"><button className='call-button'>Call</button></a>
            <a href="mailto:fairhavenyachtsales@gmail.com"><button className='email-button'>Email</button></a>
          </div>

        </motion.div>
      </div>


    </main>
  )

}

export default ListingDetails
