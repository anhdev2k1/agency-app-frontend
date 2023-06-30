import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUser } from "../../redux/features/userSlice";
const Register = () => {
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const createUser = async (data) => {
    try {
      messageApi.loading("Đợi 1 tý nhé!...")
      const res = await axios({
        method: "POST",
        url: "https://agency-app-backend.vercel.app/api/auth/user/register",
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(checkUser(res.data.data._doc));
      setCurrentUser(res.data.data);
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      messageApi.success("Đăng kí thành công! Đợi 1 tý nhé...")
      setTimeout(() => {
        navigate("/explore")
      },1000)
      // navigate("/signup/verifyCode",{
      //   state:{
      //     emailRegister:data.email
      //   }
      // })
    } catch (error) {
      setError(error.response.data.error);
      messageApi.error(`${error.response.data.error}`)
    }
  };
  const onFinish = (values) => {
    const { confirm, ...rest } = values;
    createUser(rest);
  };
  return (
    <>
      <div className="form__container">
      {contextHolder}
        <div className="circle__one circle"></div>
        <div className="circle__two circle"></div>
        <h2 className="form__container-title">ĐĂNG KÝ TÀI KHOẢN</h2>
        <Form
          form={form}
          onFinish={onFinish}
          scrollToFirstError
          className="form"
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Họ Tên"
            className="form__input"
            tooltip="Bạn muốn tôi gọi bạn với cái tên gì nào ?"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên!",
              },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
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
              { min: 6, message: "Độ dài tối thiểu 6 kí tự!" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              style={{ height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            className="form__input"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu bạn đã nhập không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              style={{ height: "50px" }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="form__btn">
            Register
          </Button>
          <div className="title__login">
            <span>Bạn đã có tài khoản ?</span>{" "}
            <span>
              <Link to="/login">Đăng nhập</Link>
            </span>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
