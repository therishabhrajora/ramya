import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TiFolderAdd } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import "../../index.css";
import "../../style/page/navBar.css";
import "../../style/page/carts.css";
import { Link, useNavigate } from "react-router-dom";
import {
  menCollectionOpen,
  womenCollectionOpen,
  profileOpen,
  closeProfile,
  menCollectionClose,
  womenCollectionClose,
  cartOpen,
} from "../../slices/NavBarSlice";

import { useDispatch, useSelector } from "react-redux";
import MenHoverSection from "../hoverComponents/MenHoverSection";
import WomenHoverSection from "../hoverComponents/WomenHoverSection";

import { useEffect } from "react";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // useEffect(()=>{
  //   const token=localStorage.getItem("token");

  // },cartCount)

  return (
    <div className="navBar baseBackgroundColor">
      <div className="left">
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
          <ul>
            <li className="stethoscope">
              <Link className="Link" to="/collections/stethoscope">
                Stethoscope
              </Link>
            </li>
          </ul>
          <ul>
            <li className="trackOrder">
              <Link className="Link" to="/collections/my-orders">
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
      </div>
      <div className="right cartMenu">
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
                  className="Link user-profile"
                  onClick={() => navigate("/account")}
                >

                  <CgProfile />


                </li>
                <li className="Link add-product" onClick={() => navigate("/admin/add")}>
                  <TiFolderAdd />
                </li>

              </ul>
            ) : (
              <ul
                onClick={() => navigate("/account")}
              >
                <li className="Link user-profile">
                  <CgProfile />
                </li>

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
