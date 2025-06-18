import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import "../../index.css";
import "../../styles/homepage/navBar.css";
import "../../styles/homepage/Cart.css";
import { Link } from "react-router-dom";
import {
  increasecount,
  menCollectionOpen,
  menCollectionClose,
  womenCollectionOpen,
  womenCollectionClose,
  cartOpen,
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
          <li
            className="men"
            onMouseEnter={() => {
              dispatch(menCollectionOpen());
              dispatch(increasecount());
            }}
            onMouseLeave={() => dispatch(menCollectionClose())}
          >
            <Link className="Link" to="/collections/men">
              Men
            </Link>
          </li>
          {isMenCollectionOpen ? <MenHoverSection /> : null}
          <li className="women">
            <Link
              className="Link"
              to="/collections/women"
              onMouseEnter={() => {
                dispatch(womenCollectionOpen());
                dispatch(increasecount());
              }}
              onMouseLeave={() => dispatch(womenCollectionClose())}
            >
              Women
            </Link>
          </li>

          {isWomenCollectionOpen ? <WomenHoverSection /> : null}
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
            <Link className="Link" to="/account/login">
              <CgProfile />
            </Link>
          </li>
          <li className="cart" onClick={() => dispatch(cartOpen())}>
            <IoCartOutline />
          </li>
        </div>
      </div>
     
  
  );
}

export default NavBar;
