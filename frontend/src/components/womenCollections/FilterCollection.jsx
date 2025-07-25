import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import "../../index.css";
import "../../style/womenCollection/filterCollection.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "../../slices/ProductSlice";
function FilterCollection() {
  const dispatch = useDispatch();
  
  const allCollections = useSelector((state) => state.product.products);
  const womenProducts = allCollections
    .filter((product) => product.gender === "women")
    .slice(0, -4);

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
  womenProducts.sort(sortFunctions[sortBy]);



  return (
    <div className="filterCollectionContainer">
      <p className="sortBySection">
        <IoIosArrowDown />
        <span>SORT BY: </span>
        <select
          className="sortProduct"
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
      <div className="filter-collection">
        <section className="filterSection">
          <h2>Filters</h2>
          <div className="filterByColour">
            <h3>
              <span>Colours</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="colourList">
              <li>
                <label htmlFor="navy">navy</label>
                <input type="checkbox" id="navy" />
              </li>
              <li>
                <label htmlFor="Wine">Wine</label>
                <input type="checkbox" id="Wine" />
              </li>
              <li>
                <label htmlFor="Black">Black</label>
                <input type="checkbox" id="Black" />
              </li>
              <li>
                <label htmlFor="Forest Green">Forest Green</label>
                <input type="checkbox" id="Forest Green" />
              </li>
              <li>
                <label htmlFor="Ciel Blue">Ciel Blue</label>
                <input type="checkbox" id="Ciel Blue" />
              </li>
              <li>
                <label htmlFor="heather grey">heather grey</label>
                <input type="checkbox" id="heather grey" />
              </li>
              <li>
                <label htmlFor="Olive">Olive</label>
                <input type="checkbox" id="Olive" />
              </li>
              <li>
                <label htmlFor="steel gray">steel gray</label>
                <input type="checkbox" id="steel gray" />
              </li>
            </ul>
          </div>
          <div className="filterByPockets">
            <h3>
              <span>Pockets</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="pocketsList">
              <li>
                <label htmlFor=" 5 pockets"> 5 pockets</label>
                <input type="checkbox" id=" 5 pockets" />
              </li>
              <li>
                <label htmlFor="8 pockets">8 pockets</label>
                <input type="checkbox" id="8 pockets" />
              </li>
              <li>
                <label htmlFor="10 pockets">10 pockets</label>
                <input type="checkbox" id="10 pockets" />
              </li>
            </ul>
          </div>
          <div className="filterByGender">
            <h3>
              <span>Gender</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="genderList">
              <li>
                <label htmlFor="Male">Male</label>
                <input type="checkbox" id="Male" />
              </li>
              <li>
                <label htmlFor="Female">Female</label>
                <input type="checkbox" id="Female" />
              </li>
            </ul>
          </div>
          <div className="filterByFabric">
            <h3>
              <span>Fabric</span>
              <IoMdArrowDropup />
            </h3>
            <ul className="fabricList">
              <li>
                <label htmlFor="Classic">Classic</label>
                <input type="checkbox" id="Classic" />
              </li>
              <li>
                <label htmlFor="ecoflex">ecoflex</label>
                <input type="checkbox" id="ecoflex" />
              </li>
            </ul>
          </div>
        </section>
        <section className="filterResults">
          {womenProducts.map((scrub) => (
            <div className="scrubCard" key={scrub.id}>
              <div className="scrubImage">
                <img src={scrub.image} alt={scrub.name} width="235px" />
              </div>
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
        </section>
      </div>
    </div>
  );
}

export default FilterCollection;
