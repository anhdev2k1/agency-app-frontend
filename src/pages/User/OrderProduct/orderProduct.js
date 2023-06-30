import { Modal, Radio, Space } from "antd";
import {
  CommentOutlined,
  ShopOutlined,
  CarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../_purchaseUser.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./orderProduct.scss";
import { Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import convertDateTime from "../../../ultis/convertDateTime";
const OrderProduct = ({ item, index, setTransaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [transaction, setTransaction] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const [isLoading, setIsLoading] = useState(true);
  const [isReload, setIsReload] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (id) => {
    setIsModalOpen(false);
    const data = {
      status: 4,
    };
    setTransaction((pre) => {
      pre.forEach((order) => {
        if (order.transaction._id === id) {
          order.status = data.status;
        }
      });
      return pre;
    });
    const updateOrder = async () => {
      await axios({
        method: "PUT",
        url: `https://agency-app-backend.vercel.app/api/transaction/${id}`,
        data,
        headers: { "Content-Type": "application/json" },
      });
      setIsReload((pre) => !pre);
    };
    updateOrder();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFeedback = (e) => {
    setIsOpenFeedback((pre) => !pre);
  };
  /*----radio huỷ đơn hàng----*/
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [countRate, setCountRate] = useState();
  const [valueRate, setValueRate] = useState("");
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const handleRate = (count) => {
    setCountRate(count);
  };
  const user = useSelector((state) => state.user.user);
  const handleAddFeedback = async () => {
    console.log(item.product._id);
    const res = await axios.post("https://agency-app-backend.vercel.app/api/feedback", {
      rating: countRate,
      content: valueRate,
      user: user._id,
      product: item.product._id,
    });
  };
  return (
    <>
      {isOpenFeedback && (
        <>
          <div class="overload" onClick={() => setIsOpenFeedback(false)}></div>
          <div class="modal__content" onClick={(e) => e.stoppropagation()}>
            <h2 class="modal__content-heading">Đánh giá sản phẩm</h2>
            <Rate onChange={handleRate} />
            <TextArea
              rows={4}
              placeholder="Nhập đánh giá của bạn..."
              onChange={(e) => setValueRate(e.target.value)}
            />
            <div class="modal__btn" onClick={handleAddFeedback}>
              <span>Gửi đánh giá</span>
            </div>
          </div>
        </>
      )}

      <div className="purchase__order-item" key={index}>
        <span className="order__datetime">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </div>
          {convertDateTime(item.createdAt)}
        </span>
        <div className="purchase__order-nav">
          <div className="purchase__order-shop">
            <span className="purchase__order-shop-name">
              {item.product?.shop.name}
            </span>

            <div className="purchase__order-shop-chat">
              <CommentOutlined style={{ marginRight: "5px" }} />
              <span>Chat</span>
            </div>
            <div className="purchase__order-shop-btn">
              <ShopOutlined style={{ marginRight: "5px" }} />
              <span>Xem shop</span>
            </div>
          </div>
          <div className="purchase__order-status">
            <div className="purchase__order-status-desc">
              <CarOutlined style={{ marginRight: "5px" }} />
              <span>
                {item.status === 0
                  ? "Đơn hàng đang chờ người bán xác nhận"
                  : item.status === 1
                  ? "Đơn hàng đã được người bán xác nhận"
                  : item.status === 2
                  ? "Đơn hàng đang được vận chuyển"
                  : item.status === 3
                  ? "Đơn hàng đã giao thành công"
                  : "Đơn hàng đã bị hủy"}
              </span>
            </div>
            <span
              className="purchase__order-status-heading"
              style={
                item.status === 0 ? { color: "red" } : { color: "#42AA99" }
              }
            >
              {item.status === 0
                ? "Chờ xác nhận"
                : item.status === 1
                ? "đã xác nhận"
                : item.status === 2
                ? "đang vận chuyển"
                : item.status === 3
                ? "giao thành công"
                : "đã hủy"}
            </span>
          </div>
        </div>
        <div className="purchase__order-product">
          <div className="purchase__order-product-info">
            <img src={item.product.image?.url[0]} alt="" />
            <div className="purchase__order-product-title">
              <h3 className="order__product-title-name">
                {item.product?.name}
              </h3>
              <span>Phân loại hàng: 2XL</span>
              <span>x{item.quantity}</span>
              <span
                style={
                  item.transaction?.paid_at === null
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.transaction?.paid_at === null
                  ? "Chưa thanh toán"
                  : "Đã thanh toán"}
              </span>
            </div>
            <div className="purchase__order-product-price">
              <span>{item.product?.price} VNĐ</span>
            </div>
          </div>
        </div>
        <div className="purchase__order-features">
          <div className="purchase__order-total">
            <span>Thành tiền:</span>
            <strong>{item.amount} VNĐ</strong>
          </div>
          <div className="order__features-btn">
            <div
              className="order__features-rate"
              onClick={() => handleFeedback(item.product._id)}
            >
              <span>Đánh giá</span>
            </div>
            <div className="order__features-message">
              <span>Liên hệ người bán</span>
            </div>
            {item.status !== 4 && (
              <div className="order__features-cancel" onClick={showModal}>
                <span>Huỷ đơn hàng</span>
              </div>
            )}
            <Modal
              title="Lý do huỷ đơn"
              open={isModalOpen}
              onOk={() => handleOk(item.transaction._id)}
              onCancel={handleCancel}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Tôi không muốn mua nữa</Radio>
                  <Radio value={2}>Tôi đã có lựa chọn khác</Radio>
                </Space>
              </Radio.Group>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderProduct;
