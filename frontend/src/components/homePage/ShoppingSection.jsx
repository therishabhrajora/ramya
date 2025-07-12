import "../../style/homepage/ShoppingSection.css";
import heroimage from "../../assets/heroImage.webp";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/ProductSlice";
function ShoppingSection() {
const dispatch=useDispatch();
const allCollections = useSelector((state) => state.product.products);

const ecoflexProducts = allCollections.filter((product) => product.category==="ecoflex");
const classicProducts = allCollections.filter((product) => product.category==="classic");
const stethoscope = allCollections.filter((product) => product.category==="stethoscope");



  return (
    <>
      <div className="shopping baseTextColor">
        <section className="ecoflex">
          <h1>Shop Ecoflex Scrubs</h1>
          <h5>Engineered with 4-way stretch technology</h5>
          <ul className="scrubList">
            {ecoflexProducts.map((scrub) => (
              <div className="scrubCard" key={scrub.id}>
                <img src={scrub.image} alt={scrub.name} width="300px" />
                <div className="scrubDetails">
                  <div className="rating">
                    <h5>Ecoflex</h5>
                    <h5>{scrub.rating}</h5>
                  </div>
                  <h3>{scrub.name}</h3>
                  <p>Price: ₹{scrub.price}</p>
                  <p>Color: {scrub.color}</p>
                  <div className="addToCartbtn" onClick={()=>dispatch(addToCart(scrub))}>Add to Cart</div>
                </div>
              </div>
            ))}
          </ul>
        </section>
        <section className="classic">
          <h1>Shop Classic Scrubs</h1>
          <h5>Engineered with 4-way stretch technology</h5>
          <ul className="scrubList">
            {classicProducts.map((scrub) => (
              <div className="scrubCard" key={scrub.id}>
                <img src={scrub.image} alt={scrub.name} width="300px" />
                <div className="scrubDetails">
                  <div className="rating">
                    <h5>Classic</h5>
                    <h5>{scrub.rating}</h5>
                  </div>
                  <h3>{scrub.name}</h3>
                  <p>Price: ₹{scrub.price}</p>
                  <p>Color: {scrub.color}</p>
                   <div className="addToCartbtn" onClick={()=>dispatch(addToCart(scrub))}>Add to Cart</div>
                </div>
              </div>
            ))}
          </ul>
        </section>
        <section className="stethoscope">
          <h1>Shop Stethoscope</h1>
          <h5>Engineered with 4-way stretch technology</h5>
          <ul className="scrubList">
            {stethoscope.map((scrub) => (
              <div className="scrubCard" key={scrub.id}>
                <img src={scrub.image} alt={scrub.name} width="300px" />
                <div className="scrubDetails">
                  <div className="rating">
                    <h5>New</h5>
                    <h5>{scrub.rating}</h5>
                  </div>
                  <h3>{scrub.name}</h3>
                  <p>Price: ₹{scrub.price}</p>
                  <p>Color: {scrub.color}</p>
                   <div className="addToCartbtn" onClick={()=>dispatch(addToCart(scrub))}>Add to Cart</div>
                </div>
              </div>
            ))}
          </ul>
        </section>
      </div>
      <div className="heroSection">
        <img src={heroimage} className="heroImage" alt="" />
      </div>
    </>
  );
}

export default ShoppingSection;
