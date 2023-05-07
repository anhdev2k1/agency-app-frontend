import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Image,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadToCloudinary } from '../../cloudinary/cloudinaryHelper';
const ShopProductForm = (props) => {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [newForm] = Form.useForm();
  const [category, setCategory] = useState([]);
  const handleUploadImage = (options) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: 'image',
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };
  const pageId = JSON.parse(localStorage.getItem('page')) || '';
  const getCategories = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/category',
    });
    setCategory(res.data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (props.product && Object.keys(props.product).length > 0) {
      newForm.setFieldsValue({
        ...props.product,
        category_id: props.product.category_id._id,
        url: props.product.image.url[0],
      });
    }
  }, [newForm, category, props.product]);

  const handleSubmitProductForm = (values) => {
    const product = values;
    product.shop = pageId;
    const createProduct = async () => {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/products',
        data: product,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Tạo mới sản phẩm thành công',
        });
        navigate(`/shop/editProduct/${res.data.data._id}`);
      }
    };

    const editProduct = async () => {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/api/product/${props.product._id}/edit`,
        data: product,
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Cập nhật sản phẩm thành công',
        });
      }
    };

    if (props.product && Object.keys(props.product).length > 0) {
      editProduct();
    } else {
      createProduct();
      newForm.resetFields();
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout='horizontal'
        style={{
          maxWidth: 600,
        }}
        onFinish={handleSubmitProductForm}
        form={newForm}
      >
        {props.product && Object.keys(props.product).length > 0 && (
          <Form.Item label='Đường dẫn'>
            <Link
              to={`/product/${props.product._id}`}
              target='_blank'
            >{`localhost:3000/product/${props.product._id}`}</Link>
          </Form.Item>
        )}
        <Form.Item label='Tên sản phẩm' name='name'>
          <Input name='name' />
        </Form.Item>
        <Form.Item label='Danh mục' name='category_id'>
          <Select defaultValue='Lựa chọn danh mục' name='category_id'>
            {category
              ? category.map((cate, index) => {
                  return (
                    <Select.Option
                      key={index}
                      value={cate._id}
                      name='category_id'
                    >
                      {cate.name}
                    </Select.Option>
                  );
                })
              : null}
          </Select>
        </Form.Item>
        <Form.Item label='Số lượng' name='quantity'>
          <InputNumber name='quantity' />
        </Form.Item>
        <Form.Item label='Giá' name='price'>
          <InputNumber name='price' />
        </Form.Item>
        <Form.Item label='Nội dung ' name='content'>
          <TextArea rows={4} name='content' />
        </Form.Item>
        <Form.Item
          label='Upload'
          getValueFromEvent={(value) => value.file?.response?.url}
          name='url'
        >
          <Upload
            accept='image/*'
            name='url'
            listType='picture-card'
            customRequest={handleUploadImage}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        {props.product && Object.keys(props.product).length > 0 && (
          <Form.Item label='Ảnh sản phẩm'>
            <Image width={200} src={props.product.image.url[0]} />
          </Form.Item>
        )}
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type='primary' htmlType='submit'>
            {props.product && Object.keys(props.product).length > 0
              ? 'Cập nhật'
              : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ShopProductForm;
