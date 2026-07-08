import { useSelector } from "react-redux";
import "../../style/menCollection/menCollection.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


function Collection() {
  const navigate=useNavigate();
  const allCollections = useSelector((state) => state.product.products);
  const menProducts = allCollections.filter(
    (product) => product.gender === "Men"
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
            <div  key={product.productId} className="product-card">
              <img src={product.images[0]} alt={product.name} width="280px" />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Collection;
