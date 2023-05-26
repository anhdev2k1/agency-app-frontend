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
          <h3 className="user__title-heading" style={{ fontSize: "2rem", padding: "10px 0"}}>
            Hồ sơ của tôi
          </h3>
          <p className="user__title-desc" style={{ fontSize: "1.6rem" }}>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>

        <div
          className="user__content"
          style={{ width: "600px", minHeight: "300px", margin: "50px auto" }}
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="vertical"
            onFinish={handleCreateFinish}
            form={newForm}
          >
            <Form.Item label="Tên" name="name">
              <Input name="name" value={user.name}/>
            </Form.Item>
            <Form.Item label="Email">
              <Input name="email" value={user.email} disabled/>
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input name="phone" value={!user.phone ? "Chưa cập nhật" : user?.phone} disabled/>
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
              <Button type="primary" htmlType="submit" style={{width: "120px", height: "40px", display: "block", margin: "0 auto"}}>
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
