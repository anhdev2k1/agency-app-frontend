import exploreBg from "../../assets/images/explore-bg2.mp4";
import "./explore.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cateSlide1 from "../../assets/images/explore-cate1.png";
import cateSlide2 from "../../assets/images/explore-cate2.png";
import cateSlide3 from "../../assets/images/explore-cate3.png";
import cateSlide4 from "../../assets/images/explore-cate4.png";
import cateSlide5 from "../../assets/images/explore-cate5.png";
import cateSlide6 from "../../assets/images/explore-cate6.png";
import cateSlide7 from "../../assets/images/explore-cate7.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product/product";
import { Spin } from "antd";
const Explore = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [productSpecial, setProductSpecial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getProductSpecial = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/api/products",
    });
    setProductSpecial(res.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getProductSpecial();
  }, []);
  return (
    <div className="explore">
      <div className="explore__bg">
        <video autoPlay="autoplay" loop muted>
          <source src={exploreBg} type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="explore__category">
          <div className="explore__category-title">
            <h3>Danh mục sản phẩm</h3>
            <span>Xem thêm</span>
          </div>
          <div className="explore__category-slides">
            {isLoading ? (
              <Spin />
            ) : (
              <Slider {...settings} className="slides">
                <div className="category-slides-item">
                  <img src={cateSlide1} alt="" />
                  <p className="category__slide-name">Quần áo</p>
                </div>
                <div className="category-slides-item">
                  <img src={cateSlide2} alt="" />
                  <p className="category__slide-name">Sắc đẹp</p>
                </div>
                <div className="category-slides-item">
                  <img src={cateSlide3} alt="" />
                  <p className="category__slide-name">Giày dép</p>
                </div>
                <div className="category-slides-item">
                  <img src={cateSlide4} alt="" />
                  <p className="category__slide-name">Sức khỏe</p>
                </div>
                <div className="category-slides-item">
                  <img src={cateSlide5} alt="" />
                  <p className="category__slide-name">Đồng hồ</p>
                </div>
                <div className="category-slides-item">
                  <img src={cateSlide6} alt="" />
                  <p className="category__slide-name">Túi xách</p>
                </div>
                <div className="category-slides-item">
                  <img src={cateSlide7} alt="" />
                  <p className="category__slide-name">Phụ kiện</p>
                </div>
              </Slider>
            )}
          </div>
        </div>
        <div className="product__special">
          <div className="product__special-title">
            <h3>Sản phẩm thịnh hành</h3>
            <span>Xem thêm</span>
          </div>
          <div className="product__special-slides">
            {isLoading ? (
              <Spin />
            ) : (
              <Slider {...settings}>
                {productSpecial ? (
                  productSpecial.map((product, index) => {
                    return <Product index={index} product={product} />;
                  })
                ) : (
                  <Spin />
                )}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
