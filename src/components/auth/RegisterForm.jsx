import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Enter 10 digit mobile number").required("Mobile number is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function RegisterForm({ onSuccess }) {
  return (
    <Formik initialValues={{ name: "", email: "", phone: "", password: "" }} validationSchema={registerSchema} onSubmit={(values, helpers) => { helpers.setSubmitting(false); onSuccess?.(values); }}>
      {({ isSubmitting }) => (
        <Form className="auth-form" noValidate>
          <label><span>Full name</span><Field name="name" placeholder="Your name" /><ErrorMessage name="name" component="small" /></label>
          <label><span>Email address</span><Field name="email" type="email" placeholder="you@example.com" /><ErrorMessage name="email" component="small" /></label>
          <label><span>Mobile number</span><Field name="phone" placeholder="9876543210" /><ErrorMessage name="phone" component="small" /></label>
          <label><span>Password</span><Field name="password" type="password" placeholder="Create password" /><ErrorMessage name="password" component="small" /></label>
          <button className="auth-submit" type="submit" disabled={isSubmitting}>Create account</button>
        </Form>
      )}
    </Formik>
  );
}