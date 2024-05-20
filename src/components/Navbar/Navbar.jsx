/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import './navbar.scss';

import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Contexts } from '../../contexts/contexts';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

import { TiPhoneOutline } from "react-icons/ti";

const Navbar = () => {
  const { openNav, setOpenNav } = useContext(Contexts);

  const { scrollY } = useScroll()
  const [navHidden, setNavHidden] = useState(false);

  // useEffect(() => {
  //   const unsub = scrollY.on("change", (latest) => console.log(latest))
  //   return () => unsub();
  // }, [scrollY])

  useMotionValueEvent(scrollY, "change", (latest) => {

    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 300 && !openNav) {
      setNavHidden(true)
    } else {
      setNavHidden(false)
    }
  })

  const navLinks = [
    { href: '/', text: "Home" },
    { href: '/buy', text: 'Our Listings' },
    { href: '/sell', text: 'Sell Yachts' },
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' }
  ];

  const renderLink = (link, index) => (
    <a key={index} href={link.href}  >{link.text}</a>
  )


  return (
    <motion.nav
      aria-label='primary-navigation'
      className='navbar textSPlayfair'
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={navHidden ? 'hidden' : 'visible'}
      transition={{ duration: .35, ease: 'easeInOut' }}
    >
      <div className="navbar__container">
        <div className="logo">
          <a href='/'>
            <img src="/logo.webp" alt="Fairhaven Yachts Logo" />
          </a>
        </div>
        <div className="links">
          {navLinks.map((link, index) => renderLink(link, index))}

          {/* For smaller screen */}
          <div className={openNav ? "menuIcon inactive" : "menuIcon"} >
            <div className="icons-container">

              <a href="tel:1-206-940-9088" >
                <TiPhoneOutline className='icon phone-icon' />
              </a>

              <CiMenuFries className='icon' onClick={() => setOpenNav(!openNav)} />
            </div>
          </div>
          <div className={openNav ? "menu active" : "menu"}>
            <IoCloseOutline className='closeIcon' onClick={() => setOpenNav(!openNav)} />
            <a href="/" className='logoLink'>
              <img src="/logo.webp" alt="Fairhaven Yachts Logo" />
            </a>
            {navLinks.map((link, index) => renderLink(link, index))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar