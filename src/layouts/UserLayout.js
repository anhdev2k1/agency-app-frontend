import Navbar from "../components/Navbar/navbar";
import SidebarUser from "../components/SidebarUser/sidebarUser";
import "./userLayout.scss";
const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="user__flex">
          <SidebarUser />
          <div className="user__content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
