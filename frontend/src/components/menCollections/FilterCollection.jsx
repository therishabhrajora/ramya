import { IoMdArrowDropup } from "react-icons/io";
import "../../index.css";
import "../../style/menCollection/filterCollection.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "../../slices/ProductSlice";
function FilterCollection() {
  const dispatch = useDispatch();
  const [selectCheckBox, setSelectCheckBox] = useState([]);
  const allCollections = useSelector((state) => state.product.products);
  const colors = useSelector((state) => state.product.colors);
  const pockets = useSelector((state) => state.product.pockets);
  const gender = useSelector((state) => state.product.gender);
  const type = useSelector((state) => state.product.type);

  const menProducts = allCollections.filter(
    (product) => product.gender === "men"
  );
  const [sortBy, setSortBy] = useState("default");
  const sortProducts = (e) => {
    setSortBy(e.target.value);
  };
  const sortFunctions = {
    default: (a, b) => a.id - b.id,
    priceLowToHigh: (a, b) => a.price - b.price,
    priceHighToLow: (a, b) => b.price - a.price,
    ratingHighToLow: (a, b) => b.rating - a.rating,
    ratingLowToHigh: (a, b) => a.rating - b.rating,
  };
  const sortedMenProducts = [...menProducts].sort(sortFunctions[sortBy]);
  let filterproducts = sortedMenProducts.filter((product) => {
    return (
      selectCheckBox.length === 0 ||
      selectCheckBox.includes(product.color) ||
      selectCheckBox.includes(String(product.pocket)) ||
      selectCheckBox.includes(product.gender) ||
      selectCheckBox.includes(product.category)
    );
  });

  let handleCheckBoxes = (e) => {
    let value = e.target.value;

    if (e.target.checked) {
      setSelectCheckBox((prev) => [...prev, value]);
    } else {
      setSelectCheckBox((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div className="menfilterCollectionContainer">
      <p className="mensortBySection">
        <span>
          <b>SORT BY: </b>
        </span>
        <select
          className="mensortProduct"
          name="sortProduct"
          id="sortProduct"
          value={sortBy}
          onChange={(e) => sortProducts(e)}
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="ratingHighToLow">Rating: High to Low</option>
          <option value="ratingLowToHigh">Rating: Low to High</option>
          <option value="newArrivals">New Arrivals</option>
        </select>
      </p>
      <div className="menfilter-collection">
        <section className="menfilterSection">
          <h2>Filters</h2>
          <div className="menfilterByColour">
            <h3>
              <span>Colours</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="mencolourList">
              {colors.map((color) => (
                <li key={color.value}>
                  <label htmlFor={color.label}>{color.label}</label>
                  <input
                    type="checkbox"
                    id={color.label}
                    value={color.value}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="menfilterByPockets">
            <h3>
              <span>Pockets</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="menpocketsList">
              {pockets.map((pocket) => (
                <li key={pocket}>
                  <label htmlFor={pocket}>{pocket}</label>
                  <input
                    type="checkbox"
                    id={pocket}
                    value={pocket}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="menfilterByGender">
            <h3>
              <span>Gender</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="mengenderList">
              {gender.map((gen) => (
                <li key={gen}>
                  <label htmlFor={gen}>{gen}</label>
                  <input
                    type="checkbox"
                    id={gen}
                    value={gen}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="menfilterByFabric">
            <h3>
              <span>Fabric</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="menfabricList">
              {type.map((t) => (
                <li key={t}>
                  <label htmlFor={t}>{t}</label>
                  <input
                    type="checkbox"
                    id={t}
                    value={t}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="menfilterResults">
          {filterproducts.length == 0
            ? menProducts.map((scrub) => (
                <div className="menscrubCard" key={scrub.productId}>
                  <div className="menscrubImage">
                    <img src={scrub.image} alt={scrub.name} width="235px" />
                  </div>
                  <div className="menscrubDetails">
                    <div className="menrating">
                      <h5>Ecoflex</h5>
                      <h5>{scrub.rating}</h5>
                    </div>
                    <h3>{scrub.name}</h3>
                    <p>Price: ₹{scrub.price}</p>
                    <p>Color: {scrub.color}</p>
                    <div
                      className="menaddToCartbtn"
                      onClick={() =>
                        dispatch(addToCart({ ...scrub, quantity: 1 }))
                      }
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>
              ))
            : filterproducts.map((scrub) => (
                <div className="menscrubCard" key={scrub.product_id}>
                  <div className="menscrubImage">
                    <img src={scrub.image} alt={scrub.name} width="235px" />
                  </div>
                  <div className="menscrubDetails">
                    <div className="menrating">
                      <h5>Ecoflex</h5>
                      <h5>{scrub.rating}</h5>
                    </div>
                    <h3>{scrub.name}</h3>
                    <p>Price: ₹{scrub.price}</p>
                    <p>Color: {scrub.color}</p>
                    <div
                      className="menaddToCartbtn"
                      onClick={() => {
                        dispatch(addToCart({ ...scrub, quantity: 1 }));
                        console.log("scrub id ", scrub);
                      }}
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>
              ))}
        </section>
      </div>
    </div>
  );
}

export default FilterCollection;
