import React, { useEffect, useState } from "react";
import "../../style/hoverComponents/TrackOrder.css";
import NavBar from "../page/NavBar";
import { useLocation } from "react-router-dom";
import apiClient from "../../app/AppClient";
import { ENDPOINTS } from "../../services/Constants";

export default function TrackOrder() {
  const [searchId, setSearchId] = useState("EF-98431-ZX");
  const [orderDetails, setOrderDetails] = useState({});
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    const orderDetails = async () => {
      const order = await apiClient.get(ENDPOINTS.trackOrder(id));
      order.data.estimatedDelivery = order.data.orderDate + 7;
      order.data.statusStep = 3;
      order.data.carrier = "EcoPost Express"
      order.data.dimensions = "1.4 kg • 30x20x10 cm",
      order.data.history = [
          {
            id: 1,
            time: "July 03, 10:14 AM",
            location: "Delhi Hub, IN",
            detail: "Departed sorting facility",
          },
          {
            id: 2,
            time: "July 02, 04:30 PM",
            location: "Mumbai Sorting Center",
            detail: "Processed and manifest generated",
          },
          {
            id: 3,
            time: "July 01, 09:00 AM",
            location: "Warehouse Alpha",
            detail: "Order packaged and handed to carrier",
          },
        ],

        setOrderDetails(order.data);
    }
    orderDetails();
  },[]);
  console.log(orderDetails);


  // Mock tracking matrix data
  // const orderDetails = {
  //   id: "EF-98431-ZX",
  //   status: "In Transit", // Options: Processing, Shipped, In Transit, Delivered
  //   statusStep: 3, // 1 to 4 step progress marker
  //   estimatedDelivery: "Tuesday, July 7, 2026",
  //   carrier: "EcoPost Express",
  //   dimensions: "1.4 kg • 30x20x10 cm",
  //   history: [
  //     {
  //       id: 1,
  //       time: "July 03, 10:14 AM",
  //       location: "Delhi Hub, IN",
  //       detail: "Departed sorting facility",
  //     },
  //     {
  //       id: 2,
  //       time: "July 02, 04:30 PM",
  //       location: "Mumbai Sorting Center",
  //       detail: "Processed and manifest generated",
  //     },
  //     {
  //       id: 3,
  //       time: "July 01, 09:00 AM",
  //       location: "Warehouse Alpha",
  //       detail: "Order packaged and handed to carrier",
  //     },
  //   ],
  // };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    a(`Querying tracking ecosystem logs for token: ${searchId}`);
  };

  return (
    <>
      <NavBar />
      <div className="track-order-wrapper">
        <div className="track-order-container">
          {/* Top Section: Quick Identifier Search Bar */}
          <div className="track-search-card">
            <form onSubmit={handleSearchSubmit} className="track-search-form">
              <div className="search-input-field">
                <label htmlFor="orderIdInput">Track shipment status</label>
                <input
                  type="text"
                  id="orderIdInput"
                  placeholder="Enter Order ID or tracking code..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-track-submit">
                Locate package
              </button>
            </form>
          </div>

          {/* Core Monitor Dashboard Panel */}
          <div className="track-monitor-card">
            <header className="monitor-header">
              <div className="header-meta-block">
                <span className="meta-label">Tracking Number</span>
                <h2 className="tracking-id-text">{orderDetails.orderId}</h2>
              </div>
              <div className="header-delivery-block">
                <span className="meta-label">Estimated Arrival</span>
                <p className="delivery-date-text">
                  {orderDetails.estimatedDelivery}
                </p>
              </div>
            </header>

            {/* Graphical Progress Step Line */}
            <div className="progress-timeline-grid">
              <div
                className={`timeline-step ${orderDetails.statusStep >= 1 ? "completed" : ""}`}
              >
                <div className="step-node">✓</div>
                <span className="step-label">Confirmed</span>
              </div>
              <div
                className={`timeline-step ${orderDetails.statusStep >= 2 ? "completed" : ""}`}
              >
                <div className="step-node">✓</div>
                <span className="step-label">Processing</span>
              </div>
              <div
                className={`timeline-step ${orderDetails.statusStep >= 3 ? "completed" : ""} active`}
              >
                <div className="step-node">📦</div>
                <span className="step-label">In Transit</span>
              </div>
              <div
                className={`timeline-step ${orderDetails.statusStep >= 4 ? "completed" : ""}`}
              >
                <div className="step-node">🏁</div>
                <span className="step-label">Delivered</span>
              </div>
              <div className="timeline-connecting-bar">
                <div
                  className="timeline-bar-fill"
                  style={{
                    width: `${((orderDetails.statusStep - 1) / 3) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Info Details Split-Grid */}
            <div className="monitor-details-split">
              {/* Left: Parcel Profile Metadata */}
              <div className="parcel-specs-box">
                <h3 className="section-minor-title">Shipment Information</h3>
                <div className="spec-row-item">
                  <span>Current Status</span>
                  <span className="status-badge-inline">
                    {orderDetails.status}
                  </span>
                </div>
                <div className="spec-row-item">
                  <span>Shipping Carrier</span>
                  <strong>{orderDetails.carrier}</strong>
                </div>
                <div className="spec-row-item">
                  <span>Weight & Volume</span>
                  <strong>{orderDetails.dimensions}</strong>
                </div>
              </div>

              {/* Right: Chronological Route Updates History */}
              <div className="route-history-box">
                <h3 className="section-minor-title">Activity Log</h3>
                <div className="history-entries-list">
                  {orderDetails.history.map((log) => (
                    <div key={log.id} className="history-log-node">
                      <div className="log-marker-dot"></div>
                      <div className="log-content-body">
                        <div className="log-meta-time">{log.time}</div>
                        <div className="log-title-loc">{log.location}</div>
                        <p className="log-description-text">{log.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
