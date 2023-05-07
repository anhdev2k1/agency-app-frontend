import { useSelector } from "react-redux";

const ManageAdmin = () => {
    const user = useSelector(state => state.user.user)
    console.log(user);
    return ( 
        <div class="manage__wrapper">
            <h2 style={{textAlign: "center"}}>Xin chào bạn đã quay trở lại, {user.name}!!</h2>
            
        </div>
     );
}
 
export default ManageAdmin;