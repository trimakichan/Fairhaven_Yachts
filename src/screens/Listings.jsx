/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useFadeInAnimSettings } from "../animations/animationHooks"
import AnchorIcon from "../components/AnchorIcon/AnchorIcon";

import { listingData } from "../data/dammyData";
import Card from '../components/Card/Card'
import { useState } from "react";
import { BiFontColor } from "react-icons/bi";

const Listings = () => {
  const fadeInAnimSettings = useFadeInAnimSettings();
  const queryKey = "boatListings"

  const { isLoading, isError, error, data: boatListings } = useQuery({
    queryFn: () => fetch(`/api/inventory/search?key=BjynVgQJU6PWzJVW0pdbs2bzu3hvdL&status=active`).then((res) => res.json()),
    queryKey: [queryKey]

  });

  console.log(boatListings)

  return (
    <main className="listings">

      <div className="listings__hero">
      </div>

      <div className="wrapper">
        <article className="listings__sale">
          <motion.div
            className="sale-title"
            {...fadeInAnimSettings}
          >
            <h2>Yachts for Sale</h2>
            <p>Browse our catalog of yachts for sale.</p>
            <AnchorIcon />
          </motion.div>

          <div className="sale-filter">
            <p>Filter section will be aaded here later...</p>
          </div>

          {/* <div className="sale-listings">
            {listingData.map((item, index) => <Card key={index} data={{ item, index }} />)}
            {listingData.map((item, index) => <Card key={index} data={{ item, index }} />)}
          </div> */}

          {boatListings.results.map((item, index) => <p key={index}>{item.DocumentID}</p>)}


          <button>Load More</button>
        </article>
      </div>

      <article className="listings__section">
        <div className="wrapper sectionLayout">

          <div className="sectionContentLayout listings-section-content-container">

            <motion.h2
              {...fadeInAnimSettings}
            >Find Your Dream Yacht Today</motion.h2>
            <motion.p
              {...fadeInAnimSettings}
            >Contact our brokers to get more information about the yachts available for sale.</motion.p>
            <Link to="/contact">
              <motion.button
                {...fadeInAnimSettings}
              >Contact Us
              </motion.button>
            </Link>

          </div>


          <img src="/listings2.jpg" alt="An image of a mid-sized boat on the blue ocean." className="imageCover" />



        </div>
      </article>


    </main>
  )
}

export default Listings