import React, { useState } from 'react';
import "../../style/hoverComponents/BulkOrder.css";
import NavBar from '../page/NavBar';
import axios from 'axios';
import { ENDPOINTS } from '../../services/Constants'; 
import { toast } from 'react-toastify';

export default function BulkOrder() {
  const [items, setItems] = useState([
    { id: 1, sku: '', quantity: 1, unitPrice: 0 }
  ]);
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes for any specific row
  const handleInputChange = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        let parsedValue = value;
        if (field === 'quantity') parsedValue = Math.max(1, parseInt(value) || 1);
        if (field === 'unitPrice') parsedValue = Math.max(0, parseFloat(value) || 0);
        return { ...item, [field]: parsedValue };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Add a new blank row for ordering
  const addRow = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([...items, { id: newId, sku: '', quantity: 1, unitPrice: 0 }]);
  };

  // Remove a specific row from the list
  const removeRow = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Calculations
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  // Simple tier discount based on total items ordered
  let discountRate = 0;
  if (totalQuantity >= 100) discountRate = 0.20; // 20% off
  else if (totalQuantity >= 50) discountRate = 0.10; // 10% off

  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;

  // Asynchronous API call delivery channel connection loop
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Structure array contents to map perfectly with Java Entity expectations
    const bulkOrderPayload = {
      totalQuantity: totalQuantity,
      subtotal: subtotal,
      discountAmount: discountAmount,
      finalTotal: finalTotal,
      discountRate: discountRate,
      items: items.map(item => ({
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };

    try {
      console.log("Transmitting bulk distribution application manifest up to Spring Boot...");
      
      await axios.post(ENDPOINTS.submitBulkOrder, bulkOrderPayload, {
        headers: { "Content-Type": "application/json" }
      });
      
      // ✅ FIXED: Replaced broken empty string string statement with a live tracking toast notice
      toast.success('Bulk wholesale request submitted successfully!');
      
      // Reset input form grid state parameters back to standard blank rows
      setItems([{ id: 1, sku: '', quantity: 1, unitPrice: 0 }]);
    } catch (error) {
      console.error("Backend pipeline submission error encounter details:", error);
      toast.error(error.response?.data || 'Failed to dispatch bulk request application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavBar/>
      <div className="bulk-order-container">
        <div className="bulk-order-card">
          <h2 className="bulk-order-title">Bulk Order Management</h2>
          <p className="bulk-order-subtitle">Add your item details below to calculate automated tier discounts.</p>

          {/* Tier badges indicator */}
          <div className="discount-tiers">
            <span className={`tier-badge ${totalQuantity >= 50 && totalQuantity < 100 ? 'active' : ''}`}>
              📦 Tier 1 (50+ items): 10% Off
            </span>
            <span className={`tier-badge ${totalQuantity >= 100 ? 'active' : ''}`}>
              🚀 Tier 2 (100+ items): 20% Off
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="table-responsive">
              <table className="bulk-order-table">
                <thead>
                  <tr>
                    <th>SKU / Product ID</th>
                    <th>Quantity</th>
                    <th>Unit Price (₹)</th>
                    <th>Total (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          placeholder="e.g., TS-BLK-M"
                          value={item.sku}
                          onChange={(e) => handleInputChange(item.id, 'sku', e.target.value)}
                          required
                          className="form-control"
                          disabled={submitting}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                          required
                          className="form-control qty-input"
                          disabled={submitting}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleInputChange(item.id, 'unitPrice', e.target.value)}
                          required
                          className="form-control price-input"
                          disabled={submitting}
                        />
                      </td>
                      <td className="row-total">
                        ₹{(item.quantity * item.unitPrice).toFixed(2)}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeRow(item.id)}
                          disabled={items.length === 1 || submitting}
                          className="btn-delete"
                          title="Remove Item"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" onClick={addRow} className="btn-secondary" disabled={submitting}>
              + Add Row Item
            </button>

            {/* Pricing Summary Side-Box */}
            <div className="summary-section">
              <div className="summary-row">
                <span>Total Units:</span>
                <strong>{totalQuantity} pcs</strong>
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount-text">
                  <span>Tier Discount ({(discountRate * 100)}%):</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <hr className="summary-divider" />
              <div className="summary-row total-text">
                <span>Estimated Total:</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Processing Submission..." : "Submit Bulk Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
