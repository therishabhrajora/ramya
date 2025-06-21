import { useSelector } from "react-redux";
import "../../styles/MenCollection/MenCollection.css";

function MenCollection() {
  const allCollections = useSelector((state) => state.product.products);
  const menProducts = allCollections.filter(
    (product) => product.gender === "men"
  ).slice(-4);

  return (
    <>
      <div className="menCollection">
        <h2>Men's collection</h2>
        <p>
          Home &gt; Buy mens's medical Scrub Suits & Lab Coast Aprons with Knya
        </p>
        <div className="product-grid">
          {menProducts.map((product) => (
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

export default MenCollection;
