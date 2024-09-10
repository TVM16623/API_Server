import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer.js';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!user.username || !user.password || !user.fullname || !user.email || !user.address || !user.phonenumber || !user.birthDay || !user.gender) {
      alert('Vui lòng điền đầy đủ thông tin đăng ký.');
      return;
    }

    axios.post(`https://localhost:7217/api/Users/register`, user)
      .then(() => {
        alert('Đăng ký thành công.');
        navigate("/login");
      })
      .catch(error => {
        console.log('Đăng ký không thành công:', error);
        alert('Đăng ký không thành công. Vui lòng kiểm tra thông tin trên.');
      });
  };

  

  return (
    <>
      <Header></Header>
      <div  >
      <Container className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleRegister} className="w-50 p-4 rounded bg-light">
          <h3 className="mb-4 text-center">Đăng ký</h3>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tài khoản"
              name="username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu "
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicFullname">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Họ tên"
              name="fullname"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              name="address"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập số điện thoại"
              name="phonenumber"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicBirthDay">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              placeholder="Chọn ngày sinh"
              name="birthDay"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="my-4">
            <Form.Group controlId="formBasicGender">
              <Form.Label>Giới tính</Form.Label>
              <Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Nam"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                  />
                </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    label="Nữ"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </div>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Đăng ký
          </Button>

          <Col className="d-flex justify-content-center">
            <p className="text-center">
              Đã có tài khoản?{' '}
              <a href="/Login" className="text-decoration-none color-black" style={{ color: 'gray' }}>
                Đăng nhập
              </a>
            </p>
          </Col>
        </Form>
      </Container>
      </div >
      <Footer></Footer>

    </>
  );
};

export default Register;