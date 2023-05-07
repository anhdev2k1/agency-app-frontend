import { Button, Form, Input, Radio, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./transaction.scss";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
const Transaction = () => {
  const [country, setCountry] = useState([]);
  const [stateData, setStateData] = useState([]);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const [checked, setChecked] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const confirmOrder = JSON.parse(localStorage.getItem("order")) || [];
  const [messageApi, contextHolder] = message.useMessage()
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

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const handleChange = (value, rest) => {
    const getCountryId = rest.idCountry;
    const getStateData = country.find(
      (country) => country.code === getCountryId
    );
    setStateData(getStateData.districts);
  };

  const getTotal = () => {
    let total = 0;
    confirmOrder.forEach((item) => {
      total += item.quantity_p * item.price;
    });
    return total;
  };
  const createTransaction = async (data) => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/api/transaction",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
  };
  const handleBuy = (values) => {
    if(checked !== null ){
      const bills = {
        user: user._id,
        user_delivery: { ...values },
        amount: getTotal(),
        product: confirmOrder,
        payment: checked,
        shipping_fee: 15000,
      };
      createTransaction(bills);
      messageApi.loading("Đang xử lý giao dịch! Đợi 1 xý nhé...")
      setTimeout(() => {
        navigate("/transaction/result", {
          state: {
            title: "Bạn đã mua hàng thành công!",
            subTitle:
              "Đơn hàng của bạn đã được thông báo tới người bán. Vui lòng đợi người bán xác nhận đơn hàng và chuyển giao đến đơn vị vận chuyển",
            status: "success",
          },
        });
      },1000)
    }else{
      messageApi.error("Vui lòng chọn phương thức thanh toán")
    }
    
  };
  const onChange = (e) => {
    setChecked(e.target.value);
  };

  const handleOrderSuccess = (details, data) => {
    const values = form.getFieldsValue();
    const bills = {
      user: user._id,
      user_delivery: { ...values },
      amount: getTotal(),
      product: confirmOrder,
      paid_at: details.update_time,
      payment: checked,
      shipping_fee: 15000,
    };
    createTransaction(bills);
    messageApi.loading("Đang xử lý giao dịch! Đợi 1 xý nhé...")
    setTimeout(() => {
      navigate("/transaction/result", {
        state: {
          title: "Bạn đã thanh toán thành công!",
          subTitle:
            "Đơn hàng của bạn đã thanh toán thành công. Vui lòng đợi người bán xác nhận đơn hàng và chuyển giao đến đơn vị vận chuyển",
          status: "success",
        },
      });
    })
  };
  return (
    <div className="transaction">
      {contextHolder}
      <div className="container">
        {cart.length > 0 ? (
          <Form
            form={form}
            className="transaction__container"
            layout="vertical"
            onFinish={handleBuy}
          >
            <div className="transaction__info">
              <h2 className="transaction__info-heading">
                Thông tin vận chuyển
              </h2>

              <div className="transaction__info-user">
                <div className="transaction__input-flex">
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    tooltip="Bạn muốn tôi gọi bạn với cái tên gì nào ?"
                    className="input__flex-item"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ tên!",
                      },
                    ]}
                  >
                    <Input
                      name="name"
                      style={{ height: "40px" }}
                      placeholder="Nhập họ tên..."
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    className="input__flex-item"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input
                      name="phone"
                      style={{ height: "40px" }}
                      placeholder="Nhập số điện thoại..."
                    />
                  </Form.Item>
                </div>

                <div className="transaction__input-flex">
                  <Form.Item
                    name="email"
                    label="Email"
                    className="input__flex-item"
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
                      name="email"
                      style={{ height: "40px" }}
                      placeholder="Nhập email..."
                    />
                  </Form.Item>
                  <Form.Item
                    label="Quốc Gia"
                    name="country"
                    className="input__flex-item"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn Quốc Gia..."
                      onChange={handleChange}
                      size="large"
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
                </div>
                <Form.Item
                  label="Tỉnh/Thành"
                  name="state"
                  className="input__flex-item"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Chọn Tỉnh/Thành..." size="large">
                    {stateData.map((state, index) => {
                      return (
                        <Select.Option value={state.name} key={index}>
                          {state.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  className="input__flex-item"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ]}
                >
                  <TextArea rows={4} name="address" />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Ghi chú"
                  className="input__flex-item"
                >
                  <TextArea rows={4} name="message" />
                </Form.Item>
              </div>
              <div className="transaction__info-payment">
                <h2 className="transaction__info-heading">
                  Phương thức thanh toán
                </h2>
                <Form.Item label="Phương thức thanh toán">
                  <Radio.Group name="payment" onChange={onChange}>
                    <Radio name="payment" value={0}>
                      {" "}
                      Thanh toán qua Paypal{" "}
                    </Radio>
                    <Radio name="payment" value={1}>
                      {" "}
                      Thanh toán trực tiếp
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="transaction__order">
              <div className="transaction__order-list">
                {confirmOrder.length > 0 && confirmOrder.map((item) => {
                  return (
                    <div className="order__list-item">
                      <img
                        src={item.image.url[0]}
                        alt=""
                        className="order__item-img"
                      />
                      <div className="order__item-title">
                        <h3 className="item__title-name">{item.name}</h3>
                        <strong className="item__title-price">
                          {item.quantity_p} x {item.price}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="transaction__order-total">
                <div className="order__total-flex">
                  <span>Tổng phụ:</span>
                  <strong>{getTotal()} VNĐ</strong>
                </div>
                <div className="order__total-flex">
                  <span>Cước vận chuyển (15000đ):</span>
                  <strong>15000 VNĐ</strong>
                </div>
                <div className="order__total-flex">
                  <span>Tổng tiền:</span>
                  <strong>{getTotal() + 15000} VNĐ</strong>
                </div>
                {checked === 0 ? (
                  <PayPalButton
                    amount={
                      Math.round(
                        ((getTotal() + 15000) / 24000 + Number.EPSILON) * 100
                      ) / 100
                    }
                    onSuccess={handleOrderSuccess}
                    onError={() => console.log("kHÔNG ĐỦ TIỀN MUA")}
                  />
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="order__btn"
                  >
                    Xác nhận đơn hàng
                  </Button>
                )}
              </div>
            </div>
          </Form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
