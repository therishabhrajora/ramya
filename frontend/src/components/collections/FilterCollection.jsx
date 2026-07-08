import { IoMdArrowDropup } from "react-icons/io";
import "../../index.css";
import "../../style/menCollection/filterCollection.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../../slices/ProductSlice";
import { useNavigate, useParams } from "react-router-dom";

function FilterCollection() {
  const dispatch = useDispatch();
  const { c } = useParams(); // Destructure 'c' cleanly
  const navigate = useNavigate();

  const [selectCheckBox, setSelectCheckBox] = useState([]);
  
  const allCollections = useSelector((state) => state.product.products);
  const colors = useSelector((state) => state.product.colors);
  const pockets = useSelector((state) => state.product.pockets);
  const gender = useSelector((state) => state.product.gender);
  const type = useSelector((state) => state.product.type);

  // AUTOMATION TRIGGER: If path parameter changes and matches a color, auto-check it!
  useEffect(() => {
    if (c && colors.includes(c)) {
      setSelectCheckBox([c]);
    } else {
      setSelectCheckBox([]); // Reset checkboxes if switching to a non-color path like "men"
    }
  }, [c, colors]);

  // Step 1: Filter base inventory by main URL path context (Men/Women gender tracks)
  const baseCategoryProducts = allCollections.filter((product) => {
    if (!c) return true;
    const pathLower = c.toLowerCase();
    
    if (pathLower === "men" || pathLower === "women") {
      return product.gender.toLowerCase() === pathLower;
    }
    // If path is a color name, let the checkbox system handle filtering below instead of slicing inventory early
    return true; 
  });

  // Step 2: Sorting Logic Engine
  const [sortBy, setSortBy] = useState("default");
  const sortProducts = (e) => setSortBy(e.target.value);

  const sortFunctions = {
    default: (a, b) => a.id - b.id,
    priceLowToHigh: (a, b) => a.price - b.price,
    priceHighToLow: (a, b) => b.price - a.price,
    ratingHighToLow: (a, b) => b.rating - a.rating,
    ratingLowToHigh: (a, b) => a.rating - b.rating,
  };

  const sortedProducts = [...baseCategoryProducts].sort(sortFunctions[sortBy]);

  // Step 3: Checkbox Cross-Filtering Layer
  let filterproducts = sortedProducts.filter((product) => {
    if (selectCheckBox.length === 0) return true;

    // Check if product contains any match from multi-selection arrays
    const matchesColor = product.colors ? product.colors.some(col => selectCheckBox.includes(col)) : selectCheckBox.includes(product.color);
    const matchesPocket = selectCheckBox.includes(String(product.pocket));
    const matchesGender = selectCheckBox.includes(product.gender);
    const matchesCategory = selectCheckBox.includes(product.category);

    return matchesColor || matchesPocket || matchesGender || matchesCategory;
  });

  let handleCheckBoxes = (e) => {
    let value = e.target.value;
    if (e.target.checked) {
      setSelectCheckBox((prev) => [...prev, value]);
    } else {
      setSelectCheckBox((prev) => prev.filter((item) => item !== value));
      
      // OPTIONAL: If unchecking the color that matches the active URL path, push back to safety route
      if (value === c) {
        navigate("/collections");
      }
    }
  };

  return (
    <div className="menfilterCollectionContainer">
      <p className="mensortBySection">
        <span><b>SORT BY: </b></span>
        <select className="mensortProduct" name="sortProduct" id="sortProduct" value={sortBy} onChange={sortProducts}>
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="ratingHighToLow">Rating: High to Low</option>
          <option value="ratingLowToHigh">Rating: Low to High</option>
        </select>
      </p>
      
      <div className="menfilter-collection">
        <section className="menfilterSection">
          <h2>Filters</h2>
          
          {/* Colours Panel */}
          <div className="menfilterByColour">
            <h3><span>Colours</span><IoMdArrowDropup /></h3>
            <ul className="mencolourList">
              {colors.map((color) => ( 
                <li key={color}>
                  <label htmlFor={color}>{color}</label>
                  <input
                    type="checkbox"
                    id={color}
                    value={color} // FIXED: Keep literal unique color value
                    checked={selectCheckBox.includes(color)} // FIXED: Force visual check sync
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Pockets Panel */}
          <div className="menfilterByPockets">
            <h3><span>Pockets</span><IoMdArrowDropup /></h3>
            <ul className="menpocketsList">
              {pockets.map((pocket) => (
                <li key={pocket}>
                  <label htmlFor={pocket}>{pocket}</label>
                  <input
                    type="checkbox"
                    id={pocket}
                    value={pocket}
                    checked={selectCheckBox.includes(String(pocket))}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Gender Panel */}
          <div className="menfilterByGender">
            <h3><span>Gender</span><IoMdArrowDropup /></h3>
            <ul className="mengenderList">
              {gender.map((gen) => (
                <li key={gen}>
                  <label htmlFor={gen}>{gen}</label>
                  <input
                    type="checkbox"
                    id={gen}
                    value={gen}
                    checked={selectCheckBox.includes(gen)}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Fabric Panel */}
          <div className="menfilterByFabric">
            <h3><span>Fabric</span><IoMdArrowDropup /></h3>
            <ul className="menfabricList">
              {type.map((t) => (
                <li key={t}>
                  <label htmlFor={t}>{t}</label>
                  <input
                    type="checkbox"
                    id={t}
                    value={t}
                    checked={selectCheckBox.includes(t)}
                    onChange={handleCheckBoxes}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Results Panel Grid Grid */}
        <section className="menfilterResults">
          {filterproducts.length === 0 ? (
            <div className="menNoResults">No products match the selected criteria.</div>
          ) : (
            filterproducts.map((scrub) => (
              <div 
                className="menscrubCard" 
                key={scrub.productId}
                onClick={() => navigate(`/collections/${c || 'all'}/${scrub.productId}`)}
              >
                <div className="menscrubImage">
                  <img src={scrub.image} alt={scrub.name} />
                </div>
                <div className="menscrubDetails">
                  <div className="menrating">
                    <h5>Ecoflex</h5>
                    <h5>{scrub.rating}</h5>
                  </div>
                  <h3>{scrub.name}</h3>
                  <p>Price: ₹{scrub.price}</p>
                  <button
                    className="menaddToCartbtn"
                    onClick={(e) => {
                      e.stopPropagation(); // Stops card click navigation firing instead
                      dispatch(addToCart({ ...scrub, quantity: 1 }));
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default FilterCollection;
