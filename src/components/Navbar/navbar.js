import { Link, useNavigate } from "react-router-dom";
import { Input, Select, message } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { checkDataSearch } from "../../redux/features/searchSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [searchData, setSearchData] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  console.log(user.partnerAt !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleNavigateShop = () => {
    if (user.partnerAt && user.role === 1) {
      navigate("/signin/partner");
    }
    if (user.role === 1 && !user.partnerAt) {
      navigate("/shop/create");
    }
    if(user.role === 2){
      const getShop = async () => {
        const res = await axios({
          method: "GET",
          url: `https://agency-app-backend.vercel.app/api/shop/${user._id}/content`,
          headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("page", JSON.stringify(res.data.data._id));
        navigate(`/shop/${res.data.data._id}`);
      };
      getShop();
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.length === 0) {
      messageApi.warning("Vui lòng nhập thông tin cần tìm kiếm!");
    } else {
      dispatch(checkDataSearch(searchData));
      navigate(`/product/search?q=${searchData}`);
      setSearchData("");
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    messageApi.loading("Đang đăng xuất...");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const handleRedirect = (e) => {
    const { id } = e.target.dataset;
    if (id === "purchase") {
      navigate("/user/purchase", {
        state: {
          selected: "sub2",
        },
      });
    } else if (id === "profile") {
      navigate("/user/account/profile", {
        state: {
          selected: "1",
        },
      });
    }
  };
  return (
    <nav className="navbar">
      {contextHolder}
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
            <input
              type="text"
              class="navbar__search-input"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <div class="navbar__search-btn" onClick={handleSearch}>
              <SearchOutlined />
            </div>
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
                <div
                  data-id="profile"
                  className="user__dropdown-item"
                  onClick={handleRedirect}
                >
                  <ProfileOutlined style={{ marginRight: "5px" }} />
                  <li data-id="profile">Hồ sơ</li>
                </div>

                <div
                  className="user__dropdown-item"
                  onClick={handleRedirect}
                  data-id="purchase"
                >
                  <ContainerOutlined style={{ marginRight: "5px" }} />
                  <li data-id="purchase">Đơn hàng</li>
                </div>
                <Link
                  to=""
                  className="user__dropdown-item"
                  onClick={handleLogout}
                >
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
