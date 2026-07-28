import { useEffect, useState } from "react";

function formatCount(value) {
  return Math.round(value).toLocaleString("en-US");
}

export default function InnorHero() {
  const [counts, setCounts] = useState({ customers: 0, products: 0, rating: 0 });

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let frameId;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        customers: 10000000 * eased,
        products: 200 * eased,
        rating: 4.9 * eased,
      });
      if (progress < 1) frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="innorhero" aria-label="Shop banner">
      <div className="innorhero-frame">
        <img src="/img/innorbanner.jpeg" alt="Pulp Ayurveda shop banner" loading="eager" />
      </div>
      <div className="innorhero-info">
        <div className="innorhero-info-copy">
          <div className="innorhero-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <strong>Shop</strong>
          </div>
          <h1>Shop Ayurveda Rituals</h1>
        </div>
        <div className="innorhero-info-stats" aria-label="Shop highlights">
          <div><strong>{formatCount(counts.customers)}+</strong><span>Happy Customers</span></div>
          <div><strong>{formatCount(counts.products)}+</strong><span>Herbal Products</span></div>
          <div><strong>{counts.rating.toFixed(1)}<span className="innorhero-star">{String.fromCharCode(9733)}</span></strong><span>Avg. Rating</span></div>
        </div>
      </div>
    </section>
  );
}