/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const Contexts = createContext({})

export const ContextsProvider = ({ children }) => {
    const [openNav, setOpenNav] = useState(false);
    const [isSliderOn, setIsSliderOn] = useState(false);
    const [isImageSliderOn, setIsImageSliderOn] = useState(false);

    return (
      <Contexts.Provider
        value={{
          openNav,
          setOpenNav,
          isSliderOn,
          setIsSliderOn,
          isImageSliderOn,
          setIsImageSliderOn,
        }}
      >
        {children}
      </Contexts.Provider>
    );
}