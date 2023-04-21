import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUser } from "../../redux/features/userSlice";
const Login = () => {
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const createUser = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/auth/user/login",
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(checkUser(res.data.data));
      setCurrentUser(res.data.data);
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  const onFinish = (values) => {
    createUser(values);
  };
  return (
    <>
      <div className="form__container">
        {Object.keys(currentUser).length !== 0 ? (
          <Navigate to="/explore" replace="true" />
        ) : (
          <p>{error}</p>
        )}
        <div className="circle__one circle"></div>
        <div className="circle__two circle"></div>
        <h2 className="form__container-title">ĐĂNG NHẬP TÀI KHOẢN</h2>
        <Form
          form={form}
          onFinish={onFinish}
          scrollToFirstError
          className="form"
          layout="vertical"
        >
          <Form.Item
            name="email"
            className="form__input"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              style={{ width: "100%", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            className="form__input"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
            // hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              style={{ height: "50px" }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="form__btn">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
