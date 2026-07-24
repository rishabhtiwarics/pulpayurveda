export default function Footer() {
  const certifications = [
    { name: "GMP Quality", img: "/img/cert-gmp.png" },
    {
      name: "Ministry of AYUSH",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_Ministry_of_AYUSH.png"
    },
    { name: "Make in India", img: "/img/cert-makeinindia.png" },
    { name: "FSSAI", img: "/img/cert-fssai.png" },
    {
      name: "ISO 9001",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/ISO_9001-2015.svg"
    },
  ];
  const certMarquee = [...certifications, ...certifications];

  return (
    <footer className="f6">
      <section id="certified-quality">
        <div className="alt1 wrap">
          <div className="alt1-head">
            <span className="eyebrow">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4 5.6 20.8 8 13.6 2 9.2h7.6z" /></svg>
              Certified Quality
            </span>
            <h2>Global Standards</h2>
            <p>We adhere to recognised global standards and certifications to ensure product safety and quality.</p>
          </div>
          <div className="alt1-strip">
            <div className="alt1-track cert-track" aria-hidden="false">
              {certMarquee.map((cert, idx) => (
                <div
                  className="alt1-item cert-item"
                  key={`cert-${idx}`}
                  aria-hidden={idx >= certifications.length ? "true" : "false"}
                >
                  <div className="alt1-logo-chip cert-chip">
                    <img src={cert.img} alt={cert.name} loading="lazy" />
                  </div>
                  <div className="cert-name">{cert.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="f6-offerbar">
        <div className="f6-offerbar-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c-4.5-1.5-8-5.5-8-11 5.5 0 9.5 3.5 11 8 1.5-4.5 5.5-8 11-8 0 5.5-3.5 9.5-8 11-1 .3-2 .5-3 .5s-2-.2-3-.5z" /></svg>
          New moon ritual bundle just dropped - get 15% off this week only
        </div>
      </div>
      <div className="f6-main">
        <div>
          <a href="#" className="logo-pill" aria-label="Pulp Ayurveda">
            <img src="/img/logo.png" alt="Pulp Ayurveda" />
          </a>
          <p className="f6-para">Pure, handcrafted Ayurvedic wellness - herbs and rituals sourced with care, delivered to your door.</p>
          <div className="f6-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Condition</a>
          </div>
        </div>
        <div className="f6-contact">
          <h3>Contact</h3>
          <div className="f6-contact-row f6-contact-address">
            <span className="f6-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" /><circle cx="12" cy="10" r="3" /></svg></span>
            <span>123, Wellness Street, New Delhi, India</span>
          </div>
          <a href="mailto:hello@pulpayurveda.com" className="f6-contact-row">
            <span className="f6-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>
            <span>hello@pulpayurveda.com</span>
          </a>
          <a href="tel:+919876543210" className="f6-contact-row">
            <span className="f6-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.35 1.78.68 2.62a2 2 0 01-.45 2.11L8.09 9.71a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.84.33 1.72.56 2.62.68A2 2 0 0122 16.92z" /></svg></span>
            <span>+91 98765 43210</span>
          </a>
        </div>
        <div className="f6-subscribe">
          <h3 className="f6-subscribe-label">Stay in the loop</h3>
          <div className="f6-form">
            <input type="email" placeholder="Your email address" />
            <button type="button">Join</button>
          </div>
          <div className="soc-row">
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
            <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 4v10.5a3.5 3.5 0 11-3-3.46" /><path d="M14 4c0 2.5 2 4 4 4" /></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M11 10l4 2-4 2z" fill="currentColor" stroke="none" /></svg></a>
          </div>
        </div>
        <div className="f6-watermark">PULP AYURVEDA</div>
      </div>
      <div className="f6-bottom-outer">
        <div className="f6-bottom">
          <span>&copy; 2026 Pulp Ayurveda. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
