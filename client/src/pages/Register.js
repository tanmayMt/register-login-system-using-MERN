import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Too short").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(2, "Min 2 chars").required("Required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await API.post("/users/register", values);
        toast.success(res.data.message);
        resetForm();
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    }
  });

  return (
    <div className="card p-4 shadow-sm">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger">{formik.errors.name}</div>
        )}

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

        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
