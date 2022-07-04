import { Popconfirm, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  getAllPackages,
  getAllVaccines,
} from "../../redux/apiRequests/getVacPackageRequest";
import {
  VaccineManagementContainer,
  VaccineManagementH2,
} from "./VaccineManagementElement";

const VaccineManagement = () => {
  const [show, setShow] = useState({});

  const { packages, vaccines } = useSelector((state) => state.vaccinelist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPackages());
    dispatch(getAllVaccines());
  }, [dispatch]);

  const dataSourcePackage = packages ?? [];
  const dataSourceVaccine = vaccines ?? [];
  const columnsPackage = [
    {
      title: "Mã gói",
      dataIndex: "magoi",
      key: "magoi",
    },
    {
      title: "Tên gói",
      dataIndex: "tengoi",
      key: "tengoi",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
      render: (text, record, index) => {
        return text + "đ";
      },
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn btn-warning"
              onClick={() => {
                setShow({ ["showedit_" + record.magoi]: true });
              }}
            >
              <i className="fas fa-pen"></i>
            </button>
            <Modal
              size="lg"
              show={show["showedit_" + record.magoi]}
              onHide={() => setShow({ ["showedit_" + record.magoi]: false })}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>SỬA GÓI TIÊM</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow({ ["showedit_" + record.magoi]: false });
                    //   setMessage("");
                  }}
                >
                  Đóng
                </Button>
                <Button type="submit" variant="success">
                  Cập nhật
                </Button>
              </Modal.Footer>
            </Modal>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa gói này không?"
              onConfirm={() => {
                // dispatch(deleteRoom(record._id));
              }}
              okText="Xóa"
              cancelText="Hủy"
            >
              <button className="btn btn-danger px-2">
                <i className="fas fa-trash-can"></i>
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const columnsVaccine = [
    {
      title: "Mã vaccine",
      dataIndex: "mavaccine",
      key: "mavaccine",
    },
    {
      title: "Tên vaccine",
      dataIndex: "tenvaccine",
      key: "tenvaccine",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
      render: (text, record, index) => {
        return text + "đ";
      },
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn btn-warning"
              onClick={() => {
                setShow({ ["showeditvaccine_" + record.mavaccine]: true });
              }}
            >
              <i className="fas fa-pen"></i>
            </button>
            <Modal
              size="lg"
              show={show["showeditvaccine_" + record.mavaccine]}
              onHide={() =>
                setShow({ ["showeditvaccine_" + record.mavaccine]: false })
              }
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>SỬA LOẠI VACCINE</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow({ ["showeditvaccine_" + record.mavaccine]: false });
                    //   setMessage("");
                  }}
                >
                  Đóng
                </Button>
                <Button type="submit" variant="success">
                  Cập nhật
                </Button>
              </Modal.Footer>
            </Modal>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa loại này không?"
              onConfirm={() => {
                // dispatch(deleteRoom(record._id));
              }}
              okText="Xóa"
              cancelText="Hủy"
            >
              <button className="btn btn-danger px-2">
                <i className="fas fa-trash-can"></i>
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <VaccineManagementContainer>
        <Row>
          <Col md={6} className="px-4">
            <VaccineManagementH2>QUẢN LÝ GÓI TIÊM</VaccineManagementH2>
            <Button className="btn-success mb-3">
              <i className="fas fa-plus me-2"></i>Thêm gói tiêm
            </Button>
            <Table
              pagination={{ pageSize: 6, showSizeChanger: false }}
              dataSource={dataSourcePackage}
              columns={columnsPackage}
              rowKey="magoi"
            />
          </Col>
          <Col md={6} className="px-4">
            <VaccineManagementH2>QUẢN LÝ LOẠI VACCINE</VaccineManagementH2>
            <div className="text-end">
              <Button className="btn-success mb-3">
                <i className="fas fa-plus me-2"></i>Thêm loại vaccine
              </Button>
            </div>
            <Table
              pagination={{ pageSize: 6, showSizeChanger: false }}
              dataSource={dataSourceVaccine}
              columns={columnsVaccine}
              rowKey="magoi"
            />
          </Col>
        </Row>
      </VaccineManagementContainer>
    </>
  );
};

export default VaccineManagement;
