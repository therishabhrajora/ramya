import { MdOutlineClose } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { MdDeleteForever } from "react-icons/md";
import { removeFromCart } from "../slices/ProductSlice";
import { cartOpen } from "../slices/NavBarSlice";
import "../style/page/carts.css";


function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProducts = useSelector((state) => state.product.cartProducts);
  const subtotal = selectedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.06);
  const delivery = 0;
  const shipping=7;
  const total = subtotal + tax + delivery;
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return toast.success("You are not login, Please login first");

    }

    navigate("/collections/checkout",
      {
        state: {
          summary: {
            products: selectedProducts,
            subtotal: subtotal,
            tax: tax,
            total: total,
            shipping:shipping
          }
        }
      });
  }

  return (
    <div className="cart-section">
      <span className="close-btn " onClick={() => dispatch(cartOpen())}>
        <MdOutlineClose />
      </span>

      <div className="cart">
        {selectedProducts && selectedProducts.length > 0 ? (
          <div className="productOrderContainer">
            <ul className="productList">
              {selectedProducts.map((product) => (
                <li key={product.product_id} className="productItem">
                  <img src={product.image} alt={product.name} width="100px" />
                  <div className="productDetails">
                    <div className="productInfo">
                      <h3>{product.name}</h3>
                      <p>Price: ₹{product.price}</p>
                      <p>Color: {product.colors[0]}</p>
                      <p>Qty: {product.quantity}</p>
                    </div>
                    <div
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(product))}
                    >
                      <p>
                        <MdDeleteForever />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="emptyCart">
            <p>No products in the cart.</p>
            <Link
              className="Link"
              to={"/collections"}
              onClick={() => dispatch(cartOpen())}
            >
              <p className="shopping-btn">Continue Shopping &rarr;</p>
            </Link>
          </div>
        )}

        {selectedProducts.length > 0 ? (
          <Link
            className="Link"
            to={"/collections"}
            onClick={() => dispatch(cartOpen())}
          >
            <p className="shopping-btn">Continue Shopping &rarr;</p>
          </Link>
        ) : null}
      </div>
      {selectedProducts.length > 0 ? (
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-item">
            <span>Delivery:</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span>₹{tax}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <div className="delivery-info">📦 Estimated Delivery: 3–5 Days</div>
          <div className="buttons">
            <button
              onClick={() => handleCheckout()}
              className="btn btn-primary">Checkout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
