import { useSelector } from "react-redux";
import CartItemCard, { CartItemSkeleton } from "../components/cart/CartItemCard";
import { selectCartHydrated, selectCartItems, selectCartSubtotal } from "../store/cartSlice";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const hydrated = useSelector(selectCartHydrated);
  const shipping = subtotal >= 399 || subtotal === 0 ? 0 : 49;

  return (
    <section className="cart-page-section">
      <div className="cart-page-wrap">
        <div className="cart-page-head">
          <span className="eyebrow fav-eyebrow">Cart</span>
          <h1>Your cart</h1>
          <p>Review your products before checkout.</p>
        </div>
        <div className="cart-page-layout">
          <div className="cart-page-list">
            {!hydrated ? <CartItemSkeleton variant="page" count={3} /> : items.length ? items.map((item) => <CartItemCard key={item.id} item={item} variant="page" />) : (
              <div className="cart-empty-state cart-page-empty"><strong>Your cart is empty</strong><p>Add products from the shop to continue.</p><a href="/shop">Shop products</a></div>
            )}
          </div>
          <aside className="cart-page-summary">
            <h2>Order summary</h2>
            <div className="cart-summary-line"><span>Subtotal</span><strong>Rs.{subtotal}</strong></div>
            <div className="cart-summary-line"><span>Shipping</span><strong>{shipping ? `Rs.${shipping}` : "Free"}</strong></div>
            <div className="cart-summary-line total"><span>Total</span><strong>Rs.{subtotal + shipping}</strong></div>
            <a className={`cart-footer-btn primary${items.length ? "" : " disabled"}`} href={items.length ? "/checkout" : "#"}>Go to checkout</a>
          </aside>
        </div>
      </div>
    </section>
  );
}