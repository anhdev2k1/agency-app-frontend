import { Button, Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Radio, Tabs } from "antd";
import "./allAccount.scss"
const AllAccount = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false)
  useEffect(() => {
    getProducts();
  }, [reload]);
  const getProducts = async () => {
    const res = await axios({
      method: "get",
      url: `https://agency-app-backend.vercel.app/api/auth/users`,
      headers: { "Content-Type": "application/json" },
    });
    setUsers(res.data.data);
  };
  const handleDelete = (UserId) => {
    const deleteUser = async () => {
      setReload(false)
      await axios.delete(`https://agency-app-backend.vercel.app/api/auth/user/${UserId}`)
    }
    deleteUser()
    setReload(true)
  }
  const columns = [
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (role) =>
        role ? (
          <span>{role}</span>
        ) : (
          <Tag color="red">Chưa cập nhật số điện thoại</Tag>
        ),
    },
    {
      title: "Vai trò",
      key: "role",
      dataIndex: "role",
      render: (role) =>
        role === 1 ? (
          <Tag color="blue">Khách hàng</Tag>
        ) : role === 2 ? (
          <Tag color="green">Đối tác</Tag>
        ) : (
          <Tag color="pink">Quản trị viên</Tag>
        ),
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      render: (address) =>
        address ? (
          <span>{address}</span>
        ) : (
          <Tag color="red">Chưa cập nhật địa chỉ</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleDelete(record._id)}>Xoá</Button>
        </Space>
      ),
    },
  ];
  const tabs = [
    {
        label: `Người dùng`,
        key: 1,
        children: (
          <Table columns={columns} dataSource={users.filter(user => !user.deletedAt)} />
        ),
      },
      {
        label: `Đối tác`,
        key: 2,
        children: (
          <Table columns={columns} dataSource={users.filter(user => user.role === 2 && !user.deletedAt)} />
        ),
      },
      {
        label: `Quản trị viên`,
        key: 3,
        children: (
          <Table columns={columns} dataSource={users.filter(user => user.role === 3 && !user.deletedAt)} />
        ),
      },
  ]
  return (
    <>
      <div class="wrapper">
        <h2>Tất cả tài khoản</h2>
        <div class="account__wrapper">
          <div>
            <Tabs
              defaultActiveKey="1"
              items={tabs}
              type="card"
            />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AllAccount;
