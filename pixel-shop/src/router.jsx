import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
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
            { path: '*', element: <NotFound /> },
        ],
    },
])