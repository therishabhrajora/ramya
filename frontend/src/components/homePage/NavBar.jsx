import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import "../../index.css";
import "../../styles/homepage/navBar.css";
import "../../styles/homepage/Cart.css";
import { Link } from "react-router-dom";
import {
  menCollectionOpen,
  womenCollectionOpen,
  cartOpen,
  menCollectionClose,
  womenCollectionClose
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

  const cartProducts = useSelector((state) => state.product.cartProducts);
  const cartCount = cartProducts.length;

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
          <Link className="Link" to="/account">
            <CgProfile />
          </Link>
        </li>
        <li className="cart" onClick={() => dispatch(cartOpen())}>
          {cartCount > 0 ? (
            <div className="cartCount">
              <span>{cartCount}</span>
              <IoCartOutline className="cart-icon" />
            </div>
          ) : (
            <IoCartOutline />
          )}
        </li>
      </div>
    </div>
  );
}

export default NavBar;
