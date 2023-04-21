import { Button, Result } from "antd";
import { useLocation } from "react-router-dom";
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
          <Button type="primary" key="console">
            Kiểm tra đơn hàng
          </Button>,
          <Button key="buy">Tiếp tục mua sắm</Button>,
        ]}
      />
    </div>
  );
};

export default ResultPage;
