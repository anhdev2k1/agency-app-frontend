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
const SidebarAdmin = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  //   const pageID = JSON.parse(localStorage.getItem("page"))
  const items = [
    getItem("Quản lý tài khoản", "sub1", <UserOutlined />, [
      getItem(
        <Link to={`/admin/accounts`}>
          <span>Tất cả tài khoản</span>
        </Link>,
        "1",
        <IdcardOutlined />
      ),
    ]),
    
    getItem("Quản lý vi phạm", "sub2", <FileTextOutlined />, [
      getItem(
        <Link to="/admin/productInfringe">
          <span>Sản phẩm vi phạm</span>
        </Link>,
        "4",
        <FileDoneOutlined />
      ),
    ]),
    getItem("Thống kê", "sub3", <FileTextOutlined />, [
      getItem(
        <Link to="/admin/statAccount">
          <span>Thống kê tài khoản</span>
        </Link>,
        "5",
        <FileDoneOutlined />
      ),
      getItem(
        <Link to="/admin/statSeller">
          <span>Đối tác</span>
        </Link>,
        "6",
        <MessageOutlined />
      ),
    ]),
    getItem("Quản lý danh mục", "sub4", <FileTextOutlined />, [
      getItem(
        <Link to="/admin/category">
          <span>Thêm danh mục</span>
        </Link>,
        "7",
        <FileDoneOutlined />
      ),
    ]),
  ];
  return (
    <>
      <div className="sidebar__admin">
        <div className="sidebar__features">
          <Menu
            style={{
              width: 256,
            }}
           
            mode="inline"
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
