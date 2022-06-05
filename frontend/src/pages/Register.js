import React from "react";
import { Input, Button } from "antd";
import Auth from "../components/Auth";
import {
  UserOutlined,
  LockOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

const Register = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <Auth>
      <form onSubmit={handleSubmit}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <div className="w-75">
            <h3 className="text-center mb-3">Đăng ký</h3>
            <Input
              size="large"
              placeholder="Họ tên"
              name="name"
              className="mt-3"
              onChange={handleChange}
              prefix={<FontSizeOutlined />}
            />

            {errors.name && touched.name && (
              <div className="text-danger">{errors.name}</div>
            )}
            <Input
              size="large"
              placeholder="Email"
              name="email"
              className="mt-3"
              onChange={handleChange}
              prefix={<UserOutlined />}
            />

            {errors.email && touched.email && (
              <div className="text-danger">{errors.email}</div>
            )}
            <Input
              type="password"
              size="large"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="mt-3"
              prefix={<LockOutlined />}
            />
            {errors.password && touched.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <Input
              type="password"
              size="large"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Password"
              className="mt-3"
              prefix={<LockOutlined />}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </div>
          <Button
            htmlType="submit"
            size="middle"
            className="mt-4 w-75"
            style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
          >
            Đăng ký
          </Button>

          <h6 className="mt-3 mb-0">
            Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
          </h6>
        </div>
      </form>
    </Auth>
  );
};

const RegisterWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập email hợp lệ"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    name: Yup.string().required("Vui lòng nhập họ tên"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  }), //validate from field

  handleSubmit: (values, { props, setSubmitting }) => {
    // props.dispatch(loginAction(values.email, values.password));
  },

  displayName: "Register",
})(Register);

export default RegisterWithFormik;
