import { Link } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const Pay = () => {
  const [pay, setPay] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/Carts").then(
      (response) => response.json()
    );
    setPay(response);
  };

  return (
    <>
      <Header />
      <div style={{ padding: "32", textDecoration: "none" }}>
        <Link to="/"> Trang chủ</Link>
      </div>
      <Container>
        <h1>Thông Tin Thanh Toán</h1>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Tên"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Số điện thoại"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Email"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <h2>Hình thức nhận hàng</h2>
        <label>
          <input type="radio" />
          Nhận tại cửa hàng
        </label>
        <label>
          <input type="radio" />
          Giao tận nơi
        </label>
        <Form.Select size="lg">
          <option>Chọn tỉnh thành phố</option>
        </Form.Select>
        <br />
        <Form.Select>
          <option>Quận</option>
        </Form.Select>
        <br />
        <Form.Select size="sm">
          <option>Huyện</option>
        </Form.Select>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            Xuất hóa đơn công ty
          </label>

          {isChecked && (
            <div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Tên công ty"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Địa chỉ công ty"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Mã số thuế"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
          )}
        </div>
        <h2>Thông tin thanh toán</h2>
        <p>Quý khách vui lòng lựa chọn các thanh toán dưới đây:</p>
        <div className="method-list" id="payment-method-block">
          <li style={{ listStyleType: "none", display: "block" }}>
            <label
              style={{
                border: " 2px solid #ccc",
                borderRadius: "5px",
                padding: "20px",
              }}
            >
              <input type="radio" />
              {
                <img
                  src="https://shopdunk.com/Plugins/Payments.Kredivo/logo.jpg"
                  width={30}
                  height={30}
                  alt="Thanh toán Kredivo"
                />
              }
              <b>Thanh toán Kredivo</b>
            </label>
          </li>

          <li
            style={{
              listStyleType: "none",
              display: "block",
              marginTop: "10px",
            }}
          >
            <label
              style={{
                border: " 2px solid #ccc",
                borderRadius: "5px",
                padding: "20px",
              }}
            >
              <input type="radio" />
              {
                <img
                  src="https://shopdunk.com/Plugins/Payments.Payoo/logo.jpg"
                  width={30}
                  height={30}
                  alt="Thanh toán Kredivo"
                />
              }
              <b>Thanh toán Payoo</b>
            </label>
          </li>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Pay;
