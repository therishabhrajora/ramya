import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MenCollections from "./pages/MenCollections";
import WomenCollections from "./pages/WomenCollections";
import Ecoflex from "./components/ecoflex/ecoflex";
import Stethoscope from "./components/stethoscpe/Stethoscope";
import TrackOrder from "./components/tackOrder/TrackOrder";
import BulkOrder from "./components/bulkOrder/BulkOrder";
import AccountLogin from "./pages/AccountLogin";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";


function App() {
  const isCartOpen = useSelector((state) => state.navBar.cartOpen);
  return (
    <>
        {console.log(isCartOpen, "cart open")}
        {isCartOpen ? <Cart /> : null}
        <Routes>
          <Route path="/collections" element={<HomePage />} />
          <Route path="/collections/men" element={<MenCollections/>} />
          <Route path="/collections/women" element={<WomenCollections/>} />
          <Route path="/collections/ecoflex" element={<Ecoflex/>} />
          <Route path="/collections/stethoscope" element={<Stethoscope/>} />
          <Route path="/collections/track-order" element={<TrackOrder/>} />
          <Route path="/collections/bulk-order" element={<BulkOrder/>} />
          <Route path="/account/login" element={<AccountLogin/>} />
          <Route path="/account/login" element={<AccountLogin/>} />

        </Routes>
  
    </>
  );
}

export default App;
