import './card.scss';
import { Link } from "react-router-dom";

const Card = ({ item }) => {
    console.log(item)

    return (
        <div className='card'>
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

        </div>
    )
};

export default Card 