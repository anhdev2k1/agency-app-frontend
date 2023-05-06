import React, { useEffect, useState } from 'react';
import ShopProductForm from '../../components/UploadProduct';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/product/${id}`);

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
      <ShopProductForm product={product} />
    </>
  );
}

export default EditProduct;
