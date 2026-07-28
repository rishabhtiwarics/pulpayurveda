import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

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
        <Form className={`auth-form ${variant === "checkout" ? "checkout-auth-form" : ""}`} noValidate>
          <label>
            <span>Email address</span>
            <Field name="email" type="email" placeholder="you@example.com" autoComplete="email" />
            <ErrorMessage name="email" component="small" />
          </label>
          <label>
            <span>Password</span>
            <Field name="password" type="password" placeholder="Enter password" autoComplete="current-password" />
            <ErrorMessage name="password" component="small" />
          </label>
          {actions ? actions({ isSubmitting, submitLabel }) : <button className="auth-submit" type="submit" disabled={isSubmitting}>{submitLabel}</button>}
          {variant !== "checkout" && <a className="auth-link" href="/forgot-password">Forgot password?</a>}
        </Form>
      )}
    </Formik>
  );
}