/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import './navbar.scss';

import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { NavContext } from '../../contexts/navContext';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'


const Navbar = () => {
  const { openNav, setOpenNav } = useContext(NavContext);

  const { scrollY } = useScroll()
  const [navHidden, setNavHidden] = useState(false);

  // useEffect(() => {
  //   const unsub = scrollY.on("change", (latest) => console.log(latest))
  //   return () => unsub();
  // }, [scrollY])

  useMotionValueEvent(scrollY, "change", (latest) => {

    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 250) {
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

  const renderLink = (link) => (
    <a href={link.href}  >{link.text}</a>
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
          {navLinks.map(link => renderLink(link))}

          {/* For smaller screen */}
          <div className={openNav ? "menuIcon inactive" : "menuIcon"} onClick={() => setOpenNav(!openNav)}>
            <CiMenuFries className='icon' />
          </div>
          <div className={openNav ? "menu active" : "menu"}>

            <IoCloseOutline className='closeIcon' onClick={() => setOpenNav(!openNav)} />
            <a href="/" className='logoLink'>
              <img src="/logo.webp" alt="Fairhaven Yachts Logo" />
            </a>
            {navLinks.map(link => renderLink(link))}


          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar