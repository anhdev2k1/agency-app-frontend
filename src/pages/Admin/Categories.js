import {
  Button,
  Divider,
  Image,
  Popconfirm,
  Space,
  Table,
  message,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setIsLoading(true);
    const getCategories = async () => {
      const res = await axios.get('http://localhost:5000/api/category');

      if (res.status === 200) {
        setCategories(res.data.data);
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'url',
      key: 'url',
      width: 150,
      render: (url) => <Image preview={false} width={100} src={url.url[0]} />,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) =>
        !record.deletedAt && (
          <Space size='middle'>
            <Button type='primary'>
              <Link to={`/admin/category/${record._id}/edit`}>Edit</Link>
            </Button>
            <Popconfirm
              title='Bạn có muốn xóa danh mục này?'
              description={`${record.name}`}
              onConfirm={() => handleDeleteCategory(record._id)}
              okText='Xóa'
              cancelText='Hủy'
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  const handleDeleteCategory = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/category/${id}`,
    });

    if (res.status === 200) {
      messageApi.open({
        type: 'success',
        content: 'Xóa sản phẩm thành công',
      });

      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category._id === res.data.data._id) {
            return {
              ...category,
              deletedAt: res.data.data.deletedAt,
            };
          }
          return category;
        });
      });
    }
  };

  const rowClassName = (record) => {
    if (record.deletedAt) {
      return 'ant-table-row-red';
    }
    return '';
  };

  return (
    <div>
      {contextHolder}
      <h1>Quản lý danh mục</h1>
      <Divider />
      <Table
        loading={isLoading}
        dataSource={categories}
        columns={columns}
        rowClassName={rowClassName}
      />
      ;
    </div>
  );
}

export default Categories;
