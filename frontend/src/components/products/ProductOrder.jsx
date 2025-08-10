
function ProductOrder() {
  const selectedProducts = JSON.parse(localStorage.getItem("cartProducts"));
  
  return (
    <div>
      {selectedProducts && selectedProducts.length > 0 ? (
        <div className="productOrderContainer">
          <h1>Order Summary</h1>
          <ul className="productList">
            {selectedProducts.map((product) => (
              <li key={product.product_id} className="productItem">
                <img src={product.image} alt={product.name} width="100px" />
                <div className="productDetails">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Color: {product.color}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No products in the cart.</p>
      )}
    </div>
  );
}

export default ProductOrder;
