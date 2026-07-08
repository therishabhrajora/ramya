package com.ramya.ramya.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "bulk_orders")
public class BulkOrderRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer totalQuantity;
    private Double subtotal;
    private Double discountAmount;
    private Double finalTotal;
    private Double discountRate;

    @OneToMany(mappedBy = "bulkOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BulkOrderLineItem> items;

    // Getters and Setters
    public Long getId() { return id; }
    public Integer getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(Integer totalQuantity) { this.totalQuantity = totalQuantity; }
    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
    public Double getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(Double discountAmount) { this.discountAmount = discountAmount; }
    public Double getFinalTotal() { return finalTotal; }
    public void setFinalTotal(Double finalTotal) { this.finalTotal = finalTotal; }
    public Double getDiscountRate() { return discountRate; }
    public void setDiscountRate(Double discountRate) { this.discountRate = discountRate; }
    public List<BulkOrderLineItem> getItems() { return items; }
    public void setItems(List<BulkOrderLineItem> items) { this.items = items; }
}
