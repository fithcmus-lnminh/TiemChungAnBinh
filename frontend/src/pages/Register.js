import React, { useEffect } from "react";
import { Input, Button } from "antd";
import Auth from "../components/Auth";
import {
  UserOutlined,
  LockOutlined,
  FontSizeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { register } from "../redux/apiRequests/userRequest";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = (props) => {
  const { touched, errors, handleChange, handleSubmit } = props;

  const { userInfo, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  useEffect(() => {
    isSuccess && navigate("/");
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <Auth>
      <form onSubmit={handleSubmit}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <div className="w-75">
            <h3 className="text-center mb-3">Đăng ký</h3>
            {errorMessage && (
              <div className="text-danger mb-3 text-center">{errorMessage}</div>
            )}
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
              placeholder="Số điện thoại"
              name="phone"
              className="mt-3"
              onChange={handleChange}
              prefix={<PhoneOutlined />}
            />

            {errors.phone && touched.phone && (
              <div className="text-danger">{errors.phone}</div>
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
              placeholder="Mật khẩu"
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
              placeholder="Nhập lại mật khẩu"
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
            disabled={isLoading}
          >
            Đăng ký
          </Button>

          <h6 className="mt-3 mb-0">
            Bạn đã có tài khoản?{" "}
            <a href={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Đăng nhập
            </a>
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
    phone: Yup.string()
      .required("Vui lòng số điện thoại")
      .matches(
        "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$",
        "Số điện thoại không hợp lệ"
      ),
  }), //validate from field

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    props.dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: "Khach Hang",
      })
    );
  },

  displayName: "Register",
})(Register);

export default connect()(RegisterWithFormik);
