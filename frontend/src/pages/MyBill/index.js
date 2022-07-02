import React, { useEffect } from "react";
import { Table } from "antd";
import Header from "../../components/Header";
import {
  ButtonSubmit,
  ButtonWrapper,
  MyBillContainer,
  MyBillH2,
} from "./MyBillElement";
import { useDispatch, useSelector } from "react-redux";
import { getBillByUserId } from "../../redux/apiRequests/hoadonRequest";
import { useNavigate } from "react-router-dom";

const MyBill = () => {
  const { billInfo } = useSelector((state) => state.hoadon);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    userInfo && dispatch(getBillByUserId(userInfo?.MaTaiKhoan));
  }, [userInfo, dispatch]);
  const navigate = useNavigate();
  const dataSource = billInfo ?? [];
  const columns = [
    {
      title: "Mã HĐ",
      dataIndex: "mahd",
      key: "mahd",
      width: "8%",
    },
    {
      title: "Tên gói vắc xin",
      dataIndex: "goivaccine",
      key: "goivaccine",
      render: (text, record, index) => {
        return text.join(", ");
      },
    },
    {
      title: "Gói khác",
      dataIndex: "tenvaccinekhac",
      key: "tenvaccinekhac",
      width: "20%",
      render: (text, record, index) => {
        return text === "" ? "Không có" : text;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongtien",
      key: "tongtien",
      width: "10%",
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhtrang",
      key: "tinhtrang",
      width: "20%",
      render: (text, record, index) => {
        if (!record.hinhthucthanhtoan) return "Chưa thanh toán";
        if (record.hinhthucthanhtoan && record.solanthanhtoan <= 0)
          return "Đã thanh toán";
        if (record.hinhthucthanhtoan && record.solanthanhtoan > 0)
          return (
            record.hinhthucthanhtoan +
            " - Còn " +
            record.solanthanhtoan +
            " lần thanh toán"
          );
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record, index) => {
        if (
          !record.hinhthucthanhtoan ||
          (record.hinhthucthanhtoan && record.solanthanhtoan > 0)
        )
          return (
            <ButtonWrapper>
              <ButtonSubmit
                small
                type="submit"
                onClick={() => {
                  navigate(`/checkout/${record.mahd}`);
                }}
              >
                Thanh toán
              </ButtonSubmit>
            </ButtonWrapper>
          );
      },
    },
  ];

  return (
    <>
      <Header />
      <MyBillContainer>
        <MyBillH2>HÓA ĐƠN CỦA TÔI</MyBillH2>
        <Table
          pagination={{ pageSize: 10, showSizeChanger: false }}
          dataSource={dataSource}
          rowKey="mahd"
          columns={columns}
        />
      </MyBillContainer>
    </>
  );
};

export default MyBill;
