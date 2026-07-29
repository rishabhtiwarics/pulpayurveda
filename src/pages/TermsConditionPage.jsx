import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";

const terms = [
  {
    title: "Use of this website",
    body: "By browsing or placing an order on Pulp Ayurveda, you agree to use the website for lawful personal shopping and information purposes only.",
  },
  {
    title: "Product information",
    body: "We aim to keep product details, pricing, images, ingredients, and availability accurate, but minor variations or updates may occur without prior notice.",
  },
  {
    title: "Health guidance",
    body: "Our products and content are for general wellness support. They are not a substitute for medical advice, diagnosis, or treatment from a qualified healthcare professional.",
  },
  {
    title: "Orders and payments",
    body: "Orders are confirmed after successful checkout details are submitted. Payment options, delivery timelines, and charges may vary based on location and availability.",
  },
  {
    title: "Shipping and delivery",
    body: "We work to dispatch orders promptly. Delivery timelines are estimates and may be affected by courier delays, location restrictions, weather, or operational issues.",
  },
  {
    title: "Returns and support",
    body: "For order issues, damaged items, or support requests, contact us with your order details so our team can review and assist according to store policy.",
  },
];

export default function TermsConditionPage() {
  return (
    <>
      <InnorHero title="Terms & Condition" current="Terms" />
      <ShopPerks />
      <section className="pulp-terms-section" aria-labelledby="pulpTermsTitle">
        <div className="pulp-terms-wrap">
          <div className="pulp-terms-head">
            <span className="pulp-terms-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>
              Store terms
            </span>
            <h2 id="pulpTermsTitle">Terms that keep your Pulp Ayurveda experience clear</h2>
            <p>Please read these terms before using our website, browsing products, or placing an order.</p>
          </div>

          <div className="pulp-terms-card">
            <div className="pulp-terms-summary">
              <strong>Effective date</strong>
              <span>July 29, 2026</span>
            </div>
            <div className="pulp-terms-list">
              {terms.map((item, index) => (
                <article className="pulp-terms-item" key={item.title}>
                  <span className="pulp-terms-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="pulp-terms-contact">
              <h3>Need help?</h3>
              <p>For questions about these terms, contact <a href="mailto:hello@pulpayurveda.com">hello@pulpayurveda.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}