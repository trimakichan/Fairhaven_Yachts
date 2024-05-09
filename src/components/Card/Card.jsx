import './card.scss'

const Card = ({item}) => {
    console.log(item)

    return (
        <div className='card'> 
            <div className="card__image">
                <img src={item.image[0]} alt="" />
            </div>

            <div className="card__context">
                <p className="listingTitle">{item.name}</p>
                <p className="card-description">{item.description}</p>
                <button>View Details</button>

            </div>
        </div>
    )
};

export default Card 