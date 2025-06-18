import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import ecoflex_vneck_mens from "../../assets/men/excoflex_vneck_mens.webp";
import ecoflex_vneck_womens from "../../assets/women/excoflex_vneck_womens.webp";
import excoflex_vneck_womens_black from "../../assets/women/excoflex_vneck_womens(black).webp";
import ecoflex_vneck_mens_black from "../../assets/men/excoflex_vneck_mens(black).webp";

import "../../index.css";
import "../../styles/MenCollection/filterCollection.css";
function FilterCollection() {
  const allCollections = [
    {
      id: 1,
      name: "Ecoflex V-Neck Scrub (Mens)",
      image: ecoflex_vneck_mens,
      price: 2399,
      color: "blue",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Ecoflex V-Neck Scrub (Womens)",
      image: ecoflex_vneck_womens,
      price: 2399,
      color: "blue",
      rating: 4.1,
    },
    {
      id: 3,
      name: "Ecoflex V-Neck Scrub (Womens) - Black",
      image: excoflex_vneck_womens_black,
      price: 2399,
      color: "black",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Ecoflex V-Neck Scrub (Mens) - Black",
      image: ecoflex_vneck_mens_black,
      price: 2399,
      color: "black",
      rating: 4.0,
    },

    {
      id: 5,
      name: "Ecoflex V-Neck Scrub (Mens)",
      image: ecoflex_vneck_mens,
      price: 1099,
      color: "blue",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Ecoflex V-Neck Scrub (Womens)",
      image: ecoflex_vneck_womens,
      price: 1099,
      color: "blue",
      rating: 4.8,
    },
    {
      id: 7,
      name: "Ecoflex V-Neck Scrub (Womens) - Black",
      image: excoflex_vneck_womens_black,
      price: 1099,
      color: "black",
      rating: 4.3,
    },
    {
      id: 8,
      name: "Ecoflex V-Neck Scrub (Mens) - Black",
      image: ecoflex_vneck_mens_black,
      price: 1099,
      color: "black",
      rating: 4.4,
    },

    {
      id: 9,
      name: "Ecoflex V-Neck Scrub (Mens)",
      image: ecoflex_vneck_mens,
      price: 2499,
      color: "blue",
      rating: 4.9,
    },
    {
      id: 10,
      name: "Ecoflex V-Neck Scrub (Womens)",
      image: ecoflex_vneck_womens,
      price: 2499,
      color: "blue",
      rating: 4.2,
    },
    {
      id:11,
      name: "Ecoflex V-Neck Scrub (Womens) - Black",
      image: excoflex_vneck_womens_black,
      price: 2499,
      color: "black",
      rating: 4.1,
    },
    {
      id: 12,
      name: "Ecoflex V-Neck Scrub (Mens) - Black",
      image: ecoflex_vneck_mens_black,
      price: 2499,
      color: "black",
      rating: 4.4,
    },
  ];
  return (
    <div className="filterCollectionContainer">
      <p className="sortBySection">
        <IoIosArrowDown />
        <span>SORT BY: </span>
        <span>Most Popular</span>
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
          {allCollections.map((scrub) => (
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
                
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default FilterCollection;
