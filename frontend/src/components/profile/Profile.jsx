import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import "../../styles/profile/profile.css";
import { useDispatch } from "react-redux";
import { profileOpen } from "../../slices/NavBarSlice";
import { logout } from "../../slices/AuthSlice";

function Profile() {
  const userStr = localStorage.getItem("user");
  const dispatch=useDispatch();
  const user = userStr ? JSON.parse(userStr) : null;
  const name = user ? (user.firstName + " " + user.lastName) : "";
  const email = user ? user.email : "";
  const navigate = useNavigate();
  

  const handleLogout = () => {
    dispatch(logout());
  
    dispatch(profileOpen())
    navigate("/collections");
  };

  return (
    <ul className="profile">
      <li className="name">{name}</li>
      <li className="email">{email}</li>
      <li className="orders">Orders</li>
      <li className="logout" onClick={handleLogout}>
        <span> logout </span>
        <IoIosLogOut />
      </li>
    </ul>
  );
}

export default Profile;
