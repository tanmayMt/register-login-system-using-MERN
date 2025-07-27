import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(2, "Min 2 chars").required("Required")
    }),
    onSubmit: async (values) => {
      try {
        const res = await API.post("/users/login", values);
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        navigate("/profile");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  });

  return (
    <div className="card p-4 shadow-sm">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger">{formik.errors.email}</div>
        )}

        <input
          className="form-control mb-2"
          name="password"
          placeholder="Password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger">{formik.errors.password}</div>
        )}

        <button className="btn btn-success w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
