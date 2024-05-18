import { useEffect, useState } from "react"

const ImageSlider = ({ slides }) => {
    console.log(slides)
    const slidesArray = slides
    console.log(slidesArray)
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageUrl = slidesArray[currentIndex];
    // console.log(slidesArray)

    if (!slides) {
        return <div>No slides available.</div>;
    }

    return (
        <div className="imageSlider">
            {/* <img src={imageUrl}></img> */}
            {/* <div style={{ background: `url(${imageUrl})` }} className="slideStyles"></div> */}

            <div>test</div>
        </div>
    )
}

export default ImageSlider