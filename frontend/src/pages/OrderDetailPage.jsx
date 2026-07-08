import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiCalendar, FiCreditCard, FiMapPin, FiTruck } from "react-icons/fi";
import apiClient from "../app/AppClient";
import "../style/page/OrderDetailPage.css" 
import { ENDPOINTS } from "../services/Constants";
function OrderDetailPage() {
  const { id } = useParams(); // Gets orderId dynamically from URL path
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState({
    customerName: "",
    customEmail: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    street: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        // Replace with your real endpoints (e.g., ENDPOINTS.orderDetails(id))
        const response = await apiClient.get(ENDPOINTS.trackOrder(id));
        setOrder(response.data);
        setAddress({
          customerName: response.data.customerName || "",
          customEmail: response.data.customEmail || "",
          city: response.data.city || "",
          state: response.data.state || "",
          zip: response.data.zip || "",
          phone: response.data.phone || "",
          street: response.data.street || "",
          country: response.data.country || ""
        });
      } catch (error) {
        console.error("Failed to load order specific metadata details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loader-container">
        <div className="detail-spinner"></div>
      </div>
    );
  }


  if (!order) {
    return (
      <div className="detail-error-view">
        <h3>Order Not Found</h3>
        <p>We couldn't retrieve information for Order ID: {id}</p>
        <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
      </div>
    );
  }

  // Calculate pricing breakdown numbers
  const itemTotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const deliveryCharges = itemTotal > 1500 ? 0 : 99; // Mock rule fallback logic
  const grandTotal = itemTotal + deliveryCharges;

  return (
    <div className="order-details-container">
      {/* Top Breadcrumb Navigation */}
      <button onClick={() => navigate(-1)} className="back-navigation-link">
        <IoIosArrowBack /> Back to Orders
      </button>

      {/* Main Row Header info */}
      <div className="order-details-header">
        <div>
          <h1 className="order-id-title">Order #{order.orderId || id}</h1>
          <div className="order-meta-info-row">
            <span className="meta-icon-text"><FiCalendar /> Placed on {new Date(order.orderDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span className={`status-badge-inline badge-${order.status?.toLowerCase() || 'pending'}`}>{order.status || 'Processing'}</span>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/collections/track-order?id=${order.orderId || id}`)}
          className="track-cta-btn"
        >
          <FiTruck /> Track Live Journey
        </button>
      </div>

      {/* Primary Content Structure */}
      <div className="order-details-grid-layout">
        
        {/* Left Side Column: Order Items Stack */}
        <div className="items-main-card">
          <h3 className="card-section-title">Items Ordered ({order.items?.length || 0})</h3>
          <div className="items-loop-wrapper">
            {order.items?.map((item, idx) => (
              <div key={idx} className="detail-product-row">
                <img src={item.image} alt={item.name} className="product-detail-thumbnail" />
                <div className="product-detail-info">
                  <h4 className="product-detail-name">{item.name}</h4>
                  <div className="product-detail-specs">
                    <span><strong>Size:</strong> {item.selectedSize || 'N/A'}</span>
                    <span className="specs-divider">|</span>
                    <span><strong>Quantity:</strong> {item.quantity}</span>
                  </div>
                  <p className="product-detail-unit-price">₹{item.price} each</p>
                </div>
                <div className="product-detail-total-col">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Column: Meta Summary panels */}
        <div className="sidebar-meta-stack">
          
          {/* Shipping Address Box */}
          <div className="sidebar-summary-card">
            <h4 className="sidebar-card-title"><FiMapPin /> Delivery Address</h4>
            {address ? (
              <div className="address-block-text">
                <p className="customer-name-bold">{address.customerName || 'Customer'}</p>
                <p>{address.street || 'N/A'}</p>
                <p>{address.city}, {address.state} - {address.zip || 'N/A'}</p>
                <p className="phone-text-meta">Phone: {address.phone || 'N/A'}</p>
              </div>
            ) : (
              <p className="address-fallback-text">No delivery address information associated.</p>
            )}
          </div>

          {/* Payment Method Box */}
          <div className="sidebar-summary-card">
            <h4 className="sidebar-card-title"><FiCreditCard /> Payment Information</h4>
            <div className="payment-block-text">
              <p><strong>Method:</strong> {order.paymentMethod || 'Prepaid Online'}</p>
              <p><strong>Status:</strong> <span className="payment-success-text">{order.paymentStatus || 'Paid'}</span></p>
            </div>
          </div>

          {/* Bill Invoice Summary Matrix Box */}
          <div className="sidebar-summary-card price-breakdown-card">
            <h4 className="sidebar-card-title">Payment Summary</h4>
            <div className="invoice-row-line">
              <span>Subtotal ({order.items?.length || 0} items)</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="invoice-row-line">
              <span>Shipping & Handling</span>
              <span>{deliveryCharges === 0 ? <span className="free-text">FREE</span> : `₹${deliveryCharges}`}</span>
            </div>
            <div className="invoice-divider-line"></div>
            <div className="invoice-row-line grand-total-line">
              <span>Total Amount</span>
              <span>₹{order.totalAmount || grandTotal}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderDetailPage;
