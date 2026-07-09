import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Stethoscope from "./components/stethoscpe/Stethoscope";
import TrackOrder from "./components/trackOrder/TrackOrder";
import BulkOrder from "./components/bulkOrder/BulkOrder";
import AccountLogin from "./pages/AccountLogin";
import Products from "./pages/admin/Products";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import ProductOrder from "./components/products/ProductOrder";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts } from "./slices/ProductSlice";

import { MdSouth } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckOut";
import HomePage from "./pages/HomePage";
import Collections from "./pages/Collections";
import ResetPassword from "./components/page/ResetPassword";
import ProductDetailPage from "./pages/ProductDetailPage";
import Address from "./pages/Address";
import OrderPlaced from "./pages/OrderPlaced";
import apiClient from "./app/AppClient";
import { ENDPOINTS } from "./services/Constants";
import { addAddress ,setAddresses} from "./slices/AddressSlice";
import OrderList from "./pages/OrderList";
import OrderDetailPage from "./pages/OrderDetailPage";
import { setOrderHistory } from "./slices/OrderSlice";
import BulkUpload from "./pages/forms/BulkUpload";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await apiClient.get(ENDPOINTS.products);
        const addressesResponse = await apiClient.get(ENDPOINTS.allAddress);
        const ordersResponse = await apiClient.get(ENDPOINTS.getAllOrder);
        dispatch(setProducts( productsResponse.data));
         dispatch(setAddresses(addressesResponse.data)); 
         dispatch(setOrderHistory(ordersResponse.data));
      } catch (error) {
        console.error("Failed to fetch application resources:", error);
      }
    }
    fetchData();

  }, [dispatch]);

  const isCartOpen = useSelector((state) => state.navBar.cartOpen);
  return (
    <>
      {isCartOpen ? <Cart /> : null}

      <Routes>
        {/* <Route path="/" element={<Navigate to="/collections" />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<HomePage />} />
        <Route path="/collections/order-placed/:id" element={<OrderPlaced />} />
        <Route path="/collections/stethoscope" element={<Stethoscope />} />
        <Route path="/collections/bulk-order" element={<BulkOrder />} />
        <Route path="/collections/my-orders" element={<OrderList />} />
        <Route path="/collections/products" element={<ProductOrder />} />
        {/* <Route path="/collections/admin/add-products" element={<Products />} /> */}
        <Route path="/admin/add" element={<BulkUpload />} />
        <Route path="/collections/account/reset-password" element={<ResetPassword />} />
        <Route path="/collections/checkout" element={<CheckoutPage />} />
        <Route path="/collections/track-order" element={<TrackOrder />} />
        <Route path="/collections/order-details/:id" element={<OrderDetailPage />} />
        <Route path="/collections/:c/:id" element={<ProductDetailPage />} />
        <Route path="/collections/:c" element={<Collections />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/logout" element={<AccountLogin />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/address" element={<Address />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
