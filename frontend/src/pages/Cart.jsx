import { MdOutlineClose } from "react-icons/md";
import { cartOpen } from "../slices/NavBarSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const selectedProducts = JSON.parse(localStorage.getItem("cartProducts"));
  console.log("Selected Products:", selectedProducts);
  return (
    <div className="cart-section">
      <div className="cart-section2">
        <span className="close-btn " onClick={() => dispatch(cartOpen())}>
          <MdOutlineClose />
        </span>
        <div className="cart-empty">
          <p>Cart is Empty</p>
          <div>
            {selectedProducts && selectedProducts.length > 0 ? (
              <div className="productOrderContainer">
                <h1>Order Summary</h1>
                <ul className="productList">
                  {selectedProducts.map((product) => (
                    <li key={product.id} className="productItem">
                      <img
                        src={product.image}
                        alt={product.name}
                        width="100px"
                      />
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
          <Link
            className="Link"
            to={"/collections"}
            onClick={() => dispatch(cartOpen())}
          >
            <p className="shopping-btn">Continue Shopping &rarr;</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
