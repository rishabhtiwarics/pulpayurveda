import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const [done, setDone] = useState(false);
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <a className="auth-logo" href="/"><img src="/img/logo.png" alt="Pulp Ayurveda" /></a>
        <div className="auth-card">
          <span className="eyebrow fav-eyebrow">Welcome back</span>
          <h1>Login</h1>
          <p>Access orders, saved details, and checkout faster.</p>
          <LoginForm onSuccess={() => setDone(true)} />
          {done && <p className="auth-success">Logged in successfully.</p>}
          <p className="auth-switch">New here? <a href="/register">Create account</a></p>
        </div>
      </div>
    </section>
  );
}