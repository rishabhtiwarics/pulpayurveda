import { useState } from "react";
import AuthPageShell from "../components/auth/AuthPageShell";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false);

  return (
    <AuthPageShell mode="forgot" success={done ? "Reset link sent." : ""}>
      <ForgotPasswordForm onSuccess={() => setDone(true)} />
    </AuthPageShell>
  );
}