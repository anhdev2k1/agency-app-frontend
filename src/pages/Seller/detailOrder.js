import {
  FileTextOutlined,
  BarcodeOutlined,
  CommentOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Form, Select, Spin, Timeline } from "antd";
import "./styles/detailOrder.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Steps, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { checkStatus } from "../../redux/features/statusOrderSlice";
const DetailOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = window.location.pathname;
  const orderID = params.slice(12, params.length);
  const dispatch = useDispatch();
  const getStatusOrder = useSelector((state) => state.status.status);
  const getAllOrders = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: `http://localhost:5000/api/order/${orderID}`,
    });
    setOrders(res.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllOrders();
  }, [getStatusOrder]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const updateStatusOrder = async () => {
      const res = await axios({
        method: "PUT",
        url: `http://localhost:5000/api/order/${orderID}`,
        data: values,
        headers: { "Content-Type": "application/json" },
      });
      setOrders(res.data.data);
      dispatch(checkStatus(values));
      setIsModalOpen(false);
    };
    updateStatusOrder();
  };
  return (
    <div className="container">
      {isLoading ? (
        <Spin style={{ display: "block", margin: "300px auto" }} />
      ) : (
        orders.length > 0 &&
        orders.map((order, index) => {
          return (
            <>
              <div className="detail__order" key={index}>
                <div className="detail__order-info">
                  <div className="detail__order_btns">
                    <Button type="primary" onClick={showModal}>
                      Cập nhật đơn hàng
                    </Button>
                    <Modal
                      title={`Đơn hàng ${order._id}`}
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <Form layout="vertical" onFinish={onFinish}>
                        <span>{`Người mua : ${order.transaction.user.name}`}</span>
                        <Form.Item label="Trạng thái" name="status">
                          <Select defaultValue={order.status}>
                            <Select.Option value={0}>
                              Chờ xác nhận
                            </Select.Option>
                            <Select.Option value={1}>Đã xác nhận</Select.Option>
                            <Select.Option value={2}>
                              Đang vận chuyển
                            </Select.Option>
                            <Select.Option value={3}>
                              Giao thành công
                            </Select.Option>
                            <Select.Option value={4}>Đã hủy</Select.Option>
                          </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                          Lưu
                        </Button>
                      </Form>
                    </Modal>
                  </div>
                  <div className="order__info-status order__info-item">
                    <FileTextOutlined style={{ fontSize: "1.8rem" }} />
                    <div className="order__info-status-title">
                      <h3>
                        {order.status === 0
                          ? "Chờ xác nhận"
                          : order.status === 1
                          ? "Đã xác nhận"
                          : order.status === 2
                          ? "Đang vận chuyển"
                          : order.status === 3
                          ? "Giao thành công"
                          : "Đã hủy"}
                      </h3>
                      <span>{`Đơn hàng được đặt vào ${new Date(
                        order.createdAt
                      ).toDateString()}`}</span>
                    </div>
                  </div>

                  <div className="order__info-adress">
                    <div className="order__info-adress-item order__info-item">
                      <BarcodeOutlined style={{ fontSize: "1.8rem" }} />
                      <div className="order__info-adress-title">
                        <h3>Mã đơn hàng</h3>
                        <span>{order._id}</span>
                      </div>
                    </div>
                    <div className="order__info-adress-item order__info-item">
                      <svg
                        style={{ width: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path d="M17.7 29.2H22c.6 0 1 .4 1 1s-.4 1-1 1H10c-.6 0-1-.4-1-1s.4-1 1-1h4.3C11.3 25.4 5 17.1 5 12.4 5 6.2 9.9 1.2 16 1.2s11 5 11 11.2c0 4.7-6.3 13-9.3 16.8zM16 3.2c-5 0-9 4.2-9 9.4s9 15.6 9 15.6 9-10.4 9-15.6c0-5.2-4-9.4-9-9.4zm-5 9c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.3-5-5zm8 0c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3 3-1.4 3-3z"></path>
                      </svg>
                      <div className="order__info-adress-title">
                        <h3>Địa chỉ nhận hàng</h3>
                        <span>{order.transaction.user_delivery.address}, </span>
                        <span>{order.transaction.user_delivery.country}, </span>
                        <span>{order.transaction.user_delivery.state}</span>
                      </div>
                    </div>

                    <div className="order__info-adress-item order__info-item">
                      <svg
                        style={{ width: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11,2 C11.5522847,2 12,2.44771525 12,3 L12,4 L14.0573526,4 C14.5585309,4 14.9823027,4.37099521 15.048572,4.86777287 L15.8489627,10.8677729 C15.9219897,11.4152083 15.5374057,11.9181924 14.9899704,11.9912194 C14.9461373,11.9970667 14.9019646,12 14.8577432,12 L14,12 C14,13.1045695 13.1045695,14 12,14 C10.9456382,14 10.0818349,13.1841222 10.0054857,12.1492623 L10,12 L6,12 C6,13.1045695 5.1045695,14 4,14 C2.9456382,14 2.08183488,13.1841222 2.00548574,12.1492623 L2,12 C1.44771525,12 1,11.5522847 1,11 L1,3 C1,2.44771525 1.44771525,2 2,2 L11,2 Z M4,11 C3.44771525,11 3,11.4477153 3,12 C3,12.5522847 3.44771525,13 4,13 C4.55228475,13 5,12.5522847 5,12 C5,11.4477153 4.55228475,11 4,11 Z M12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 Z M11,3 L2,3 L2,11 L2.26760632,10.9999275 L2.25952044,11.0140364 C2.60328778,10.4085029 3.25393841,10 4,10 C4.68905526,10 5.29672315,10.3484608 5.65639728,10.8787759 L5.73239368,10.9999275 L10.2676063,10.9999275 L10.2595204,11.0140364 C10.4084927,10.7516273 10.6150957,10.5262194 10.8621197,10.3550224 L11,10.2676063 L11,3 Z M14.457,8 L12,8 L12,10 C12.6856081,10 13.2906411,10.3449829 13.6509806,10.8708305 L13.7318119,10.9989225 L14.8577432,11 L14.457,8 Z M14.0573526,5 L12,5 L12,7 L14.324,7 L14.0573526,5 Z"></path>
                      </svg>
                      <div className="order__info-adress-title">
                        <h3>Thông tin vận chuyển</h3>
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                    </div>
                    {order.status === 4 && (
                      <div className="order__info-adress-item order__info-item">
                        <CommentOutlined style={{ fontSize: "1.8rem" }} />
                        <div className="order__info-adress-title">
                          <h3>Lý do từ người mua</h3>
                          <span>Tôi không có nhu cầu mua nữa / Lý do khác</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="order__info-bill">
                    <div className="order__info-bill-item order__info-item">
                      <FileDoneOutlined style={{ fontSize: "1.8rem" }} />
                      <div className="order__info-bill-title">
                        <h3>Thông tin thanh toán</h3>
                        <div className="order__bill-table-heading">
                          <span className="order__bill-table-index">STT</span>
                          <span className="order__bill-table-yield">
                            Sản phẩm
                          </span>
                          <span className="order__bill-table-price">
                            Đơn Giá
                          </span>
                          <span className="order__bill-table-quantity">
                            Số lượng
                          </span>
                          <span className="order__bill-table-amount">
                            Thành tiền
                          </span>
                        </div>
                        <div className="order__bill-table-content">
                          <div className="order__bill-table-product">
                            <span className="order__bill-table-index">
                              {index + 1}
                            </span>
                            <div
                              className="order__bill-table-yield order__bill-table-flex"
                              style={{ display: "flex", gap: "10px" }}
                            >
                              <img
                                src={order.product.image?.url[0]}
                                alt=""
                                style={{ width: "60px", height: "60px" }}
                              />
                              <div className="order__bill-product-title">
                                <h4>{order.product.name}</h4>
                              </div>
                            </div>
                            <span className="order__bill-table-price">
                              {order.product.price} VNĐ
                            </span>
                            <span className="order__bill-table-quantity">
                              {order.quantity}
                            </span>
                            <span className="order__bill-table-amount">
                              {order.product.price} VNĐ
                            </span>
                          </div>
                        </div>
                        <div className="order__bill-product-total">
                          <div className="bill__product-total-item">
                            <span>Tổng tiền sản phẩm</span>
                            <strong>{order.product.price} VNĐ</strong>
                          </div>
                          <div className="bill__product-total-item">
                            <span>Phí vận chuyển (không tính trợ giá)</span>
                            <strong>{order.shipping_fee} VNĐ</strong>
                          </div>
                          <div className="bill__product-total-item">
                            <span>Tổng tiền thanh toán</span>
                            <strong>
                              {order.product.price * order.quantity +
                                order.shipping_fee}{" "}
                              VNĐ
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline__history">
                  <Steps
                    direction="vertical"
                    current={order.status}
                    items={[
                      {
                        title: "Chờ xác nhận",
                      },
                      {
                        title: "Đã xác nhận",
                      },
                      {
                        title: "Đang vận chuyển",
                      },
                      {
                        title: "Giao thành công",
                      },
                      {
                        title: "Đã hủy",
                      },
                    ]}
                  />
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default DetailOrder;
