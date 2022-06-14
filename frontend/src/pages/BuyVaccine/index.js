import { withFormik } from "formik";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormGroup, FormLabel, FormWrapper } from "../../components/Form";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  BuyVaccineContainer,
  BuyVaccineH2,
  CautionWrapper,
  TextRed,
} from "./BuyVaccineElement";
import * as Yup from "yup";
import Select from "react-select";
import { connect, useSelector } from "react-redux";
import { muaVaccine } from "../../redux/apiRequests/muaVaccineRequest";

const vaccinePackageData = [
  {
    value: "Gói cho trẻ 0-9 tháng tuổi",
    label: "Gói cho trẻ 0-9 tháng tuổi",
    price: 1200000,
  },
  {
    value: "Gói cho trẻ 0-12 tháng tuổi",
    label: "Gói cho trẻ 0-12 tháng tuổi",
    price: 1500000,
  },
  {
    value: "Gói cho trẻ 0-24 tháng tuổi",
    label: "Gói cho trẻ 0-24 tháng tuổi",
    price: 2000000,
  },
  {
    value: "Gói cho người lớn trên 18 tuổi",
    label: "Gói cho người lớn trên 18 tuổi",
    price: 2500000,
  },
  {
    value: "Gói cho phụ nữ mang thai",
    label: "Gói cho phụ nữ mang thai",
    price: 4000000,
  },
  {
    value: "Gói cho người trên 65 tuổi",
    label: "Gói cho người trên 65 tuổi",
    price: 3000000,
  },
];

const BuyVaccine = (props) => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;

  return (
    <>
      <Header />
      <BuyVaccineContainer>
        <BuyVaccineH2>MUA VẮC XIN</BuyVaccineH2>
        <FormWrapper onSubmit={handleSubmit}>
          <FormGroup>
            <Row>
              <Col md={2}>
                <FormGroup controlId="customerId">
                  <FormLabel>
                    Mã KH <TextRed>(*)</TextRed>
                  </FormLabel>
                  <Form.Control
                    type="text"
                    value={"KH" + values.customerId}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.customerId && touched.customerId && (
                    <TextRed fontSmall>{errors.customerId}</TextRed>
                  )}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId="name">
                  <FormLabel>
                    Tên Khách hàng <TextRed>(*)</TextRed>
                  </FormLabel>
                  <Form.Control
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.name && touched.name && (
                    <TextRed fontSmall>{errors.name}</TextRed>
                  )}
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup controlId="email">
                  <FormLabel>
                    Email <TextRed>(*)</TextRed>
                  </FormLabel>
                  <Form.Control
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.email && touched.email && (
                    <TextRed fontSmall>{errors.email}</TextRed>
                  )}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId="phone">
                  <FormLabel>
                    Số điện thoại <TextRed>(*)</TextRed>
                  </FormLabel>
                  <Form.Control
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.phone && touched.phone && (
                    <TextRed fontSmall>{errors.phone}</TextRed>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup controlId="vacPackage">
            <FormLabel>
              Gói/Loại vaccine <TextRed>(*)</TextRed>
            </FormLabel>
            <Select
              isMulti
              placeholder="Chọn gói/loại vaccine muốn mua"
              name="colors"
              options={vaccinePackageData}
              className="basic-multi-select"
              value={values.vacPackage}
              onChange={(value) => setFieldValue("vacPackage", value)}
            />
            {errors.vacPackage && touched.vacPackage && (
              <TextRed fontSmall>{errors.vacPackage}</TextRed>
            )}
          </FormGroup>

          <FormGroup controlId="vacPackageDiff">
            <FormLabel>Gói/Loại vaccine khác</FormLabel>
            <Form.Control
              type="text"
              placeholder="Nhập gói/loại vaccine theo yêu cầu"
              value={values.vacPackageDiff}
              onChange={handleChange}
            ></Form.Control>
            {errors.vacPackageDiff && touched.vacPackageDiff && (
              <TextRed fontSmall>{errors.vacPackageDiff}</TextRed>
            )}
          </FormGroup>

          <CautionWrapper>
            <TextRed italic>(*) Các trường bắt buộc nhập</TextRed>
          </CautionWrapper>

          <ButtonWrapper>
            <ButtonSubmit type="submit">Xác nhận mua</ButtonSubmit>
          </ButtonWrapper>
        </FormWrapper>
      </BuyVaccineContainer>
    </>
  );
};

const BuyVaccineWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    customerId: props.customerId,
    name: props.name,
    phone: props.phone ?? "",
    email: props.email,
    vacPackage: [],
    vacPackageDiff: "",
  }),

  validationSchema: Yup.object().shape({
    vacPackage: Yup.array().min(1, "Vui lòng chọn gói tiêm"),
  }),

  handleSubmit: (values, { props }) => {
    let packages = [];
    let totalPrice = 0;
    values.vacPackage.map((p) => {
      totalPrice += p.price;
      return packages.push(p.value);
    });
    props.dispatch(
      muaVaccine({
        tenvaccine: packages,
        tenvaccinekhac: values.vacPackageDiff,
        makh: values.customerId,
        tongtien: totalPrice,
      })
    );
  },

  displayName: "SignUpVaccination",
})(BuyVaccine);

const mapStateToProps = (state) => ({
  customerId: state.user.userInfo?.MaTaiKhoan,
  name: state.user.userInfo?.HoTen,
  email: state.user.userInfo?.Email,
  phone: state.user.userInfo?.DienThoai,
});

export default connect(mapStateToProps)(BuyVaccineWithFormik);
