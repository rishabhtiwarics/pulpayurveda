/**
 * ProductCard — shared product card with multiple display variants.
 *
 * Variants:
 *   "grid"    — full card used in CustomerFavorites, Bestsellers, ShopPage
 *   "search"  — compact horizontal card used in Header SearchPanel
 *   "promise" — featured combo offer used in PromiseBanner
 *
 * Props:
 *   product  {object}  — product object from store
 *   variant  {string}  — "grid" | "search" | "promise"
 *   onAddToCart {fn}   — optional cart handler
 */

export function RatingStars({ value }) {
  const rating = Number(value);
  return (
    <div className="fav-stars" aria-label={`${value} out of 5 rating`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const cls = rating >= star ? "full" : rating >= star - 0.5 ? "half" : "empty";
        return <span key={star} className={cls}>{"★"}</span>;
      })}
    </div>
  );
}

export function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.7 12.4a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21 7H6" />
    </svg>
  );
}

export function titleCase(value) {
  if (!value) return "";
  return value === "all" ? "All" : value.charAt(0).toUpperCase() + value.slice(1);
}

/* ─── Grid Variant (CustomerFavorites / Bestsellers / ShopPage) ─── */
function GridCard({ product, onAddToCart }) {
  return (
    <article
      className="fav-card"
      data-category={product.category}
      key={`grid-${product.id}`}
    >
      <div className="fav-img">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <p className="fav-cat-tag">{titleCase(product.category)}</p>
      <h3 className="fav-name">{product.name}</h3>
      <div className="fav-rating">
        <RatingStars value={product.rating} />
        <strong>({product.rating})</strong>
      </div>
      <div className="fav-bottom">
        <span className="fav-price">Rs.{product.discountPrice}</span>
        <button
          className="fav-add"
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => onAddToCart?.(product)}
        >
          <CartIcon />
          Add to cart
        </button>
      </div>
    </article>
  );
}

/* ─── Search Variant (Header SearchPanel) ─── */
function SearchCard({ product, onAddToCart }) {
  return (
    <div className="search-product-card" key={`search-${product.id}`}>
      <div className="search-product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.isBestseller && <span className="search-product-badge">Top</span>}
      </div>
      <div className="search-product-info">
        <span className="search-product-category">{titleCase(product.category)}</span>
        <span className="search-product-title" title={product.name}>{product.name}</span>
        <div className="search-product-rating">
          <span>{"★".repeat(Math.floor(product.rating || 5))}</span>
          <span className="search-product-rating-num">({product.rating || 5.0})</span>
        </div>
        <div className="search-product-price-row">
          <span className="search-product-discount-price">₹{product.discountPrice}</span>
          {product.price > product.discountPrice && (
            <span className="search-product-original-price">₹{product.price}</span>
          )}
        </div>
      </div>
      <button
        type="button"
        className="search-cart-btn"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => onAddToCart?.(product)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Main export ─── */
export default function ProductCard({ product, variant = "grid", onAddToCart }) {
  if (!product) return null;

  if (variant === "search") return <SearchCard product={product} onAddToCart={onAddToCart} />;
  return <GridCard product={product} onAddToCart={onAddToCart} />;
}
