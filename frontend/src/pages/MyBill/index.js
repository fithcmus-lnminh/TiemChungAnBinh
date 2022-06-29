import React from "react";
import { Table } from "antd";
import Header from "../../components/Header";
import { MyBillContainer, MyBillH2 } from "./MyBillElement";

const MyBill = () => {
  const dataSource = [
    {
      mahoadon: 1,
      goivaccine: ["Gói 18 tuổi", "Gói trẻ em", "Gói bình thường"],
      tenvaccinekhac: "",
      tongtien: 2300000,
      tinhtrang: "Chưa thanh toán",
    },
  ];
  const columns = [
    {
      title: "Mã HĐ",
      dataIndex: "mahoadon",
      key: "mahoadon",
      width: "12%",
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
      width: "15%",
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhtrang",
      key: "tinhtrang",
      width: "20%",
    },
  ];

  return (
    <>
      <Header />
      <MyBillContainer>
        <MyBillH2>HÓA ĐƠN CỦA TÔI</MyBillH2>
        <Table
          pagination={{ pageSize: 3, showSizeChanger: false }}
          dataSource={dataSource}
          columns={columns}
        />
      </MyBillContainer>
    </>
  );
};

export default MyBill;
