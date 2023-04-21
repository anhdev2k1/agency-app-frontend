import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/createShop.scss";
import { useSelector } from "react-redux";
import { convertToSlug } from "../../ultis/convertSlug";
import { useNavigate } from "react-router-dom";
const CreateShop = () => {
  const [getCategory, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/api/category",
      });
      setCategory(res.data.data);
    };
    fetchCategory();
  }, []);
  const onFinish = (values) => {
    const { name, category } = values;
    const dataFetching = {
      name,
      user: user._id,
      category,
      slug: convertToSlug(name),
    };
    const createShop = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/shop",
        data: dataFetching,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.status === "success") {
        navigate(`/shop/${res.data.data._id}`);
      } else {
        alert("Tạo cửa hàng lỗi");
      }
    };
    createShop();
  };

  return (
    <>
      {isLoading ? (
        <div class="loading-screen">
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <Form
          onFinish={onFinish}
          autoComplete="off"
          className="form__create-shop"
          layout="vertical"
        >
          <h2 className="form__shop-heading">Tạo cửa hàng</h2>
          <Form.Item
            label="Tên cửa hàng"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên cửa hàng",
              },
            ]}
          >
            <Input name="name" placeholder="Nhập tên cửa hàng của bạn..." />
          </Form.Item>
          <Form.Item label="Danh mục" name="category">
            <Select
              className="search__category"
              size="large"
              // onChange={handleChange}
              defaultValue="Chọn ngách sản phẩm"
              options={getCategory.map((cate) => {
                return {
                  value: cate._id,
                  label: cate.name,
                };
              })}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="btn__shop">
            Tạo cửa hàng
          </Button>
        </Form>
      )}
    </>
  );
};

export default CreateShop;
