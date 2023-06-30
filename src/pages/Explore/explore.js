import exploreBg from "../../assets/images/explore-bg2.mp4";
import "./explore.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product/product";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Explore = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [productSpecial, setProductSpecial] = useState([]);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  
  const getProductSpecial = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: "https://agency-app-backend.vercel.app/api/products",
    });
    setProductSpecial(res.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getCategories()
    getProductSpecial();
  }, []);
  const getCategories = async () => {
    const res = await axios({
      method: "GET",
      url: "https://agency-app-backend.vercel.app/api/category",
    });
    setCategories(res.data.data);
  }
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
              <span style={{fontSize: "1.5rem"}}>Đang load danh mục...</span>
            ) : (
              <Slider {...settings} className="slides">
                {categories.map((cate,index) => {
                  return (
                    <Link to={`/category/search?q=${cate.slug}`} className="category-slides-item" key={index}>
                    <img src={cate.url?.url[0]} alt="" style={{borderRadius:"50%"}}/>
                    <p className="category__slide-name" style={{color: "#333"}}>{cate.name}</p>
                  </Link>
                  )
                })}
                
              </Slider>
            )}
          </div>
        </div>
        <div className="product__special">
          <div className="product__special-title">
            <h3>Sản phẩm mới</h3>
            <span>Xem thêm</span>
          </div>
          <div className="product__special-slides">
            {isLoading ? (
              <span style={{fontSize: "1.7rem"}}>Đang load sản phẩm...</span>
            ) : (
              <Slider {...settings}>
                {productSpecial ? (
                  productSpecial.map((product, index) => {
                    return <Product index={index} product={product} />;
                  })
                ) : (
                  <span style={{fontSize: "1.5rem"}}>Đang load sản phẩm...</span>
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
