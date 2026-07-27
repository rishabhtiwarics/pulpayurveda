import { useMemo, useState, useEffect } from "react";
import { useProducts } from "../store/useProductStore.jsx";
import ProductCard, { titleCase } from "../components/shop/ProductCard";
import ProductCardSkeleton from "../components/shop/ProductCardSkeleton";

function TabIcon({ type }) {
  const icons = {
    all: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    virvex: <path d="M12 2c4 3 7 7 7 11a7 7 0 01-14 0c0-4 3-8 7-11z" />,
    venora: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
    pressova: <><path d="M6 3h12l-1.5 14.5a2 2 0 01-2 1.5h-5a2 2 0 01-2-1.5L6 3z" /><path d="M4 3h16" /></>,
    nestara: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    livera: <><circle cx="12" cy="12" r="5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    flexora: <path d="M4 20c0-5 3-9 4-9s2 3 2 6M10 20c0-6 4-11 5-11s3 4 3 8M15 20c0-4 3-7 5-7" />,
    femiva: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0112 6.5 5.5 5.5 0 0121.5 12c-2.5 4.65-9.5 9-9.5 9z" />,
    cardiva: <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type] || icons.all}
    </svg>
  );
}

export default function ShopPage({ initialCategory }) {
  const { products, categories, loading } = useProducts();
  const [activeFilter, setActiveFilter] = useState(initialCategory || "all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialCategory) setActiveFilter(initialCategory);
  }, [initialCategory]);

  const tabs = useMemo(() => ["all", ...categories.map((c) => c.id)], [categories]);

  const visibleProducts = useMemo(() => {
    const nonCombo = products.filter((p) => !p.isComboOffer);
    let list = activeFilter === "all" ? nonCombo : nonCombo.filter((p) => p.category === activeFilter);
    const term = search.trim().toLowerCase();
    if (term) list = list.filter((p) =>
      p.name.toLowerCase().includes(term) ||
      (p.tags || []).some((t) => t.includes(term))
    );
    return list;
  }, [products, activeFilter, search]);

  function handleTabClick(tabId) {
    setActiveFilter(tabId);
    const url = tabId === "all" ? "/shop" : `/shop?category=${tabId}`;
    window.history.pushState({}, "", url);
  }

  return (
    <>
      <section className="fav-section shop-page-section">
        <div className="fav-wrap">
          <div className="shop-page-head shop-page-controls">
            <div className="fav-intro-copy">
              <span className="eyebrow fav-eyebrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Browse
              </span>
              <h2>Find your ritual</h2>
            </div>

            <div className="search-field-wrap shop-search-field" role="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
              <input id="shopSearch" type="search" placeholder="Search herbs, blends, rituals..." autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} />
              {search && (
                <button type="button" className="shop-clear-btn" aria-label="Clear search" onClick={() => setSearch("")}>&times;</button>
              )}
            </div>
          </div>

          <div className="fav-tabs" id="shopTabs">
            {loading ? (
              <ProductCardSkeleton variant="tab" count={9} />
            ) : (
              tabs.map((tab) => (
                <button key={tab} className={`fav-tab${activeFilter === tab ? " active" : ""}`} type="button" onClick={() => handleTabClick(tab)}>
                  <TabIcon type={tab} />
                  {titleCase(tab)}
                </button>
              ))
            )}
          </div>

          {!loading && (
            <p className="shop-results-count">
              {visibleProducts.length === 0 ? "No products found" : `${visibleProducts.length} product${visibleProducts.length !== 1 ? "s" : ""}`}
              {search.trim() ? ` for "${search.trim()}"` : ""}
              {activeFilter !== "all" ? ` in ${titleCase(activeFilter)}` : ""}
            </p>
          )}

          <div className="fav-grid shop-full-grid" id="shopGrid">
            {loading ? (
              <ProductCardSkeleton variant="grid" count={8} />
            ) : visibleProducts.length ? (
              visibleProducts.map((product) => <ProductCard key={product.id} product={product} variant="grid" />)
            ) : (
              <div className="fav-empty show">No products found. Try a different search or category.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}