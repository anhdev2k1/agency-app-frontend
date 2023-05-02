import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Spin, Button, message, Checkbox } from "antd";
import "./cart.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/features/CartSlice";
import { useState } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSave = () => {
    const dataUpdate = cart.map((item) => {
      return {
        _id: item._id,
        quantity_p: item.quantity_p,
      };
    });
    const saveCart = async () => {
      await axios({
        method: "PUT",
        url: "http://localhost:5000/api/cart",
        data: dataUpdate,
        headers: { "Content-Type": "application/json" },
      });
    };
    saveCart();
    messageApi.success("Lưu thành công!");
  };
  const handleDelete = (pid) => {
    dispatch(removeItem(pid));
    const removeCart = async () => {
      await axios({
        method: "DELETE",
        url: `http://localhost:5000/api/cart/${pid}`,
      });
    };
    removeCart();
    messageApi.success("Đã xóa thành công!");
  };
  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity_p * item.price;
    });
    return total;
  };
  const [checked, setChecked] = useState([]);
  const handleChecked = (e, product) => {
    const { checked } = e.target;
    if (checked) {
      setChecked((pre) => [...pre, product]);
    } else {
      setChecked((pre) => pre.filter((item) => item._id !== product._id));
    }
  };
  const handleOrder = () => {
    localStorage.setItem("order", JSON.stringify(checked));
  };
  return (
    <div className="cart">
      {contextHolder}
      <div className="container">
        <div className="cart__container">
          <h2>{`My cart (${cart.length})`}</h2>
          {cart.length > 0 ? (
            <div className="list__cart">
              {cart.map((item) => {
                return (
                  <div className="cart__item">
                    <div className="cart__item-flex">
                      <Checkbox
                        className="cart__item-check"
                        onChange={(e) => handleChecked(e, item)}
                      ></Checkbox>
                      <div className="cart__item-info">
                        <img
                          src={item.image?.url[0]}
                          alt=""
                          className="item__info-img"
                        />
                        <div className="item__info-title">
                          <h3 className="info__title-name">{item.name}</h3>
                          <p className="info__title-shop">{item.shop.name}</p>
                          <p className="info__title-price">{`${item.quantity_p} x ${item.price} VNĐ`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="cart__item-quantity">
                      <div
                        className="item__quantity-minus"
                        onClick={() => dispatch(decrementQuantity(item._id))}
                      >
                        <span>-</span>
                      </div>
                      <div className="item__quantity-number">
                        <span>{item.quantity_p}</span>
                      </div>
                      <div
                        className="item__quantity-increase"
                        onClick={() => dispatch(incrementQuantity(item._id))}
                      >
                        <span>+</span>
                      </div>
                    </div>
                    <div
                      className="cart__item-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                );
              })}

              <div className="cart__bottom">
                <Button
                  type="primary"
                  onClick={handleSave}
                  className="cart__bottom-save"
                >
                  Lưu
                </Button>
                <div className="cart__bottom-total">
                  <span>Tổng tiền:</span>
                  <strong>{getTotal()} VNĐ</strong>
                </div>
              </div>
              <Link
                to="/transaction"
                className="cart__btn-confirm"
                onClick={handleOrder}
              >
                <button>Mua hàng</button>
              </Link>
            </div>
          ) : (
            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
