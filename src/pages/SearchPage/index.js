import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Product from "../../components/Product/product";
import "./searchPage.scss";
import { useSelector } from "react-redux";
const SearchPage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const categoryParam = urlParams.get("q");
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathName = window.location.pathname
  const dataQuerySearch = useSelector(state => state.search.dataSearch)
  const getDataSearch = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: `https://agency-app-backend.vercel.app/api/${pathName.substring(pathName.indexOf("/") + 1,pathName.indexOf("/",1))}/search?q=${categoryParam}`,
    });
    setDataSearch(res.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getDataSearch();
  }, [dataQuerySearch]);
  return (
    <>
      <div class="search__wrapper">
        <div class="container">
          <h2 class="search__wrapper-heading">Danh mục bạn tìm kiếm :</h2>
          <div class="search__wrapper-content">
            {!isLoading ? (
              dataSearch.length > 0 ? (
                dataSearch.map((item, index) => {
                  return <Product index={index} product={item} width = "4" />;
                })
              ) : (
                <p style={{fontSize: "1.7rem"}}>Không có sản phẩm trong danh mục bạn vừa tìm kiếm</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
