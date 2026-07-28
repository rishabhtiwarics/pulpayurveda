import { useSelector } from "react-redux";
import CartItemCard, { CartItemSkeleton } from "../components/cart/CartItemCard";
import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";
import { selectCartHydrated, selectCartItems, selectCartSubtotal } from "../store/cartSlice";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const hydrated = useSelector(selectCartHydrated);
  const shipping = subtotal >= 399 || subtotal === 0 ? 0 : 49;

  return (
    <>
      <InnorHero title="Your Cart" current="Cart" />
      <ShopPerks />
      <section className="cart-page-section">
        <div className="cart-page-wrap">
          <div className="cart-page-head">
            <div className="cart-page-title">
              <span className="eyebrow fav-eyebrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Cart
              </span>
              <h1>Your cart</h1>
              <p>Review your products before checkout.</p>
            </div>
            <a className="cart-continue-shopping" href="/shop">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="M11 6l-6 6 6 6" />
                </svg>
              </span>
              Continue shopping
            </a>
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
              <a className={`cart-footer-btn primary${items.length ? "" : " disabled"}`} href={items.length ? "/checkout" : "#"}>
                Go to checkout
                <span className="cart-footer-btn-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

