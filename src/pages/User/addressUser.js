import { useEffect, useState } from "react";
import "./_addressUser.scss";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../redux/features/userSlice";
import axios from "axios";
const AddressUser = () => {
  const [infoAdress, setInfoAdress] = useState({});
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [country, setCountry] = useState([]);
  const [stateData, setStateData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateAddress = async (data) => {
    const res = await axios({
      method: "PUT",
      url: "http://localhost:5000/api/auth/user",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(checkUser(res.data.data));
  };
  useEffect(() => {
    setInfoAdress(user);
  }, [user]);
  const onFinish = (values) => {
    const dataUpdate = { _id: user._id, ...values };
    updateAddress(dataUpdate);
    setIsModalOpen(false);
  };
  useEffect(() => {
    const getCountry = async () => {
      const response = await axios({
        method: "get",
        url: "https://provinces.open-api.vn/api/?depth=3",
      });
      setCountry(response.data);
    };
    getCountry();
  }, []);
  const handleChange = (value, rest) => {
    const getCountryId = rest.idCountry;
    const getStateData = country.find(
      (country) => country.code === getCountryId
    );
    setStateData(getStateData.districts);
  };
  return (
    <>
      <div className="user__container">
        <div className="user__container-title">
          <h3 className="user__title-heading" style={{ fontSize: "2rem" }}>
            Địa chỉ của tôi
          </h3>
          <p className="user__title-desc" style={{ fontSize: "1.6rem" }}>
            Quản lý địa chỉ nhận hàng
          </p>
        </div>

        <div className="user__content">
          {typeof infoAdress.address !== "undefined" ? (
            <div className="user__address">
              <div className="user__address-info">
                <h3 className="address__info-name">{infoAdress.name}</h3>
                <p className="address__info">{infoAdress.address}</p>
              </div>
              <div className="user__adress-btn">
                <span className="address__btn-update" onClick={showModal}>
                  Cập nhật
                </span>
              </div>
              <Modal
                title="Cập nhật địa chỉ"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <div className="form__input-flex">
                    <Form.Item label="Họ và tên" name="name">
                      <Input name="name" />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input name="phone" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Chọn Đất Nước"
                    name="country"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select country..."
                      onChange={handleChange}
                    >
                      {Object.entries(country).map((state, index) => {
                        return (
                          <Select.Option
                            value={state[1].name}
                            key={index}
                            idCountry={state[1].code}
                          >
                            {state[1].name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Select States"
                    name="state"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select placeholder="Select States...">
                      {stateData.map((state, index) => {
                        return (
                          <Select.Option value={state.name} key={index}>
                            {state.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Địa chỉ cụ thể" name="address">
                    <TextArea name="address" rows={4} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Form>
              </Modal>
            </div>
          ) : (
            <div className="user__adress-btn">
              <h2>Bạn chưa có địa chỉ !</h2>
              <span className="address__btn-update" onClick={showModal}>
                Cập nhật
              </span>
              <Modal
                title="Cập nhật địa chỉ"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
              >
                <Form
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <div className="form__input-flex">
                    <Form.Item label="Họ và tên" name="name">
                      <Input name="name" value={user.name}/>
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input name="phone" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Chọn Tỉnh/Thành"
                    name="country"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn Tỉnh/Thành..."
                      onChange={handleChange}
                    >
                      {Object.entries(country).map((state, index) => {
                        return (
                          <Select.Option
                            value={state[1].name}
                            key={index}
                            idCountry={state[1].code}
                          >
                            {state[1].name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Chọn Quận/Huyện"
                    name="state"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select placeholder="Chọn Quận/Huyện...">
                      {stateData.map((state, index) => {
                        return (
                          <Select.Option value={state.name} key={index}>
                            {state.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Địa chỉ cụ thể" name="address">
                    <TextArea name="address" rows={4} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" style={{display: "block", marginLeft: "auto", marginRight: "0", width:"120px", height: "40px"}}>
                    Lưu
                  </Button>
                </Form>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressUser;
