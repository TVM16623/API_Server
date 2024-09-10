import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footerH">
        <Row>
          <Col md={4}>
            <h3 className="footer-heading">MTD Store</h3>
            <p className="footer-text">Năm 2020, MTD Store trở thành đại lý ủy quyền của Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người dùng Việt Nam.</p>
          </Col>
          <Col md={4}>
            <h3 className="footer-heading">Danh mục</h3>
            <ul className="footer-list">
              <li className="footer-item"><a href="/">Trang chủ</a></li>
              <li className="footer-item"><a href="/products">Sản phẩm</a></li>
              <li className="footer-item"><a href="/services">Dịch vụ</a></li>
              <li className="footer-item"><a href="/about">Về chúng tôi</a></li>
              <li className="footer-item"><a href="/contact">Liên hệ</a></li>
            </ul>
          </Col>
          <Col md={4} className="IconMXH">
            <h3 className="footer-heading">Kết nối với chúng tôi</h3>
            <ul className="footer-social-icons">
              <li className="footer-social-icon"><a href="https://facebook.com">
                <img src={`https://localhost:7217/Image/Footer/Face.png`} alt="Logo" className="icon" ></img>
              </a></li>
              <li className="footer-social-icon"><a href="https://youtube.com">
              <img src={`https://localhost:7217/Image/Footer/Youtube.png`} alt="Logo" className="icon" ></img>
                </a></li>
              <li className="footer-social-icon"><a href="https://zalo.com">
              <img src={`https://localhost:7217/Image/Footer/Zalo.png`} alt="Logo" className="icon" ></img>
                </a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container className="footerB">
          <Row>
          <Col md={6}>
            <p className="footer-text">&copy; 2023 MTDStore. Bảo lưu mọi quyền.</p>
            <p className="footer-text">Địa chỉ: 65 Huỳnh Thúc Kháng, phường Bến Nghé, Quận 1, Thành Phố HCM</p>
            <p className="footer-text">Email: mtdstore@gmail.com</p>
            <p className="footer-text">Hotline: 1900-1789</p>
          </Col>
          <Col md={6}>
          <a href="http://online.gov.vn/(X(1)S(jfktnnku5rui3vjf5pnk4sgc))/Home/WebDetails/34144?AspxAutoDetectCookieSupport=1">
              <img src={`https://localhost:7217/Image/Footer/logoSaleNoti.png`} alt="Logo-Image" className="logo" ></img>
            </a>          
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;