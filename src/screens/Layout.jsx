
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useContext } from "react";
import { Contexts } from "../contexts/contexts";
import Footer from "../components/Footer/Footer";

const Layout = () => {
    const { openNav, setOpenNav, isSliderOn, setIsSliderOn } = useContext(Contexts);

    return (
        <>
            <div className="layout" onClick={() => openNav && setOpenNav(!openNav)}>
                <header>
                    <Navbar />
                </header>
                <div className={openNav && 'lock' || isSliderOn && 'lock'} >
                    <div className='content' >
                        <Outlet />
                    </div>
                    <Footer />
                </div>


            </div>
        </>
    )
}

export default Layout

