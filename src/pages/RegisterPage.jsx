import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  const [done, setDone] = useState(false);
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <a className="auth-logo" href="/"><img src="/img/logo.png" alt="Pulp Ayurveda" /></a>
        <div className="auth-card">
          <span className="eyebrow fav-eyebrow">Join Pulp</span>
          <h1>Registration</h1>
          <p>Create your account for faster checkout.</p>
          <RegisterForm onSuccess={() => setDone(true)} />
          {done && <p className="auth-success">Account created successfully.</p>}
          <p className="auth-switch">Already registered? <a href="/login">Login</a></p>
        </div>
      </div>
    </section>
  );
}