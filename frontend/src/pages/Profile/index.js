import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  ProfileContainer,
  ProfileH2,
  TextRed,
} from "./ProfileElement";
import * as Yup from "yup";
import { withFormik } from "formik";
import {
  getProfile,
  updateProfile,
} from "../../redux/apiRequests/profileRequest";

const Profile = (props) => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;

  const [isEdit, setIsEdit] = useState(false);

  const { isSuccess, errorMessage } = useSelector((state) => state.userProfile);

  useEffect(() => {
    isSuccess && setIsEdit(false);
  }, [isSuccess]);

  return (
    <>
      <Header />
      <ProfileContainer>
        <Row>
          <Col md={5}>
            <ProfileH2>THÔNG TIN CÁ NHÂN</ProfileH2>
            <ButtonWrapper onClick={() => setIsEdit(true)}>
              <ButtonSubmit small disabled={isEdit}>
                Thay đổi thông tin
              </ButtonSubmit>
            </ButtonWrapper>
            {errorMessage && <TextRed>{errorMessage}</TextRed>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mt-3">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ tên"
                  value={values.name}
                  onChange={handleChange}
                  disabled={!isEdit}
                ></Form.Control>
                {errors.name && touched.name && (
                  <TextRed fontSmall>{errors.name}</TextRed>
                )}
              </Form.Group>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="dob" className="mt-3">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      value={values.dob.split("T")[0]}
                      onChange={handleChange}
                      disabled={!isEdit}
                    ></Form.Control>
                    {errors.dob && touched.dob && (
                      <TextRed fontSmall>{errors.dob}</TextRed>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="gender" className="mt-3">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Control
                      as="select"
                      value={values.gender}
                      onChange={handleChange}
                      disabled={!isEdit}
                    >
                      <option value="" disabled selected>
                        Chọn giới tính ...
                      </option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </Form.Control>
                    {errors.gender && touched.gender && (
                      <TextRed fontSmall>{errors.gender}</TextRed>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="phone" className="mt-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={values.phone}
                      onChange={handleChange}
                      disabled={!isEdit}
                    ></Form.Control>
                  </Form.Group>
                  {errors.phone && touched.phone && (
                    <TextRed fontSmall>{errors.phone}</TextRed>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Group controlId="role" className="mt-3">
                    <Form.Label>Vai trò</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.role}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="address" className="mt-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={values.address}
                  onChange={handleChange}
                  disabled={!isEdit}
                ></Form.Control>
                {errors.address && touched.address && (
                  <TextRed fontSmall>{errors.address}</TextRed>
                )}
              </Form.Group>

              {isEdit && (
                <ButtonWrapper className="mt-3">
                  <ButtonSubmit secondary onClick={() => setIsEdit(false)}>
                    Hủy bỏ
                  </ButtonSubmit>
                  <ButtonSubmit type="submit" className="ms-3">
                    Cập nhật
                  </ButtonSubmit>
                </ButtonWrapper>
              )}
            </Form>
          </Col>
          <Col md={7}>
            <ProfileH2>THÔNG TIN ĐĂNG KÝ TIÊM</ProfileH2>
          </Col>
        </Row>
      </ProfileContainer>
    </>
  );
};

const ProfileWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    name: props.name ?? "",
    dob: props.dob ?? "",
    gender: props.gender ?? "",
    phone: props.phone ?? "",
    address: props.address ?? "",
    role: props.role ?? "",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên người tiêm"),
    dob: Yup.string().required("Vui lòng nhập ngày sinh"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  }),

  handleSubmit: (values, { props }) => {
    props.dispatch(
      updateProfile({
        hoten: values.name,
        ngaysinh: values.dob,
        gioitinh: values.gender,
        dienthoai: values.phone,
        diachi: values.address,
      })
    );
  },

  displayName: "Profile",
})(Profile);

const mapStateToProps = (state) => ({
  name: state.userProfile?.userProfile?.hoten,
  dob: state.userProfile?.userProfile?.ngaysinh,
  gender: state.userProfile?.userProfile?.gioitinh,
  phone: state.userProfile?.userProfile?.dienthoai,
  address: state.userProfile?.userProfile?.diachi,
  role: state.userProfile?.userProfile?.vaitro,
});

export default connect(mapStateToProps)(ProfileWithFormik);
