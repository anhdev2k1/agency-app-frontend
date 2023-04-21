import Navbar from "../components/Navbar/navbar";
import SidebarSeller from "../components/SidebarSeller/sidebarSeller";
import "./sellerLayout.scss";
const SellerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="seller__flex">
        <SidebarSeller />
        <div className="seller__content">{children}</div>
      </div>
    </>
  );
};

export default SellerLayout;
