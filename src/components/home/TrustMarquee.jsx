const items = [
  {
    type: "delivery",
    title: "Free Delivery",
    text: "On all orders above Rs.399",
    icon: <><rect x="1" y="6" width="14" height="10" rx="1.5" /><path d="M15 10h4l3 3.5V16h-7z" /><circle cx="6" cy="19" r="2" /><circle cx="17.5" cy="19" r="2" /></>
  },
  {
    type: "secure",
    title: "Secure Payments",
    text: "UPI, cards & COD available",
    icon: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></>
  },
  {
    type: "pure",
    title: "Pure Herbs",
    text: "with No Extract",
    icon: <polyline points="20 6 9 17 4 12" />
  }
];

export default function TrustMarquee() {
  const repeated = Array.from({ length: 4 }).flatMap(() => items);

  return (
    <section className="trust-marquee">
      <div className="trust-track" id="trustTrack">
        {repeated.map((item, index) => (
          <div className="trust-item" key={`${item.title}-${index}`}>
            <div className={`trust-icon ${item.type}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={item.type === "pure" ? "2.4" : "2"} strokeLinecap="round" strokeLinejoin="round">
                {item.icon}
              </svg>
            </div>
            <div className="trust-text"><strong>{item.title}</strong><small>{item.text}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}
