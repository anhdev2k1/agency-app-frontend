import { Tabs } from "antd";
import {
  CommentOutlined,
  ShopOutlined,
  CarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./_purchaseUser.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const PurchaseUser = () => {
  const [transaction, setTransaction] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getTransaction = async () => {
      setIsLoading(true)
      const res = await axios({
        method: "POST",
        data: { token },
        url: "http://localhost:5000/api/transaction/user",
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data.data);
      setTransaction(res.data.data);
      setIsLoading(false)
    };
    getTransaction();
  }, []);
  const setTab = () => {
    const items = [
      {
        key: "1",
        label: `Tất cả`,
        children: (
          <>
            <div className="purchase__search">
              <div className="search__btn">
                <SearchOutlined />
              </div>
              <input
                type="text"
                className="input__search"
                placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
              />
            </div>
            <div className="purchase__content">
              <div className="purchase__order">
                {isLoading ? <p>Loading...</p> : transaction.length > 0 ? (
                  transaction.map((item, index) => {
                    return (
                      <div className="purchase__order-item" key={index}>
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
                                item.status === 0
                                  ? { color: "red" }
                                  : { color: "#42AA99" }
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
                            <div className="order__features-rate">
                              <span>Đánh giá</span>
                            </div>
                            <div className="order__features-message">
                              <span>Liên hệ người bán</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Không có đơn hàng nào</p>
                )}
                
              </div>
            </div>
          </>
        ),
      },
      {
        key: "2",
        label: `Chờ thanh toán`,
        children: `Content of Tab Pane 2`,
      },
      {
        key: "3",
        label: `Vận chuyển`,
        children: `Content of Tab Pane 3`,
      },
      {
        key: "4",
        label: `Đang giao`,
        children: `Content of Tab Pane 4`,
      },
      {
        key: "5",
        label: `Hoàn thành`,
        children: `Content of Tab Pane 5`,
      },
      {
        key: "6",
        label: `Đã hủy`,
        children: `Content of Tab Pane 6`,
      },
    ];
    return items;
  };
  return (
    <div className="purchase__container">
      <div className="purchase__tab-delivery">
        <Tabs defaultActiveKey="1" items={setTab()} className="purchase__tab" />
      </div>
    </div>
  );
};

export default PurchaseUser;
