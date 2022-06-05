import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  DayWrapper,
  FreeDayContainer,
  FreeDayH2,
  FreeDayP,
} from "./SignUpFreeDayElement";
import { Row, Col } from "react-bootstrap";

const SignUpFreeDay = () => {
  const [value, setValue] = useState("");
  const [dates, setDates] = useState([]);

  // console.log(dates);

  const values = value && value.toString().split(",");

  return (
    <>
      <Header />
      <FreeDayContainer>
        {/* <p>{value}</p> */}
        <FreeDayH2>ĐĂNG KÝ LỊCH LÀM VIỆC</FreeDayH2>
        {!value ||
          (value.length === 0 && <FreeDayP>Chọn ngày đăng ký</FreeDayP>)}
        <Row>
          <Col md={5}>
            <DatePicker
              value={value}
              onChange={setValue}
              multiple
              format="DD/MM/YYYY"
              minDate={new Date()}
              style={{ width: "20vw" }}
            />
          </Col>
          <Col>
            {values &&
              values.map((val, index) => (
                <DayWrapper key={index}>
                  <span className="me-4">{val}</span>
                  {value.length > 0 && (
                    <>
                      {" "}
                      <span className="mx-3">
                        <input
                          type="checkbox"
                          value="Sáng"
                          onChange={(e) =>
                            setDates([...dates, { [val]: e.target.value }])
                          }
                        />
                        <label htmlFor="Sáng" className="ms-1">
                          Sáng
                        </label>
                      </span>
                      <span className="mx-3">
                        <input
                          type="checkbox"
                          value="Chiều"
                          onChange={(e) =>
                            setDates([...dates, { [val]: e.target.value }])
                          }
                        />
                        <label htmlFor="Chiều" className="ms-1">
                          Chiều
                        </label>
                      </span>
                      <span className="mx-3">
                        <input
                          type="checkbox"
                          value="Tối"
                          onChange={(e) =>
                            setDates([...dates, { [val]: e.target.value }])
                          }
                        />
                        <label htmlFor="Tối" className="ms-1">
                          Tối
                        </label>
                      </span>
                    </>
                  )}
                </DayWrapper>
              ))}
          </Col>
        </Row>
        <ButtonWrapper>
          <ButtonSubmit type="submit">Đăng ký</ButtonSubmit>
        </ButtonWrapper>
      </FreeDayContainer>
    </>
  );
};

export default SignUpFreeDay;
