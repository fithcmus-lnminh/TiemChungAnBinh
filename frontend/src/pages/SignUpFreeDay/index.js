import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  FreeDayContainer,
  FreeDayH2,
} from "./SignUpFreeDayElement";
import SchedulerCalendar from "scheduler-calendar";
import "scheduler-calendar/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { dangkylichranh } from "../../redux/apiRequests/dklichRequest";

const SignUpFreeDay = () => {
  const [dates, setDates] = useState([]);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const clickHandler = () => {
    dispatch(
      dangkylichranh({ thongtinlamviec: dates, manv: userInfo?.MaTaiKhoan })
    );
  };

  return (
    <>
      <Header />
      <FreeDayContainer>
        {/* <p>{value}</p> */}
        <FreeDayH2>ĐĂNG KÝ LỊCH LÀM VIỆC</FreeDayH2>

        <SchedulerCalendar
          availabilities={dates}
          availabilityType={"infinity"}
          duration={10}
          onIntervalChange={(value) => {
            setDates(value);
          }}
        />

        <ButtonWrapper>
          <ButtonSubmit type="submit" onClick={clickHandler}>
            Đăng ký
          </ButtonSubmit>
        </ButtonWrapper>
      </FreeDayContainer>
    </>
  );
};

export default SignUpFreeDay;
