/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const NavContext = createContext({})

export const NavProvider = ({ children }) => {
    const [openNav, setOpenNav] = useState(false);
    console.log('NavContext openNave:', openNav)

    return ( 
        <NavContext.Provider value={{ openNav, setOpenNav }}>
            {children}
        </NavContext.Provider>
    )
}