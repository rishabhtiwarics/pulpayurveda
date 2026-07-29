import { useState } from "react";
import AuthPageShell from "../components/auth/AuthPageShell";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const [done, setDone] = useState(false);

  function handleLoginSuccess() {
    window.localStorage.setItem("pulp-auth-logged-in", "true");
    setDone(true);
    window.history.pushState({}, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AuthPageShell mode="login" success={done ? "Logged in successfully." : ""}>
      <LoginForm submitLabel="Sign in" onSuccess={handleLoginSuccess} />
    </AuthPageShell>
  );
}