import "../../styles/homepage/shoppingSection.css";
import ecoflex_vneck_mens from "../../assets/men/excoflex_vneck_mens.webp";
import ecoflex_vneck_womens from "../../assets/women/excoflex_vneck_womens.webp";
import excoflex_vneck_womens_black from "../../assets/women/excoflex_vneck_womens(black).webp";
import ecoflex_vneck_mens_black from "../../assets/men/excoflex_vneck_mens(black).webp";
import heroimage from "../../assets/heroImage.webp";
function ShoppingSection() {
  const ecoFlexScrubs = [
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
  ];
  const classicScrubs = [
    {
      id: 1,
      name: "Ecoflex V-Neck Scrub (Mens)",
      image: ecoflex_vneck_mens,
      price: 1099,
      color: "blue",
      rating: 4.6,
    },
    {
      id: 2,
      name: "Ecoflex V-Neck Scrub (Womens)",
      image: ecoflex_vneck_womens,
      price: 1099,
      color: "blue",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Ecoflex V-Neck Scrub (Womens) - Black",
      image: excoflex_vneck_womens_black,
      price: 1099,
      color: "black",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Ecoflex V-Neck Scrub (Mens) - Black",
      image: ecoflex_vneck_mens_black,
      price: 1099,
      color: "black",
      rating: 4.4,
    },
  ];
  const stethoscope = [
    {
      id: 1,
      name: "Ecoflex V-Neck Scrub (Mens)",
      image: ecoflex_vneck_mens,
      price: 2499,
      color: "blue",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Ecoflex V-Neck Scrub (Womens)",
      image: ecoflex_vneck_womens,
      price: 2499,
      color: "blue",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Ecoflex V-Neck Scrub (Womens) - Black",
      image: excoflex_vneck_womens_black,
      price: 2499,
      color: "black",
      rating: 4.1,
    },
    {
      id: 4,
      name: "Ecoflex V-Neck Scrub (Mens) - Black",
      image: ecoflex_vneck_mens_black,
      price: 2499,
      color: "black",
      rating: 4.4,
    },
  ];

  return (
    <>
      <div className="shopping baseTextColor">
        <section className="ecoflex">
          <h1>Shop Ecoflex Scrubs</h1>
          <h5>Engineered with 4-way stretch technology</h5>
          <ul className="scrubList">
            {ecoFlexScrubs.map((scrub) => (
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
                  <div className="addToCartbtn">Add to Cart</div>
                </div>
              </div>
            ))}
          </ul>
        </section>
        <section className="classic">
          <h1>Shop Classic Scrubs</h1>
          <h5>Engineered with 4-way stretch technology</h5>
          <ul className="scrubList">
            {classicScrubs.map((scrub) => (
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
                  <div className="addToCartbtn">Add to Cart</div>
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
                  <div className="addToCartbtn">Add to Cart</div>
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
