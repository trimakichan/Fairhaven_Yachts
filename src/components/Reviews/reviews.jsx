import './reviews.scss'
import { motion } from "framer-motion"
import { reviewsData } from '../../data/reviewsData';
import { FaStar } from "react-icons/fa";

import { useDelayedAnimSettings } from '../../animations/animationHooks';


const StarDisplay = ({ count }) => {

    return (
        <div className="stars">
            {new Array(count).fill(null).map((_, index) => <FaStar key={index} />)}
        </div>
    )
}

const Review = ({ review: { review, index } }) => {
    const settings = useDelayedAnimSettings();
    const useDelayedAnim = { ...settings, transition: { delay: 0.8 * index, ease: "anticipate", duration: 1 }, custom: index }
    return (
        <motion.div
            className='review'
            {...useDelayedAnim}
        >
            <div className="review__content">
                <div className="stars-container">
                    <StarDisplay count={review.stars} />
                </div>
                <p>{review.review}</p>
            </div>



            <div
                className="review__customerInfo">
                <div className="customer-name">
                    <div className='bold'>{review.name}</div>
                    <div>{review.status}</div>
                </div>
                <img src="/ocean_alexander2.webp" alt="A boat image" />

            </div>


        </motion.div>
    )
}

const Reviews = () => {
    return (
        <div className='reviews'>
            <div className="reviews__title">
                <h2>Satisfied Customers</h2>
                <p>Read what our clients have to say about us!</p>
            </div>

            <div className="reviews__content">
                {reviewsData.map((review, index) => <Review key={index} review={{ review, index }} />)}
            </div>
        </div>
    )
}

export default Reviews