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
import {
  dangkylichranh,
  laylichtheoUserId,
} from "../../redux/apiRequests/dklichRequest";

const SignUpFreeDay = () => {
  const [dates, setDates] = useState([]);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const clickHandler = () => {
    dispatch(
      dangkylichranh({ thongtinlamviec: dates, manv: userInfo?.MaTaiKhoan })
    );
  };

  const { lichlamviec } = useSelector((state) => state.dangkylich);
  console.log(lichlamviec);

  useEffect(() => {
    userInfo && dispatch(laylichtheoUserId(userInfo.MaTaiKhoan));
  }, [userInfo, dispatch]);

  useEffect(() => {
    setDates(lichlamviec);
  }, [lichlamviec]);

  return (
    <>
      <Header />
      <FreeDayContainer>
        {/* <p>{value}</p> */}
        <FreeDayH2>LỊCH LÀM VIỆC</FreeDayH2>

        <SchedulerCalendar
          is24hour
          isDisabledDateLocked
          tableContainerStyle="text-center"
          dayContainerStyle="bg-primary border border-5 border-white"
          dayTextStyle="text-white"
          className="px-4"
          availabilities={dates}
          availabilityType={"infinity"}
          duration={10}
          onIntervalChange={(value) => {
            setDates(value);
          }}
        />

        <ButtonWrapper>
          <ButtonSubmit type="submit" onClick={clickHandler}>
            Thay đổi
          </ButtonSubmit>
        </ButtonWrapper>
      </FreeDayContainer>
    </>
  );
};

export default SignUpFreeDay;
