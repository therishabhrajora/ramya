import { GoPlus } from "react-icons/go";

import "../../index.css";
import "../../styles/homepage/aboutRamya.css";

function AboutRamya() {
  return (
    <>
      <div className="aboutRamya baseBg">
        <h2>
          Knya: Stylish & Functional Medical Scrubs, Lab Coats, and Stethoscopes
          for Men & Women!
        </h2>
        <h3>Introduction:</h3>
        <p>
          Knya is your one-stop shop for top-quality medical scrubs, lab coats,
          and underscrubs for men and women. We believe every medical
          professional deserves comfortable, flexible, and breathable apparel
          that also projects a highly professional image.
        </p>
        <div className="Readmorebtn">
          <GoPlus />
          <p>Read more</p>
        </div>
      </div>
     
    </>
  );
}

export default AboutRamya;
