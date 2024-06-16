/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Contexts } from "../contexts/contexts";
import { useFadeInYAxisAnimSettings } from "../animations/animationHooks";
import AnchorIcon from "../components/AnchorIcon/AnchorIcon";
import Card from "../components/Card/Card";
import { BiFontColor } from "react-icons/bi";
import { useBoatListings } from "../api/fetchListings";
import Loading from "../components/Loading/Loading";
import SearchBar from "../components/SearchBar/SearchBar";

const Listings = () => {
  const { filteredResults } = useContext(Contexts);
  const fadeInAnimSettings = useFadeInYAxisAnimSettings();

  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: boatListings,
  } = useBoatListings();
  // console.log(boatListings);


  return boatListings ? (
    <main className="listings">
      <header className="listings__hero"></header>

      <div className="wrapper">
        <section className="listings__sale">
          <header className="sale-header">
            <motion.div className="sale-title" {...fadeInAnimSettings}>
              <h2 className="listings-bg-text">Yachts for Sale</h2>
              <p>Browse our catalog of yachts for sale.</p>
              <AnchorIcon />
            </motion.div>
          </header>

          <div className="sale-filter">
            {boatListings && (
              <SearchBar  allBoats={boatListings} />
            )}

          </div>

          {isLoading && <Loading />}

          {boatListings && (
            <>
              <div className="sale-listings">
                {/* Always display filteredResults if they exist and contain elements */}
                {filteredResults &&
                  filteredResults.length > 0 &&
                  filteredResults.map((boat, index) => (
                    <Card key={index} item={boat} />
                  ))}
              </div>
              <button>Load More</button>
            </>
          )}
        </section>
      </div>

      <article className="listings__section">
        <div className="wrapper sectionLayout">
          <div className="sectionContentLayout listings-section-content-container">
            <motion.h2 {...fadeInAnimSettings}>
              Find Your Dream Yacht Today
            </motion.h2>
            <motion.p {...fadeInAnimSettings}>
              Contact our brokers to get more information about the yachts
              available for sale.
            </motion.p>
            <Link to="/contact">
              <motion.button {...fadeInAnimSettings}>Contact Us</motion.button>
            </Link>
          </div>
          <img
            src="/listings2.jpg"
            alt="An image of a mid-sized boat on the blue ocean."
            className="imageCover"
          />
        </div>
      </article>
    </main>
  ) : (
    <Loading />
  );
};

export default Listings;
