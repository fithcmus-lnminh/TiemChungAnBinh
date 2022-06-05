import React from "react";
import { Input, Button } from "antd";
import Auth from "../components/Auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

const Login = (props) => {
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
            <h3 className="text-center mb-3">Đăng nhập</h3>
            <Input
              size="large"
              placeholder="Email"
              name="email"
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
          </div>
          <Button
            htmlType="submit"
            size="middle"
            className="mt-4 w-75"
            style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
          >
            Đăng nhập
          </Button>

          <h6 className="mt-3 mb-0">
            Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </h6>
        </div>
      </form>
    </Auth>
  );
};

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập email hợp lệ"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),
  }), //validate from field

  handleSubmit: (values, { props, setSubmitting }) => {
    // props.dispatch(loginAction(values.email, values.password));
  },

  displayName: "Login",
})(Login);

export default LoginWithFormik; //LoginWithFormik will have props of redux
