import { Button, Space, Table, Tag } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./styles/manageProduct.scss"
const ManageProduct = () => {
    const idShop = JSON.parse(localStorage.getItem("page")) || ""
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts();
    },[])
    const getProducts = async () => {
        const res = await axios({
            method: 'get',
            url: `http://localhost:5000/api/products/${idShop}`,
            headers: { "Content-Type": "application/json" }
        })
        console.log(res.data.data);
        setProducts(res.data.data)
    }
    
    const columns = [
        {
          title: 'Hình ảnh',
          dataIndex: 'url',
          key: 'url',
          render: (_,text) => (
            <img src={text.image.url[0]} alt="" />
          ),
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
            render: (_,text) => (
              <Tag color="blue">{text.category_id.name}</Tag>
            )
        },
        {
            title: 'Mô tả',
            dataIndex: 'content',
            key: 'content',
        },
        {
          title: 'Thao tác',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              
              <Button type="primary">
                Xoá
              </Button>
            </Space>
          ),
        },
    ];
      
    return ( 
        
        <>
        <h1>Quản lý sản phẩm</h1>
        <div class="manage__product">
        <Table columns={columns} dataSource={products}  />
        </div>
        </>
        
     );
}
 
export default ManageProduct;