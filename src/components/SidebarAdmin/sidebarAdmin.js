import avt from '../../assets/images/avt-user.png';
import { Link } from 'react-router-dom';
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
    getItem('Quản lý tài khoản', 'sub1', <UserOutlined />, [
      getItem(
        <Link to={`/admin/accounts`}>
          <span>Tất cả tài khoản</span>
        </Link>,
        '1',
        <IdcardOutlined />
      ),
      getItem(
        <Link to={`/admin/partner`}>
          <span>Duyệt đối tác</span>
        </Link>,
        '2',
        <IdcardOutlined />
      ),
    ]),

    // getItem('Quản lý vi phạm', 'sub2', <FileTextOutlined />, [
    //   getItem(
    //     <Link to='/admin/productInfringe'>
    //       <span>Sản phẩm vi phạm</span>
    //     </Link>,
    //     '3',
    //     <FileDoneOutlined />
    //   ),
    // ]),
    getItem(
      <Link to='/admin/stats'>
        <span>Thống kê</span>
      </Link>,
      '4',
      <FileTextOutlined />
    ),
    getItem('Quản lý danh mục', 'sub4', <FileTextOutlined />, [
      getItem(
        <Link to='/admin/categories'>
          <span>Tất cả</span>
        </Link>,
        '5',
        <FileDoneOutlined />
      ),
      getItem(
        <Link to='/admin/category/new'>
          <span>Thêm danh mục</span>
        </Link>,
        '6',
        <FileDoneOutlined />
      ),
    ]),
  ];
  return (
    <>
      <div className='sidebar__admin'>
        <div className='sidebar__features'>
          <Menu
            style={{
              width: 256,
            }}
            mode='inline'
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
