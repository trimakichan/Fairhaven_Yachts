import './assets/sass/main.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './screens/Layout';
import HomePage from './screens/HomePage';
import Listings from './screens/Listings';
import SellYachts from './screens/SellYachts';
import About from './screens/About'
import Contact from './screens/Contact'
import ListingDetails from './screens/ListingDetails';

function App() {
  const router = createBrowserRouter([{
    path:"/",
    element: <Layout/>,
      children: [
        {path: '/',
          element: <HomePage />
        }, {
          path: 'buy',
          element: <Listings />
        },
        {
          path: 'sell',
          element: <SellYachts />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: '/:id',
          element: <ListingDetails />
        }
      ]
  }])

  return (
    <RouterProvider router={router} />
  )
}

export default App
