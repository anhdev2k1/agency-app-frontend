import Home from '../pages/Home/Home';
import Explore from '../pages/Explore/explore';
import Register from '../pages/Register/register';
import Login from '../pages/Login/login';
import AccountUser from '../pages/User/accountUser';
import AddressUser from '../pages/User/addressUser';
import PasswordUser from '../pages/User/changePassword';
import PurchaseUser from '../pages/User/purchaseUser';
import NotifySystem from '../pages/User/notifySystem';
import NotifyOrder from '../pages/User/notifyOrder';
import NotifyRating from '../pages/User/notifyRating';
import Cart from '../pages/Cart/cart';
import DetailProduct from '../pages/DetailProduct/detail';
import Transaction from '../pages/Transaction/transaction';
import ResultPage from '../components/ResultPage/result';
import ProfileShop from '../pages/Seller/profileShop';
import CreateShop from '../pages/Seller/createShop';
import OrderShop from '../pages/Seller/OrderShop';
import DetailOrder from '../pages/Seller/detailOrder';
import ManageProduct from '../pages/Seller/manageProduct';
import Stats from '../pages/Seller/Stats';
import ManageAdmin from '../pages/Admin/manageAdmin';
import AddCategory from '../pages/Admin/AddCategory';
import AllAccount from '../pages/Admin/allAccount';
import SearchPage from '../pages/SearchPage';
import CreateProduct from '../pages/Seller/createProduct';
import EditProduct from '../pages/Seller/editProduct';
import Categories from '../pages/Admin/Categories';
import EditCategory from '../pages/Admin/EditCategory';
import AdminStats from '../pages/Admin/AdminStats';
import PageShop from '../pages/Seller/pageShop';
import ResultPartner from '../pages/ResultPartner/resultPartner';
import BrowsePartner from '../pages/Admin/browsePartner';
import VerifyCode from '../pages/VerifyCode/verifyCode';
const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: null,
  },
  {
    path: '/signup/verifyCode',
    component: VerifyCode,
    layout: null,
  },
  {
    path: '/explore',
    component: Explore,
  },
  {
    path: '/:path/search',
    component: SearchPage,
  },
  {
    path: '/:path/search',
    component: SearchPage,
  },
  {
    path: '/cart',
    component: Cart,
  },

  {
    path: '/transaction',
    component: Transaction,
  },
  {
    path: '/product/:id/shop/:idShop',
    component: DetailProduct,
  },
  {
    path: '/transaction/result',
    component: ResultPage,
  },
  {
    path: '/register',
    component: Register,
    layout: null,
  },
  {
    path: '/login',
    component: Login,
    layout: null,
  },
  {
    path: '/user/account/profile',
    component: AccountUser,
    layout: 'user',
  },
  {
    path: '/user/account/address',
    component: AddressUser,
    layout: 'user',
  },
  {
    path: '/user/account/password',
    component: PasswordUser,
    layout: 'user',
  },
  {
    path: '/user/purchase',
    component: PurchaseUser,
    layout: 'user',
  },
  {
    path: '/user/notifications/system',
    component: NotifySystem,
    layout: 'user',
  },
  {
    path: '/user/notifications/order',
    component: NotifyOrder,
    layout: 'user',
  },
  {
    path: '/user/notifications/rating',
    component: NotifyRating,
    layout: 'user',
  },

  /*-------SELLER ROUTE-------- */
  {
    path: '/signin/partner',
    component: ResultPartner,
    layout: null
  },
  {
    path: '/shop/:id',
    component: ProfileShop,
    layout: 'seller',
  },
  {
    path: '/shop/create',
    component: CreateShop,
    layout: null,
  },
  {
    path: '/shop/order',
    component: OrderShop,
    layout: 'seller',
  },
  {
    path: '/shop/order/:id',
    component: DetailOrder,
  },
  {
    path: '/shop/createProduct',
    component: CreateProduct,
    layout: 'seller',
  },
  {
    path: '/shop/editProduct/:id',
    component: EditProduct,
    layout: 'seller',
  },
  {
    path: '/shop/product',
    component: ManageProduct,
    layout: 'seller',
  },
  {
    path: '/shop/stats',
    component: Stats,
    layout: 'seller',
  },
  {
    path: '/shop/home',
    component: PageShop,
  },
  /*-------Admin ROUTE-------- */
  {
    path: '/admin',
    component: ManageAdmin,
    layout: 'admin',
  },
  {
    path: '/admin/categories',
    component: Categories,
    layout: 'admin',
  },
  {
    path: '/admin/category/new',
    component: AddCategory,
    layout: 'admin',
  },
  {
    path: '/admin/category/:id/edit',
    component: EditCategory,
    layout: 'admin',
  },
  {
    path: '/admin/accounts',
    component: AllAccount,
    layout: 'admin',
  },
  {
    path: '/admin/accountSeller',
    component: AddCategory,
    layout: 'admin',
  },
  {
    path: '/admin/accountUser',
    component: AddCategory,
    layout: 'admin',
  },
  {
    path: '/admin/productInfringe',
    component: AddCategory,
    layout: 'admin',
  },
  {
    path: '/admin/stats',
    component: AdminStats,
    layout: 'admin',
  },
  {
    path: '/admin/partner',
    component: BrowsePartner,
    layout: 'admin',
  },
];
export { publicRoutes };
