import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  ProfileContainer,
  ProfileH2,
  ProfileP,
} from "./ProfileElement";
import * as Yup from "yup";
import { withFormik } from "formik";

const Profile = (props) => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;

  const [isEdit, setIsEdit] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <ProfileContainer>
        <ProfileH2>THÔNG TIN CÁ NHÂN</ProfileH2>
        <ButtonWrapper onClick={() => setIsEdit(true)}>
          <ButtonSubmit small disabled={isEdit}>
            Thay đổi thông tin
          </ButtonSubmit>
        </ButtonWrapper>
        <Form>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ tên"
              value={values.name}
              onChange={handleChange}
              disabled={!isEdit}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col md={8}>
              <Form.Group controlId="dob" className="mt-3">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                  disabled={!isEdit}
                ></Form.Control>
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
            </Col>
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
          </Form.Group>

          <ButtonWrapper className="mt-3">
            <ButtonSubmit secondary onClick={() => setIsEdit(false)}>
              Hủy bỏ
            </ButtonSubmit>
            <ButtonSubmit className="ms-3">Cập nhật</ButtonSubmit>
          </ButtonWrapper>
        </Form>
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
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên người tiêm"),
  }),

  handleSubmit: (values, { props }) => {},

  displayName: "Profile",
})(Profile);

const mapStateToProps = (state) => ({
  name: state.user?.userInfo?.HoTen,
  dob: state.user?.userInfo?.NgaySinh,
  gender: state.user?.userInfo?.GioiTinh,
  phone: state.user?.userInfo?.DienThoai,
  address: state.user?.userInfo?.DiaChi,
});

export default connect(mapStateToProps)(ProfileWithFormik);
