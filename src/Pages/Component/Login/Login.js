import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component được tải lần đầu
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    // Kiểm tra xem token đã tồn tại hay không
    const token = localStorage.getItem('token');
    if (token) {
      // Điều hướng đến trang chính
      navigate('/');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      alert('Vui lòng điền đầy đủ thông tin đăng nhập.');
      return;
    }

    axios
      .post('https://localhost:7217/api/Users/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        // Lưu token vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        // Kiểm tra trạng thái đăng nhập sau khi đăng nhập thành công
        checkLoginStatus();
      })
      .catch((error) => {
        console.log('Đăng nhập không thành công:', error);
        alert('Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu.');
      });
  };

  const handleLogout = (e) => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Cập nhật trạng thái đăng nhập
    setIsLoggedIn(false);

    // Điều hướng người dùng đến trang đăng nhập
    navigate('/');
  };

  return (
    <>
      <Header></Header>
      <Container className="container d-flex justify-content-center align-items-center">
        <Form onSubmit={handleLogin} className="w-50 p-4 rounded bg-light">
          <h3 className="mb-4 text-center">Đăng nhập</h3>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tài khoản"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3" onChange={handleLogin}>
            Đăng nhập
          </Button>
          <Col className="d-flex justify-content-center">
            <p className="text-center">
              Chưa có tài khoản?{' '}
              <a href="/Register" className="text-decoration-none color-black" style={{ color: 'gray' }}>
                Đăng ký tài khoản
              </a>
            </p>
          </Col>
          
        </Form>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Login;