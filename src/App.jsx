import Navbar from "./components/landing-page/Navbar";
import HeroSection from "./components/landing-page/HeroSection";
import HowItWorks from "./components/landing-page/HowItWorks";
import FeaturesSection from "./components/landing-page/FeaturesSection";
import PricingSection from "./components/landing-page/PricingSection";
import RequestAccess from "./components/landing-page/RequestAccess";
import Footer from "./components/landing-page/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <PricingSection />
        <RequestAccess />
      </main>

      <Footer />
    </>
  );
}

export default App;