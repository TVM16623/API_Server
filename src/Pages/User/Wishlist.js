import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHistory,
  faSearch,
  faGift,
  faMedal,
  faUser,
  faHeadset,
  faNoteSticky,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { jwtDecode as jwt_decode } from "jwt-decode";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

const Wishlist = () => {
  const [userId, setUserId] = useState("");
  const [isTokenDecoded, setTokenDecoded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishlists, setWishlists] = useState([]);

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
      getWishlists(userId);
    }
  }, [userId]);

  const getWishlists = async (userId) => {
    try {
      const res = await axiosClient.get(
        `https://localhost:7217/api/WishLists/GetWishListByUser/${userId}`
      );
      if (res && res.data) {
        setWishlists(res.data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách yêu thích: ", error);
    }
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm yêu thích này?"
    );
    if (shouldDelete) {
      axiosClient
        .delete(`https://localhost:7217/api/WishLists/${id}`)
        .then(() => {
          setWishlists(wishlists.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error("Lỗi xóa: ", error);
        });
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col
            md={3}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "20px",
              marginBottom: "20px",
              height: "400px",
              fontSize: "25px",
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              <li>
                {" "}
                <FontAwesomeIcon
                  icon={faHouse}
                  style={{ marginRight: "15px" }}
                />
                Trang Chủ
              </li>
            </Link>
            <li>
              {" "}
              <FontAwesomeIcon
                icon={faHistory}
                style={{ marginRight: "15px" }}
              />
              Lịch sử mua hàng
            </li>
            <li>
              {" "}
              <FontAwesomeIcon
                icon={faSearch}
                style={{ marginRight: "15px" }}
              />
              Trang cứu bảo hành
            </li>
            <li>
              {" "}
              <FontAwesomeIcon icon={faGift} style={{ marginRight: "15px" }} />
              Ưu đãi của bạn
            </li>
            <li>
              {" "}
              <FontAwesomeIcon icon={faMedal} style={{ marginRight: "15px" }} />
              Hạng thành viên
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "15px" }} />
              Tài khoản của bạn
            </li>
            <li>
              <FontAwesomeIcon
                icon={faHeadset}
                style={{ marginRight: "15px" }}
              />
              Hỗ trợ
            </li>
            <li>
              <FontAwesomeIcon
                icon={faNoteSticky}
                style={{ marginRight: "15px" }}
              />
              Góp ý - Phản hồi
            </li>
            <li>
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                style={{ marginRight: "15px" }}
              />
              Thoát tài khoản
            </li>
          </Col>
          <Col
            md={8}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "10px",
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Fuction</th>
                </tr>
              </thead>
              <tbody>
                {wishlists.map((item) => (
                  <tr key={item.id}>
                    <td>{item.phoneModel.id}</td>
                    <td>
                      <Image
                        src={`https://localhost:7217/Image/PhoneModel/${item.phoneModel.name}/${item.phoneModel.image}`}
                        style={{ width: "100px" }}
                        alt="Hình"
                      />
                    </td>
                    <td>{item.phoneModel.name}</td>
                    <td>
                      {item.phoneModel.promotionalPrice.toLocaleString()}đ
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Wishlist;
