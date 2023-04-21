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
const SidebarSeller = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const pageID = JSON.parse(localStorage.getItem("page"))
  const items = [
    getItem("Quản lý shop", "sub1", <UserOutlined />, [
      getItem(
        <Link to={`/shop/${pageID}`}>
          <span>Trang trí shop</span>
        </Link>,
        "1",
        <IdcardOutlined />
      ),
      getItem(
        <Link to="/shop/category">
          <span>Danh mục shop</span>
        </Link>,
        "2",
        <HomeOutlined />
      ),
    ]),

    getItem("Quản lý đơn hàng", "sub2", <FileTextOutlined />, [
      getItem(
        <Link to="/shop/order">
          <span>Tất cả</span>
        </Link>,
        "3",
        <FileDoneOutlined />
      ),
      getItem(
        <Link to="/shop/orderFail">
          <span>Đơn hủy</span>
        </Link>,
        "4",
        <MessageOutlined />
      ),
    ]),
    getItem("Quản lý sản phẩm", "sub3", <FileTextOutlined />, [
      getItem(
        <Link to="/shop/product">
          <span>Tất cả sản phẩm</span>
        </Link>,
        "5",
        <FileDoneOutlined />
      ),
      getItem(
        <Link to="/shop/createProduct">
          <span>Thêm sản phẩm</span>
        </Link>,
        "6",
        <MessageOutlined />
      ),
      getItem(
        <Link to="/shop/foulProduct">
          <span>Sản phẩm vi phạm</span>
        </Link>,
        "7",
        <MessageOutlined />
      ),
    ]),
    getItem("Kênh Marketing", "sub4", <FileTextOutlined />, [
      getItem(
        <Link to="/shop/marketing">
          <span>Công cụ marketing</span>
        </Link>,
        "8",
        <FileDoneOutlined />
      ),
    ]),
    getItem("Thống kê", "sub5", <FileTextOutlined />, [
      getItem(
        <Link to="/shop/stats">
          <span>Thống kê đơn hàng</span>
        </Link>,
        "9",
        <FileDoneOutlined />
      ),
      getItem(
        <Link to="/shop/stats">
          <span>Thống kê doanh thu</span>
        </Link>,
        "10",
        <FileDoneOutlined />
      ),
    ]),
  ];
  return (
    <>
      <div className="sidebar__seller">
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

export default SidebarSeller;
