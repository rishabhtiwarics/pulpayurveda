import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

function EmailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>;
}

export default function LoginForm({ variant = "page", onSuccess, submitLabel = "Login", actions }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, helpers) => {
        helpers.setSubmitting(false);
        onSuccess?.(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={variant === "checkout" ? "auth-form checkout-auth-form" : "pulp-auth-form"} noValidate>
          <label className={variant === "checkout" ? undefined : "pulp-auth-field"}>
            <span>Email address</span>
            {variant === "checkout" ? (
              <Field name="email" type="email" placeholder="you@example.com" autoComplete="email" />
            ) : (
              <div className="pulp-auth-input-wrap">
                <EmailIcon />
                <Field name="email" type="email" placeholder="Enter your email" autoComplete="email" />
              </div>
            )}
            <ErrorMessage name="email" component="small" className={variant === "checkout" ? undefined : "pulp-auth-error"} />
          </label>
          <label className={variant === "checkout" ? undefined : "pulp-auth-field"}>
            {variant === "checkout" ? <span>Password</span> : <div className="pulp-auth-label-row"><span>Password</span><a href="/forgot-password">Forgot password?</a></div>}
            {variant === "checkout" ? (
              <Field name="password" type="password" placeholder="Enter password" autoComplete="current-password" />
            ) : (
              <div className="pulp-auth-input-wrap">
                <LockIcon />
                <Field name="password" type="password" placeholder="Enter your password" autoComplete="current-password" />
              </div>
            )}
            <ErrorMessage name="password" component="small" className={variant === "checkout" ? undefined : "pulp-auth-error"} />
          </label>
          {actions ? actions({ isSubmitting, submitLabel }) : <button className={variant === "checkout" ? "auth-submit" : "pulp-auth-submit"} type="submit" disabled={isSubmitting}>{submitLabel}<ArrowIcon /></button>}
          {variant === "checkout" && <a className="auth-link" href="/forgot-password">Forgot password?</a>}
        </Form>
      )}
    </Formik>
  );
}