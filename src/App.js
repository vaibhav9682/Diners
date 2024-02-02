
import './App.css';
import Home from './Components/Home';


import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Pass the prop here
    
  }
])

function App() {
  return <div className='App'>
   <RouterProvider router={router} />
  </div>

}

export default App;
