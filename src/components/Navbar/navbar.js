import { Link, useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  BellOutlined,
  ShopOutlined,
  ProfileOutlined,
  ContainerOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import avt from "../../assets/images/avt-user.png";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
const { Search } = Input;
const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const [getCategory, setCategory] = useState([]);
  const fetchCategory = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/api/category",
    });
    setCategory(res.data.data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleNavigateShop = () => {
    if (user.role === 1) {
      navigate("/shop/create");
    } else {
      const getShop = async () => {
        const res = await axios({
          method: "GET",
          url: `http://localhost:5000/api/shop/${user._id}/content`,
          headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("page",JSON.stringify(res.data.data._id))
        navigate(`/shop/${res.data.data._id}`);
      };
      getShop();
    }
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__flex">
          <Link to="/explore">
            <h1 className="navbar__logo">RONX.</h1>
          </Link>
          <div className="navbar__seller" onClick={handleNavigateShop}>
            <ShopOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
            <span>Kênh người bán</span>
          </div>
          <div className="navbar__search">
            <Select
              className="search__category"
              defaultValue="quần áo"
              size="large"
              options={getCategory.map((cate) => {
                return {
                  value: cate.name,
                  label: cate.name,
                };
              })}
            />
            <Search
              placeholder="Nhập thông tin cần tìm..."
              enterButton={<SearchOutlined />}
              size="large"
              className="search__input"
              height="80px"
            />
          </div>
          <div className="navbar__ultis">
            <Link to="/cart">
              <div className="ulti__bag-wrapper">
                <ShoppingOutlined
                  className="navbar__ultis-bag"
                  style={{
                    fontSize: "25px",
                    paddingRight: "30px",
                    cursor: "pointer",
                    color: "#333",
                  }}
                />
                <span className="number__ulti">{cart.length}</span>
              </div>
            </Link>
            <div className="ulti__noti-wrapper">
              <BellOutlined
                className="navbar__ultis-bag"
                style={{ fontSize: "25px", cursor: "pointer", color: "#333" }}
              />
              <span className="number__ulti" style={{ right: "-8px" }}>
                0
              </span>
            </div>
          </div>
          {Object.keys(currentUser).length !== 0 ? (
            <div className="navbar__user">
              <div className="navbar__user-avatar">
                <img
                  src={
                    typeof currentUser.url === "undefined"
                      ? avt
                      : currentUser.url.url[0]
                  }
                  alt="avatar user"
                />
                <span>{`Hi, ${currentUser.name}!`}</span>
              </div>
              <ul className="navbar__user-dropdown">
                <Link
                  to="/user/account/profile"
                  className="user__dropdown-item"
                >
                  <ProfileOutlined style={{ marginRight: "5px" }} />
                  <li>Hồ sơ</li>
                </Link>

                <Link to="/user/purchase" className="user__dropdown-item">
                  <ContainerOutlined style={{ marginRight: "5px" }} />
                  <li>Đơn hàng</li>
                </Link>
                <Link to="" className="user__dropdown-item">
                  <LogoutOutlined style={{ marginRight: "5px" }} />
                  <li>Đăng xuất</li>
                </Link>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="navbar__login">
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
