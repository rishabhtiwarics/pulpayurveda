import Hero from "../components/home/Hero";
import TrustMarquee from "../components/home/TrustMarquee";
import CustomerFavorites from "../components/home/CustomerFavorites";
import MiddleBanner from "../components/home/MiddleBanner";
import Bestsellers from "../components/home/Bestsellers";
import PromiseBanner from "../components/home/PromiseBanner";
import MiddleBanner2 from "../components/home/MiddleBanner2";
import WatchShop from "../components/home/WatchShop";
import PulpTestimonials from "../components/home/PulpTestimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustMarquee />
      <CustomerFavorites />
      <MiddleBanner />
      <Bestsellers />
      {/* <PromiseBanner /> */}
      <MiddleBanner2 />
      <WatchShop />
      <PulpTestimonials />
    </main>
  );
}