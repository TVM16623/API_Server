import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Image,
  Modal,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { jwtDecode as jwt_decode } from "jwt-decode";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

const Order = () => {
  const [userId, setUserId] = useState("");
  const [isTokenDecoded, setTokenDecoded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({
    user: {},
    paymentMethod: {},
    discountCode: {},
  });
  const [invoiceDetails, setInvoiceDetails] = useState([]);

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt_decode(token);
      setUserId(
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      );
      setTokenDecoded(true);
      setIsAuthenticated(true);
    } else {
      setTokenDecoded(false);
    }
    console.log("check userId", userId);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getInvoices(userId);
    }
  }, [userId]);

  const getInvoices = async (userId) => {
    try {
      const res = await axiosClient.get(
        `https://localhost:7217/api/Invoices/GetInvoiceByUser/${userId}`
      );
      if (res && res.data) {
        setInvoices(res.data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng: ", error);
    }
  };

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

  return (
    <>
      <Header />
      <Container style={{ minHeight: "500px" }}>
        <div className="card my-4">
          <div className="card-header text-center">
            <h4>Danh sách đơn hàng đã đặt</h4>
          </div>
          <div className="card">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Ngày đặt</th>
                  <th>Địa chỉ</th>
                  <th>SĐT</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Phương thức thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.issuedDate}</td>
                    <td>{item.shippingAddress}</td>
                    <td>{item.shippingPhone}</td>
                    <td>{item.total}</td>
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
                    <td>{item.paymentMethod.name}</td>
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
          </div>
        </div>
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
                        <td style={{ color: "red", fontWeight: "bold" }}>
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
      </Container>
      <Footer />
    </>
  );
};

export default Order;
