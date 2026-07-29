import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";

export default function ContactPage() {
  return (
    <>
      <InnorHero title="Contact Us" current="Contact" />
      <ShopPerks />
      <section className="pulp-contact-panel-section" aria-labelledby="pulpContactPanelTitle">
        <div className="pulp-contact-panel-wrap">
          <div className="pulp-contact-panel-head">
            <div className="pulp-contact-panel-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4V4z" /><path d="M22 6l-10 7L2 6" /></svg>
              Write to us
            </div>
            <h2 id="pulpContactPanelTitle">Get in touch with Pulp Ayurveda</h2>
            <p>We would love to hear from you. Our wellness team can help with product guidance, dosage questions, order support, and personalised Ayurvedic recommendations.</p>
          </div>

          <div className="pulp-contact-panel-strip">
            <a className="pulp-contact-panel-pill" href="tel:+911140251234">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8.1 9.7a16 16 0 006.2 6.2l1.2-1.2a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.7 2.1z" /></svg>
              +91 11 4025 1234
            </a>
            <a className="pulp-contact-panel-pill" href="mailto:hello@pulpayurveda.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4V4z" /><path d="M22 6l-10 7L2 6" /></svg>
              hello@pulpayurveda.com
            </a>
            <a className="pulp-contact-panel-pill" href="https://wa.me/919810012345">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1121 11.5z" /></svg>
              +91 98100 12345
            </a>
            <a className="pulp-contact-panel-pill" href="https://maps.google.com/?q=Pulp+Ayurveda+Wellness+Studio+New+Delhi">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Hauz Khas, New Delhi
            </a>
          </div>

          <div className="pulp-contact-panel-card">
            <form className="pulp-contact-panel-form">
              <div className="pulp-contact-panel-row-two">
                <label className="pulp-contact-panel-field"><span>Name</span><div className="pulp-contact-panel-input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg><input type="text" placeholder="Your name" /></div></label>
                <label className="pulp-contact-panel-field"><span>Email</span><div className="pulp-contact-panel-input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4V4z" /><path d="M22 6l-10 7L2 6" /></svg><input type="email" placeholder="you@email.com" /></div></label>
              </div>
              <label className="pulp-contact-panel-field"><span>Subject</span><div className="pulp-contact-panel-input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.6 12.5L12.5 20.6a2 2 0 01-2.8 0l-7.3-7.3a2 2 0 010-2.8L10.5 2.4a2 2 0 011.4-.6H18a2 2 0 012 2v6.3a2 2 0 01-.6 1.4z" /><circle cx="15" cy="8" r="1.4" /></svg><input type="text" placeholder="Product query, order help, dosage guidance..." /></div></label>
              <label className="pulp-contact-panel-field"><span>Message</span><div className="pulp-contact-panel-input-wrap pulp-contact-panel-textarea-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg><textarea placeholder="Tell us about your wellness goals or query..."></textarea></div></label>
              <button type="button" className="pulp-contact-panel-submit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>Send Now</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}