import "./sidebarUser.scss";
import avt from "../../assets/images/avt-user.png";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  FileTextOutlined,
  HomeOutlined,
  IdcardOutlined,
  FileDoneOutlined,
  MessageOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
const SideBarUser = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Tài khoản của tôi", "sub1", <UserOutlined />, [
      getItem(
        <Link to="/user/account/profile">
          <span>Hồ sơ</span>
        </Link>,
        "1",
        <IdcardOutlined />
      ),
      getItem(
        <Link to="/user/account/address">
          <span>Địa chỉ</span>
        </Link>,
        "2",
        <HomeOutlined />
      ),
      getItem(
        <Link to="/user/account/password">
          <span>Đổi mật khẩu</span>
        </Link>,
        "3",
        <SafetyOutlined />
      ),
    ]),
    getItem(
      <Link to="/user/purchase">
        <span>Đơn mua</span>
      </Link>,
      "sub2",
      <FileTextOutlined />
    ),
    getItem("Thông báo", "sub3", <BellOutlined />, [
      getItem(
        <Link to="/user/notifications/order">
          <span>Cập nhật đơn hàng</span>
        </Link>,
        "4",
        <FileDoneOutlined />
      ),
      getItem(
        <Link to="/user/notifications/rating">
          <span>Cập nhật đánh giá</span>
        </Link>,
        "5",
        <MessageOutlined />
      ),
      getItem(
        <Link to="/user/notifications/system">
          <span>Cập nhật hệ thống</span>
        </Link>,
        "6",
        <SettingOutlined />
      ),
    ]),
  ];
  const user = useSelector((state) => state.user.user);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__avt">
          <img
            src={
              typeof currentUser.url === "undefined"
                ? avt
                : currentUser.url.url[0]
            }
            alt=""
          />
          <div className="sidebar__avt-title">
            <h3 className="avt__title-name">{currentUser.name}</h3>
            <Link to="" className="avt__title-link">
              <EditOutlined style={{ marginRight: "5px" }} />
              <span>Sửa hồ sơ</span>
            </Link>
          </div>
        </div>
        <div className="sidebar__features">
          <Menu
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default SideBarUser;
