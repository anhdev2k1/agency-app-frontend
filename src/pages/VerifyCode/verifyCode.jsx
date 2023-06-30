import { Button, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "./verifyCode.scss";
import axios from "axios";
import { checkUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const VerifyCode = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {state} = useLocation()
  const {emailRegister} = state
  const onFinish = (values) => {
    const { email, code } = values;
    const sendVerifyCode = async () => {
      try {
        const res = await axios.post(
          "https://agency-app-backend.vercel.app/api/auth/user/verifyCode",
          {
            email: emailRegister,
            code,
          }
        );
        console.log(res.data.data);
        dispatch(checkUser(res.data.data));
        // setCurrentUser(res.data.data);
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        navigate("/explore");
      } catch (error) {
        messageApi.error(error.response.data.error);
      }
    };
    sendVerifyCode();
  };
  return (
    <>
      <div className="verify__wrapper">
        {contextHolder}
        <div className="verify__container">
          <h3>Xác nhận Email</h3>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              // name="email"
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
                style={{ width: "100%", height: "30px" }}
                value={emailRegister}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="code"
              className="form__input"
              label="Code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã code!",
                },
              ]}
            >
              <Input style={{ width: "100%", height: "30px" }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="form__btn">
              Xác nhận
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VerifyCode;
