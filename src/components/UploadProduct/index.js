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
const UPLOAD = () => {
  const { TextArea } = Input;
  const [newForm] = Form.useForm();
  const [category, setCategory] = useState([]);
  const handleUploadImage = (options) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: "image",
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };
  const pageId = JSON.parse(localStorage.getItem("page")) || ""
  const getCategories = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/api/category",
    });
    setCategory(res.data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const handleCreateFinish = (values) => {
    const product = values;
    product.shop = pageId;
    const createProduct = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/products",
        data: product,
        headers: { "Content-Type": "application/json" },
      });
    };
    createProduct();
  };
  return (
    <>
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
        <Form.Item label="Tên sản phẩm" name="name">
          <Input name="name" />
        </Form.Item>
        <Form.Item label="Danh mục" name="category_id">
          <Select defaultValue="Lựa chọn danh mục" name="category_id">
            {category
              ? category.map((cate, index) => {
                  return (
                    <Select.Option
                      key={index}
                      value={cate._id}
                      name="category_id"
                    >
                      {cate.name}
                    </Select.Option>
                  );
                })
              : null}
          </Select>
        </Form.Item>
        <Form.Item label="Số lượng" name="quantity">
          <InputNumber name="quantity" />
        </Form.Item>
        <Form.Item label="Giá" name="price">
          <InputNumber name="price" />
        </Form.Item>
        <Form.Item label="Nội dung " name="content">
          <TextArea rows={4} name="content" />
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
        <Form.Item label="Thêm">
          <Button type="primary" htmlType="submit">
            Button
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UPLOAD;
