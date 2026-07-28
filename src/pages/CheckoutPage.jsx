import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import LoginForm from "../components/auth/LoginForm";
import CartItemCard from "../components/cart/CartItemCard";
import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";
import { selectCartItems, selectCartSubtotal } from "../store/cartSlice";

const addressSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().min(8, "Enter full address").required("Address is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().matches(/^[0-9]{6}$/, "Enter 6 digit pincode").required("Pincode is required"),
});
const paymentSchema = Yup.object({
  method: Yup.string().oneOf(["cod", "razorpay"]).required("Select payment method"),
});

function CheckoutStepIcon({ type }) {
  const icons = {
    login: <><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></>,
    address: <><path d="M12 21s7-4.7 7-11a7 7 0 10-14 0c0 6.3 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
    payment: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const [step, setStep] = useState(0);
  const [identity, setIdentity] = useState(null);
  const [address, setAddress] = useState(null);
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 399 || subtotal === 0 ? 0 : 49;
  const orderTotal = subtotal + shipping;
  const steps = [
    { label: "Login", icon: "login" },
    { label: "Address", icon: "address" },
    { label: "Payment", icon: "payment" },
  ];

  const summary = useMemo(() => ({ subtotal, shipping, orderTotal }), [subtotal, shipping, orderTotal]);

  if (!items.length) {
    return (
      <>
        <InnorHero title="Checkout" current="Checkout" />
        <ShopPerks />
        <section className="checkout-section"><div className="checkout-wrap"><div className="cart-empty-state checkout-empty"><strong>Your cart is empty</strong><p>Add products before checkout.</p><a href="/shop">Shop products</a></div></div></section>
      </>
    );
  }

  return (
    <>
      <InnorHero title="Checkout" current="Checkout" />
      <ShopPerks />
      <section className="checkout-section">
        <div className="checkout-wrap">
          <div className="checkout-head">
            <div className="cart-page-title">
              <span className="eyebrow fav-eyebrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Checkout
              </span>
              <h1>Complete your order</h1>
            </div>
            <a className="cart-continue-shopping checkout-back-cart" href="/cart">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="M11 6l-6 6 6 6" />
                </svg>
              </span>
              Back to cart
            </a>
          </div>
          <div className="checkout-layout">
            <div className="checkout-panel">
              <div className="checkout-steps" aria-label="Checkout steps">
                {steps.map((item, index) => (
                  <button key={item.label} className={index === step ? "active" : index < step ? "done" : ""} type="button" onClick={() => index < step && setStep(index)}>
                    <span><CheckoutStepIcon type={item.icon} /></span>
                    <strong>{item.label}</strong>
                  </button>
                ))}
              </div>

              {step === 0 && (
                <section className="checkout-step-card checkout-flow-panel">
                  <div className="checkout-step-head"><h2>Login</h2><p>Sign in to continue your order.</p></div>
                  <LoginForm
                    variant="checkout"
                    submitLabel="Login"
                    onSuccess={(values) => setIdentity({ email: values.email })}
                    actions={({ isSubmitting, submitLabel }) => (
                      <div className="checkout-login-actions">
                        <button className="auth-submit checkout-icon-btn" type="submit" disabled={isSubmitting}>
                          <span aria-hidden="true"><CheckoutStepIcon type="login" /></span>
                          {submitLabel}
                        </button>
                        <button className="auth-submit checkout-icon-btn" type="button" onClick={() => setStep(1)}>
                          Continue
                          <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
                        </button>
                      </div>
                    )}
                  />
                </section>
              )}

              {step === 1 && (
                <section className="checkout-step-card checkout-flow-panel">
                  <div className="checkout-step-head"><h2>Address</h2><p>Add delivery details for this order.</p></div>
                  <Formik initialValues={address || { name: "", address: "", city: "", pincode: "" }} validationSchema={addressSchema} onSubmit={(values) => { setAddress(values); setStep(2); }}>
                    <Form className="checkout-form two-col" noValidate>
                      <label><span>Full name</span><Field name="name" placeholder="Your name" /><ErrorMessage name="name" component="small" /></label>
                      <label><span>Pincode</span><Field name="pincode" placeholder="110001" /><ErrorMessage name="pincode" component="small" /></label>
                      <label className="wide"><span>Address</span><Field as="textarea" name="address" placeholder="House no, street, area" /><ErrorMessage name="address" component="small" /></label>
                      <label><span>City</span><Field name="city" placeholder="City" /><ErrorMessage name="city" component="small" /></label>
                      <div className="checkout-step-actions wide">
                        <button className="checkout-back-step" type="button" onClick={() => setStep(0)}>Back</button>
                        <button className="auth-submit" type="submit">Next step</button>
                      </div>
                    </Form>
                  </Formik>
                </section>
              )}

              {step === 2 && (
                <section className="checkout-step-card checkout-flow-panel">
                  <div className="checkout-step-head"><h2>Payment</h2><p>Select how you want to pay.</p></div>
                  <Formik initialValues={{ method: "cod" }} validationSchema={paymentSchema} onSubmit={(values, helpers) => { setPlaced(true); helpers.setStatus(values.method === "razorpay" ? "Razorpay payment selected." : "COD order placed successfully."); }}>
                    {({ values, status }) => (
                      <Form className="checkout-form" noValidate>
                        <label className={`payment-option${values.method === "cod" ? " active" : ""}`}><Field type="radio" name="method" value="cod" /><span><strong>Cash on delivery</strong><small>Pay when your order arrives.</small></span></label>
                        <label className={`payment-option${values.method === "razorpay" ? " active" : ""}`}><Field type="radio" name="method" value="razorpay" /><span><strong>Razorpay</strong><small>UPI, card, wallet payment option.</small></span></label>
                        <ErrorMessage name="method" component="small" />
                        <div className="checkout-step-actions">
                          <button className="checkout-back-step" type="button" onClick={() => setStep(1)}>Back</button>
                          <button className="auth-submit" type="submit">Place order Rs.{summary.orderTotal}</button>
                        </div>
                        {(status || placed) && <p className="checkout-success">{status || "Order placed successfully."}</p>}
                      </Form>
                    )}
                  </Formik>
                </section>
              )}
            </div>

            <aside className="checkout-summary">
              <h2>Order summary</h2>
              {items.map((item) => <CartItemCard key={item.id} item={item} variant="sidebar" />)}
              <div className="cart-summary-line"><span>Subtotal</span><strong>Rs.{summary.subtotal}</strong></div>
              <div className="cart-summary-line"><span>Shipping</span><strong>{summary.shipping ? `Rs.${summary.shipping}` : "Free"}</strong></div>
              <div className="cart-summary-line total"><span>Total</span><strong>Rs.{summary.orderTotal}</strong></div>
              {identity && <p className="checkout-mini-note">Contact: {identity.email}</p>}
              {address && <p className="checkout-mini-note">Deliver to: {address.city} - {address.pincode}</p>}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}