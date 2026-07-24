import { useEffect, useState } from "react";
import { CartIcon, RatingStars, products, titleCase } from "./CustomerFavorites";

export default function Bestsellers() {
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

  const bestsellerProducts = products.slice(0, visibleCount);

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
          <a href="#" className="fav-cta">
            View all products
            <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
          </a>
        </div>

        <div className="fav-grid" id="bestsellersGrid">
          {bestsellerProducts.map((product) => (
            <article className="fav-card" data-category={product.category} key={`bestseller-${product.category}-${product.name}`}>
              <div className="fav-img"><img src={product.image} alt={product.name} /></div>
              <p className="fav-cat-tag">{titleCase(product.category)}</p>
              <h3 className="fav-name">{product.name}</h3>
              <div className="fav-rating"><RatingStars value={product.rating} /><strong>({product.rating})</strong></div>
              <div className="fav-bottom">
                <span className="fav-price">{product.price}</span>
                <button className="fav-add" type="button" aria-label={`Add ${product.name} to cart`}><CartIcon />Add to cart</button>
              </div>
            </article>
          ))}
        </div>

        <a href="#" className="fav-cta fav-mobile-cta">
          View all products
          <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
        </a>
      </div>
    </section>
  );
}