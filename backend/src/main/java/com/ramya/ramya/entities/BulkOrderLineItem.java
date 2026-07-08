package com.ramya.ramya.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "bulk_order_items")
public class BulkOrderLineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private Integer quantity;
    private Double unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bulk_order_id")
    @JsonIgnore
    private BulkOrderRequest bulkOrder;

    // Getters and Setters
    public Long getId() { return id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
    public BulkOrderRequest getBulkOrder() { return bulkOrder; }
    public void setBulkOrder(BulkOrderRequest bulkOrder) { this.bulkOrder = bulkOrder; }
}
