import AnchorIcon from "../components/AnchorIcon/AnchorIcon";
import Card from "../components/Card/Card";
import { listingData } from "../data/dammyData";


const HomePage = () => {
  return (
    <main className="homePage">

      <div className="homePage__hero">
        <div className="context">
          <p className="heroHeadingText"><span className="spanText" >WELCOME TO</span> <br></br>FAIRHAVEN YACHTS</p>
          <p className="heroParagraph">Experience the luxury of owning a premium yacht. <br></br>Browse our extensive collection and make your dreams a reality.</p>
          <div className="buttons">
            <button>Explore</button>
            <button>Learn More</button>
          </div>
        </div>
      </div>

      <div className="wrapper">

        <section className="homePage__intro">
          <h1 className="title"> Experienced Yacht Brokerage</h1>
          <div className="description subtitle">Welcome to our premier yacht brokerage firm, where we provide exceptional service and expertise in facilitating smooth transactions for yacht owners and buyers. With our extensive network and deep understanding of the industry, we are dedicated to delivering unparalleled results and exceeding your expectations.</div>
        </section>
      </div>

      <section className="homePage__listings">

        <div className="wrapper">
          <div className="title">
            <p>Yachts</p>
            <h1>New Listings</h1>
            <div className="subtitle">Explore our new and featured yacht listings.</div>
            <div className='anchor'>
              <AnchorIcon />
            </div>
          </div>

          <div className="listings-container">
            {listingData.map(item => <Card key={item.id} item={item} />)}

          </div>
        </div>


      </section>





    </main>
  )
}

export default HomePage