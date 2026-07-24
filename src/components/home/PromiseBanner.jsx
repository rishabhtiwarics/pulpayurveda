import { useEffect } from "react";
import { useProducts } from "../../store/useProductStore.jsx";

const features = [
  {
    title: "Sustainable",
    text: "Eco-friendly packaging and responsible sourcing.",
    icon: <path d="M12 21c-4.5-1.5-8-5.5-8-11 5.5 0 9.5 3.5 11 8 1.5-4.5 5.5-8 11-8 0 5.5-3.5 9.5-8 11-1 .3-2 .5-3 .5s-2-.2-3-.5z" />
  },
  {
    title: "Transparent",
    text: "Honest ingredients, visible results.",
    icon: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></>
  },
  {
    title: "Thoughtful",
    text: "Skincare that cares for you and the planet.",
    icon: <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
  },
  {
    title: "Handcrafted",
    text: "Small batches, cold-pressed with care.",
    icon: <path d="M12 2.5s7 7.5 7 12.5a7 7 0 11-14 0c0-5 7-12.5 7-12.5z" />
  }
];

function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function OfferSkeleton() {
  return (
    <div className="pb-text pb-offer">
      <div className="skeleton skeleton-line" style={{ width: "90px", height: "18px", marginBottom: "14px" }} />
      <div className="skeleton skeleton-line" style={{ width: "85%", height: "28px", marginBottom: "10px" }} />
      <div className="skeleton skeleton-line" style={{ width: "100%", height: "16px", marginBottom: "6px" }} />
      <div className="skeleton skeleton-line" style={{ width: "80%", height: "16px", marginBottom: "18px" }} />
      <div style={{ display: "flex", gap: "12px", marginBottom: "22px" }}>
        <div className="skeleton skeleton-line" style={{ width: "80px", height: "28px" }} />
        <div className="skeleton skeleton-line" style={{ width: "60px", height: "28px" }} />
      </div>
      <div className="skeleton skeleton-line" style={{ width: "140px", height: "42px", borderRadius: "8px" }} />
    </div>
  );
}

export default function PromiseBanner() {
  const { products, comboOffer, loading } = useProducts();

  const offerProduct = !loading && comboOffer
    ? products.find((p) => p.id === comboOffer.productId)
    : null;

  return (
    <section className="promise-banner">
      {loading ? (
        <OfferSkeleton />
      ) : (
        <div className="pb-text pb-offer">
          <span className="eyebrow pb-eyebrow">
            <Icon><path d="M12 2.5s7 7.5 7 12.5a7 7 0 11-14 0c0-5 7-12.5 7-12.5z" /></Icon>
            {comboOffer?.label || "Combo Offer"}
          </span>
          <h2>{offerProduct?.name || "Neem Detox Serum with Vitamin C"}</h2>
          <p>{comboOffer?.tagline || offerProduct?.description}</p>
          <div className="pb-offer-price">
            <span className="pb-sale-price">Rs.{comboOffer?.salePrice || offerProduct?.discountPrice}</span>
            <span className="pb-mrp">Rs.{offerProduct?.price}</span>
          </div>
          <button className="pb-cta pb-cart" type="button">
            Add to cart
            <Icon><><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.5 3h2l2.7 12.4a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21 7H6" /></></Icon>
          </button>
        </div>
      )}

      <div className="pb-media">
        <span className="pb-offer-tag">{comboOffer ? `${comboOffer.discountPercent}% Off` : "15% Off"}</span>
        <img src={offerProduct?.image || comboOffer?.bannerImage || "/img/PromiseBannerbg.jpeg"} alt={offerProduct?.name || "Pulp Ayurveda herbal blend"} />
      </div>

      <div className="pb-features">
        {features.map((feature) => (
          <div className="pb-feature" key={feature.title}>
            <span className="pb-feature-icon"><Icon>{feature.icon}</Icon></span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
