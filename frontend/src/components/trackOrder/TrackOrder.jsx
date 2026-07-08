import React, { useEffect, useState } from "react";
import "../../style/hoverComponents/TrackOrder.css";
import NavBar from "../page/NavBar";
import { useLocation, useSearchParams } from "react-router-dom";
import apiClient from "../../app/AppClient";
import { ENDPOINTS } from "../../services/Constants";

export default function TrackOrder() {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    status: "",
    estimatedDelivery: "",
    statusStep: 0,
    carrier: "",
    dimensions: "",
    history: [],
  });
  const id = searchParams.get("id")


  useEffect(() => {
    if (!id) return;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching order details for ID:", id);
        const response = await apiClient.get(ENDPOINTS.trackOrder(id));
        const data = response.data;

        const deliveryDate = new Date(data.orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 7);

        const updatedOrder = {
          ...data,
          estimatedDelivery: deliveryDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          statusStep: 3,
          carrier: "EcoPost Express",
          dimensions: "1.4 kg • 30x20x10 cm",
          history: [
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
        };

        setOrderDetails(updatedOrder);
        setSearchId(updatedOrder.orderId || "");
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Tracking:", searchId);

    // Later you can call your tracking API here using searchId.
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="track-order-wrapper">
          <div className="track-order-container">
            <h2>Loading order details...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="track-order-wrapper">
        <div className="track-order-container">

          {/* Search */}
          <div className="track-search-card">
            <form
              onSubmit={handleSearchSubmit}
              className="track-search-form"
            >
              <div className="search-input-field">
                <label htmlFor="orderIdInput">
                  Track shipment status
                </label>

                <input
                  id="orderIdInput"
                  type="text"
                  placeholder="Enter Order ID or Tracking Code"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-track-submit"
              >
                Locate Package
              </button>
            </form>
          </div>

          {/* Tracking Card */}
          <div className="track-monitor-card">

            <header className="monitor-header">
              <div className="header-meta-block">
                <span className="meta-label">
                  Tracking Number
                </span>

                <h2 className="tracking-id-text">
                  {orderDetails.orderId}
                </h2>
              </div>

              <div className="header-delivery-block">
                <span className="meta-label">
                  Estimated Arrival
                </span>

                <p className="delivery-date-text">
                  {orderDetails.estimatedDelivery}
                </p>
              </div>
            </header>

            {/* Progress */}
            <div className="progress-timeline-grid">

              <div
                className={`timeline-step ${orderDetails.statusStep >= 1 ? "completed" : ""
                  }`}
              >
                <div className="step-node">✓</div>
                <span className="step-label">Confirmed</span>
              </div>

              <div
                className={`timeline-step ${orderDetails.statusStep >= 2 ? "completed" : ""
                  }`}
              >
                <div className="step-node">✓</div>
                <span className="step-label">Processing</span>
              </div>

              <div
                className={`timeline-step ${orderDetails.statusStep >= 3
                    ? "completed active"
                    : "active"
                  }`}
              >
                <div className="step-node">📦</div>
                <span className="step-label">In Transit</span>
              </div>

              <div
                className={`timeline-step ${orderDetails.statusStep >= 4 ? "completed" : ""
                  }`}
              >
                <div className="step-node">🏁</div>
                <span className="step-label">Delivered</span>
              </div>

              <div className="timeline-connecting-bar">
                <div
                  className="timeline-bar-fill"
                  style={{
                    width: `${((orderDetails.statusStep - 1) / 3) * 100
                      }%`,
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="monitor-details-split">

              {/* Shipment Info */}
              <div className="parcel-specs-box">

                <h3 className="section-minor-title">
                  Shipment Information
                </h3>

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

              {/* Activity */}
              <div className="route-history-box">

                <h3 className="section-minor-title">
                  Activity Log
                </h3>

                <div className="history-entries-list">

                  {orderDetails.history.length > 0 ? (
                    orderDetails.history.map((log) => (
                      <div
                        key={log.id}
                        className="history-log-node"
                      >
                        <div className="log-marker-dot" />

                        <div className="log-content-body">

                          <div className="log-meta-time">
                            {log.time}
                          </div>

                          <div className="log-title-loc">
                            {log.location}
                          </div>

                          <p className="log-description-text">
                            {log.detail}
                          </p>

                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No tracking updates available.</p>
                  )}

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}