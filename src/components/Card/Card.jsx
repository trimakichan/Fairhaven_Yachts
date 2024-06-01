import './card.scss';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ data: { item, index } }) => {

    return (
        <div className='card'>
            <Link to={`/${item.id}`}>
                <div className="card__image">
                    {item.status === 'new' ? <button >New Listing</button> : ''}
                    <img src={item.image[0]} alt={`${item.name} Main Image`} />
                </div>
            </Link>

            <div className="card__context">
                <p className="listingTitle">{item.name}</p>
                <p>$ {item.price}</p>
                <div className="textSJost">{item.city}, {item.state}</div>
                {/* <p className="card-description">{item.description}</p> */}
                <Link to={`/${item.id}`}><p><span className='linkText hoverEffectColor'>View Details&nbsp; &gt;</span></p></Link>
            </div>

        </div>
    )
};

export default Card 