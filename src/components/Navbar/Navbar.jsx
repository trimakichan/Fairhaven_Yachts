/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import './navbar.scss';

import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { NavContext } from '../../contexts/navContext';


const Navbar = () => {
  const { openNav, setOpenNav } = useContext(NavContext);

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

  //if openNav is true and click outside the menu, then openNav to false
  return (
    <nav className='navbar'>
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
              <img src="/logo.webp" alt="Fairhaven Yachts Logo"  />
            </a>
            {navLinks.map(link => renderLink(link))}


          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar