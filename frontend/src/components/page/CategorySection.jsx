import "../../index.css";
import "../../style/page/categorySection.css";
import navyblue from "../../assets/navyblue.png";
import black from "../../assets/black.png";
import wine from "../../assets/wine.png";
import forestgreen from "../../assets/forestgreen.png";
import olive from "../../assets/olive.png";
import galaxyblue from "../../assets/galaxyblue.png";
import hotpink from "../../assets/hotpink.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../app/AppClient";
import { ENDPOINTS } from "../../services/Constants";
import { useDispatch } from "react-redux";
import { setColors } from "../../slices/ProductSlice";

function CategorySection() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [color,setColor]=useState([]);

  useEffect(()=>{
    const fetchColors=async()=>{
      const colors=await apiClient.get(ENDPOINTS.getProductColors);
      console.log(colors.data);
      setColor(colors.data);
      dispatch(setColors(colors.data));
    }
    fetchColors();
  },[]);


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
          {color.map((color, index) => (
            <li className={color} key={index} onClick={()=>navigate(`/collections/${color}`)}>
              <img src={color} alt={color} width="150px"/>
              <h4>{color}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategorySection;
