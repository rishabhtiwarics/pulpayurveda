import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Hero from "./components/home/Hero";
import TrustMarquee from "./components/home/TrustMarquee";
import CustomerFavorites from "./components/home/CustomerFavorites";
import MiddleBanner from "./components/home/MiddleBanner";
import Bestsellers from "./components/home/Bestsellers";
import PromiseBanner from "./components/home/PromiseBanner";
import WatchShop from "./components/home/WatchShop";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <CustomerFavorites />
        <MiddleBanner />
        <Bestsellers />
        <PromiseBanner />
        <WatchShop />
      </main>
      <Footer />
    </>
  );
}



