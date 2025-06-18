import Footer from "../components/homePage/Footer";
import NavBar from "../components/homePage/NavBar";
import FilterCollection from "../components/womenCollections/FilterCollection";
import HeroSection from "../components/womenCollections/HeroSection";
import WomenCollection from "../components/womenCollections/WomenCollection";

function MenCollections() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <WomenCollection />
      <FilterCollection />
      <Footer />
    </div>
  );
}

export default MenCollections;
