import { Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { checkUser } from "../../redux/features/userSlice";
const ChangePasswordUser = () => {
  const { _id } = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const [checkPass, setCheckPass] = useState("");
  const updatePassword = async (data) => {
    const res = await axios({
      method: "PUT",
      url: "http://localhost:5000/api/auth/user",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(checkUser(res.data.data));
  };
  const onFinish = (values) => {
    const dataUpdate = { _id, ...values }
    updatePassword(dataUpdate)
    console.log(values);
  };
  const handleCheckPassword = (e) => {
    const { value } = e.target;
    const formData = { id: _id, password: value };
    const checkPassword = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/auth/user/password",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });
      setCheckPass(res.data.status);
    };
    checkPassword();
  };
  return (
    <div className="user__container">
      <div className="user__container-title">
        <h3 className="user__title-heading" style={{ fontSize: "2rem" }}>
          Đổi mật khẩu
        </h3>
        <p className="user__title-desc" style={{ fontSize: "1.6rem" }}>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <div className="user__content">
        <div className="user__form-password">
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: "600px" }}
          >
            <Form.Item
              label="Mật khẩu hiện tại"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                { min: 6, message: "Độ dài tối thiểu 6 kí tự!" },
              ]}
              hasFeedback
              // validateStatus={checkPass === "success" ? "success" : "error"}
            >
              <Input.Password
                name="password"
                style={{ height: "40px" }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                onBlur={handleCheckPassword}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
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
                name="newPassword"
                style={{ height: "40px" }}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu bạn đã nhập không khớp")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                name="confirm"
                style={{ height: "40px" }}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordUser;
