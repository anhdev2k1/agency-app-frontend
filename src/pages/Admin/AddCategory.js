import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../cloudinary/cloudinaryHelper";
import { convertToSlug } from "../../ultis/convertSlug";
const AddCategory = () => {
  const [newForm] = Form.useForm();
  const handleUploadImage = (options) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: "image",
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };
  const handleCreateFinish = (values) => {
    const category = {...values, slug: convertToSlug(values.name)};
    const createCategory = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/category",
        data: category,
        headers: { "Content-Type": "application/json" },
      });
    };
    createCategory();
    console.log(category);
  };
  return (
    <div className="form__wrapper">
      <h2>Add category</h2>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        onFinish={handleCreateFinish}
        form={newForm}
      >
        <Form.Item label="Tên danh mục" name="name">
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="Upload"
          getValueFromEvent={(value) => value.file?.response?.url}
          name="url"
        >
          <Upload
            accept="image/*"
            name="url"
            listType="picture-card"
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
        <Button type="primary" htmlType="submit">
          Thêm danh mục
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
