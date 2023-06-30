import "./assets/style/GlobalStyle.scss";
import DefaultLayout from "./layouts/DefaultLayout";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./redux/features/userSlice";
import UserLayout from "./layouts/UserLayout";
import { addToCart } from "./redux/features/CartSlice";
import SellerLayout from "./layouts/SellerLayout";
import AdminLayout from "./layouts/AdminLayout"
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = JSON.parse(localStorage.getItem("token")) || {};
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await axios({
        method: "POST",
        url: "https://agency-app-backend.vercel.app/api/auth/currentUser",
        data: { token },
        headers: { "Content-Type": "application/json" },
      });

      dispatch(checkUser(res.data.data));
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getAllCart = async () => {
      const res = await axios({
        method: "POST",
        url: "https://agency-app-backend.vercel.app/api/cartUser",
        data: { token },
        headers: { "Content-Type": "application/json" },
      });
      res.data.data.map((item) =>
        dispatch(addToCart({ ...item.product_id, quantity_p: item.quantity_p }))
      );
    };
    getAllCart();
  }, [user]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout =
              route.layout === null
                ? Fragment
                : route.layout === "user"
                ? UserLayout
                : route.layout === "seller"
                ? SellerLayout
                : route.layout === "admin" ? AdminLayout : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
