import { useState } from "react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false);
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <a className="auth-logo" href="/"><img src="/img/logo.png" alt="Pulp Ayurveda" /></a>
        <div className="auth-card">
          <span className="eyebrow fav-eyebrow">Reset</span>
          <h1>Forgot password</h1>
          <p>Enter your email and we will send reset instructions.</p>
          <ForgotPasswordForm onSuccess={() => setDone(true)} />
          {done && <p className="auth-success">Reset link sent.</p>}
          <p className="auth-switch"><a href="/login">Back to login</a></p>
        </div>
      </div>
    </section>
  );
}