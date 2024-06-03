import './card.scss';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ data: { item, index } }) => {
    // console.log('item', item)

    return (
        <div className='card'>
            <Link to={`/${Number(item.DocumentID)}`}>
                <div className="card__image">
                    {item.status === 'new' ? <button >New Listing</button> : ''}
                    <img src={item.Images[0].Uri} alt={`${item.MakeString} Main Image`} />
                </div>
            </Link>

            <div className="card__context">
                <p className="listingTitle">{item.MakeString}</p>
                {/* write a function to compared the two prices if it is the same or not */}
                {/* {item.OriginalPrice !== item.Price ? <p>{item.OriginalPrice}</p> : null}  */}
                <p>$ {item.Price}</p>
                <div className="textSJost">{item.BoatLocation.BoatCityName}, {item.BoatLocation.BoatStateCode}</div>
               {/* <p className="card-description">{item.description}</p> */}
                <Link to={`/${item.DocumentID}`}><p><span className='linkText hoverEffectColor'>View Details&nbsp; &gt;</span></p></Link>
            </div>

        </div>
    )
};

export default Card 