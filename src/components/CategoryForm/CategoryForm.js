import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Upload, message } from 'antd';
import axios from 'axios';
import { convertToSlug } from '../../ultis/convertSlug';
import { uploadToCloudinary } from '../../cloudinary/cloudinaryHelper';
import { useNavigate } from 'react-router-dom';

function CategoryForm(props) {
  const [newForm] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (props.category && Object.keys(props.category).length > 0) {
      newForm.setFieldsValue(props.category);
    }
  }, [newForm, props.category]);

  const handleUploadImage = (options) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: 'image',
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };

  const handleSubmitFinish = (values) => {
    const category = {
      ...values,
      slug: values.slug ? values.slug : convertToSlug(values.name),
    };
    const createCategory = async () => {
      const res = await axios({
        method: 'POST',
        url: 'https://agency-app-backend.vercel.app/api/category',
        data: category,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Tạo mới thành công',
        });
        navigate(`/admin/category/${res.data.data._id}/edit`);
      }
    };

    const updateCategory = async () => {
      const res = await axios({
        method: 'PATCH',
        url: `https://agency-app-backend.vercel.app/api/category/${props.category._id}`,
        data: category,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Cập nhật thành công',
        });
      }
    };

    if (props.category && Object.keys(props.category).length > 0) {
      updateCategory();
    } else {
      createCategory();
    }
  };

  return (
    <div>
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
        onFinish={handleSubmitFinish}
        form={newForm}
      >
        <Form.Item label='Tên danh mục' name='name'>
          <Input name='name' />
        </Form.Item>
        <Form.Item label='Slug' name='slug'>
          <Input name='slug' />
        </Form.Item>
        <Form.Item
          label='Ảnh'
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
        {props.category && Object.keys(props.category).length > 0 && (
          <Form.Item label='Ảnh sản phẩm'>
            <Image width={200} src={props.category.url.url[0]} />
          </Form.Item>
        )}
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type='primary' htmlType='submit'>
            {props.category && Object.keys(props.category).length > 0
              ? 'Cập nhật'
              : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryForm;
