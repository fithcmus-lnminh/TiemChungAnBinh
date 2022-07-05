import { Popconfirm, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  getAllPackages,
  getAllVaccines,
} from "../../redux/apiRequests/getVacPackageRequest";
import {
  suagoitiem,
  sualoaivaccine,
  themgoitiem,
  themloaivaccine,
  xoagoitiem,
  xoaloaivaccine,
} from "../../redux/apiRequests/packageRequest";
import {
  TextRed,
  VaccineManagementContainer,
  VaccineManagementH2,
} from "./VaccineManagementElement";

const VaccineManagement = () => {
  const [show, setShow] = useState({});
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showAddVaccine, setShowAddVaccine] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState("");
  const [message, setMessage] = useState("");

  const { packages, vaccines } = useSelector((state) => state.vaccinelist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch, packages]);

  useEffect(() => {
    dispatch(getAllVaccines());
  }, [dispatch, vaccines]);

  const submitAddPackage = (e) => {
    e.preventDefault();

    if (!packageName) setMessage("Vui lòng nhập tên gói tiêm");
    else if (!quantity) setMessage("Vui lòng nhập số lượng");
    else if (!unitPrice) setMessage("Vui lòng nhập đơn giá");
    else {
      dispatch(
        themgoitiem({
          TenGoi: packageName,
          SoLuong: quantity,
          DonGia: unitPrice,
        })
      );
      setShowAddPackage(false);
    }
  };

  const submitAddVaccine = (e) => {
    e.preventDefault();

    if (!vaccineName) setMessage("Vui lòng nhập tên vaccine");
    else if (!quantity) setMessage("Vui lòng nhập số lượng");
    else if (!unitPrice) setMessage("Vui lòng nhập đơn giá");
    else {
      dispatch(
        themloaivaccine({
          TenVaccine: vaccineName,
          SoLuong: quantity,
          DonGia: unitPrice,
        })
      );
      setShowAddPackage(false);
    }
  };

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
                setPackageName(record.tengoi);
                setQuantity(record.soluong);
                setUnitPrice(record.dongia);
                setMessage("");
                setShow({ ["showedit_" + record.magoi]: true });
              }}
            >
              <i className="fas fa-pen"></i>
            </button>
            <Modal
              show={show["showedit_" + record.magoi]}
              onHide={() => setShow({ ["showedit_" + record.magoi]: false })}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>SỬA GÓI TIÊM</Modal.Title>
              </Modal.Header>
              {message && <TextRed className="text-center">{message}</TextRed>}
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!packageName) setMessage("Vui lòng nhập tên gói tiêm");
                  else if (!quantity) setMessage("Vui lòng nhập số lượng");
                  else if (!unitPrice) setMessage("Vui lòng nhập đơn giá");
                  else {
                    dispatch(
                      suagoitiem(record.magoi, {
                        TenGoi: packageName,
                        SoLuong: quantity,
                        DonGia: unitPrice,
                      })
                    );
                    setShow({ ["showedit_" + record.magoi]: false });
                  }
                }}
              >
                <Modal.Body>
                  <Form.Group controlId="packageName" className="mb-4">
                    <Form.Label className="fw-bold">Tên gói</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên gói"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="quantity">
                        <Form.Label className="fw-bold">Số lượng</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          placeholder="Nhập số lượng"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="unitPrice">
                        <Form.Label className="fw-bold">Đơn giá</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nhập đơn giá"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
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
              </Form>
            </Modal>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa gói này không?"
              onConfirm={() => {
                dispatch(xoagoitiem(record.magoi));
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
                setVaccineName(record.tenvaccine);
                setQuantity(record.soluong);
                setUnitPrice(record.dongia);
                setMessage("");
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
              {message && <TextRed className="text-center">{message}</TextRed>}
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!vaccineName) setMessage("Vui lòng nhập tên vaccine");
                  else if (!quantity) setMessage("Vui lòng nhập số lượng");
                  else if (!unitPrice) setMessage("Vui lòng nhập đơn giá");
                  else {
                    dispatch(
                      sualoaivaccine(record.mavaccine, {
                        TenVaccine: vaccineName,
                        SoLuong: quantity,
                        DonGia: unitPrice,
                      })
                    );
                    setShow({ ["showeditvaccine_" + record.mavaccine]: false });
                  }
                }}
              >
                <Modal.Body>
                  <Form.Group controlId="vaccineName" className="mb-4">
                    <Form.Label className="fw-bold">Tên vaccine</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên gói"
                      value={vaccineName}
                      onChange={(e) => setVaccineName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="quantity">
                        <Form.Label className="fw-bold">Số lượng</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          placeholder="Nhập số lượng"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="unitPrice">
                        <Form.Label className="fw-bold">Đơn giá</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nhập đơn giá"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShow({
                        ["showeditvaccine_" + record.mavaccine]: false,
                      });
                      //   setMessage("");
                    }}
                  >
                    Đóng
                  </Button>
                  <Button type="submit" variant="success">
                    Cập nhật
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa loại này không?"
              onConfirm={() => {
                dispatch(xoaloaivaccine(record.mavaccine));
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
            <Button
              className="btn-success mb-3"
              onClick={() => {
                setShowAddPackage(true);
                setPackageName("");
                setQuantity(1);
                setUnitPrice("");
                setMessage("");
              }}
            >
              <i className="fas fa-plus me-2"></i>Thêm gói tiêm
            </Button>
            <Modal
              show={showAddPackage}
              onHide={() => setShowAddPackage(false)}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>THÊM GÓI TIÊM</Modal.Title>
              </Modal.Header>
              {message && <TextRed className="text-center">{message}</TextRed>}
              <Form onSubmit={submitAddPackage}>
                <Modal.Body>
                  <Form.Group controlId="packageName" className="mb-4">
                    <Form.Label className="fw-bold">Tên gói</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên gói"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="quantity">
                        <Form.Label className="fw-bold">Số lượng</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          placeholder="Nhập số lượng"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="unitPrice">
                        <Form.Label className="fw-bold">Đơn giá</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nhập đơn giá"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowAddPackage(false);
                    }}
                  >
                    Đóng
                  </Button>
                  <Button type="submit" variant="success">
                    Thêm
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
            <Table
              pagination={{ pageSize: 5, showSizeChanger: false }}
              dataSource={dataSourcePackage}
              columns={columnsPackage}
              rowKey="magoi"
            />
          </Col>
          <Col md={6} className="px-4">
            <VaccineManagementH2>THÊM LOẠI VACCINE</VaccineManagementH2>
            <div className="text-end">
              <Button
                className="btn-success mb-3"
                onClick={() => {
                  setShowAddVaccine(true);
                  setVaccineName("");
                  setQuantity(1);
                  setUnitPrice("");
                  setMessage("");
                }}
              >
                <i className="fas fa-plus me-2"></i>Thêm loại vaccine
              </Button>
            </div>
            <Modal
              show={showAddVaccine}
              onHide={() => setShowAddVaccine(false)}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>THÊM LOẠI VACCINE</Modal.Title>
              </Modal.Header>
              {message && <TextRed className="text-center">{message}</TextRed>}
              <Form onSubmit={submitAddVaccine}>
                <Modal.Body>
                  <Form.Group controlId="vaccineName" className="mb-4">
                    <Form.Label className="fw-bold">Tên vaccine</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên gói"
                      value={vaccineName}
                      onChange={(e) => setVaccineName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="quantity">
                        <Form.Label className="fw-bold">Số lượng</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          placeholder="Nhập số lượng"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="unitPrice">
                        <Form.Label className="fw-bold">Đơn giá</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nhập đơn giá"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowAddVaccine(false);
                    }}
                  >
                    Đóng
                  </Button>
                  <Button type="submit" variant="success">
                    Thêm
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
            <Table
              pagination={{ pageSize: 5, showSizeChanger: false }}
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
