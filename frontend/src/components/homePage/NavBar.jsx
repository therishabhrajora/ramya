import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TiFolderAdd } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import "../../index.css";
import "frontend/src/styles/homepage/navBar.css";
import "frontend/src/styles/homepage/carts.css";
import { Link } from "react-router-dom";
import {
  menCollectionOpen,
  womenCollectionOpen,
  cartOpen,
  profileOpen,
  closeProfile,
  menCollectionClose,
  womenCollectionClose,
} from "../../slices/NavBarSlice";

import { useDispatch, useSelector } from "react-redux";
import MenHoverSection from "../hoverComponents/MenHoverSection";
import WomenHoverSection from "../hoverComponents/WomenHoverSection";
import Profile from "../profile/profile";

function NavBar() {
  const dispatch = useDispatch();

  const role = localStorage.getItem("role");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isProfileOpen = useSelector((state) => state.navBar.profileOpen);

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
        {/* Men Menu */}
        <div
          className="menu-item-wrapper"
          onMouseEnter={() => dispatch(menCollectionOpen())}
          onMouseLeave={() => dispatch(menCollectionClose())}
        >
          <ul className="menu-list">
            <li className="men">
              <Link className="Link" to="/collections/men">
                Men
              </Link>
            </li>
          </ul>
          {isMenCollectionOpen && (
            <div className="hover-wrapper">
              <MenHoverSection />
            </div>
          )}
        </div>

        <div
          className="menu-item-wrapper"
          onMouseEnter={() => dispatch(womenCollectionOpen())}
          onMouseLeave={() => dispatch(womenCollectionClose())}
        >
          <ul className="menu-list">
            <li className="women">
              <Link className="Link" to="/collections/women">
                Women
              </Link>
            </li>
          </ul>
          {isWomenCollectionOpen && (
            <div className="hover-wrapper">
              <WomenHoverSection />
            </div>
          )}
        </div>

        {/* Static links (no hover) */}
        <ul className="menu-list">
          <li className="exoflex">
            <Link className="Link" to="/collections/ecoflex">
              Ecoflex
            </Link>
          </li>
        </ul>
        <ul>
          <li className="stethoscope">
            <Link className="Link" to="/collections/stethoscope">
              Stethoscope
            </Link>
          </li>
        </ul>
        <ul>
          <li className="trackOrder">
            <Link className="Link" to="/collections/track-order">
              Track Order
            </Link>
          </li>
        </ul>
        <ul>
          <li className="bulkOrder">
            <Link className="Link" to="/collections/bulk-order">
              Bulk Order
            </Link>
          </li>
        </ul>
      </div>

      <div className="cartMenu">
        <li className="search">
          <IoSearchOutline />
        </li>

        <li className="login">
          
          {isLoggedIn ? (
            role === "ROLE_ADMIN" ? (
              <ul
                className="admin-section"
                onMouseEnter={() => dispatch(profileOpen())}
                onMouseLeave={() => dispatch(closeProfile())}
              >
                <li
                  className="Link admin-profile"
                  // onMouseEnter={() => dispatch(profileOpen())}
                >
                  <MdOutlineAdminPanelSettings />
                </li>
                {isProfileOpen && <Profile />}
                <Link
                  className="Link add-products"
                  to="/collections/admin/add-products"
                >
                  <TiFolderAdd />
                </Link>
              </ul>
            ) : (
              <ul
                onMouseEnter={() => dispatch(profileOpen())}
                onMouseLeave={() => dispatch(closeProfile())}
              >
                
                <li className="Link user-profile">
                  <CgProfile />
                </li>
                {isProfileOpen && <Profile />}
              </ul>
            )
          ) : (
            <Link className="Link" to="/collections/account">
              <IoMdLogIn />
            </Link>
          )}
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
