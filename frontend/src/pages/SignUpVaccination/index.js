import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormGroup, FormLabel, FormWrapper } from "../../components/Form";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  CautionWrapper,
  SignUpContainer,
  SignUpH2,
  TextRed,
} from "./SignUpVacElement";
import Select from "react-select";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { dangkytiem } from "../../redux/apiRequests/dktRequest";

const vaccinePackageData = [
  {
    value: "Gói cho trẻ 0-9 tháng tuổi",
    label: "Gói cho trẻ 0-9 tháng tuổi",
  },
  {
    value: "Gói cho trẻ 0-12 tháng tuổi",
    label: "Gói cho trẻ 0-12 tháng tuổi",
  },
  {
    value: "Gói cho trẻ 0-24 tháng tuổi",
    label: "Gói cho trẻ 0-24 tháng tuổi",
  },
  {
    value: "Gói cho người lớn trên 18 tuổi",
    label: "Gói cho người lớn trên 18 tuổi",
  },
  {
    value: "Gói cho phụ nữ mang thai",
    label: "Gói cho phụ nữ mang thai",
  },
  {
    value: "Gói cho người trên 65 tuổi",
    label: "Gói cho người trên 65 tuổi",
  },
];

const SignUpVaccination = (props) => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const pickedYear = new Date(values.dob).getFullYear();
    currentYear - pickedYear <= 16
      ? (values.isChild = true)
      : (values.isChild = false);
  }, [values]);

  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpH2>ĐĂNG KÝ TIÊM CHỦNG</SignUpH2>
        <FormWrapper onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup controlId="name">
                <FormLabel>
                  Họ tên người tiêm <TextRed>(*)</TextRed>
                </FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên người tiêm"
                  onChange={handleChange}
                ></Form.Control>
                {errors.name && touched.name && (
                  <TextRed fontSmall>{errors.name}</TextRed>
                )}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup controlId="dob">
                <FormLabel>
                  Ngày sinh<TextRed>(*)</TextRed>
                </FormLabel>
                <Form.Control
                  type="date"
                  value={values.dob}
                  min="1900-01-01"
                  max={new Date().toJSON().slice(0, 10)}
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <FormLabel>
                  Giới tính<TextRed>(*)</TextRed>
                </FormLabel>
                <Form.Control
                  as="select"
                  name="gender"
                  defaultValue={values.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Diff">Khác</option>
                </Form.Control>
              </FormGroup>
            </Col>
            {!values.isChild && (
              <Col>
                <FormGroup controlId="phone">
                  <FormLabel>
                    Số điện thoại<TextRed>(*)</TextRed>
                  </FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Nhập số điện thoại"
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Vui lòng nhập số điện thoại hợp lệ"
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    pattern="^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
                    onChange={handleChange}
                  ></Form.Control>
                </FormGroup>
                {errors.phone && touched.phone && (
                  <TextRed fontSmall>{errors.phone}</TextRed>
                )}
              </Col>
            )}
            <Col md={2}>
              <FormGroup controlId="customerId">
                <FormLabel>Mã khách hàng</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Không có"
                  value={values.customerId && "KH" + values.customerId}
                  onChange={handleChange}
                  disabled
                ></Form.Control>
              </FormGroup>
              {errors.customerId && touched.customerId && (
                <TextRed fontSmall>{errors.customerId}</TextRed>
              )}
            </Col>
          </Row>

          {values.isChild && (
            <>
              <Row>
                <Col md={4}>
                  <FormGroup controlId="guardianName">
                    <FormLabel>
                      Họ tên người giám hộ <TextRed>(*)</TextRed>
                    </FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên người giám hộ"
                      onChange={handleChange}
                    ></Form.Control>
                    {errors.guardianName && touched.guardianName && (
                      <TextRed fontSmall>{errors.guardianName}</TextRed>
                    )}
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="relationship">
                    <FormLabel>
                      Mối quan hệ <TextRed>(*)</TextRed>
                    </FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mối quan hệ"
                      onChange={handleChange}
                    ></Form.Control>
                    {errors.relationship && touched.relationship && (
                      <TextRed fontSmall>{errors.relationship}</TextRed>
                    )}
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="guardianPhone">
                    <FormLabel>
                      Điện thoại liên hệ<TextRed>(*)</TextRed>
                    </FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          "Vui lòng nhập số điện thoại hợp lệ"
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={handleChange}
                      pattern="^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
                    ></Form.Control>
                    {errors.guardianPhone && touched.guardianPhone && (
                      <TextRed fontSmall>{errors.guardianPhone}</TextRed>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col>
              <FormGroup controlId="address">
                <FormLabel>
                  Địa chỉ <TextRed>(*)</TextRed>
                </FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={values.address}
                  onChange={handleChange}
                ></Form.Control>
              </FormGroup>
              {errors.address && touched.address && (
                <TextRed fontSmall>{errors.address}</TextRed>
              )}
            </Col>

            <Col md={3}>
              <FormGroup controlId="type">
                <FormLabel>
                  Loại tiêm <TextRed>(*)</TextRed>
                </FormLabel>
                <Form.Control
                  as="select"
                  value={values.type}
                  onChange={handleChange}
                >
                  <option value="Tiêm theo gói">Tiêm theo gói</option>
                  <option value="Tiêm lẻ">Tiêm lẻ</option>
                </Form.Control>
              </FormGroup>
            </Col>
          </Row>

          {values.type === "Tiêm theo gói" ? (
            <>
              <Row>
                <Col>
                  <FormGroup controlId="vacPackage">
                    <FormLabel>
                      Gói tiêm <TextRed>(*)</TextRed>
                    </FormLabel>
                    <Select
                      isMulti
                      placeholder="Chọn gói tiêm"
                      name="colors"
                      options={vaccinePackageData}
                      className="basic-multi-select"
                      value={values.vacPackage}
                      onChange={(value) => setFieldValue("vacPackage", value)}
                    />
                  </FormGroup>
                  {errors.vacPackage && touched.vacPackage && (
                    <TextRed fontSmall>{errors.vacPackage}</TextRed>
                  )}
                </Col>
                <Col md={3}>
                  <FormGroup controlId="vacDate">
                    <FormLabel>
                      Ngày tiêm <TextRed>(*)</TextRed>
                    </FormLabel>
                    <Form.Control
                      type="date"
                      value={values.vacDate}
                      onChange={handleChange}
                    ></Form.Control>
                    {errors.vacDate && touched.vacDate && (
                      <TextRed fontSmall>{errors.vacDate}</TextRed>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Col>
                  <FormGroup controlId="typeVaccine">
                    <FormLabel>
                      Loại vắc xin <TextRed>(*)</TextRed>
                    </FormLabel>
                    <Form.Control as="select" onChange={handleChange}>
                      <option value="" disabled>
                        Chọn loại vaccine...
                      </option>
                      <option value="Astrazenca">Astrazenca</option>
                      <option value="Pfizer">Pfizer</option>
                      <option value="Mordena">Mordena</option>
                      <option value="Verocell">Verocell</option>
                    </Form.Control>
                    {errors.typeVaccine && touched.typeVaccine && (
                      <TextRed fontSmall>{errors.typeVaccine}</TextRed>
                    )}
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup controlId="vacDate">
                    <FormLabel>
                      Ngày tiêm <TextRed>(*)</TextRed>
                    </FormLabel>
                    <Form.Control
                      type="date"
                      value={values.vacDate}
                      onChange={handleChange}
                    ></Form.Control>
                    {errors.vacDate && touched.vacDate && (
                      <TextRed fontSmall>{errors.vacDate}</TextRed>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </>
          )}

          <CautionWrapper>
            <TextRed italic>(*) Các trường bắt buộc nhập</TextRed>
          </CautionWrapper>

          <ButtonWrapper>
            <ButtonSubmit type="submit">Đăng ký</ButtonSubmit>
          </ButtonWrapper>
        </FormWrapper>
      </SignUpContainer>
    </>
  );
};

const SignUpVaccinationWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    name: "",
    dob: "1990-01-01",
    gender: "Male",
    phone: "",
    address: "",
    type: "Tiêm theo gói",
    guardianName: "",
    relationship: "",
    guardianPhone: "",
    vacPackage: [],
    vacDate: "",
    typeVaccine: "",
    isChild: false,
    customerId: props.customerId ?? "",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên người tiêm"),
    phone: Yup.string().when("isChild", (isChild, schema) =>
      isChild ? schema : schema.required("Vui lòng nhập số điện thoại")
    ),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    vacPackage: Yup.array().when("type", (type, schema) =>
      type === "Tiêm theo gói"
        ? schema.min(1, "Vui lòng chọn gói tiêm")
        : schema
    ),
    vacDate: Yup.string().required("Vui lòng chọn ngày tiêm"),
    typeVaccine: Yup.string().when("type", (type, schema) =>
      type === "Tiêm lẻ"
        ? schema.required("Vui lòng chọn loại vắc xin")
        : schema
    ),
    guardianName: Yup.string().when("isChild", (isChild, schema) =>
      isChild ? schema.required("Vui lòng nhập tên người giám hộ") : schema
    ),
    relationship: Yup.string().when("isChild", (isChild, schema) =>
      isChild ? schema.required("Vui lòng nhập mối quan hệ") : schema
    ),
    guardianPhone: Yup.string().when("isChild", (isChild, schema) =>
      isChild ? schema.required("Vui lòng nhập số điện thoại") : schema
    ),
  }),

  handleSubmit: (values, { props }) => {
    let packages = [];
    values.vacPackage.map((p) => {
      packages.push(p.value);
    });
    props.dispatch(
      dangkytiem({
        makh: values.customerId,
        hotennguoitiem: values.name,
        ngaysinh: values.dob,
        gioitinh: values.gender,
        sodienthoai: values.phone,
        diachi: values.address,
        loaitiem: values.type,
        goitiem: packages,
        loaivaccine: values.typeVaccine,
        ngaytiem: values.vacDate,
        tenngh: values.guardianName,
        moiquanhe: values.relationship,
        sdtngh: values.guardianPhone,
      })
    );
  },

  displayName: "SignUpVaccination",
})(SignUpVaccination);

const mapStateToProps = (state) => ({
  customerId: state.user?.userInfo?.MaTaiKhoan,
});

export default connect(mapStateToProps)(SignUpVaccinationWithFormik);
