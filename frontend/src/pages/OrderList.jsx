import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdTime, IoIosSearch } from "react-icons/io";
import { FiPackage, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import apiClient from "../app/AppClient"
import "../style/page/OrderList.css"; // Importing plain CSS stylesheet
import { ENDPOINTS } from "../services/Constants";

function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await apiClient.get(ENDPOINTS.getAllOrder);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to load tracking orders history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      DELIVERED: { text: "Delivered", className: "badge-delivered", icon: <FiCheckCircle /> },
      IN_TRANSIT: { text: "In Transit", className: "badge-transit", icon: <FiPackage /> },
      PENDING: { text: "Processing", className: "badge-pending", icon: <IoMdTime /> },
      CANCELLED: { text: "Cancelled", className: "badge-cancelled", icon: <FiAlertTriangle /> },
    };
    const current = config[status] || config.PENDING;
    return (
      <span className={`status-badge ${current.className}`}>
        {current.icon}
        {current.text}
      </span>
    );
  };

  const filteredOrders = orders.filter((order) => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items?.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      {/* Header section with search bar */}
      <div className="order-header-section">
        <div className="header-text-block">
          <h1 className="header-title">Your Orders</h1>
          <p className="header-subtitle">Track history, management, and shipment states.</p>
        </div>
        <div className="search-input-wrapper">
          <IoIosSearch className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search by Order ID or item..."
            className="search-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Order Cards Stack Layout */}
      {filteredOrders.length === 0 ? (
        <div className="empty-orders-view">
          <FiPackage className="empty-box-icon" />
          <p className="empty-message-text">No order structures found matching criteria.</p>
        </div>
      ) : (
        <div className="orders-stack">
          {filteredOrders.map((order) => (
            <div key={order.orderId} className="order-card-card">
              {/* Card Meta Top Strip */}
              <div className="order-top-strip">
                <div className="metadata-flex-row">
                  <div className="meta-item-chunk">
                    <p className="meta-label-top">Order Placed</p>
                    <p className="meta-value-text">{new Date(order.orderDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="meta-item-chunk">
                    <p className="meta-label-top">Total Bill</p>
                    <p className="meta-value-text meta-price-bold">₹{order.totalAmount}</p>
                  </div>
                  <div className="meta-item-chunk hide-on-mobile">
                    <p className="meta-label-top">Order ID</p>
                    <p className="meta-value-text mono-text">{order.orderId}</p>
                  </div>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>
                {console.log(order)}
              {/* Items Block list inside order */}
              <div className="order-items-list-block">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="individual-item-row">
                    <img src={item.image} alt={item.name} className="product-thumbnail-img" />
                    <div className="item-details-flex">
                      <h4 className="item-title-heading">{item.name}</h4>
                      <p className="item-meta-specs">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                      <p className="item-price-tag">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Actions Panel Bar */}
              <div className="order-card-footer">
                <button 

                  onClick={() => navigate(`/collections/track-order?id=${order.orderId}`)}
                  className="action-btn btn-primary-track"
                >
                  Track Shipment
                </button>
                <button 
                
                  onClick={() => navigate(`/collections/order-details/${order.orderId}`)}
                  className="action-btn btn-secondary-details"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;
