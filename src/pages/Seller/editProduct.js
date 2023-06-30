import React, { useEffect, useState } from 'react';
import ShopProductForm from '../../components/UploadProduct';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Divider } from 'antd';

function EditProduct() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`https://agency-app-backend.vercel.app/api/product/${id}`);

      if (res.status === 200 && res.data.data) {
        setProduct(res.data.data);
      } else {
        navigate('/shop/product');
      }
    };

    getProduct();
  }, [navigate, id]);
  return (
    <>
      <h1>Cập nhật sản phẩm</h1>
      <Divider />
      <ShopProductForm product={product} />
    </>
  );
}

export default EditProduct;
