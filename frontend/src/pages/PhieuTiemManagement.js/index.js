import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { getAllPhieuTiem } from "../../redux/apiRequests/phieutiemRequest";
import {
  VaccineManagementContainer,
  VaccineManagementH2,
} from "../VaccineManagement.js/VaccineManagementElement";

const PhieuTiemManagement = () => {
  const { allPhieuTiem } = useSelector((state) => state.phieutiem);
  const dispatch = useDispatch();

  useEffect(() => {
    !allPhieuTiem && dispatch(getAllPhieuTiem());
  }, [allPhieuTiem, dispatch]);

  console.log(allPhieuTiem);

  const dataSource = allPhieuTiem ?? [];

  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "maphieu",
      key: "maphieu",
      width: "8%",
    },
    {
      title: "Người tiêm",
      dataIndex: "hotennguoitiem",
      key: "hotennguoitiem",
      width: "15%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaysinh",
      key: "ngaysinh",
      width: "15%",
      render: (text, record, index) => {
        const date = new Date(text);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        return dd + "/" + mm + "/" + yyyy;
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gioitinh",
      key: "gioitinh",
      render: (text, record, index) => {
        return text === "Male" ? "Nam" : "Nữ";
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
    },
    {
      title: "Loại tiêm",
      dataIndex: "loaitiem",
      key: "loaitiem",
    },
    {
      title: "Gói tiêm/Loại vaccine",
      render: (text, record, index) => {
        return record.loaitiem === "Tiêm theo gói"
          ? record.goitiem.join(", ")
          : record.loaivaccine;
      },
    },
    {
      title: "Ngày tiêm",
      dataIndex: "ngaytiem",
      key: "ngaytiem",
      render: (text, record, index) => {
        const date = new Date(text);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        return dd + "/" + mm + "/" + yyyy;
      },
    },
    {
      title: "Mã KH",
      dataIndex: "makh",
      key: "makh",
      width: "7%",
    },
  ];

  return (
    <>
      <Header />
      <VaccineManagementContainer>
        <VaccineManagementH2>QUẢN LÝ PHIẾU ĐĂNG KÝ TIÊM</VaccineManagementH2>
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

export default PhieuTiemManagement;
