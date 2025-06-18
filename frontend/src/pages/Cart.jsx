import { MdOutlineClose } from "react-icons/md";
import { cartOpen } from "../slices/NavBarSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  return (
    <div className="cart-section">
      <div className="cart-section2">
        <span className="close-btn " onClick={() => dispatch(cartOpen())}>
          <MdOutlineClose />
        </span>
        <div className="cart-empty">
          <p>Cart is Empty</p>
          <Link className="Link" to={"/collections"} onClick={() => dispatch(cartOpen())}>
            <p className="shopping-btn">Continue Shopping &rarr;</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
