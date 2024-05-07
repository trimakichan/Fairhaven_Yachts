
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useContext } from "react";
import { NavContext } from "../contexts/navContext";

const Layout = () => {
    const {openNav, setOpenNav} = useContext(NavContext);

    return (
        <>
            <div className="layout" onClick={() => openNav ? setOpenNav(!openNav) : ''}>
                <Navbar />
                <div className="content" >
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout