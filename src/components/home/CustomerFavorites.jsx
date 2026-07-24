import { useEffect, useMemo, useState } from "react";

const tabs = ["all", "virvex", "venora", "pressova", "nestara", "livera", "flexora", "femiva", "cardiva"];

export const products = [
  { category: "virvex", name: "Neem Detox Serum with Vitamin C", price: "Rs.649", image: "/img/product1.png", rating: "4.9", description: "Daily herbal support for a cleaner wellness ritual." },
  { category: "venora", name: "Daily Glow Moisturizer with Saffron", price: "Rs.549", image: "/img/product2.png", rating: "4.8", description: "Soft, balanced care made for everyday glow." },
  { category: "venora", name: "Night Repair Cream with Almond Oil", price: "Rs.599", image: "/img/product1.png", rating: "4.7", description: "Nourishing night ritual with a smooth finish." },
  { category: "pressova", name: "Gentle Herbal Cleanser with Aloe Vera", price: "Rs.449", image: "/img/product2.png", rating: "4.9", description: "Gentle plant care for a fresh daily cleanse." },
  { category: "nestara", name: "Detox Clay Mask with Multani Mitti", price: "Rs.499", image: "/img/product1.png", rating: "4.8", description: "A weekly reset for calm, polished skin." },
  { category: "livera", name: "Sun Shield SPF 50+ with Turmeric", price: "Rs.399", image: "/img/product2.png", rating: "4.6", description: "Lightweight protection with a herbal touch." },
  { category: "livera", name: "Under Eye Cream with Cucumber", price: "Rs.449", image: "/img/product1.png", rating: "4.7", description: "Cooling care for tired-looking under eyes." },
  { category: "flexora", name: "Hair Growth Oil with Bhringraj", price: "Rs.599", image: "/img/product2.png", rating: "4.8", description: "Root-focused oil for a mindful hair ritual." },
  { category: "femiva", name: "Body Lotion with Shea Butter", price: "Rs.449", image: "/img/product1.png", rating: "4.9", description: "Comforting body care with lasting softness." },
  { category: "cardiva", name: "Ayurvedic Immunity Tonic", price: "Rs.699", image: "/img/product2.png", rating: "4.8", description: "A thoughtful tonic for everyday resilience." }
];

export function titleCase(value) {
  return value === "all" ? "All" : value.charAt(0).toUpperCase() + value.slice(1);
}

export function RatingStars({ value }) {
  const rating = Number(value);

  return (
    <div className="fav-stars" aria-label={`${value} out of 5 rating`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const className = rating >= star ? "full" : rating >= star - 0.5 ? "half" : "empty";
        return <span key={star} className={className}>{"\u2605"}</span>;
      })}
    </div>
  );
}
export function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.7 12.4a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21 7H6" />
    </svg>
  );
}

function TabIcon({ type }) {
  const icons = {
    all: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    virvex: <path d="M12 2c4 3 7 7 7 11a7 7 0 01-14 0c0-4 3-8 7-11z" />,
    venora: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
    pressova: <><path d="M6 3h12l-1.5 14.5a2 2 0 01-2 1.5h-5a2 2 0 01-2-1.5L6 3z" /><path d="M4 3h16" /></>,
    nestara: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    livera: <><circle cx="12" cy="12" r="5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    flexora: <path d="M4 20c0-5 3-9 4-9s2 3 2 6M10 20c0-6 4-11 5-11s3 4 3 8M15 20c0-4 3-7 5-7" />,
    femiva: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0112 6.5 5.5 5.5 0 0121.5 12c-2.5 4.65-9.5 9-9.5 9z" />,
    cardiva: <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

export default function CustomerFavorites() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [maxVisible, setMaxVisible] = useState(4);

  useEffect(() => {
    function updateMaxVisible() {
      const width = window.innerWidth;
      if (width <= 600) setMaxVisible(4);
      else if (width <= 1024) setMaxVisible(3);
      else setMaxVisible(4);
    }
    updateMaxVisible();
    window.addEventListener("resize", updateMaxVisible);
    return () => window.removeEventListener("resize", updateMaxVisible);
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = activeFilter === "all" ? products : products.filter((product) => product.category === activeFilter);
    return filtered.slice(0, maxVisible);
  }, [activeFilter, maxVisible]);

  return (
    <section className="fav-section">
      <div className="fav-wrap">
        <div className="fav-intro">
          <div className="fav-intro-copy">
            <span className="eyebrow fav-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
            Shop By
          </span>
          <h2>Concern?</h2>
          <p>Browse products by your health need</p>
          </div>
          <a href="#" className="fav-cta">
            View all products
            <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
          </a>
        </div>

        <div className="fav-tabs" id="favTabs">
          {tabs.map((tab) => (
            <button key={tab} className={`fav-tab${activeFilter === tab ? " active" : ""}`} type="button" onClick={() => setActiveFilter(tab)}>
              <TabIcon type={tab} />
              {titleCase(tab)}
            </button>
          ))}
        </div>

        <div className="fav-grid" id="favGrid">
          {visibleProducts.map((product) => (
            <article className="fav-card" data-category={product.category} key={`${product.category}-${product.name}`}>
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
          {!visibleProducts.length && <div className="fav-empty show">No products found in this category yet.</div>}
        </div>

        <a href="#" className="fav-cta fav-mobile-cta">
          View all products
          <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
        </a>
      </div>
    </section>
  );
}