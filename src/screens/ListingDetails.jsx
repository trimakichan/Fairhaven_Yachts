import { useEffect, useState, useRef } from 'react';
import { listingData } from '../data/dammyData';
import { useParams } from 'react-router-dom';

import { GrLocation } from "react-icons/gr";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";



const ListingDetails = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [mainImage, setMainImage] = useState();

  useEffect(() => {

    if (params.id) {
      const list = listingData.filter(item => item.id === Number(params.id));
      if (list.length > 0) {
        setData(list[0]);
        setMainImage(list[0].image[0])
        // setMainImage(data.image?.[0])
      }
    }
  }, [params])


  const sliderRef = useRef(null);
  let touchStart = 0;
  let touchEnd = 0;

  //Scroll Horizontally on Mobile by touching. 
  const handleTouchStart = (e) => {
    // get the initial touch position
    touchStart = e.targetTouches[0].clientX;
    console.log(touchStart)
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
    const scrollAmount = type === 'click' ? 350 : 600;

    if (sliderRef.current) {
      if (direction === 'left') {
        sliderRef.current.scrollLeft -= scrollAmount;
      } else {

        sliderRef.current.scrollLeft += scrollAmount;
      }
    }
  }

 

  return (
    <main className='listingDetails'>
      <div className="wrapper">
        <div className="listingDetails__title">
          <h1>{data?.name}</h1>
          <div className='textMJost listingDetails__title__info '>
            <div>$ {data.price}</div>
            <div className='info-location'><GrLocation className="iconStyles" /> {data.city}, {data.state}</div>
          </div>
        </div>
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
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
      
            >
              {data?.image?.map((image, index) => {
                return <div key={index} className="image-container" onClick={() => setMainImage(image)}><img key={index} src={image} alt='' /> </div>
              })}
            </div>
            <IoIosArrowDropright className='arrowStyles' onClick={() => moveSlide('click', 'right')}  />

          </div>

        </div>

      </div>
    </main>
  )




}

export default ListingDetails
