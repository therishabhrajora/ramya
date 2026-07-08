import React, { useState, useEffect } from 'react';
import { CreditCard, MapPin, ShoppingBag, ShieldCheck, Sun, Moon, ArrowLeft } from 'lucide-react';
import '../style/page/checkout.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { orderPlaced } from '../slices/OrderSlice';
import { addAddress } from '../slices/AddressSlice';
import apiClient from '../app/AppClient';
import { ENDPOINTS } from '../services/Constants';
import { clearCart } from '../slices/ProductSlice';

export default function CheckoutPage() {
  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();
  const summary = useLocation().state.summary;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const address = useSelector(state => state.address.addresses)
  const profile=JSON.parse(localStorage.getItem("profile"));
  const cartProducts=JSON.parse(localStorage.getItem("cartProducts"));

  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const subtotalNum = summary.subtotal;
  const shippingNum = summary.shipping || 0; // Fallback to 0 if summary.shipping doesn't exist

  // 2. Perform math operation safely
  const totalNum = subtotalNum + shippingNum;

  // 3. Format into final string variables for screen display
  const subtotal = subtotalNum.toFixed(2);
  const shipping = shippingNum.toFixed(2);
  const total = totalNum.toFixed(2);




  const handleSubmitOrder = async(e) => {
    e.preventDefault();
    const orderId = `ORD-${Date.now()}`;
    if (selectedAddress != null) {
      const newCompletedOrder = {
        orderId: orderId,
        customerEmail: profile.email|| "customer@test.com",
        totalAmount: total || 0,
        paymentMethod: paymentMethod,
        orderDate: new Date().toLocaleDateString(),
        status: "Processing",
        customerName: profile.firstName || "Customer",
        items: summary?.products || [],
        phone:selectedAddress.phone,
        street:selectedAddress.phone,
        city:selectedAddress.city,
        state:selectedAddress.state,
        zip:selectedAddress.zip,
        country:selectedAddress.country
      };

      console.log(newCompletedOrder);
      await apiClient.post(ENDPOINTS.placeOrder,newCompletedOrder);
      dispatch(orderPlaced(newCompletedOrder));
      toast.success(`Order Placed Successfully via ${paymentMethod.toUpperCase()}!`);
      navigate(`/collections/order-placed/${newCompletedOrder.orderId}`, {
        state: {
          order: {
            orderId: orderId,
            amount: total,

          }
        }
      });
      dispatch(clearCart());
      

    } else {
      alert("Please! select address before place order");
    }



  };

  const onGoBack = () => {
    navigate("/account");
  }

  const selectAddress = (addr) => {
    setSelectedAddress(addr);
  }

  return (
    <div className="account-container">
      {/* Header Banner */}
      <div className="account-header-main">
        <button className="back-btn-text" onClick={onGoBack}>
          <ArrowLeft className="nav-icon" /> <span>Back to Account</span>
        </button>

      </div>

      <form className="checkout-layout" onSubmit={handleSubmitOrder}>
        {/* Left Side: Forms */}
        <div className="checkout-main-content">

          {/* Section 1: Shipping Address */}
          <div className="checkout-section">
            <div className="section-title-wrapper">
              <MapPin className="section-icon-accent" />
              <h2 className="tab-title">Shipping Address</h2>
            </div>
            {address.length > 0 ? (
              <div>
                <div className="tab-header-row">
                  <h1 className="tab-title">Select Addresses</h1>
                  <button onClick={() => navigate("/address")} className="text-link">+ Add New</button>
                </div>
                <div className="address-grid">
                  {address.map((addr) => (
                    <div key={addr.id} onClick={() => selectAddress(addr)} className="address-card" style={{
                      border: selectedAddress?.id === addr.id ? "2px solid #007bff" : "1px solid #ccc",
                      backgroundColor: selectedAddress?.id === addr.id ? "#f0f7ff" : "#fff"
                    }}>
                      <span className="address-badge">{addr.type}</span>
                      <p className="address-street">{addr.street}</p>
                      <p className="small-text">{addr.city}</p>

                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className='not-found'>No addreses found</div>
                <button onClick={() => navigate("/address")} className="text-link">+ Add New</button>
              </div>
            )}

          </div>

          {/* Section 2: Payment Method */}
          <div className="checkout-section">
            <div className="section-title-wrapper">
              <CreditCard className="section-icon-accent" />
              <h2 className="tab-title">Payment Method</h2>
            </div>

            <div className="payment-options-grid">
              <label className={`payment-card-selector ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="radio-hidden" />
                <span className="payment-title-bold">Credit/Debit Card</span>
              </label>

              <label className={`payment-card-selector ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="radio-hidden" />
                <span className="payment-title-bold">UPI / NetBanking</span>
              </label>

              <label className={`payment-card-selector ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="radio-hidden" />
                <span className="payment-title-bold">Cash on Delivery</span>
              </label>
            </div>

            {/* Dynamic Content Based on Payment Selection */}
            {paymentMethod === 'card' && (
              <div className="payment-details-form section-fade">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="form-input" required />
                </div>
                <div className="profile-grid mt-12">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input type="password" placeholder="123" className="form-input" required />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="payment-details-form section-fade">
                <div className="form-group">
                  <label className="form-label">Enter Virtual Payment Address (VPA)</label>
                  <input type="text" placeholder="username@bank" className="form-input" />
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="payment-details-form message-box section-fade">
                <p className="small-text">Pay with cash when your items are safely delivered to your doorstep.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="checkout-summary-sidebar">
          <div className="summary-sticky-card">
            <div className="section-title-wrapper">
              <ShoppingBag className="section-icon-accent" />
              <h2 className="tab-title">Order Summary</h2>
            </div>

            <div className="summary-items-list">
              {summary.products.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div>
                    <h4 className="bold-text">{item.name}</h4>
                    <p className="small-text">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="price-text">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-price-breakdown">
              <div className="price-breakdown-row">
                <span className="small-text">Subtotal</span>
                <span className="bold-text">${subtotal}</span>
              </div>
              <div className="price-breakdown-row">
                <span className="small-text">Estimated Shipping</span>
                <span className="bold-text">${shipping}</span>
              </div>
              <div className="price-breakdown-row total-row-accent">
                <span className="total-label">Grand Total</span>
                <span className="total-value">${total}</span>
              </div>
            </div>

            <button type="submit" className="primary-btn checkout-btn">
              Complete Payment
            </button>

            <div className="secure-badge-footer">
              <ShieldCheck className="secure-icon" />
              <span>SSL Secure & Encrypted Transaction</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
