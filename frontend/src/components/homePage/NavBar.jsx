import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import "../../index.css";
import "../../styles/homepage/navBar.css";
import { Link } from "react-router-dom";
import {
  increasecount,
  menCollectionOpen,
  womenCollectionOpen,
} from "../../slices/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import MenHoverSection from "../HoverComponents/MenHoverSection";
import WomenHoverSection from "../HoverComponents/WomenHoverSection";

function NavBar() {


  const dispatch = useDispatch();

  const isMenCollectionOpen = useSelector(
    (state) => state.navBar.menCollectionOpen
  );
  const isWomenCollectionOpen = useSelector(
    (state) => state.navBar.womenCollectionOpen
  );



  return (
    <div className="navBar baseBackgroundColor">
      <div className="logo">
        <Link className="Link" to="/collections">
          RamYa
        </Link>
      </div>
      <div className="menuBar baseTextColor">
        <li className="men"  onMouseOver={() => dispatch(menCollectionOpen(),increasecount())}>
          <Link className="Link" to="/collections/men">
            Men
          </Link>
        </li>
        {console.log(isMenCollectionOpen,increasecount)}
        {isMenCollectionOpen && <MenHoverSection/>}
        <li className="women" onMouseOver={() => dispatch(womenCollectionOpen)}>
          <Link className="Link" to="/collections/women">
            Women
          </Link>
        </li>
       
        {isWomenCollectionOpen && <WomenHoverSection />}
        <li className="exoflex">
          <Link className="Link" to="/collections/ecoflex">
            Ecoflex
          </Link>
        </li>
        <li className="stethoscope">
          <Link className="Link" to="/collections/stethoscope">
            Stethoscope
          </Link>
        </li>
        <li className="trackOrder">
          <Link className="Link" to="/collections/track-order">
            Track Order
          </Link>
        </li>
        <li className="bulkOrder">
          <Link className="Link" to="/collections/bulk-order">
            Bulk Order
          </Link>
        </li>
      </div>
      <div className="cartMenu">
        <li className="search">
          <IoSearchOutline />
        </li>
        <li className="login">
          <Link className="Link" to="/account/login"><CgProfile /></Link>
        </li>
        <li className="cart">
          <IoCartOutline />
        </li>
      </div>
    </div>
  );
}

export default NavBar;
