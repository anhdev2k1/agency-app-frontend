import { Button, Space, Table, Tag, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/manageProduct.scss';
const { Paragraph } = Typography;

const ManageProduct = () => {
  const idShop = JSON.parse(localStorage.getItem('page')) || '';
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      if (idShop) {
        const res = await axios({
          method: 'get',
          url: `http://localhost:5000/api/products/${idShop}`,
          headers: { 'Content-Type': 'application/json' },
        });
        setProducts(res.data.data);
      }
    };
    getProducts();
  }, [idShop]);

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 100,
      render: (_, text) => <img src={text.image.url[0]} alt='' />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (_, text) => <Tag color='blue'>{text.category_id.name}</Tag>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'content',
      key: 'content',
      width: 400,
      render: (text) => <Paragraph ellipsis={{ rows: 2 }}>{text}</Paragraph>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary'>Edit</Button>
          <Button danger>Xoá</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      <Table columns={columns} dataSource={products} />
    </>
  );
};

export default ManageProduct;
