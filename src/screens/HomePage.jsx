/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import AnchorIcon from "../components/AnchorIcon/AnchorIcon";
import Card from "../components/Card/Card";
import Reviews from "../components/Reviews/Reviews";

// eslint-disable-next-line no-unused-vars
import { listingData } from "../data/dammyData";
import { Link } from "react-router-dom";
import { useFadeInAnimSettings } from "../animations/animationHooks";
import { useBoatListings } from "../api/fetchListings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCutoffDate } from "../utilities/utilities";
import Loading from "../components/Loading/Loading";

const HomePage = () => {
  const fadeInAnimSettings = useFadeInAnimSettings();
  const [newListings, setNewListings] = useState(null);
  console.log(newListings);

  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: listings,
  } = useBoatListings();



  useEffect(() => {
    // Retrieve listings that were created less than three months ago and have an active sales status.
    if (listings) {
        // console.log(listings[0].Thumbnails);
      console.log(listings)
      const cutoffDate = getCutoffDate();
      const newListings = listings.filter((item) => {
        const itemDate = new Date(item.ItemReceivedDate);
        // console.log(itemDate)
        return itemDate > cutoffDate && item.SalesStatus === "Active";
      });
      setNewListings(newListings);
    }
  }, [listings]);

  console.log("From Home", "isLoading", isLoading, "isFetching", isFetching);

  return (
    <main className="homePage">
      <section className="homePage__hero">
        <div className="hero-content">
          <motion.p className="heroHeadingText" {...fadeInAnimSettings}>
            <span className="spanText">WELCOME TO</span> <br />
            FAIRHAVEN YACHTS
          </motion.p>
          <p className="heroParagraph">
            Experience the luxury of owning a premium yacht. <br></br>Browse our
            extensive collection and make your dreams a reality.
          </p>
          <div className="buttons">
            <button>Explore</button>
            <button>Learn More</button>
          </div>
        </div>
      </section>

      <div className="wrapper">

        <article className="homePage__intro">
          <motion.h1 className="homePage-intro-title" {...fadeInAnimSettings}>
            {" "}
            <span>Experienced</span> Yacht Brokerage
          </motion.h1>
          <motion.div
            className="homePage-intro-description subtitle"
            {...fadeInAnimSettings}
          >
            Welcome to our premier yacht brokerage firm, where we provide
            exceptional service and expertise in facilitating smooth
            transactions for yacht owners and buyers. With our extensive network
            and deep understanding of the industry, we are dedicated to
            delivering unparalleled results and exceeding your expectations.
          </motion.div>
        </article>
      </div>

      <article className="homePage__listings">
        <div className="wrapper">
          <div className="listing-title-container">
            <motion.div className="listing-title" {...fadeInAnimSettings}>
              <p>Yachts</p>
              <h2>New Listings</h2>
              <div className="subtitle">
                Explore our new and featured yacht listings.
              </div>
              <AnchorIcon />
            </motion.div>
          </div>

          <div className="listings-container">
            {/* <Loading /> */}
            {isLoading && <div>Loading....</div>}
            {newListings &&
              newListings.map((listing, index) => {
                return <Card key={index} item={listing} />;
              })}
          </div>

          <div className="buttonContainer">
            <Link to="buy">
              <button>View all</button>
            </Link>
          </div>
        </div>
      </article>

      <div className="wrapper">
        <article className="homePage__section1 sectionLayout">
          <motion.div
            className="sectionContentLayout section1-content"
            {...fadeInAnimSettings}
          >
            <h2>Find Your Dream Yacht Today</h2>
            <p>
              At our yacht brokerage firm, we offer expert brokers, a global
              network, and personalized service to help you buy or sell your
              yacht. With our extensive knowledge and connections in the
              industry, we can facilitate smooth transactions and ensure a
              seamless experience for our clients.
            </p>
            <ul>
              <li className="textMJost">Expert Brokers</li>
              <li className="textMJost">Global Network</li>
              <li className="textMJost">Personalized Service</li>
            </ul>
            <Link to="about" className="section1-button">
              <button>Learn More</button>
            </Link>
          </motion.div>

          <img src="/home2.jpg" alt="a sailing image" className="imageCover" />
        </article>
      </div>

      <article className="homePage__section2">
        <div className="wrapper sectionLayout">
          <img
            src="/home3.jpg"
            alt="marina"
            className="imageCover imageOrder"
          />
          <motion.div
            className="sectionContentLayout section2-content"
            {...fadeInAnimSettings}
          >
            <h2>
              Discover the Benefits of Working with Our Yacht Brokerage Firm
            </h2>
            <p>
              Our firm offers a seamless experience for both yacht buyers and
              sellers, ensuring smooth transactions and peace of mind.
            </p>
            <div className="section2-benefits">
              <div className="section2-buyer">
                <p className="bold">For Buyers</p>
                <p>
                  Access a wide selection of high-quality yachts and receive
                  expert guidance throughout the buying process.
                </p>
              </div>
              <div className="section2-seller">
                <p className="bold">For Seller</p>
                <p>
                  List your yacht with us and benefit from our extensive network
                  and marketing expertise.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <article className="homePage__callAction">
        <div className="callAction-content">
          <h2>Discover Your Dream Yacht Today</h2>
          <p>
            Browse our latest listings and find the perfect yacht for your next
            adventure.
          </p>
          <Link to="buy">
            <button>View Listings</button>
          </Link>
        </div>
      </article>

      <div className="wrapper">
        <article className="homePage__reviews">
          <Reviews />
        </article>
      </div>

      <aside className="homePage__banners">
        <div className="wrapper">
          <motion.div className="banners-container" {...fadeInAnimSettings}>
            <a href="https://www.yachtingmagazine.com/" target="_blank">
              <img
                src="/yachting-logo.webp"
                alt="Yachting Magazine Logo"
                title="Yachting Magazine"
              />
            </a>
            <a href="https://www.passagemaker.com/" target="_blank">
              <img
                src="/passagemaker-trawlerfest-logo.webp"
                alt="Passagemaker Trawlerfest Logo"
                title="Passagemaker Trawlerfest"
              />
            </a>
            <a href="https://www.bonhams.com/" target="_blank">
              <img
                src="/bonhams-logo.webp"
                alt="Bohams Auction House Logo"
                title="Bohams Auction House"
              />
            </a>
            <a
              href="https://www.sevenstar-yacht-transport.com/"
              target="_blank"
            >
              <img
                src="/sevenstar-logo.webp"
                alt="Sevenstar Logo"
                title="Sevenstar Yacht Transport"
              />
            </a>
          </motion.div>
        </div>
      </aside>
    </main>
  );
};

export default HomePage;
