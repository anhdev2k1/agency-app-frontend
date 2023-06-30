import { Input, Modal, Radio, Space, Tabs } from "antd";
import {
  CommentOutlined,
  ShopOutlined,
  CarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./_purchaseUser.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderProduct from "./OrderProduct/orderProduct";
const PurchaseUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getTransaction = async () => {
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        data: { token },
        url: "https://agency-app-backend.vercel.app/api/transaction/user",
        headers: { "Content-Type": "application/json" },
      });
      setTransaction(res.data.data);
      setIsLoading(false);
    };
    getTransaction();
  }, [isReload]);
  function filterStatus(status) {
    const result = transaction.filter((order) => {
      return order.status === status;
    });
    return result;
  }
  /*----radio huỷ đơn hàng----*/
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : transaction.length > 0 ? (
                  transaction.map((item, index) => {
                    return (
                      <OrderProduct item={item} key={index} setTransaction = {setTransaction}/>
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
        label: `Chờ xác nhận`,
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : transaction.length > 0 ? (
                  filterStatus(0).map((item, index) => {
                    return (
                      <OrderProduct item={item} key={index} setTransaction = {setTransaction}/>
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
        key: "3",
        label: `Đã xác nhận`,
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : transaction.length > 0 ? (
                  filterStatus(1).map((item, index) => {
                    return (
                      <OrderProduct item={item} key={index} setTransaction = {setTransaction}/>
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
        key: "4",
        label: `Đang giao`,
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : transaction.length > 0 ? (
                  filterStatus(2).map((item, index) => {
                    return (
                      <OrderProduct item={item} key={index} setTransaction = {setTransaction}/>
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
        key: "5",
        label: `Giao thành công`,
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : transaction.length > 0 ? (
                  filterStatus(3).map((item, index) => {
                    return (
                      <OrderProduct item={item} key={index} setTransaction = {setTransaction}/>
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
        key: "6",
        label: `Đã hủy`,
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : transaction.length > 0 ? (
                  filterStatus(4).map((item, index) => {
                    return (
                      <OrderProduct item={item} key={index} setTransaction = {setTransaction}/>
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
    ];
    return items;
  };
  return (
    <div className="purchase__container" style={{overflow: "hidden"}}>
      <div className="purchase__tab-delivery">
        <Tabs defaultActiveKey="1" items={setTab()} className="purchase__tab" />
      </div>
    </div>
  );
};

export default PurchaseUser;
