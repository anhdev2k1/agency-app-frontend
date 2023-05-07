import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/manageProduct.scss';
import { Link } from 'react-router-dom';
const { Paragraph } = Typography;

const ManageProduct = () => {
  const idShop = JSON.parse(localStorage.getItem('page')) || '';
  const [products, setProducts] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
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
      render: (_, record) =>
        !record.deletedAt && (
          <Space size='middle'>
            <Button type='primary'>
              <Link to={`/shop/editProduct/${record._id}`}>Edit</Link>
            </Button>
            <Popconfirm
              title='Bạn có muốn xóa sản phẩm này?'
              description={`${record.name}`}
              onConfirm={() => handleDeleteProduct(record._id)}
              okText='Xóa'
              cancelText='Hủy'
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  const handleDeleteProduct = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/product/${id}`,
    });

    if (res.status === 200) {
      messageApi.open({
        type: 'success',
        content: 'Xóa sản phẩm thành công',
      });
      setProducts(
        (pre) => (pre[pre.indexOf((p) => p.deletedAt)].deletedAt = new Date())
      );
    }
  };

  const rowClassName = (record) => {
    if (record.deletedAt) {
      return 'ant-table-row-red';
    }
    return '';
  };

  return (
    <>
      {contextHolder}
      <h1>Quản lý sản phẩm</h1>
      <Table
        columns={columns}
        dataSource={products}
        rowClassName={rowClassName}
      />
    </>
  );
};

export default ManageProduct;
