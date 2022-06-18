import React from "react";
import Header from "../../components/Header";
import { MyBillContainer, MyBillH2 } from "./MyBillElement";

const MyBill = () => {
  return (
    <>
      <Header />
      <MyBillContainer>
        <MyBillH2>HÓA ĐƠN CỦA TÔI</MyBillH2>
      </MyBillContainer>
    </>
  );
};

export default MyBill;
