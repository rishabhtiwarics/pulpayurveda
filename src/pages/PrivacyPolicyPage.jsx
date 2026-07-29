import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";

const sections = [
  {
    title: "Information we collect",
    body: "We may collect details you share with us, such as your name, email address, phone number, delivery address, order information, and messages sent through forms or support channels.",
  },
  {
    title: "How we use your information",
    body: "We use your information to process orders, provide customer support, improve our products and services, share important updates, and keep your shopping experience smooth and secure.",
  },
  {
    title: "Payments and checkout",
    body: "Payment information is handled by secure payment partners. We do not store full card, UPI, wallet, or banking credentials on this website.",
  },
  {
    title: "Cookies and site experience",
    body: "We may use cookies or local storage to remember cart items, login state, preferences, and basic website behavior so the site works reliably across visits.",
  },
  {
    title: "Sharing of information",
    body: "We only share information with service providers when needed for delivery, payment processing, support, analytics, fraud prevention, or legal compliance.",
  },
  {
    title: "Your choices",
    body: "You can contact us to request access, correction, or deletion of your personal information, subject to order, tax, fraud prevention, and legal record requirements.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <InnorHero title="Privacy Policy" current="Privacy Policy" />
      <ShopPerks />
      <section className="pulp-policy-section" aria-labelledby="pulpPolicyTitle">
        <div className="pulp-policy-wrap">
          <div className="pulp-policy-head">
            <span className="pulp-policy-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-5" /></svg>
              Your privacy matters
            </span>
            <h2 id="pulpPolicyTitle">How Pulp Ayurveda handles your information</h2>
            <p>This policy explains how we collect, use, and protect information when you browse, shop, contact us, or use our website.</p>
          </div>

          <div className="pulp-policy-card">
            <div className="pulp-policy-summary">
              <strong>Last updated</strong>
              <span>July 29, 2026</span>
            </div>
            <div className="pulp-policy-list">
              {sections.map((item, index) => (
                <article className="pulp-policy-item" key={item.title}>
                  <span className="pulp-policy-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="pulp-policy-contact">
              <h3>Contact us</h3>
              <p>For privacy questions or requests, write to <a href="mailto:hello@pulpayurveda.com">hello@pulpayurveda.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}