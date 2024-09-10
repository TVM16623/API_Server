import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { Button, Col, Modal, Table, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/Invoices").then(
      (response) => response.json()
    );
    setInvoices(response);
  };

  const [show, setShow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({
    user: {},
    paymentMethod: {},
    discountCode: {},
  });
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const getDataDetail = async (id) => {
    const response = await fetch(
      `https://localhost:7217/api/InvoiceDetails/GetInvoiceDetailsByInvoiceId/${id}`
    ).then((response) => response.json());
    setInvoiceDetails(response);
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedInvoice(invoices.find((a) => a.id === id));
    getDataDetail(id);
    setShow(true);
  };
  // Khởi tạo biến tổng tiền
  let totalAmount = 0;
  // Tính tổng tiền
  invoiceDetails.forEach((item) => {
    totalAmount += item.quantity * item.unitPrice;
  });

  const handleCancelOrder = (id) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này?"
    );
    if (shouldDelete) {
      axiosClient
        .put(`https://localhost:7217/api/Invoices/Cancel/${id}`)
        .then(() => {
          getData();
        })
        .catch((error) => {
          console.error("Lỗi khi hủy: ", error);
        });
    }
  };

  const handleProcessOrder = (id) => {
    axiosClient
      .put(`https://localhost:7217/api/Invoices/Process/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Lỗi khi xử lý đơn: ", error);
      });
  };

  return (
    <div>
      <TopNav />

      <div id="layoutSidenav">
        <Nav />

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Quản lý đơn hàng</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin">
                  Trang chủ
                </Link>
                <li className="breadcrumb-item active">Invoice</li>
              </ol>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1" />
                  Danh sách đơn hàng
                </div>
                <div className="card mb-8">
                  <table className="table table-light text-center">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Ngày</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Xử lý</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((item) => (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.issuedDate}</td>
                          <td>{item.user.fullName}</td>
                          <td>{item.total.toLocaleString()} đ</td>
                          <td>
                            {item.status === 1
                              ? "Đang chờ duyệt"
                              : item.status === 2
                              ? "Đã duyệt"
                              : item.status === 3
                              ? "Đang giao"
                              : item.status === 4
                              ? "Đã giao"
                              : "Đã hủy"}
                          </td>
                          <td>
                            {item.status < 4 && (
                              <div>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleProcessOrder(item.id)}
                                  style={{ marginRight: "5px" }}
                                >
                                  {item.status === 1
                                    ? "Duyệt đơn"
                                    : item.status === 2
                                    ? "Giao hàng"
                                    : "Xác nhận thanh toán"}
                                </button>
                                {item.status < 3 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleCancelOrder(item.id)}
                                    style={{ marginRight: "5px" }}
                                  >
                                    Hủy đơn
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                          <td>
                            <Button
                              onClick={() => handleShow(item.id)}
                              style={{ marginRight: "5px" }}
                            >
                              Chi tiết đơn
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Table>
                    <Modal show={show} onHide={handleClose} size="xl">
                      <Modal.Header closeButton>
                        <Modal.Title>Chi tiết hóa đơn</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col md={4}>
                            <dl>
                              <dt>Code: </dt>
                              <dd>{selectedInvoice.code}</dd>
                              <dt>Địa chỉ: </dt>
                              <dd>{selectedInvoice.shippingAddress}</dd>
                              <dt>SĐT: </dt>
                              <dd>{selectedInvoice.shippingPhone}</dd>
                              <dt>Phương thức thanh toán: </dt>
                              <dd>{selectedInvoice.paymentMethod.name}</dd>
                              <dt>Mã giảm giá: </dt>
                              <dd>{selectedInvoice.discountCode.name}</dd>
                            </dl>
                          </Col>
                          <Col md={8}>
                            <table className="table text-center">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Tên điện thoại</th>
                                  <th>Số lượng</th>
                                  <th>Đơn giá</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoiceDetails.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.phone.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unitPrice.toLocaleString()} đ</td>
                                  </tr>
                                ))}
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td
                                    style={{ color: "red", fontWeight: "bold" }}
                                  >
                                    Tổng tiền: {totalAmount.toLocaleString()} đ
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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

export default InvoiceList;
