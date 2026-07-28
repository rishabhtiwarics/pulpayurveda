import { useDispatch } from "react-redux";
import { decrementItem, incrementItem, removeItem } from "../../store/cartSlice";
import { titleCase } from "../shop/ProductCard";

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

export default function CartItemCard({ item, variant = "sidebar" }) {
  const dispatch = useDispatch();
  const compact = variant === "sidebar";

  return (
    <article className={`cart-item-card ${compact ? "sidebar-variant" : "page-variant"}`}>
      <img className="cart-item-img" src={item.image} alt={item.name} loading="lazy" />
      <div className="cart-item-info">
        <p className="cart-item-cat">{titleCase(item.category)}</p>
        <h3>{item.name}</h3>
        <div className="cart-item-price-row">
          <strong>Rs.{item.discountPrice}</strong>
          {item.price > item.discountPrice && <span>Rs.{item.price}</span>}
        </div>
        <div className="cart-item-actions">
          <div className="cart-qty" aria-label={`Quantity for ${item.name}`}>
            <button type="button" aria-label="Decrease quantity" onClick={() => dispatch(decrementItem(item.id))}>-</button>
            <span>{item.quantity}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => dispatch(incrementItem(item.id))}>+</button>
          </div>
          {compact && (
            <button className="cart-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => dispatch(removeItem(item.id))}>
              <TrashIcon />
            </button>
          )}
        </div>
      </div>
      {!compact && (
        <div className="cart-page-item-side">
          <strong className="cart-line-total">Rs.{item.discountPrice * item.quantity}</strong>
          <button className="cart-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => dispatch(removeItem(item.id))}>
            <TrashIcon />
          </button>
        </div>
      )}
    </article>
  );
}

export function CartItemSkeleton({ variant = "sidebar", count = 3 }) {
  return Array.from({ length: count }).map((_, index) => (
    <div className={`cart-item-card ${variant === "sidebar" ? "sidebar-variant" : "page-variant"}`} key={`cart-skeleton-${index}`}>
      <div className="skeleton cart-item-img" />
      <div className="cart-item-info">
        <div className="skeleton skeleton-line" style={{ width: "52px", height: "10px" }} />
        <div className="skeleton skeleton-line" style={{ width: "78%", height: "14px" }} />
        <div className="skeleton skeleton-line" style={{ width: "44%", height: "12px" }} />
        <div className="skeleton skeleton-line" style={{ width: "70%", height: "28px", borderRadius: "999px" }} />
      </div>
    </div>
  ));
}