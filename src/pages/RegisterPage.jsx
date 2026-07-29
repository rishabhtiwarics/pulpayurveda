import { useState } from "react";
import AuthPageShell from "../components/auth/AuthPageShell";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  const [done, setDone] = useState(false);

  function handleRegisterSuccess() {
    window.localStorage.setItem("pulp-auth-logged-in", "true");
    setDone(true);
    window.history.pushState({}, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AuthPageShell mode="register" success={done ? "Account created successfully." : ""}>
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </AuthPageShell>
  );
}