import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../style/page/OrderPlaced.css";

export default function OrderPlaced() {
  const navigate = useNavigate();
  const orderDetails = useLocation().state?.order
  const {id}=useParams();

  const deliveryDate="thus, 9th aug";

  return (
    <div className="success-page-container">
      <div className="success-card">
        {/* Animated Checkmark Circle */}
        <div className="success-animation-wrapper">
          <div className="success-checkmark-circle">
            <div className="success-checkmark-draw"></div>
          </div>
        </div>

        {/* Success Header Message */}
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-subtitle">
          Thank you for your purchase. Your payment was processed securely.
        </p>

        {/* Minimal Order Meta Matrix */}
        <div className="order-summary-box">
          <div className="summary-row">
            <span className="summary-label">Order Reference ID:</span>
            <span className="summary-value core-id">{orderDetails.orderId}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Amount Charged:</span>
            <span className="summary-value font-weight-bold">₹{orderDetails.amount}</span>
          </div>
          <div className="summary-row border-none">
            <span className="summary-label">Estimated Delivery:</span>
            <span className="summary-value delivery-highlight">{deliveryDate}</span>
          </div>
        </div>

        {/* Core Project Redirection Actions */}
        <div className="success-action-buttons">
          <button 
            type="button" 
            className="btn-track-order"
            onClick={() => navigate("/collections/track-order",{state:{id:id}})}
          >
            📦 Track My Order
          </button>
          
          <button 
            type="button" 
            className="btn-continue-shopping"
            onClick={() => navigate("/")}
          >
            🛒 Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
