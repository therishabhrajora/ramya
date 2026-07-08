import Footer from "../components/page/Footer";
import NavBar from "../components/page/NavBar";
import FilterCollection from "../components/collections/FilterCollection";
import Collection from "../components/collections/Collection";
import HeroSection from "../components/collections/HeroSection";
import { useParams, useSearchParams } from "react-router-dom";


function Collections() {
  const [c]=useSearchParams();
  const color=c.get("color");

  return (
    <div>
      <NavBar />
      <HeroSection />
      <Collection  />
      <FilterCollection  />
      <Footer />
    </div>
  );
}

export default Collections;
