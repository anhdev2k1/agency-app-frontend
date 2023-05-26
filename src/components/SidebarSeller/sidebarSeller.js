import avt from '../../assets/images/avt-user.png';
import { Link, useLocation } from 'react-router-dom';
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
} from '@ant-design/icons';
import { Menu } from 'antd';
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
  const pageID = JSON.parse(localStorage.getItem('page'));
  const {state} = useLocation()
  const {path} = state || "1"
  const items = [
    getItem('Quản lý shop', 'sub1', <UserOutlined />, [
      getItem(
        <Link to={`/shop/${pageID}`}>
          <span>Trang trí shop</span>
        </Link>,
        '1',
        <IdcardOutlined />
      ),

    ]),

    getItem('Quản lý đơn hàng', 'sub2', <FileTextOutlined />, [
      getItem(
        <Link to='/shop/order'>
          <span>Tất cả</span>
        </Link>,
        '3',
        <FileDoneOutlined />
      ),
    ]),
    getItem('Quản lý sản phẩm', 'sub3', <FileTextOutlined />, [
      getItem(
        <Link to='/shop/product'>
          <span>Tất cả sản phẩm</span>
        </Link>,
        '5',
        <FileDoneOutlined />
      ),
      getItem(
        <Link to='/shop/createProduct'>
          <span>Thêm sản phẩm</span>
        </Link>,
        '6',
        <MessageOutlined />
      ),
      getItem(
        <Link to='/shop/foulProduct'>
          <span>Sản phẩm vi phạm</span>
        </Link>,
        '7',
        <MessageOutlined />
      ),
    ]),
    getItem('Kênh Marketing', 'sub4', <FileTextOutlined />, [
      getItem(
        <Link to='/shop/marketing'>
          <span>Công cụ marketing</span>
        </Link>,
        '8',
        <FileDoneOutlined />
      ),
    ]),
    getItem(
      <Link to='/shop/stats'>
        <span>Thống kê</span>
      </Link>,
      'link',
      <FileTextOutlined />
    ),
  ];
  return (
    <>
      <div className='sidebar__seller'>
        <div className='sidebar__features'>
          <Menu
            style={{
              width: 256,
            }}
            defaultSelectedKeys={"1"}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default SidebarSeller;
