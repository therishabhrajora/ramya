
import AboutRamya from "../components/homePage/AboutRamya";
import CategorySection from "../components/homePage/CategorySection";
import Footer from "../components/homePage/Footer";
import HeroSection from "../components/homePage/HeroSection";
import NavBar from "../components/homePage/NavBar";
import ShoppingSection from "../components/homePage/ShoppingSection";


function HomePage() {


  return (
    <>
      <NavBar />   
      <HeroSection />
      <CategorySection/>
      <ShoppingSection/>
      <AboutRamya/>
      <Footer/>
    </>
  );
}

export default HomePage;
