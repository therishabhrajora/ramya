import { MdOutlineClose } from "react-icons/md";
import { cartOpen } from "../slices/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/homepage/cart.css";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart } from "../slices/ProductSlice";

function Cart() {
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state) => state.product.cartProducts);

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
                <li key={product.id} className="productItem">
                  <img src={product.image} alt={product.name} width="100px" />
                  <div className="productDetails">
                    <div className="productInfo">
                      <h3>{product.name}</h3>
                      <p>Price: ₹{product.price}</p>
                      <p>Color: {product.color}</p>
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
        {selectedProducts.length > 0 ?(
          <Link
          className="Link"
          to={"/collections"}
          onClick={() => dispatch(cartOpen())}
        >
          <p className="shopping-btn">Continue Shopping &rarr;</p>
        </Link>
        ):null}
        
      </div>
    </div>
  );
}

export default Cart;
