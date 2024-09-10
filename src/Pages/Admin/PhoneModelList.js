import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { Button, Col, Modal, Table, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const PhoneModelList = () => {
  const [phoneModels, setPhoneModels] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/PhoneModels").then(
      (response) => response.json()
    );
    setPhoneModels(response);
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa dòng điện thoại này?"
    );
    if (shouldDelete) {
      axiosClient
        .delete(`https://localhost:7217/api/PhoneModels/${id}`)
        .then(() => {
          setPhoneModels(phoneModels.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error("Lỗi xóa: ", error);
        });
    }
  };

  const [show, setShow] = useState(false);
  const [selectedPhoneModel, setSelectedPhoneModel] = useState({ brand: {} });
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedPhoneModel(phoneModels.find((a) => a.id === id));
    setShow(true);
  };

  return (
    <div>
      <TopNav />

      <div id="layoutSidenav">
        <Nav />

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Quản lý dòng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin">
                  Trang chủ
                </Link>
                <li className="breadcrumb-item active">PhoneModel</li>
              </ol>

              <Link to="/Admin/PhoneModel/Add" className="btn btn-success mb-2">
                <i className="fas fa-plus" /> Thêm
              </Link>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1" />
                  Danh sách dòng điện thoại
                </div>
                <div className="card mb-8">
                  <table className="table table-light text-center">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Hãng</th>
                        <th>Status</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phoneModels.map((item) => (
                        <tr>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src={`https://localhost:7217/Image/PhoneModel/${item.name}/${item.image}`}
                              alt=""
                              style={{ width: 150 }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.brand.name}</td>
                          <td>
                            {item.status === 0
                              ? "Không hoạt động"
                              : "Hoạt động"}
                          </td>
                          <td>
                            <div>
                              <Button onClick={() => handleShow(item.id)} style={{ marginRight: "5px" }}>
                                <FontAwesomeIcon
                                  icon={faInfo}
                                ></FontAwesomeIcon>
                              </Button>
                              <Link
                                to={`/Admin/PhoneModel/Edit/${item.id}`}
                                className="btn btn-warning"
                                style={{ marginRight: "5px" }}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                ></FontAwesomeIcon>
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item.id)}
                                style={{ marginRight: "5px" }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                ></FontAwesomeIcon>
                              </button>
                              <Link
                                to={`/Admin/Phone/${item.id}`}
                                className="btn btn-success"
                                style={{ marginRight: "5px" }}
                              >
                                DS điện thoại
                              </Link>
                              <Link
                                to={`/Admin/PhoneModelImage/${item.id}`}
                                className="btn btn-success"
                                style={{ marginRight: "5px" }}
                              >
                                DS hình
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Table>
                    <Modal show={show} onHide={handleClose} size="xl">
                      <Modal.Header closeButton>
                        <Modal.Title>Thông tin sản phẩm</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col md={4}>
                            <dd>
                              <img
                                src={`https://localhost:7217/Image/PhoneModel/${selectedPhoneModel.name}/${selectedPhoneModel.image}`}
                                alt=""
                                style={{ width: "100%" }}
                              />
                            </dd>
                          </Col>
                          <Col md={4}>
                            <dl>
                              <dt>Name: </dt>
                              <dd>{selectedPhoneModel.name}</dd>
                              <dt>Screen: </dt>
                              <dd>{selectedPhoneModel.screen}</dd>
                              <dt>OperatingSystem: </dt>
                              <dd>{selectedPhoneModel.operatingSystem}</dd>
                              <dt>RearCamera: </dt>
                              <dd>{selectedPhoneModel.rearCamera}</dd>
                              <dt>FrontCamera: </dt>
                              <dd>{selectedPhoneModel.frontCamera}</dd>
                              <dt>Chip: </dt>
                              <dd>{selectedPhoneModel.chip}</dd>
                            </dl>
                          </Col>
                          <Col md={4}>
                            <dl>
                              <dt>Sim: </dt>
                              <dd>{selectedPhoneModel.sim}</dd>
                              <dt>BatteryAndCharger: </dt>
                              <dd>{selectedPhoneModel.batteryAndCharger}</dd>
                              <dt>PhoneModelType: </dt>
                              <dd>{selectedPhoneModel.phoneModelType}</dd>
                              <dt>OldPrice: </dt>
                              <dd>{selectedPhoneModel.oldPrice}</dd>
                              <dt>PromotionalPrice: </dt>
                              <dd>{selectedPhoneModel.promotionalPrice}</dd>
                              <dt>BrandId: </dt>
                              <dd>{selectedPhoneModel.brand.name}</dd>
                              <dt>Status: </dt>
                              <dd>
                                {selectedPhoneModel.status === 0
                                  ? " Không hoạt động"
                                  : "Hoạt động"}
                              </dd>
                            </dl>
                          </Col>
                        </Row>
                      </Modal.Body>
                    </Modal>
                  </Table>
                </div>
              </div>
            </div>
          </main>

          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright © Your Website 2021</div>
                <div></div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PhoneModelList;
