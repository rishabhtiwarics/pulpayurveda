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

export default function PromiseBanner() {
  return (
    <section className="promise-banner">
      <div className="pb-text pb-offer">
        <span className="eyebrow pb-eyebrow">
          <Icon><path d="M12 2.5s7 7.5 7 12.5a7 7 0 11-14 0c0-5 7-12.5 7-12.5z" /></Icon>
          Combo Offer
        </span>
        <h2>Neem Detox Serum with Vitamin C</h2>
        <p>Daily herbal support for a cleaner wellness ritual, now available in a limited-time skincare combo.</p>
        <div className="pb-offer-price">
          <span className="pb-sale-price">Rs.541</span>
          <span className="pb-mrp">Rs.649</span>
        </div>
        <button className="pb-cta pb-cart" type="button">
          Add to cart
          <Icon><><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.5 3h2l2.7 12.4a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21 7H6" /></></Icon>
        </button>
      </div>
      <div className="pb-media">
                <span className="pb-offer-tag">15% Off</span>
<img src="/img/PromiseBannerbg.jpeg" alt="Pulp Ayurveda herbal blend" />
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
