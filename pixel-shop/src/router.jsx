import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', element: <Checkout /> },
          { path: 'order/success/:id', element: <OrderSuccess /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])