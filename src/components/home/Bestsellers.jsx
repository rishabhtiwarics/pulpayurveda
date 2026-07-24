import { useEffect, useState } from "react";
import { useProducts } from "../../store/useProductStore.jsx";
import ProductCard from "../shop/ProductCard";
import ProductCardSkeleton from "../shop/ProductCardSkeleton";

export default function Bestsellers() {
  const { products, loading } = useProducts();
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      setVisibleCount(width > 600 && width <= 1024 ? 3 : 4);
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const bestsellerProducts = products
    .filter((p) => p.isBestseller && !p.isComboOffer)
    .slice(0, visibleCount);

  return (
    <section className="fav-section bestsellers-section">
      <div className="fav-wrap">
        <div className="fav-intro">
          <div className="fav-intro-copy">
            <span className="eyebrow fav-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4 5.6 20.8 8 13.6 2 9.2h7.6z" /></svg>
              Our
            </span>
            <h2>Bestsellers</h2>
            <p>Most loved by our customers</p>
          </div>
          <a href="/shop" className="fav-cta">
            View all products
            <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
          </a>
        </div>

        <div className="fav-grid" id="bestsellersGrid">
          {loading ? (
            <ProductCardSkeleton variant="grid" count={visibleCount} />
          ) : (
            bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="grid" />
            ))
          )}
        </div>

        <a href="/shop" className="fav-cta fav-mobile-cta">
          View all products
          <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
        </a>
      </div>
    </section>
  );
}