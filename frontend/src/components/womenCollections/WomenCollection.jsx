import scrub from "../../assets/women/Scrub.webp";
import labCoat from "../../assets/women/Labcoat.webp";
import ecoflex from "../../assets/women/Ecoflex.webp";
import underScrub from "../../assets/women/Underscrub.webp";
import "../../styles/WomenCollection/womenCollection.css";

function WomenCollection() {
  const products = [
    {
      id: 1,
      name: "Scrub Suit",
      image: scrub,
      price: 1500,
      description:
        "Comfortable and durable medical scrub suit for healthcare professionals.",
    },
    {
      id: 2,
      name: "Lab Coat",
      image: labCoat,
      price: 2000,
      description: "Professional lab coat for medical and scientific use.",
    },
    {
      id: 3,
      name: "Ecoflex Scrub Suit",
      image: ecoflex,
      price: 1800,
      description: "Eco-friendly scrub suit made from sustainable materials.",
    },
    {
      id: 4,
      name: "Under Scrub",
      image: underScrub,
      price: 1200,
      description: "Comfortable under scrub for added warmth and comfort.",
    },
  ];

  return (
    <>
      <div className="menCollection">
        <h2>Men's collection</h2>
        <p>
          Home &gt; Buy mens's medical Scrub Suits & Lab Coast Aprons with Knya
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} width="280px" />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WomenCollection;
