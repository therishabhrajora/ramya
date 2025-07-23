import heroimage from "../../assets/Generic_Homepage_Banner_32_BIT_1.webp";
import "../../style/homepage/heroSection.css";

function HeroSection() {
  return (
    <div className="heroSectionContainer">
      <div className="heroSection">
        <img src={heroimage} className="heroImage" alt="" />
      </div>

      <div className="marquee-container">
        <ul className="marquee-content">
          <li>TONS   OF   STORAGE</li>
          <li>ANTI   DISTRACTION</li>
          <li>LAB   TESTED</li>
          <li>BACKED   BY   TECHNOLOGY</li>
          <li>LONG   SHIFTED   VERIFIED</li>
          <li>TONS   OF   STORAGE</li>
          <li>ANTI   DISTRACTION</li>
          <li>LAB   TESTED</li>
          <li>BACKED   BY   TECHNOLOGY</li>
          <li>LONG   SHIFTED   VERIFIED</li>
        </ul>
      </div>
    </div>
  );
}

export default HeroSection;
