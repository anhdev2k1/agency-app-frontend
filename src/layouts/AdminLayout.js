import SidebarAdmin from "../components/SidebarAdmin/sidebarAdmin";
import "./sellerLayout.scss"
const AdminLayout = ({ children }) => {
  return (
    <div className="admin__flex">
      <SidebarAdmin />
      <div class="admin__content">{children}</div>
    </div>
  );
};

export default AdminLayout;
