/**
 * ProductCardSkeleton — animated shimmer skeleton for product cards.
 *
 * Variants:
 *   "grid"   — matches .fav-card layout
 *   "search" — matches .search-product-card layout
 *   "tab"    — matches .fav-tab layout (category tab buttons)
 */
export default function ProductCardSkeleton({ variant = "grid", count = 4 }) {
  const items = Array.from({ length: count });

  if (variant === "search") {
    return (
      <>
        {items.map((_, i) => (
          <div className="search-product-card skeleton-card" key={`skel-search-${i}`}>
            <div className="skeleton skeleton-search-img" />
            <div className="search-product-info">
              <div className="skeleton skeleton-line" style={{ width: "75%", marginBottom: "8px" }} />
              <div className="skeleton skeleton-line" style={{ width: "50%", marginBottom: "6px" }} />
              <div className="skeleton skeleton-line" style={{ width: "60%" }} />
            </div>
            <div className="skeleton skeleton-search-btn" />
          </div>
        ))}
      </>
    );
  }

  if (variant === "tab") {
    return (
      <>
        {items.map((_, i) => (
          <div className="fav-tab skeleton-tab-btn" key={`skel-tab-${i}`}>
            <div className="skeleton skeleton-tab-icon" />
            <div className="skeleton skeleton-line" style={{ width: "52px" }} />
          </div>
        ))}
      </>
    );
  }

  // default: "grid"
  return (
    <>
      {items.map((_, i) => (
        <article className="fav-card skeleton-card" key={`skel-grid-${i}`}>
          <div className="skeleton skeleton-img" />
          <div className="skeleton skeleton-line" style={{ width: "45%", marginBottom: "8px" }} />
          <div className="skeleton skeleton-line" style={{ width: "85%", marginBottom: "6px" }} />
          <div className="skeleton skeleton-line" style={{ width: "60%", marginBottom: "12px" }} />
          <div className="skeleton-bottom-row">
            <div className="skeleton skeleton-price" />
            <div className="skeleton skeleton-btn" />
          </div>
        </article>
      ))}
    </>
  );
}
