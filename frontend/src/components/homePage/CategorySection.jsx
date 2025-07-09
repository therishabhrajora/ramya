import "../../index.css";
import "../../styles/homepage/CategorySection.css";
import navyblue from "../../assets/navyblue.png";
import black from "../../assets/black.png";
import wine from "../../assets/wine.png";
import forestgreen from "../../assets/forestgreen.png";
import olive from "../../assets/olive.png";
import galaxyblue from "../../assets/galaxyblue.png";
import hotpink from "../../assets/hotpink.png";
import { Link } from "react-router-dom";

function CategorySection() {
  const categories = [
    { name: "Navy Blue", image: navyblue },
    { name: "Black", image: black },
    { name: "Wine", image: wine },
    { name: "Forest Green", image: forestgreen },
    { name: "Olive", image: olive },
    { name: "Galaxy Blue", image: galaxyblue },
    { name: "Hot Pink", image: hotpink },
  ];

  return (
    <div className="categorySection">
      <div className="bycategory baseTextColor">
        <h1>Shop By Categories</h1>
        <div className="categoryList">
          <Link className="Link" to="/collections/men"><li className="mens">MENS</li></Link>
          <Link className="Link" to="/collections/women"><li className="womens">WOMENS</li></Link>
          <Link className="Link" to="/"><li className="ecoflex">ECOFLEX</li></Link>
          <Link className="Link" to="/"><li className="stethoscope">STETHOSCOPE</li></Link>
          <Link className="Link" to="/"><li className="aprons">APRONS</li></Link>
          <Link className="Link" to="/"><li className="multipacks">MULTI PACKS</li></Link>
        </div>
      </div>
      <div className="byColor baseTextColor">
        <h1>Shop By Color</h1>
        <ul className="colorList">
          {categories.map((category, index) => (
            <li className={category.name} key={index}>
              <img src={category.image} alt={category.name} width="150px"/>
              <h4>{category.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategorySection;
