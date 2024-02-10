
import './App.css';
import Home from './Components/home/Home';
import Cart from './Components/cart/Cart';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Menu from './Components/menu/Menu';
import CheckoutPage from './Components/checkout/Checkout';
import OrderConfirmationPage from './Components/Orderplaced/Orderplaced';
// const [toggle, setToggle] = useState();


function App() {
 
  
  
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />, // Pass the prop here
      children: [{
        path: 'cart',
        element: <Cart />
      }]
    },
    {
      path: '/menu',
      element: <Menu />
    },
    {
      path: '/checkout',
      element: <CheckoutPage />
    },
    {
      path: '/placed',
      element: <OrderConfirmationPage />
    }
  ])

  return <div className='App'>
    <RouterProvider router={router} />
  </div>

}

export default App;
