import { useDispatch, useSelector } from "react-redux";
import { addToCart, openCart, selectIsInCart } from "../../store/cartSlice";

export function RatingStars({ value }) {
  const rating = Number(value);
  return (
    <div className="fav-stars" aria-label={`${value} out of 5 rating`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const cls = rating >= star ? "full" : rating >= star - 0.5 ? "half" : "empty";
        return <span key={star} className={cls}>{String.fromCharCode(9733)}</span>;
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

function openProductDetails(product) {
  window.history.pushState({}, "", `/product/${product.id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function useCartButton(product, onAddToCart) {
  const dispatch = useDispatch();
  const inCart = useSelector(selectIsInCart(product.id));

  function handleAdd(event) {
    event?.stopPropagation();
    if (inCart) return;
    dispatch(addToCart(product));
    dispatch(openCart());
    onAddToCart?.(product);
  }

  return { inCart, handleAdd };
}

function GridCard({ product, onAddToCart }) {
  const { inCart, handleAdd } = useCartButton(product, onAddToCart);
  return (
    <article className="fav-card product-click-card" data-category={product.category} key={`grid-${product.id}`} role="link" tabIndex="0" onClick={() => openProductDetails(product)} onKeyDown={(event) => { if (event.key === "Enter") openProductDetails(product); }}>
      <div className="fav-img"><img src={product.image} alt={product.name} loading="lazy" /></div>
      <p className="fav-cat-tag">{titleCase(product.category)}</p>
      <h3 className="fav-name">{product.name}</h3>
      <p className="fav-desc">{product.shortDescription || product.description}</p>
      <div className="fav-rating"><RatingStars value={product.rating} /><strong>({product.rating})</strong></div>
      <div className="fav-bottom">
        <span className="fav-price">Rs.{product.discountPrice}</span>
        <button className={`fav-add${inCart ? " added" : ""}`} type="button" aria-label={`${inCart ? "Added" : "Add"} ${product.name} to cart`} onClick={handleAdd} disabled={inCart}>
          <CartIcon />
          {inCart ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

function SearchCard({ product, onAddToCart }) {
  const { inCart, handleAdd } = useCartButton(product, onAddToCart);
  return (
    <div className="search-product-card" key={`search-${product.id}`} role="link" tabIndex="0" onClick={() => openProductDetails(product)} onKeyDown={(event) => { if (event.key === "Enter") openProductDetails(product); }}>
      <div className="search-product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.isBestseller && <span className="search-product-badge">Top</span>}
      </div>
      <div className="search-product-info">
        <span className="search-product-category">{titleCase(product.category)}</span>
        <span className="search-product-title" title={product.name}>{product.name}</span>
        <div className="search-product-rating"><span>{String.fromCharCode(9733).repeat(Math.floor(product.rating || 5))}</span><span className="search-product-rating-num">({product.rating || 5.0})</span></div>
        <div className="search-product-price-row">
          <span className="search-product-discount-price">Rs.{product.discountPrice}</span>
          {product.price > product.discountPrice && <span className="search-product-original-price">Rs.{product.price}</span>}
        </div>
      </div>
      <button type="button" className={`search-cart-btn${inCart ? " added" : ""}`} aria-label={`${inCart ? "Added" : "Add"} ${product.name} to cart`} onClick={handleAdd} disabled={inCart}>
        <CartIcon />
      </button>
    </div>
  );
}

export default function ProductCard({ product, variant = "grid", onAddToCart }) {
  if (!product) return null;
  if (variant === "search") return <SearchCard product={product} onAddToCart={onAddToCart} />;
  return <GridCard product={product} onAddToCart={onAddToCart} />;
}