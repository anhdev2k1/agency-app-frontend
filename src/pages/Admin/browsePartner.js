import { Button, Space, Table, Tabs, Tag, Modal, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const BrowsePartner = () => {
  const [partners, setPartners] = useState([]);
  const [isReload, setIsReload] = useState(false)
  const getPartner = async () => {
    const res = await axios.get("https://agency-app-backend.vercel.app/api/admin/partner");
    console.log(res.data.data);
    setPartners(res.data.data);
  };
  useEffect(() => {
    getPartner();
  }, [isReload]);
  const handleBrowsePartner = (id) => {
    setIsReload(false)
    const isAcceptPartner = async () => {
        await axios.patch(`https://agency-app-backend.vercel.app/api/admin/partner/${id}`,{
            role: 2
        })
    }
    isAcceptPartner()
    setIsReload(true)
  }
  console.log(partners);
  const columns = [
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Người tạo",
      dataIndex: "user",
      key: "user",
      render: (user) =>
        user ? (
          <span>{user.name}</span>
        ) : (
          <Tag color="red">Tài khoản đã khoá</Tag>
        ),
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
      title: "Trạng thái",
      key: "partnerAt",
      dataIndex: "user",
      render: (status) =>
        status ? (
          <Tag color="purple">Chưa duyệt</Tag>
        ) : (
          <Tag color="green">Đã duyệt</Tag>
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
      render: (_, record) =>
        record.user ? (
          record.user.role === 1 ? (
            <Space size="middle">
              <Popconfirm
                title="Bạn có muốn duyệt đối tác này không?"
                description={`${record.name}`}
                onConfirm={() => handleBrowsePartner(record.user._id)}
                okText="Chấp nhận"
                cancelText="Hủy"
                
              >
                <Button type="primary">Duyệt đối tác</Button>
              </Popconfirm>
            </Space>
          ) : (
            <Space size="middle">
              <Button disabled={true} type="primary">
                Duyệt đối tác
              </Button>
            </Space>
          )
        ) : null,
    },
  ];
  const tabs = [
    {
      label: `Chưa duyệt`,
      key: 1,
      children: (
        <Table
          columns={columns}
          dataSource={partners.filter((item) => item.partnerAt && item.user.role === 1)}

        />
      ),
    },
    // {
    //   label: `Đã duyệt`,
    //   key: 2,
    //   children: <Table columns={columns} dataSource={partners} />,
    // },
  ];
  return (
    <>
      <div class="wrapper">
        <h2>Duyệt đối tác</h2>
        <div class="account__wrapper">
          <div>
            <Tabs defaultActiveKey="1" items={tabs} type="card" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowsePartner;
