import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { uploadToCloudinary } from "../../cloudinary/cloudinaryHelper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { checkUser } from "../../redux/features/userSlice";
const AccountUser = () => {
  const { newForm } = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const handleCreateFinish = (values) => {
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    let result = Object.filter(values, (value) => value !== undefined);

    if (Object.keys(result).length === 0) {
      return;
    }
    const resultUpdate = { _id: user._id, ...result };
    const updateInfoUser = async () => {
      const res = await axios({
        method: "PUT",
        url: "http://localhost:5000/api/auth/user",
        data: resultUpdate,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(checkUser(res.data.data));
    };
    updateInfoUser();
  };
  const handleUploadImage = (options) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: "image",
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };

  return (
    <>
      <div className="user__container">
        <div className="user__container-title">
          <h3 className="user__title-heading" style={{ fontSize: "2rem" }}>
            Hồ sơ của tôi
          </h3>
          <p className="user__title-desc" style={{ fontSize: "1.6rem" }}>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        
        <div className="user__content">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onFinish={handleCreateFinish}
            form={newForm}
          >
            <Form.Item label="Email đăng nhập">
              <span>info*****@gmail.com</span>
            </Form.Item>
            <Form.Item label="Tên" name="name">
              <Input name="name" value={user.name} />
            </Form.Item>
            <Form.Item label="Email">
              <span>info*****@gmail.com</span>
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <span>038*****25</span>
            </Form.Item>
            <Form.Item
              label="Chọn ảnh"
              name="url"
              getValueFromEvent={(value) => value.file?.response?.url}
            >
              <Upload
                accept="image/*"
                listType="picture-card"
                name="url"
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AccountUser;
