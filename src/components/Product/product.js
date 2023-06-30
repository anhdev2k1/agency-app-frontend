import { ShoppingOutlined } from "@ant-design/icons";
import "./product.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/CartSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useRef } from "react";
const Product = (props) => {
  const { index, product } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [messageApi, contextHolder] = message.useMessage();
  const fetchAddToCart = async (data) => {
    await axios({
      method: "POST",
      url: "https://agency-app-backend.vercel.app/api/cart",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault()
    if(Object.keys(user).length > 0){
      const dataFetch = {
        productId: product._id,
        userId: user._id,
        increaseOne: true,
      };
      dispatch(addToCart({ ...product, quantity_p: 1,  increaseOne: true})); // increaseOne: add to cart one time
      fetchAddToCart({ ...dataFetch, quantity_p: 1 });
      messageApi.success("Thêm vào giỏ hàng thành công!")
    }else{
      messageApi.warning("Vui lòng đăng nhập!")
    }
  };
  // const handleDetail = (e) => {
  //   e.preventDefault()
  //   messageApi.loading("Đợi 1 tý nhé...")
  //   setTimeout(() => {
  //     navigate(`/product/${product._id}`)
  //   },1000)
  // }
  return (
    <>
    {contextHolder}
      <Link to={`/product/${product._id}/shop/${product.shop._id}`} >
        <div className="product__item" key={index} >
          <img
            src={product.image.url[0]}
            alt=""
            className="product__item-img"
          />
          <div className="product__item-title">
            <span className="product__item-shop">{product?.shop.name}</span>
            <h3 className="product__item-name">{product.name}</h3>
            <div className="product__item-number">
              <span className="product__item-price">Giá: {product.price}</span>
              <span className="product__item-quantity">
                Số lượng: {product.quantity}
              </span>
            </div>
          </div>
          <div className="product__hover">
            <div className="product__hover-btn"  onClick={handleAddToCart}>
              <ShoppingOutlined />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
