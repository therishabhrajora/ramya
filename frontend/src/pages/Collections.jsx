import Footer from "../components/page/Footer";
import NavBar from "../components/page/NavBar";
import FilterCollection from "../components/collections/FilterCollection";
import Collection from "../components/collections/Collection";
import HeroSection from "../components/collections/HeroSection";


function MenCollections() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Collection />
      <FilterCollection />
      <Footer />
    </div>
  );
}

export default MenCollections;
