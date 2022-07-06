import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { getAllBill } from "../../redux/apiRequests/hoadonRequest";
import { getAllPhieuTiem } from "../../redux/apiRequests/phieutiemRequest";
import {
  VaccineManagementContainer,
  VaccineManagementH2,
} from "../VaccineManagement.js/VaccineManagementElement";

const BillManagement = () => {
  const { allBills } = useSelector((state) => state.hoadon);
  const dispatch = useDispatch();

  useEffect(() => {
    !allBills && dispatch(getAllBill());
  }, [allBills, dispatch]);

  console.log(allBills);

  const dataSource = allBills ?? [];

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
      width: "15%",
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
  ];

  return (
    <>
      <Header />
      <VaccineManagementContainer>
        <VaccineManagementH2>QUẢN LÝ HÓA ĐƠN</VaccineManagementH2>
        <Table
          pagination={{ pageSize: 5, showSizeChanger: false }}
          dataSource={dataSource}
          rowKey="mahd"
          columns={columns}
        />
      </VaccineManagementContainer>
    </>
  );
};

export default BillManagement;
