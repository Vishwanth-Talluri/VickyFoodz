import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Signup from './pages/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './pages/MyOrder';

const router=createBrowserRouter([
  {path:'/',
  element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },{
    path:'/my-orders',
    element:<MyOrder/>
  }
])

function App() {
  return (
    <CartProvider>
    <div>
      <div>
        {
          <RouterProvider router={router}/>
        }
      </div>
    </div>
    </CartProvider>
  );
}

export default App;
