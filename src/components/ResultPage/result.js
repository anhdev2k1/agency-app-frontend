import { Button, Result } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./result.scss";
const ResultPage = () => {
  const { state } = useLocation();
  const { title, subTitle, status } = state;
  return (
    <div className="result__container">
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
          <>
            <Link to="/user/purchase">
              <Button type="primary" key="console">
                Kiểm tra đơn hàng
              </Button>
            </Link>
            <Link to="/explore">
              <Button key="buy">Tiếp tục mua sắm</Button>
            </Link>
          </>,
        ]}
      />
    </div>
  );
};

export default ResultPage;
