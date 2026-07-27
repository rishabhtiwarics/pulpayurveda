import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/auth/LoginForm";
import CartItemCard from "../components/cart/CartItemCard";
import { clearCart, selectCartItems, selectCartSubtotal } from "../store/cartSlice";

const identitySchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Enter 10 digit mobile number").required("Mobile number is required"),
});
const addressSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().min(8, "Enter full address").required("Address is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().matches(/^[0-9]{6}$/, "Enter 6 digit pincode").required("Pincode is required"),
});
const paymentSchema = Yup.object({
  method: Yup.string().oneOf(["cod", "razorpay"]).required("Select payment method"),
});

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const [step, setStep] = useState(0);
  const [identity, setIdentity] = useState(null);
  const [address, setAddress] = useState(null);
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 399 || subtotal === 0 ? 0 : 49;
  const steps = ["Identity", "Address", "Payment"];
  const orderTotal = subtotal + shipping;

  const summary = useMemo(() => ({ subtotal, shipping, orderTotal }), [subtotal, shipping, orderTotal]);

  function placeOrder(values) {
    setPlaced(true);
    dispatch(clearCart());
    return values.method === "razorpay" ? "Razorpay payment simulated successfully." : "COD order placed successfully.";
  }

  if (!items.length && !placed) {
    return <section className="checkout-section"><div className="checkout-wrap"><div className="cart-empty-state checkout-empty"><strong>Your cart is empty</strong><p>Add products before checkout.</p><a href="/shop">Shop products</a></div></div></section>;
  }

  return (
    <section className="checkout-section">
      <div className="checkout-wrap">
        <div className="checkout-head"><span className="eyebrow fav-eyebrow">Checkout</span><h1>Complete your order</h1></div>
        <div className="checkout-layout">
          <div className="checkout-panel">
            <div className="checkout-steps">{steps.map((label, index) => <button key={label} className={index === step ? "active" : index < step ? "done" : ""} type="button" onClick={() => index < step && setStep(index)}><span>{index + 1}</span>{label}</button>)}</div>

            {step === 0 && (
              <div className="checkout-step-card">
                <h2>Identity</h2>
                <p>Login or continue with contact details.</p>
                <LoginForm variant="checkout" submitLabel="Login and continue" onSuccess={(values) => { setIdentity({ email: values.email, phone: "" }); setStep(1); }} />
                <div className="checkout-divider"><span>or</span></div>
                <Formik initialValues={{ email: "", phone: "" }} validationSchema={identitySchema} onSubmit={(values) => { setIdentity(values); setStep(1); }}>
                  <Form className="checkout-form" noValidate>
                    <label><span>Email</span><Field name="email" type="email" placeholder="you@example.com" /><ErrorMessage name="email" component="small" /></label>
                    <label><span>Mobile</span><Field name="phone" placeholder="9876543210" /><ErrorMessage name="phone" component="small" /></label>
                    <button className="auth-submit" type="submit">Continue</button>
                  </Form>
                </Formik>
              </div>
            )}

            {step === 1 && (
              <div className="checkout-step-card">
                <h2>Address</h2>
                <Formik initialValues={{ name: "", address: "", city: "", pincode: "" }} validationSchema={addressSchema} onSubmit={(values) => { setAddress(values); setStep(2); }}>
                  <Form className="checkout-form two-col" noValidate>
                    <label><span>Full name</span><Field name="name" placeholder="Your name" /><ErrorMessage name="name" component="small" /></label>
                    <label><span>Pincode</span><Field name="pincode" placeholder="110001" /><ErrorMessage name="pincode" component="small" /></label>
                    <label className="wide"><span>Address</span><Field as="textarea" name="address" placeholder="House no, street, area" /><ErrorMessage name="address" component="small" /></label>
                    <label><span>City</span><Field name="city" placeholder="City" /><ErrorMessage name="city" component="small" /></label>
                    <button className="auth-submit wide" type="submit">Continue to payment</button>
                  </Form>
                </Formik>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-step-card">
                <h2>Payment</h2>
                <Formik initialValues={{ method: "cod" }} validationSchema={paymentSchema} onSubmit={(values, helpers) => { const msg = placeOrder(values); helpers.setStatus(msg); }}>
                  {({ values, status }) => (
                    <Form className="checkout-form" noValidate>
                      <label className={`payment-option${values.method === "cod" ? " active" : ""}`}><Field type="radio" name="method" value="cod" /><span><strong>Cash on delivery</strong><small>Pay when your order arrives.</small></span></label>
                      <label className={`payment-option${values.method === "razorpay" ? " active" : ""}`}><Field type="radio" name="method" value="razorpay" /><span><strong>Razorpay</strong><small>UPI, card, wallet payment simulation.</small></span></label>
                      <ErrorMessage name="method" component="small" />
                      <button className="auth-submit" type="submit">Place order Rs.{summary.orderTotal}</button>
                      {status && <p className="checkout-success">{status}</p>}
                    </Form>
                  )}
                </Formik>
              </div>
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
  );
}