import React from 'react';
import ShopProductForm from '../../components/UploadProduct';
import { Divider } from 'antd';

function CreateProduct() {
  return (
    <>
      <h1>Thêm mới sản phẩm</h1>
      <Divider />
      <ShopProductForm />
    </>
  );
}

export default CreateProduct;
