import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detail.scss";
import { Tabs, Spin } from "antd";
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
import { Image } from 'antd';
import avt from "../../assets/images/avt-user.png";
const DetailProduct = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const cart = useSelector((state) =>
    state.cart.cart.find((item) => item._id === id)
  );
  const onChange = (key) => {
  };
  const [quantityProduct, setQuantityProduct] = useState(1);

  const setTab = (data) => {
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
                <img src={Object.keys(data.shop?.user).length > 0 ? data.shop.user?.url?.url[0] : avt } alt="" />
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
        children: `Content of Tab Pane 2`,
      },
    ];
    return items;
  };

  const [dataProduct, setDataProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getProduct = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: `http://localhost:5000/api/product/${id}`,
    });
    setDataProduct(res.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);
  const navigate = useNavigate();
  const handleBuy = () => {
    if (cart) {
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
    navigate("/transaction");
  };
  const fetchAddToCart = async (data) => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/api/cart",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
  };
  const handleAddToCart = () => {
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
  };
  return (
    <>
      <div className="detail">
        <div className="container">
          {Object.keys(dataProduct).length === 0 ? (
            <Spin />
          ) : (
            <div className="detail__container">
              <div className="detail__container-img">
                <Image src={dataProduct.image.url[0]} alt="" />
              </div>
              <div className="detail__container-info">
                <h3 className="detail__info-shop">{dataProduct.shop.name}</h3>
                <h2 className="detail__info-name">{dataProduct.name}</h2>
                {/* <span className="detail__info-view">29 lượt xem</span> */}
                {/* <div className="detail__info-size">
                  <p className="info__size-heading">Chọn kích cỡ: </p>
                  <div className="info__size-list">
                    <div className="info__size-item">
                      <span>S</span>
                    </div>
                    <div className="info__size-item">
                      <span>M</span>
                    </div>
                    <div className="info__size-item">
                      <span>L</span>
                    </div>
                    <div className="info__size-item">
                      <span>XL</span>
                    </div>
                  </div>
                </div> */}
                <Tabs
                  defaultActiveKey="1"
                  items={setTab(dataProduct)}
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
                    <div className="order__support-chat">
                      <MessageOutlined />
                      <span>Nhắn với người bán</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
