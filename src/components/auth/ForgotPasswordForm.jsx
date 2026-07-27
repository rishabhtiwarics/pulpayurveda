import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const forgotSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

export default function ForgotPasswordForm({ onSuccess }) {
  return (
    <Formik initialValues={{ email: "" }} validationSchema={forgotSchema} onSubmit={(values, helpers) => { helpers.setSubmitting(false); onSuccess?.(values); }}>
      {({ isSubmitting }) => (
        <Form className="auth-form" noValidate>
          <label><span>Email address</span><Field name="email" type="email" placeholder="you@example.com" /><ErrorMessage name="email" component="small" /></label>
          <button className="auth-submit" type="submit" disabled={isSubmitting}>Send reset link</button>
        </Form>
      )}
    </Formik>
  );
}