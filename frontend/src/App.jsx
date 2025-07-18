import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MenCollections from "./pages/MenCollections";
import WomenCollections from "./pages/WomenCollections";
import Ecoflex from "./components/ecoflexSection/Ecoflex";
import Stethoscope from "./components/stethoscpe/Stethoscope";
import TrackOrder from "./components/tackOrder/TrackOrder";
import BulkOrder from "./components/bulkOrder/BulkOrder";
import AccountLogin from "./pages/AccountLogin";
import Products from "./pages/admin/Products";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import ProductOrder from "./components/products/ProductOrder";
import { useEffect } from "react";
import axios from "axios";
import { setProducts } from "./slices/ProductSlice";
import { ENDPOINTS } from "./helper/Constants";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(ENDPOINTS.products);
        dispatch(setProducts(res.data));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);
  const isCartOpen = useSelector((state) => state.navBar.cartOpen);
  return (
    <>
      {isCartOpen ? <Cart /> : null}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/collections" />} /> */}
        <Route path="/collections" element={<HomePage />} />
        <Route path="/collections/men" element={<MenCollections />} />
        <Route path="/collections/women" element={<WomenCollections />} />
        <Route path="/collections/ecoflex" element={<Ecoflex />} />
        <Route path="/collections/stethoscope" element={<Stethoscope />} />
        <Route path="/collections/track-order" element={<TrackOrder />} />
        <Route path="/collections/bulk-order" element={<BulkOrder />} />
        <Route path="/collections/account" element={<AccountLogin />} />
        <Route path="/collections/logout" element={<AccountLogin />} />
        <Route path="/collections/products" element={<ProductOrder />} />
        <Route path="/collections/admin/add-products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
