import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Enter 10 digit mobile number").required("Mobile number is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

function FieldIcon({ type }) {
  if (type === "name") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
  if (type === "phone") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92z" /></svg>;
  if (type === "password") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>;
}

function AuthField({ name, label, type = "text", placeholder, autoComplete, icon }) {
  return (
    <label className="pulp-auth-field">
      <span>{label}</span>
      <div className="pulp-auth-input-wrap">
        <FieldIcon type={icon} />
        <Field name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      </div>
      <ErrorMessage name={name} component="small" className="pulp-auth-error" />
    </label>
  );
}

export default function RegisterForm({ onSuccess }) {
  return (
    <Formik initialValues={{ name: "", email: "", phone: "", password: "" }} validationSchema={registerSchema} onSubmit={(values, helpers) => { helpers.setSubmitting(false); onSuccess?.(values); }}>
      {({ isSubmitting }) => (
        <Form className="pulp-auth-form" noValidate>
          <AuthField name="name" label="Full name" placeholder="Enter your full name" autoComplete="name" icon="name" />
          <AuthField name="email" label="Email" type="email" placeholder="Enter your email" autoComplete="email" icon="email" />
          <AuthField name="phone" label="Mobile number" placeholder="9876543210" autoComplete="tel" icon="phone" />
          <AuthField name="password" label="Password" type="password" placeholder="Choose a password" autoComplete="new-password" icon="password" />
          <button className="pulp-auth-submit" type="submit" disabled={isSubmitting}>Create account<ArrowIcon /></button>
        </Form>
      )}
    </Formik>
  );
}