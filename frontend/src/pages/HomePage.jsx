
import AboutRamya from "../components/page/AboutRamya";
import CategorySection from "../components/page/CategorySection";
import Footer from "../components/page/Footer";
import HeroSection from "../components/page/HeroSection";
import NavBar from "../components/page/NavBar";
import ShoppingSection from "../components/page/ShoppingSection";

function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <CategorySection />
      <ShoppingSection />
      <AboutRamya />
      <Footer />
    </>
  );
}

export default HomePage;
