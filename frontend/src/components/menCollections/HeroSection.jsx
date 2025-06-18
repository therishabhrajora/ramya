import Banner from "../../assets/men/MensBanner.webp";
import "../../styles/MenCollection/HeroSection.css";


function HeroSection() {
  return (
    <div className="heroSectionMen">
      <img src={Banner} className="banner" alt="" />
    </div>
  );
}

export default HeroSection;
