import './card.scss';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDelayedAnimSettings } from '../../animations/animationHooks';


const Card = ({ data: { item, index } }) => {
    const settings = useDelayedAnimSettings();
    const useDelayedAnim = { ...settings, transition: { delay: 0.8 * index, ease: "anticipate", duration: 1 }, custom: index }

    return (
        <motion.div
            className='card'
            {...useDelayedAnim}
        >
            <Link to={`/${item.id}`}>
                <div className="card__image">
                    {item.status === 'new' ? <button >New Listing</button> : ''}
                    <img src={item.image[0]} alt="Main image for a listing" />
                </div>
            </Link>

            <div className="card__context">
                <p className="listingTitle">{item.name}</p>
                <p>$ {item.price}</p>
                <p className="card-description">{item.description}</p>
                <Link to={`/${item.id}`}><p><span className='linkText'>View Details&nbsp; &gt;</span></p></Link>
            </div>

        </motion.div>
    )
};

export default Card 