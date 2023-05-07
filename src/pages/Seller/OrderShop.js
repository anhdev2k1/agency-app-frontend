import { Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  SearchOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./styles/orderShop.scss";
import { Link } from "react-router-dom";
const OrderShop = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pageID = JSON.parse(localStorage.getItem("page")) || "";
  const getAllOrders = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: `http://localhost:5000/api/shop/order/${pageID}`,
    });
    console.log(res.data.data);
    setOrders(res.data.data)
    setIsLoading(false);
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  function filterStatus(status) {
    const result = orders.filter((order) => {
      return order.status === status;
    });
    return result;
  }
  const items = [
    {
      key: "1",
      label: `Tất cả`,
      children: (
        <>
          <div className="order__search">
            <div className="search__btn">
              <SearchOutlined style={{ fontSize: "2rem" }} />
            </div>
            
            <input
              type="text"
              className="input__search"
              placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
            />
          </div>
          <div className="order__content">
            <div className="order__content-heading">
              <div className="order__heading-item order__item-product">
                Sản phẩm
              </div>
              <div className="order__heading-item order__item-amount">
                Tổng đơn hàng
              </div>
              <div className="order__heading-item order__item-status">
                Trạng thái
              </div>
              <div className="order__heading-item order__item-paidAt">
                Thanh toán
              </div>
              <div className="order__heading-item order__item-shipping">
                ĐVVC
              </div>
              <div className="order__heading-item order__item-btn">
                Thao tác
              </div>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : orders.length > 0 ? (
              orders.map((item) => {
                return (
                  <div className="list__order">
                    <div className="list__order-item">
                      <div className="order__navbar-heading">
                        <span className="navbar__heading-name">
                          Người mua: {item.transaction.user.name}
                        </span>
                        <div className="navbar__heading-key">
                          <span style={{ marginRight: "10px" }}>
                            Mã đơn hàng
                          </span>
                          <strong>{item._id}</strong>
                        </div>
                      </div>
                      <div className="list__order-product">
                        <div className="order__item-product">
                          <img src={item.product.image?.url[0]} alt="" />
                          <div className="item__product-title">
                            <h3 className="product__title-name">
                              {item.product.name}
                            </h3>
                            <span className="product__title-quantity">
                              x {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="item__product-amount order__item-amount">
                          <span>{item.product.price * item.quantity} VNĐ</span>
                        </div>
                        <div className="item__product-status order__item-status">
                          <span
                            style={{
                              backgroundColor: "#E9B41A",
                              color: "white",
                            }}
                          >
                            {item.status === 0
                              ? "Chờ xác nhận"
                              : item.status === 1
                              ? "Đã xác nhận"
                              : item.status === 2
                              ? "Đang vận chuyển"
                              : item.status === 3
                              ? "Giao thành công"
                              : "Đã hủy"}
                          </span>
                        </div>
                        <div className="item__product-paidAt order__item-paidAt">
                          <span
                            style={
                              item.transaction.paid_at === null
                                ? {
                                    backgroundColor: "red",
                                    color: "white",
                                  }
                                : {
                                    backgroundColor: "green",
                                    color: "white",
                                  }
                            }
                          >
                            {item.transaction.paid_at === null
                              ? "Chưa thanh toán"
                              : "Đã thanh toán"}
                          </span>
                        </div>
                        <div className="item__product-shipping order__item-shipping">
                          <span>Giao hàng tiết kiệm</span>
                        </div>
                        <div className="item__product-btn order__item-btn">
                          <Link to={item._id}>
                            <FileTextOutlined
                              style={{
                                fontSize: "1.7rem",
                                marginRight: "5px",
                              }}
                            />
                            <span>Xem chi tiết</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Chưa có đơn hàng nào</p>
            )}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: `Chờ xác nhận`,
      children: (
        <>
        <div className="order__search">
          <div className="search__btn">
            <SearchOutlined style={{ fontSize: "2rem" }} />
          </div>
          
          <input
            type="text"
            className="input__search"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
          />
        </div>
        <div className="order__content">
          <div className="order__content-heading">
            <div className="order__heading-item order__item-product">
              Sản phẩm
            </div>
            <div className="order__heading-item order__item-amount">
              Tổng đơn hàng
            </div>
            <div className="order__heading-item order__item-status">
              Trạng thái
            </div>
            <div className="order__heading-item order__item-paidAt">
              Thanh toán
            </div>
            <div className="order__heading-item order__item-shipping">
              ĐVVC
            </div>
            <div className="order__heading-item order__item-btn">
              Thao tác
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : orders.length > 0 ? (
            filterStatus(0).map((item) => {
              return (
                <div className="list__order">
                  <div className="list__order-item">
                    <div className="order__navbar-heading">
                      <span className="navbar__heading-name">
                        Người mua: {item.transaction.user.name}
                      </span>
                      <div className="navbar__heading-key">
                        <span style={{ marginRight: "10px" }}>
                          Mã đơn hàng
                        </span>
                        <strong>{item._id}</strong>
                      </div>
                    </div>
                    <div className="list__order-product">
                      <div className="order__item-product">
                        <img src={item.product.image?.url[0]} alt="" />
                        <div className="item__product-title">
                          <h3 className="product__title-name">
                            {item.product.name}
                          </h3>
                          <span className="product__title-quantity">
                            x {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="item__product-amount order__item-amount">
                        <span>{item.product.price * item.quantity} VNĐ</span>
                      </div>
                      <div className="item__product-status order__item-status">
                        <span
                          style={{
                            backgroundColor: "#E9B41A",
                            color: "white",
                          }}
                        >
                          {item.status === 0
                            ? "Chờ xác nhận"
                            : item.status === 1
                            ? "Đã xác nhận"
                            : item.status === 2
                            ? "Đang vận chuyển"
                            : item.status === 3
                            ? "Giao thành công"
                            : "Đã hủy"}
                        </span>
                      </div>
                      <div className="item__product-paidAt order__item-paidAt">
                        <span
                          style={
                            item.transaction.paid_at === null
                              ? {
                                  backgroundColor: "red",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "green",
                                  color: "white",
                                }
                          }
                        >
                          {item.transaction.paid_at === null
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}
                        </span>
                      </div>
                      <div className="item__product-shipping order__item-shipping">
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                      <div className="item__product-btn order__item-btn">
                        <Link to={item._id}>
                          <FileTextOutlined
                            style={{
                              fontSize: "1.7rem",
                              marginRight: "5px",
                            }}
                          />
                          <span>Xem chi tiết</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Chưa có đơn hàng nào</p>
          )}
        </div>
      </>
      ),
    },
    {
      key: "3",
      label: `Đã xác nhận`,
      children: (
        <>
        <div className="order__search">
          <div className="search__btn">
            <SearchOutlined style={{ fontSize: "2rem" }} />
          </div>
          
          <input
            type="text"
            className="input__search"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
          />
        </div>
        <div className="order__content">
          <div className="order__content-heading">
            <div className="order__heading-item order__item-product">
              Sản phẩm
            </div>
            <div className="order__heading-item order__item-amount">
              Tổng đơn hàng
            </div>
            <div className="order__heading-item order__item-status">
              Trạng thái
            </div>
            <div className="order__heading-item order__item-paidAt">
              Thanh toán
            </div>
            <div className="order__heading-item order__item-shipping">
              ĐVVC
            </div>
            <div className="order__heading-item order__item-btn">
              Thao tác
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : orders.length > 0 ? (
            filterStatus(1).map((item) => {
              return (
                <div className="list__order">
                  <div className="list__order-item">
                    <div className="order__navbar-heading">
                      <span className="navbar__heading-name">
                        Người mua: {item.transaction.user.name}
                      </span>
                      <div className="navbar__heading-key">
                        <span style={{ marginRight: "10px" }}>
                          Mã đơn hàng
                        </span>
                        <strong>{item._id}</strong>
                      </div>
                    </div>
                    <div className="list__order-product">
                      <div className="order__item-product">
                        <img src={item.product.image?.url[0]} alt="" />
                        <div className="item__product-title">
                          <h3 className="product__title-name">
                            {item.product.name}
                          </h3>
                          <span className="product__title-quantity">
                            x {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="item__product-amount order__item-amount">
                        <span>{item.product.price * item.quantity} VNĐ</span>
                      </div>
                      <div className="item__product-status order__item-status">
                        <span
                          style={{
                            backgroundColor: "#E9B41A",
                            color: "white",
                          }}
                        >
                          {item.status === 0
                            ? "Chờ xác nhận"
                            : item.status === 1
                            ? "Đã xác nhận"
                            : item.status === 2
                            ? "Đang vận chuyển"
                            : item.status === 3
                            ? "Giao thành công"
                            : "Đã hủy"}
                        </span>
                      </div>
                      <div className="item__product-paidAt order__item-paidAt">
                        <span
                          style={
                            item.transaction.paid_at === null
                              ? {
                                  backgroundColor: "red",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "green",
                                  color: "white",
                                }
                          }
                        >
                          {item.transaction.paid_at === null
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}
                        </span>
                      </div>
                      <div className="item__product-shipping order__item-shipping">
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                      <div className="item__product-btn order__item-btn">
                        <Link to={item._id}>
                          <FileTextOutlined
                            style={{
                              fontSize: "1.7rem",
                              marginRight: "5px",
                            }}
                          />
                          <span>Xem chi tiết</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Chưa có đơn hàng nào</p>
          )}
        </div>
      </>
      ),
    },
    {
      key: "4",
      label: `Đang giao hàng`,
      children: (
        <>
        <div className="order__search">
          <div className="search__btn">
            <SearchOutlined style={{ fontSize: "2rem" }} />
          </div>
          
          <input
            type="text"
            className="input__search"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
          />
        </div>
        <div className="order__content">
          <div className="order__content-heading">
            <div className="order__heading-item order__item-product">
              Sản phẩm
            </div>
            <div className="order__heading-item order__item-amount">
              Tổng đơn hàng
            </div>
            <div className="order__heading-item order__item-status">
              Trạng thái
            </div>
            <div className="order__heading-item order__item-paidAt">
              Thanh toán
            </div>
            <div className="order__heading-item order__item-shipping">
              ĐVVC
            </div>
            <div className="order__heading-item order__item-btn">
              Thao tác
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : orders.length > 0 ? (
            filterStatus(2).map((item) => {
              return (
                <div className="list__order">
                  <div className="list__order-item">
                    <div className="order__navbar-heading">
                      <span className="navbar__heading-name">
                        Người mua: {item.transaction.user.name}
                      </span>
                      <div className="navbar__heading-key">
                        <span style={{ marginRight: "10px" }}>
                          Mã đơn hàng
                        </span>
                        <strong>{item._id}</strong>
                      </div>
                    </div>
                    <div className="list__order-product">
                      <div className="order__item-product">
                        <img src={item.product.image?.url[0]} alt="" />
                        <div className="item__product-title">
                          <h3 className="product__title-name">
                            {item.product.name}
                          </h3>
                          <span className="product__title-quantity">
                            x {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="item__product-amount order__item-amount">
                        <span>{item.product.price * item.quantity} VNĐ</span>
                      </div>
                      <div className="item__product-status order__item-status">
                        <span
                          style={{
                            backgroundColor: "#E9B41A",
                            color: "white",
                          }}
                        >
                          {item.status === 0
                            ? "Chờ xác nhận"
                            : item.status === 1
                            ? "Đã xác nhận"
                            : item.status === 2
                            ? "Đang vận chuyển"
                            : item.status === 3
                            ? "Giao thành công"
                            : "Đã hủy"}
                        </span>
                      </div>
                      <div className="item__product-paidAt order__item-paidAt">
                        <span
                          style={
                            item.transaction.paid_at === null
                              ? {
                                  backgroundColor: "red",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "green",
                                  color: "white",
                                }
                          }
                        >
                          {item.transaction.paid_at === null
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}
                        </span>
                      </div>
                      <div className="item__product-shipping order__item-shipping">
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                      <div className="item__product-btn order__item-btn">
                        <Link to={item._id}>
                          <FileTextOutlined
                            style={{
                              fontSize: "1.7rem",
                              marginRight: "5px",
                            }}
                          />
                          <span>Xem chi tiết</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Chưa có đơn hàng nào</p>
          )}
        </div>
      </>
      ),
    },
    {
      key: "5",
      label: `Giao thành công`,
      children: (
        <>
        <div className="order__search">
          <div className="search__btn">
            <SearchOutlined style={{ fontSize: "2rem" }} />
          </div>
          
          <input
            type="text"
            className="input__search"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
          />
        </div>
        <div className="order__content">
          <div className="order__content-heading">
            <div className="order__heading-item order__item-product">
              Sản phẩm
            </div>
            <div className="order__heading-item order__item-amount">
              Tổng đơn hàng
            </div>
            <div className="order__heading-item order__item-status">
              Trạng thái
            </div>
            <div className="order__heading-item order__item-paidAt">
              Thanh toán
            </div>
            <div className="order__heading-item order__item-shipping">
              ĐVVC
            </div>
            <div className="order__heading-item order__item-btn">
              Thao tác
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : orders.length > 0 ? (
            filterStatus(3).map((item) => {
              return (
                <div className="list__order">
                  <div className="list__order-item">
                    <div className="order__navbar-heading">
                      <span className="navbar__heading-name">
                        Người mua: {item.transaction.user.name}
                      </span>
                      <div className="navbar__heading-key">
                        <span style={{ marginRight: "10px" }}>
                          Mã đơn hàng
                        </span>
                        <strong>{item._id}</strong>
                      </div>
                    </div>
                    <div className="list__order-product">
                      <div className="order__item-product">
                        <img src={item.product.image?.url[0]} alt="" />
                        <div className="item__product-title">
                          <h3 className="product__title-name">
                            {item.product.name}
                          </h3>
                          <span className="product__title-quantity">
                            x {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="item__product-amount order__item-amount">
                        <span>{item.product.price * item.quantity} VNĐ</span>
                      </div>
                      <div className="item__product-status order__item-status">
                        <span
                          style={{
                            backgroundColor: "#E9B41A",
                            color: "white",
                          }}
                        >
                          {item.status === 0
                            ? "Chờ xác nhận"
                            : item.status === 1
                            ? "Đã xác nhận"
                            : item.status === 2
                            ? "Đang vận chuyển"
                            : item.status === 3
                            ? "Giao thành công"
                            : "Đã hủy"}
                        </span>
                      </div>
                      <div className="item__product-paidAt order__item-paidAt">
                        <span
                          style={
                            item.transaction.paid_at === null
                              ? {
                                  backgroundColor: "red",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "green",
                                  color: "white",
                                }
                          }
                        >
                          {item.transaction.paid_at === null
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}
                        </span>
                      </div>
                      <div className="item__product-shipping order__item-shipping">
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                      <div className="item__product-btn order__item-btn">
                        <Link to={item._id}>
                          <FileTextOutlined
                            style={{
                              fontSize: "1.7rem",
                              marginRight: "5px",
                            }}
                          />
                          <span>Xem chi tiết</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Chưa có đơn hàng nào</p>
          )}
        </div>
      </>
      ),
    },
    {
      key: "6",
      label: `Đơn hủy`,
      children: (
        <>
        <div className="order__search">
          <div className="search__btn">
            <SearchOutlined style={{ fontSize: "2rem" }} />
          </div>
          
          <input
            type="text"
            className="input__search"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
          />
        </div>
        <div className="order__content">
          <div className="order__content-heading">
            <div className="order__heading-item order__item-product">
              Sản phẩm
            </div>
            <div className="order__heading-item order__item-amount">
              Tổng đơn hàng
            </div>
            <div className="order__heading-item order__item-status">
              Trạng thái
            </div>
            <div className="order__heading-item order__item-paidAt">
              Thanh toán
            </div>
            <div className="order__heading-item order__item-shipping">
              ĐVVC
            </div>
            <div className="order__heading-item order__item-btn">
              Thao tác
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : orders.length > 0 ? (
            filterStatus(4).map((item) => {
              return (
                <div className="list__order">
                  <div className="list__order-item">
                    <div className="order__navbar-heading">
                      <span className="navbar__heading-name">
                        Người mua: {item.transaction.user.name}
                      </span>
                      <div className="navbar__heading-key">
                        <span style={{ marginRight: "10px" }}>
                          Mã đơn hàng
                        </span>
                        <strong>{item._id}</strong>
                      </div>
                    </div>
                    <div className="list__order-product">
                      <div className="order__item-product">
                        <img src={item.product.image?.url[0]} alt="" />
                        <div className="item__product-title">
                          <h3 className="product__title-name">
                            {item.product.name}
                          </h3>
                          <span className="product__title-quantity">
                            x {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="item__product-amount order__item-amount">
                        <span>{item.product.price * item.quantity} VNĐ</span>
                      </div>
                      <div className="item__product-status order__item-status">
                        <span
                          style={{
                            backgroundColor: "#E9B41A",
                            color: "white",
                          }}
                        >
                          {item.status === 0
                            ? "Chờ xác nhận"
                            : item.status === 1
                            ? "Đã xác nhận"
                            : item.status === 2
                            ? "Đang vận chuyển"
                            : item.status === 3
                            ? "Giao thành công"
                            : "Đã hủy"}
                        </span>
                      </div>
                      <div className="item__product-paidAt order__item-paidAt">
                        <span
                          style={
                            item.transaction.paid_at === null
                              ? {
                                  backgroundColor: "red",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "green",
                                  color: "white",
                                }
                          }
                        >
                          {item.transaction.paid_at === null
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}
                        </span>
                      </div>
                      <div className="item__product-shipping order__item-shipping">
                        <span>Giao hàng tiết kiệm</span>
                      </div>
                      <div className="item__product-btn order__item-btn">
                        <Link to={item._id}>
                          <FileTextOutlined
                            style={{
                              fontSize: "1.7rem",
                              marginRight: "5px",
                            }}
                          />
                          <span>Xem chi tiết</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Chưa có đơn hàng nào</p>
          )}
        </div>
      </>
      ),
    },
  ];
  return (
    <>
      <div className="list__transaction">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  );
};

export default OrderShop;
