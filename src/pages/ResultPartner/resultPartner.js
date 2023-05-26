import { Link } from "react-router-dom";
import resultpartner from "../../assets/images/result_partner1.png"
import "./resultPartner.scss"
const ResultPartner = () => {
  return (
    <>
      <div class="result__partner">
        <div class="result__partner-img">
            <img src={resultpartner} alt=""/>
        </div>
        <h2>Chào mừng bạn đã đến với đội của chúng tôi</h2>
        <p>Đơn của bạn đã được gửi đến hệ thống, vui lòng đợi chúng tôi xét duyệt!</p>
        <Link to="/explore"><button className="result__partner-btn">Về Trang Chính</button></Link>
      </div>
    </>
  );
};

export default ResultPartner;
