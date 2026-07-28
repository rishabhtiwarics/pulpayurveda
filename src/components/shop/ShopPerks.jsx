const perks = [
  {
    title: "24/7 Free Support",
    text: "Passage of Lorem Ipsum",
    icon: <><path d="M4 12a8 8 0 0116 0" /><path d="M4 12v4a2 2 0 002 2h1v-6H4z" /><path d="M20 12v4a2 2 0 01-2 2h-1v-6h3z" /><path d="M9 20h6" /></>,
  },
  {
    title: "Secure Payment",
    text: "Passage of Lorem Ipsum",
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M8 15h3" /></>,
  },
  {
    title: "Special Gift Cards",
    text: "Passage of Lorem Ipsum",
    icon: <><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13" /><path d="M3 12h18" /><path d="M7.5 8a2.5 2.5 0 110-5c3 0 4.5 5 4.5 5" /><path d="M16.5 8a2.5 2.5 0 100-5c-3 0-4.5 5-4.5 5" /></>,
  },
  {
    title: "World Wide Shipping",
    text: "Passage of Lorem Ipsum",
    icon: <><rect x="1" y="7" width="14" height="10" rx="2" /><path d="M15 11h4l3 3v3h-7z" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
  },
];

export default function ShopPerks() {
  return (
    <section className="shop-perks" aria-label="Shop benefits">
      <div className="shop-perks-inner">
        {perks.map((perk) => (
          <article className="shop-perk" key={perk.title}>
            <span className="shop-perk-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {perk.icon}
              </svg>
            </span>
            <div className="shop-perk-copy">
              <h3>{perk.title}</h3>
              <p>{perk.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}