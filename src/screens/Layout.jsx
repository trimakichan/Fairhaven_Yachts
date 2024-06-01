/* eslint-disable no-unused-vars */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar/Navbar";
import { useContext, useEffect } from "react";
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
                <div className={openNav || isSliderOn ? 'lock' : ''} >
                    <div className='content' >
                        <Outlet />
                    </div>
                    <Footer />
                </div>


            </div>
        </>
    )
}

// const ProtectedRoute = () => {
//     const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
//     const location = useLocation();

//     useEffect(() => {
//         if (location.pathname === '/fy-admin' && !user) {
//             console.log("Attempting to redirect...");
//             loginWithRedirect();
//         }

//     }, [loginWithRedirect, location.pathname, user]);

//     // if (isLoading) {
//     //     return <div >Loading ...</div>;
//     // }

//     return isAuthenticated &&
//         (<div className="layout">
//             <Outlet />
//         </div>)


// }

export default Layout

