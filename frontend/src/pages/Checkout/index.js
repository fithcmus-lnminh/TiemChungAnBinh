import { withFormik } from "formik";
import React, { useEffect } from "react";
import { FormGroup, FormLabel, FormWrapper } from "../../components/Form";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  CautionWrapper,
  CheckoutContainer,
  CheckoutH2,
  CheckoutP,
  PaymentWrapper,
  TextRed,
} from "./CheckoutElement";
import * as Yup from "yup";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBillById } from "../../redux/apiRequests/hoadonRequest";
import { thanhtoan } from "../../redux/apiRequests/thanhtoanRequest";
import { thanhtoanReset } from "../../redux/slices/thanhtoanSlice";

const Checkout = (props) => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    props;

  const interestRate =
    values.numOfMonth === "3"
      ? 2
      : values.numOfMonth === "6"
      ? 2.5
      : values.numOfMonth === "9"
      ? 3
      : 4;

  const paymentPrice =
    values.paymentMethod === "Thanh toán toàn bộ"
      ? values.totalPrice
      : values.paymentMethod === "Thanh toán theo đợt"
      ? values.totalPrice / values.numOfPayment
      : values.totalPrice / values.numOfMonth +
        (interestRate / 100) * values.totalPrice;

  const { billId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, billDetail } = useSelector((state) => state.hoadon);
  const { userInfo } = useSelector((state) => state.user);
  const { isSuccess } = useSelector((state) => state.thanhtoan);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBillById(billId));
  }, [dispatch, billId]);

  console.log(billDetail);

  useEffect(() => {
    setFieldValue("billId", "HD" + billId);
    userInfo && setFieldValue("customerName", userInfo.HoTen);
    billDetail && setFieldValue("totalPrice", billDetail.tongtien);
    billDetail?.hinhthucthanhtoan &&
      setFieldValue("paymentMethod", billDetail?.hinhthucthanhtoan);
  }, [billId, setFieldValue, userInfo, billDetail]);

  const thanhtoanHandler = () => {
    dispatch(
      thanhtoan(billId, {
        TongTien: values.totalPrice,
        SoTienThanhToan:
          values.paymentMethod === "Thanh toán trả góp"
            ? Math.round(
                paymentPrice - (interestRate / 100) * values.totalPrice
              )
            : !billDetail?.hinhthucthanhtoan
            ? Math.round(paymentPrice)
            : Math.round(billDetail?.sotienconlai / billDetail?.solanthanhtoan),
        HinhThucThanhToan: values.paymentMethod,
        SoLanThanhToan:
          values.paymentMethod === "Thanh toán toàn bộ"
            ? 1
            : values.paymentMethod === "Thanh toán theo đợt" &&
              !billDetail?.hinhthucthanhtoan
            ? values.numOfPayment
            : values.paymentMethod === "Thanh toán trả góp" &&
              !billDetail?.hinhthucthanhtoan
            ? values.numOfMonth
            : billDetail?.solanthanhtoan,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/my-bill");
      dispatch(thanhtoanReset());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <>
      <Header />
      <CheckoutContainer>
        <CheckoutH2>THANH TOÁN ONLINE</CheckoutH2>
        {isLoading ? (
          <></>
        ) : (
          <FormWrapper onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <FormGroup controlId="billId">
                  <FormLabel>Mã hóa đơn</FormLabel>
                  <Form.Control
                    type="text"
                    value={values.billId}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.billId && touched.billId && (
                    <TextRed fontSmall>{errors.billId}</TextRed>
                  )}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId="customerName">
                  <FormLabel>Tên khách hàng</FormLabel>
                  <Form.Control
                    type="text"
                    value={values.customerName}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.customerName && touched.customerName && (
                    <TextRed fontSmall>{errors.customerName}</TextRed>
                  )}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId="totalPrice">
                  <FormLabel>Tổng tiền</FormLabel>
                  <Form.Control
                    type="number"
                    value={values.totalPrice}
                    onChange={handleChange}
                    disabled
                  ></Form.Control>
                  {errors.totalPrice && touched.totalPrice && (
                    <TextRed fontSmall>{errors.totalPrice}</TextRed>
                  )}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId="paymentMethod">
                  <FormLabel>
                    Phương thức thanh toán <TextRed>(*)</TextRed>
                  </FormLabel>
                  <Form.Control
                    as="select"
                    value={values.paymentMethod}
                    onChange={handleChange}
                    disabled={billDetail?.hinhthucthanhtoan}
                  >
                    <option value="Thanh toán toàn bộ">
                      Thanh toán toàn bộ
                    </option>
                    <option value="Thanh toán theo đợt">
                      Thanh toán theo đợt
                    </option>
                    <option value="Thanh toán trả góp">
                      Thanh toán trả góp
                    </option>
                  </Form.Control>
                  {errors.paymentMethod && touched.paymentMethod && (
                    <TextRed fontSmall>{errors.paymentMethod}</TextRed>
                  )}
                </FormGroup>
              </Col>
            </Row>

            {values.paymentMethod === "Thanh toán theo đợt" &&
              !billDetail?.hinhthucthanhtoan && (
                <Row className="d-flex justify-content-center">
                  <Col md={3}>
                    <FormGroup controlId="numOfPayment">
                      <FormLabel>
                        Số đợt <TextRed>(*)</TextRed>
                      </FormLabel>
                      <Form.Control
                        as="select"
                        value={values.numOfPayment}
                        onChange={handleChange}
                      >
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Form.Control>
                      {errors.numOfPayment && touched.numOfPayment && (
                        <TextRed fontSmall>{errors.numOfPayment}</TextRed>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup controlId="pricePerPay">
                      <FormLabel>
                        Số tiền mỗi đợt ({parseInt(100 / values.numOfPayment)}%){" "}
                      </FormLabel>
                      <Form.Control
                        type="text"
                        value={values.totalPrice / values.numOfPayment}
                        onChange={handleChange}
                        disabled
                      ></Form.Control>
                      {errors.pricePerPay && touched.pricePerPay && (
                        <TextRed fontSmall>{errors.pricePerPay}</TextRed>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              )}

            {values.paymentMethod === "Thanh toán trả góp" &&
              !billDetail?.hinhthucthanhtoan && (
                <Row className="d-flex justify-content-center">
                  <Col md={3}>
                    <FormGroup controlId="numOfMonth">
                      <FormLabel>
                        Số tháng <TextRed>(*)</TextRed>
                      </FormLabel>
                      <Form.Control
                        as="select"
                        value={values.numOfMonth}
                        onChange={handleChange}
                      >
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                      </Form.Control>
                      {errors.numOfMonth && touched.numOfMonth && (
                        <TextRed fontSmall>{errors.numOfMonth}</TextRed>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup controlId="pricePerMonth">
                      <FormLabel>Số tiền mỗi tháng</FormLabel>
                      <Form.Control
                        type="text"
                        value={Math.round(
                          values.totalPrice / values.numOfMonth
                        )}
                        onChange={handleChange}
                        disabled
                      ></Form.Control>
                      {errors.pricePerMonth && touched.pricePerMonth && (
                        <TextRed fontSmall>{errors.pricePerMonth}</TextRed>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup controlId="interestPrice">
                      <FormLabel>Lãi suất ({interestRate}%)</FormLabel>
                      <Form.Control
                        type="text"
                        value={(values.totalPrice * interestRate) / 100}
                        onChange={handleChange}
                        disabled
                      ></Form.Control>
                    </FormGroup>
                  </Col>
                </Row>
              )}

            {billDetail?.hinhthucthanhtoan && (
              <>
                <CheckoutP className="mt-3">
                  Số lần thanh toán còn lại: {billDetail?.solanthanhtoan}
                </CheckoutP>
              </>
            )}
            <PaymentWrapper>
              <div className="mb-3">
                Số tiền cần thanh toán:{" "}
                <strong className="ms-3">
                  {!billDetail?.hinhthucthanhtoan
                    ? Math.round(paymentPrice)
                    : Math.round(
                        billDetail?.sotienconlai / billDetail?.solanthanhtoan
                      )}
                  đ
                </strong>
              </div>
            </PaymentWrapper>

            {!billDetail?.hinhthucthanhtoan && (
              <CautionWrapper>
                <TextRed italic>(*) Các trường bắt buộc nhập</TextRed>
              </CautionWrapper>
            )}

            <ButtonWrapper>
              <ButtonSubmit type="submit" onClick={thanhtoanHandler}>
                Thanh toán ngay
              </ButtonSubmit>
            </ButtonWrapper>
          </FormWrapper>
        )}
      </CheckoutContainer>
    </>
  );
};

const CheckoutWithFormik = withFormik({
  mapPropsToValues: () => ({
    billId: "",
    customerName: "Nguyễn Văn A",
    totalPrice: "16500000",
    paymentMethod: "Thanh toán toàn bộ",
    numOfPayment: "2",
    numOfMonth: "3",
  }),

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props }) => {
    console.log(values);
  },

  displayName: "Checkout",
})(Checkout);

export default CheckoutWithFormik;
