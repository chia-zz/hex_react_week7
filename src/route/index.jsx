import { createHashRouter } from 'react-router-dom';
import App from '../App.jsx';
// Layouts
import FrontLayout from '../layout/FrontLayout.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';
// 前台
import Home from '../pages/front/Home.jsx';
import Product from '../pages/front/ProductList.jsx';
import ProductDetail from '../pages/front/ProductDetail.jsx';
import Cart from '../pages/front/Cart.jsx';
import Checkout from '../pages/front/Checkout.jsx';
import NotFound404 from '../pages/front/NotFound404.jsx';
// 後台
import AdmLogin from '../pages/admin/AdmLogin.jsx';
import AdmOrder from '../pages/admin/AdmOrder.jsx';
import AdmProducts from '../pages/admin/AdmProducts.jsx';
// import AdmImages from '../pages/admin/AdmImages.jsx';
import AdmNotFound404 from '../pages/admin/AdmNotFound404.jsx';
import ProtectedRouter from '../components/admin/ProtectedRouter.jsx';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // 前台
      {
        path: '/',
        element: <FrontLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'product', element: <Product /> },
          { path: 'product/:id', element: <ProductDetail /> },
          { path: 'cart', element: <Cart /> },
          { path: 'checkout', element: <Checkout /> },
          { path: '*', element: <NotFound404 /> },
        ],
      },
      // 後台登入頁
      {
        path: '/admin/login',
        element: <AdmLogin />,
      },
      // 後台
      {
        path: '/admin',
        element: (
          <ProtectedRouter>
            <AdminLayout />
          </ProtectedRouter>
        ),
        children: [
          { index: true, element: <AdmProducts /> },
          { path: 'orders', element: <AdmOrder /> },
          { path: 'products', element: <AdmProducts /> },
          // { path: 'images', element: <AdmImages /> },
          { path: '*', element: <AdmNotFound404 /> },
        ],
      },
    ],
  },
]);

export default router;
