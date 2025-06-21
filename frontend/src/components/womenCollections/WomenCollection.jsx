import { useSelector } from "react-redux";
import "../../styles/WomenCollection/womenCollection.css";

function WomenCollection() {
  const allCollections = useSelector((state) => state.product.products);
  const womenProducts = allCollections.filter(
    (product) => product.gender === "women"
  ).slice(-4);

  return (
    <>
      <div className="menCollection">
        <h2>Women's collection</h2>
        <p>
          Home &gt; Buy womens's medical Scrub Suits & Lab Coast Aprons with Knya
        </p>
        <div className="product-grid">
          {womenProducts.map((product) => (
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
