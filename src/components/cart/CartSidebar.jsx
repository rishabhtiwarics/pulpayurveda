import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard, { CartItemSkeleton } from "./CartItemCard";
import { closeCart, selectCartCount, selectCartHydrated, selectCartItems, selectCartSubtotal } from "../../store/cartSlice";

function ArrowIcon() {
  return (
    <span className="cart-footer-btn-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export default function CartSidebar() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const hydrated = useSelector(selectCartHydrated);
  const open = useSelector((state) => state.cart.sidebarOpen);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <div className={`cart-overlay${open ? " show" : ""}`} onClick={() => dispatch(closeCart())}></div>
      <aside className={`cart-sidebar${open ? " open" : ""}`} aria-hidden={!open} aria-label="Shopping cart">
        <header className="cart-sidebar-head">
          <div>
            <span>Cart</span>
            <strong>{count} item{count === 1 ? "" : "s"}</strong>
          </div>
          <button type="button" aria-label="Close cart" onClick={() => dispatch(closeCart())}>&times;</button>
        </header>
        <main className="cart-sidebar-main">
          {!hydrated ? (
            <CartItemSkeleton variant="sidebar" />
          ) : items.length ? (
            items.map((item) => <CartItemCard key={item.id} item={item} variant="sidebar" />)
          ) : (
            <div className="cart-empty-state">
              <strong>Your cart is empty</strong>
              <p>Add a product to start your Ayurveda ritual.</p>
              <a href="/shop" onClick={() => dispatch(closeCart())}>Shop products</a>
            </div>
          )}
        </main>
        <footer className="cart-sidebar-footer">
          <div className="cart-summary-line"><span>Subtotal</span><strong>Rs.{subtotal}</strong></div>
          <a className="cart-footer-btn" href="/cart" onClick={() => dispatch(closeCart())}>Go to cart<ArrowIcon /></a>
          <a className="cart-footer-btn" href="/checkout" onClick={() => dispatch(closeCart())}>Go to checkout<ArrowIcon /></a>
        </footer>
      </aside>
    </>
  );
}