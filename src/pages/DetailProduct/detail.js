import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detail.scss";
import { Tabs, Spin, message } from "antd";
import {
  ShopOutlined,
  ShoppingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  confirmOrder,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/features/CartSlice";
import { Image } from "antd";
import avt from "../../assets/images/avt-user.png";
import convertDateTime from "../../ultis/convertDateTime";
import Product from "../../components/Product/product";
import Slider from "react-slick";
const DetailProduct = () => {
  const { id } = useParams();
  const { idShop } = useParams();
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataFeedback, setDataFeedback] = useState([]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const cart = useSelector((state) =>
    state.cart.cart.find((item) => item._id === id)
  );
  const onChange = (key) => {};
  const [quantityProduct, setQuantityProduct] = useState(1);
  const setTab = (data, feedbacks) => {
    const items = [
      {
        key: "1",
        label: `Thông tin sản phẩm`,
        children: (
          <div className="detail__tab-info">
            <span>Danh mục: </span>
            <span>{data.category_id.name}</span>
            <div className="tab__info-desc">
              <span>Mô tả sản phẩm: </span>
              <p className="detail__tab-info--desc">{data.content}</p>
            </div>
            <div className="tab__info-shop">
              <span>Thông tin cửa hàng: </span>
              <div className="info__shop-wrapper">
                <img
                  src={
                    data.shop.user?.url?.url[0] ??
                    avt
                  }
                  alt=""
                />
                <div className="info__shop-title">
                  <h3>{data.shop.name}</h3>
                  <div className="info__shop-btn">
                    <ShopOutlined style={{ marginRight: "5px" }} />
                    <span>Visit store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: `Đánh giá sản phẩm`,
        children: (
          <div class="list__feedback">
            {feedbacks.length > 0 ? (
              feedbacks.map((item) => {
                return (
                  <div class="feedback__item">
                    <h4>{item.user?.name}</h4>
                    <span>{convertDateTime(item.createdAt)}</span>
                    <p>{item.content}</p>
                  </div>
                );
              })
            ) : (
              <p>Không có đánh giá cho sản phẩm này</p>
            )}
          </div>
        ),
      },
    ];
    return items;
  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: `https://agency-app-backend.vercel.app/api/product/${id}`,
      });
      setDataProduct(res.data.data);
      setIsLoading(false);
    };
    getProduct();
  }, [id]);

  const getDataFeedbacks = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: `https://agency-app-backend.vercel.app/api/feedback/${id}`,
    });
    setDataFeedback(res.data.data);
    setIsLoading(false);
  };
  const [listProductByShop, setListProductByShop] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios({
        method: "GET",
        url: `https://agency-app-backend.vercel.app/api/products/${idShop}`,
      });
      setListProductByShop(res.data.data);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    getDataFeedbacks();
  }, []);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleBuy = () => {
    if (Object.keys(user).length > 0) {
      if (typeof cart !== "undefined") {
        dispatch(confirmOrder({ ...dataProduct, quantity_p: cart.quantity_p }));
        localStorage.setItem(
          "order",
          JSON.stringify([{ ...dataProduct, quantity_p: cart.quantity_p }])
        );
      } else {
        dispatch(confirmOrder({ ...dataProduct, quantity_p: quantityProduct }));
        localStorage.setItem(
          "order",
          JSON.stringify([{ ...dataProduct, quantity_p: quantityProduct }])
        );
      }
      messageApi.loading("Đợi 1 tý nhé!...");
      setTimeout(() => {
        navigate("/transaction");
      }, 1000);
    } else {
      messageApi.warning("Vui lòng đăng nhập!");
    }
  };
  const fetchAddToCart = async (data) => {
    const res = await axios({
      method: "POST",
      url: "https://agency-app-backend.vercel.app/api/cart",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
  };
  const handleAddToCart = () => {
    if (Object.keys(user).length > 0) {
      const dataFetch = {
        productId: id,
        userId: user._id,
      };
      if (cart) {
        dispatch(addToCart({ ...dataProduct, quantity_p: cart.quantity_p }));
        fetchAddToCart({ ...dataFetch, quantity_p: cart.quantity_p });
      } else {
        dispatch(addToCart({ ...dataProduct, quantity_p: quantityProduct }));
        fetchAddToCart({ ...dataFetch, quantity_p: quantityProduct });
      }
      messageApi.success("Đã thêm vào giỏ hàng!");
    } else {
      messageApi.warning("Vui lòng đăng nhập!");
    }
  };
  const [isContact, setIsContact] = useState(false);
  const [dataContacts, setDataContact] = useState([]);
  const handleContact = () => {
    const getContacts = async () => {
      const res = await axios.post("https://agency-app-backend.vercel.app/api/contacts", {
        sender: user._id,
        receiver: dataProduct.shop.user._id,
      });
      console.log(res.data.data);
      setDataContact(res.data.data);
    };
    getContacts();
    setIsContact((pre) => !pre);
  };
  return (
    <>
      {contextHolder}
      <div className="detail">
        <div className="container">
          {Object.keys(dataProduct).length === 0 ? (
            <span style={{ fontSize: "1.7rem" }}>Đang load sản phẩm...</span>
          ) : dataProduct.shop.user?.deletedAt ? <h3>Sản phẩm này đã bị tạm ngưng hoạt động</h3> : (
            <div className="detail__container">
              <div className="detail__container-img">
                <Image src={dataProduct.image.url[0]} alt="" className="img" />
              </div>
              <div className="detail__container-info">
                <h3 className="detail__info-shop">{dataProduct.shop.name}</h3>
                <h2 className="detail__info-name">{dataProduct.name}</h2>

                <Tabs
                  defaultActiveKey="1"
                  items={setTab(dataProduct, dataFeedback)}
                  onChange={onChange}
                />
              </div>
              <div className="detail__card">
                <div className="detail__card-border">
                  <span>Sắm ngay!</span>
                </div>
                <div className="detail__card-order">
                  <div className="card__order-heading">
                    <span>Đặt hàng</span>
                  </div>
                  <div className="card__order-product">
                    <img src={dataProduct.image.url[0]} alt="" />
                    <div className="card__product-title">
                      <span>Chọn kích cỡ:</span>
                      <p>XL</p>
                    </div>
                  </div>
                  <div className="card__order-quantity">
                    <div className="list__quantity-btn">
                      <div
                        className="quantity__btn-item"
                        onClick={
                          cart
                            ? () => dispatch(decrementQuantity(id))
                            : () => setQuantityProduct((pre) => pre - 1)
                        }
                      >
                        <span>-</span>
                      </div>
                      <div className="quantity__btn-item">
                        <span>{cart ? cart.quantity_p : quantityProduct}</span>
                      </div>
                      <div
                        className="quantity__btn-item"
                        onClick={
                          cart
                            ? () => dispatch(incrementQuantity(id))
                            : () => setQuantityProduct((pre) => pre + 1)
                        }
                      >
                        <span>+</span>
                      </div>
                    </div>
                    <div className="order__quantity-stock">
                      <span>Có sẵn:</span>
                      <strong>{dataProduct.quantity}</strong>
                    </div>
                  </div>
                  <div className="card__order-total">
                    <span className="order__total-heading">Tổng tiền: </span>
                    <span className="order__total-price">
                      {cart
                        ? cart.quantity_p * dataProduct.price
                        : quantityProduct * dataProduct.price}
                      VNĐ
                    </span>
                  </div>
                  <div className="card__order-btn">
                    <div className="order__btn-item" onClick={handleBuy}>
                      <span>Mua ngay!</span>
                    </div>
                    <div className="order__btn-item" onClick={handleAddToCart}>
                      <ShoppingOutlined />
                      <span>Thêm vào giỏ!</span>
                    </div>
                  </div>
                  <div className="card__order-support">
                    <div
                      className="order__support-chat"
                      onClick={handleContact}
                    >
                      <MessageOutlined />
                      <span>Nhắn với người bán</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && (
            <div className="product__special">
              <div className="product__special-title">
                <h3>Sản phẩm tương tự</h3>
                <span>Xem thêm</span>
              </div>
              <div className="product__special-slides">
                <Slider {...settings}>
                  {listProductByShop.filter(product => product._id !== id && !product.deletedAt).map((product, index) => {
                    return <Product index={index} product={product} />;
                  })}
                </Slider>
              </div>
            </div>
          )}
        </div>
        {isContact && (
          <div class="contact__box">
            <div class="contact__box-header">
              <span class="contact__receiver">Anh Clothes</span>
              <div class="contact__close" onClick={(e) => setIsContact(false)}>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div class="contact__content">
              {dataContacts.map((item) => {
                if (item.sender === user._id) {
                  return (
                    <div
                      style={{
                        marginLeft: "auto",
                        marginRight: "0",
                        width: "max-content",
                      }}
                    >
                      {item.message}
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        marginLeft: "0",
                        marginRight: "auto",
                        width: "max-content",
                      }}
                    >
                      {item.message}
                    </div>
                  );
                }
              })}
            </div>
            <div class="contact__send">
              <button className="contact__send-btn">Gửi</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailProduct;
