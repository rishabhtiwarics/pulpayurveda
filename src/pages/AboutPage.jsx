import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";

export default function AboutPage() {
  return (
    <>
      <InnorHero title="About Us" current="About" />
      <ShopPerks />
      <section className="pulp-about-purpose-section" aria-labelledby="pulpAboutPurposeTitle">
        <div className="pulp-about-purpose-wrap">
          <div className="pulp-about-purpose-head">
            <div className="pulp-about-purpose-eyebrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3c-4 3-6 7-6 11a6 6 0 0012 0c0-4-2-8-6-11z" /></svg>Our Purpose</div>
            <h2 id="pulpAboutPurposeTitle">Rooted in Ayurveda, guided by intention</h2>
            <p>Two ideas that keep every formulation honest: where we are headed, and how we get there without cutting a single corner.</p>
          </div>
          <div className="pulp-about-purpose-grid">
            <div className="pulp-about-purpose-col"><div className="pulp-about-purpose-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3c-4 3-6 7-6 11a6 6 0 0012 0c0-4-2-8-6-11z" /></svg>Vision</div><h3>A world that heals the way nature intended</h3><p>We see a future where every home turns first to time-tested Ayurvedic wisdom, where wellness is not a trend but a daily rhythm passed down with care and made easier to reach.</p></div>
            <div className="pulp-about-purpose-spine" aria-hidden="true"><div className="pulp-about-purpose-spine-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M8 6c2 1 4 1 4 4M16 10c-2 1-4 1-4 4" /></svg></div></div>
            <div className="pulp-about-purpose-col"><div className="pulp-about-purpose-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12l6 6L20 6" /></svg>Mission</div><h3>To make authentic Ayurveda simple to trust</h3><p>We source, test, and formulate every blend with classical wisdom and modern quality checks, so what reaches your shelf feels clear, dependable, and worthy of daily use.</p></div>
          </div>
        </div>
      </section>
      <section className="pulp-founder-note-section" aria-labelledby="pulpFounderTitle">
        <div className="wrap">
          <div className="pulp-founder-note-grid">
            <div className="pulp-founder-note-photo"><img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80" alt="Founder portrait" /></div>
            <div className="pulp-founder-note-letter">
              <span className="pulp-founder-note-eyebrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m6.4 4.6 2.8 2.8" /><path d="M2 12h4" /><path d="m6.4 19.4 2.8-2.8" /><path d="M12 18v4" /><path d="m17.6 19.4-2.8-2.8" /><path d="M22 12h-4" /><path d="m17.6 4.6-2.8 2.8" /></svg>A note from our founder</span>
              <h2 id="pulpFounderTitle">To everyone choosing daily Ayurveda</h2>
              <p>Pulp Ayurveda began with one simple belief: wellness should feel honest, practical, and easy to repeat. Every formula is shaped around real routines, familiar concerns, and ingredients that belong in everyday care.</p>
              <p>We keep our blends focused, our labels clear, and our rituals simple so you can build consistency without noise. That is the promise behind every bottle we make.</p>
              <div className="pulp-founder-note-pills" aria-label="Founder highlights"><span className="pulp-founder-note-pill"><strong>12+</strong> years of care</span><span className="pulp-founder-note-pill"><strong>48</strong> wellness blends</span><span className="pulp-founder-note-pill"><strong>3</strong> generations inspired</span></div>
              <div className="pulp-founder-note-sign"><span className="pulp-founder-note-sign-mark">Aria S.</span><div><strong>Aria Sinclair</strong><small>Founder, Essence</small></div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="pulp-about-services-section" aria-labelledby="pulpAboutServicesTitle">
        <div className="pulp-about-services-wrap">
          <div className="pulp-about-services-head"><div className="pulp-about-services-eyebrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3c-4 3-6 7-6 11a6 6 0 0012 0c0-4-2-8-6-11z" /></svg>What We Offer</div><h2 id="pulpAboutServicesTitle">About Our Services</h2><p>Our collection is a journey through Ayurvedic care that supports everyday wellness, simple routines, and personal balance.</p></div>
          <div className="pulp-about-services-row"><div className="pulp-about-services-num">01</div><div className="pulp-about-services-body"><div className="pulp-about-services-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg></div><div className="pulp-about-services-text"><h3>Fast Delivery</h3><p>The specific delivery time will vary depending on the shipping address and selected delivery option. Customers can track their order online to see the estimated delivery date.</p></div></div></div>
          <div className="pulp-about-services-row"><div className="pulp-about-services-num">02</div><div className="pulp-about-services-body"><div className="pulp-about-services-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 010-4h12v4M4 6v14h16v-4M18 12a2 2 0 100 4 2 2 0 000-4z" /></svg></div><div className="pulp-about-services-text"><h3>Many Offers</h3><p>We offer a variety of exclusive deals and curated bundles to help you explore daily Ayurveda, from seasonal collections to member-only rewards.</p></div></div></div>
          <div className="pulp-about-services-row"><div className="pulp-about-services-num">03</div><div className="pulp-about-services-body"><div className="pulp-about-services-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 2M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg></div><div className="pulp-about-services-text"><h3>24/7 Support</h3><p>Our support is available whenever you need help with products, orders, or choosing the right wellness ritual for your routine.</p></div></div></div>
        </div>
      </section>
    </>
  );
}