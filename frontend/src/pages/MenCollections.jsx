import Footer from "../components/homePage/Footer";
import NavBar from "../components/homePage/NavBar";
import FilterCollection from "../components/menCollections/FilterCollection";
import HeroSection from "../components/menCollections/HeroSection";
import MenCollection from "../components/menCollections/MenCollection";

function MenCollections() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <MenCollection />
      <FilterCollection />
      <Footer />
    </div>
  );
}

export default MenCollections;
