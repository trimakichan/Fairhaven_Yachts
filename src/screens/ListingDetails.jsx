/* eslint-disable no-unused-vars */
import { useState, useRef, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useFadeInAnimSettings } from "../animations/animationHooks";
import { useParams } from "react-router-dom";
import { Contexts } from "../contexts/contexts";
//icons
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import {
  PiArrowSquareLeftDuotone,
  PiArrowSquareRightDuotone,
} from "react-icons/pi";

import { useBoatListingsById } from "../api/fetchListings";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import MobileImageList from "../components/MobileImageList/MobileImageList";

const ListingDetails = () => {
  const fadeInAnimSettings = useFadeInAnimSettings();
  const { id } = useParams();
  const { data: boatListing } = useBoatListingsById(id);
  const { isMobileSliderOn, setIsMobileSliderOn } = useContext(Contexts);
  const { isImageSliderOn, setIsImageSliderOn } = useContext(Contexts);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderMobileRef = useRef(null);

  console.log(boatListing?.GeneralBoatDescription);
  console.log(boatListing?.AdditionalDetailDescription);

  useEffect(() => {
    if (boatListing?.Images?.length > 0) {
      console.log("here");
      setMainImage(boatListing.Images[0].Uri);
    }
  }, [boatListing]);

  const setFixedFontSize = (text) => {
    if (!text) return;

    let description;
    //remove all the styles in the html strings. 
    description = text.replace(/ style="[^"]*"/g, "");
    return description.replace(
      /<strong>customContactInformation<\/strong><br>/g,
      ""
    );
  };

  const boatDescription = setFixedFontSize(
    boatListing?.GeneralBoatDescription[0]
  );

  let additionalDescription;
  const additionalinfo = boatListing?.AdditionalDetailDescription;
  if (additionalinfo?.length > 0) {
    setFixedFontSize(additionalinfo[additionalinfo.length - 1]);
    additionalDescription = setFixedFontSize(
      additionalinfo[additionalinfo.length - 1]
    );
  }

  let touchStart = 0;
  let touchEnd = 0;

  // Scroll Horizontally on Mobile by touching.
  const handleTouchStart = (e) => {
    // get the initial touch position
    touchStart = e.targetTouches[0].clientX;
    // console.log(touchStart)
  };

  const handleTouchMove = (e) => {
    // update the touch position
    touchEnd = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      moveSlide("touch", "right");
    } else if (touchEnd - touchStart > 50) {
      moveSlide("touch", "left");
    }
  };

  // This function is use for both mobile and desktop scrolls
  const moveSlide = (type, direction) => {
    const scrollAmount = 350;

    if (type === "touch" && direction === "right") changeImageIndex("right");
    if (type === "touch" && direction === "left") changeImageIndex("left");

    if ((type === "click" && sliderRef.current) || sliderMobileRef.current) {
      if (direction === "left") {
        sliderRef.current.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        sliderRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  // mobile
  const changeImageIndex = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(boatListing.Images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    }

    if (direction === "right") {
      if (imageIndex === boatListing.Images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    boatListing && (
      <main className="listingDetails">
        {/* Title Section */}
        <div className="wrapper listingDetails-title-bg">
          <motion.div className="listingDetails__title" {...fadeInAnimSettings}>
            <h1>
              <span>
                {`${boatListing.ModelYear} ${boatListing.MakeString} ${boatListing.Model}`}
              </span>
            </h1>

            <div className="textMJost listingDetails__title__info ">
              <div>
                {parseFloat(boatListing.Price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div className="info-location">
                <GrLocation className="iconStyles" />{" "}
                {boatListing.BoatLocation.BoatCityName},{" "}
                {boatListing.BoatLocation.BoatStateCode}
              </div>
            </div>
          </motion.div>
        </div>
        {/* -------------------------------------------------------------------------------------- */}

        {/* Desktop Image Section */}
        <div className="listingDetails__images">
          {isImageSliderOn && (
            <ImageSlider
              data={{ images: boatListing.Images, index: mainImageIndex }}
            />
          )}

          <div className="wrapper">
            <div className="listingDetails__images__main">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={`A larger ${boatListing.MakeString} boat image`}
                  onClick={() => setIsImageSliderOn(true)}
                />
              ) : (
                <p>Loading....</p>
              )}
            </div>

            <div className="listingDetails__images__slider">
              <PiArrowSquareLeftDuotone
                className="arrow-style"
                onClick={() => moveSlide("click", "left")}
              />

              <div
                className="slider-container"
                ref={sliderRef}
                // onTouchStart={handleTouchStart}
                // onTouchMove={handleTouchMove}
                // onTouchEnd={handleTouchEnd}
              >
                {boatListing.Images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="image-container"
                      onClick={() => {
                        setMainImageIndex(index);
                        setMainImage(boatListing.Images[index].Uri);
                      }}
                    >
                      <img
                        key={index}
                        src={image.Uri}
                        alt={`A ${boatListing.MakeString} boat image`}
                      />
                    </div>
                  );
                })}
              </div>

              <PiArrowSquareRightDuotone
                className="arrow-style"
                onClick={() => moveSlide("click", "right")}
              />
            </div>
          </div>

          {/* -------------------------------------------------------------------------------------- */}

          {/* Mobile Image Section */}

          <div className="listingDetails__images__mobile">
            {isMobileSliderOn && (
              <MobileImageList images={boatListing.Images} />
            )}

            <div
              className="main-image"
              ref={sliderMobileRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <PiArrowSquareLeftDuotone
                className="arrow-small-style arrowLeftPositon"
                onClick={() => changeImageIndex("left")}
              />

              <img
                src={boatListing.Images[imageIndex].Uri}
                alt={`${boatListing.MakeString} Image`}
                onClick={() => setIsMobileSliderOn(!isMobileSliderOn)}
              />

              <PiArrowSquareRightDuotone
                className="arrow-small-style arrowRightPositon"
                onClick={() => changeImageIndex("right")}
              />

              {/* </div> */}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------------- */}

        <div className="wrapper">
          <motion.div
            className="listingDetails__description"
            {...fadeInAnimSettings}
          >
            <div className="description-title">
              <h2>Description</h2>
              <div className="line"></div>
            </div>

            <div className="boat-description">
              {boatDescription && <p>{parse(boatDescription)}</p>}

              {additionalDescription && (
                <p>{parse(additionalDescription)}</p>
              )}
            </div>

            {/* <div className="listingDetails-button-container">
              <a href="tel:1-206-940-9088">
                <button className="call-button">Call</button>
              </a>
              <a href="mailto:fairhavenyachtsales@gmail.com">
                <button className="email-button">Email</button>
              </a>
            </div> */}
          </motion.div>
        </div>
      </main>
    )
  );
};

export default ListingDetails;
