import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const forgotSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

function EmailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>;
}

export default function ForgotPasswordForm({ onSuccess }) {
  return (
    <Formik initialValues={{ email: "" }} validationSchema={forgotSchema} onSubmit={(values, helpers) => { helpers.setSubmitting(false); onSuccess?.(values); }}>
      {({ isSubmitting }) => (
        <Form className="pulp-auth-form" noValidate>
          <label className="pulp-auth-field">
            <span>Email</span>
            <div className="pulp-auth-input-wrap">
              <EmailIcon />
              <Field name="email" type="email" placeholder="Enter your email" autoComplete="email" />
            </div>
            <ErrorMessage name="email" component="small" className="pulp-auth-error" />
          </label>
          <button className="pulp-auth-submit" type="submit" disabled={isSubmitting}>Send reset link<ArrowIcon /></button>
        </Form>
      )}
    </Formik>
  );
}