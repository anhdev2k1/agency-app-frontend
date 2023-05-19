import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/pageShop.scss";
import ReactHtmlParser from "react-html-parser";
const PageShop = () => {
  const [layout, setLayout] = useState([]);
  const idShop = JSON.parse(localStorage.getItem("page"));
  useEffect(() => {
    const getLayoutShop = async () => {
      const res = await axios({
        method: "GET",
        url: `http://localhost:5000/api/shop/${idShop}`,
      });
      setLayout(res.data.data.page[0]);
    };
    getLayoutShop();
  }, []);
  return (
    <>
      <div class="wrapper">{ReactHtmlParser(layout.html)}</div>
    </>
  );
};

export default PageShop;
