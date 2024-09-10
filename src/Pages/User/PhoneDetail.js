import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../Component/axiosClient";
import "./css/PhoneDetail.css";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PhoneDetailPage = () => {
  const SettingsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const sliderRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState("");
  const [largeImage, setLargeImage] = useState();
  const handleThumbnailClick = (imagePath, index) => {
    setHoveredImage(imagePath);
    setLargeImage(imagePath);
    sliderRef.current.slickGoTo(index);
  };

  const { id } = useParams();

  //const navigate = useNavigate();

  const [phoneModel, setPhoneModel] = useState({ brand: {} });
  useEffect(() => {
    axiosClient
      .get(`/PhoneModels/${id}`)
      .then((res) => setPhoneModel(res.data));
  }, [id]);

  // const [phones, setPhones] = useState([]);
  // useEffect(() => {
  //   axiosClient.get(`/Phones`).then((res) => setPhones(res.data));
  // }, []);

  const [colorPhones, setColorPhones] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/Phones/GetColors/${id}`)
      .then((res) => setColorPhones(res.data));
  }, [id]);

  const [storagePhones, setStoragePhones] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/Phones/GetStorages/${id}`)
      .then((res) => setStoragePhones(res.data));
  }, [id]);

  const [phoneByColorAndStorage, setPhoneByColorAndStorage] = useState({
    image: "",
    price: "",
  });

  //Ưu tiên hiển thị lại hình của phone
  useEffect(() => {
    if (handleThumbnailClick) {
      setLargeImage(phoneByColorAndStorage.image);
    }
  }, [phoneByColorAndStorage.image]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  useEffect(() => {
    if (colorPhones.length > 0) {
      setSelectedColor(colorPhones[0]);
    }
  }, [colorPhones]);
  useEffect(() => {
    if (storagePhones.length > 0) {
      setSelectedStorage(storagePhones[0]);
    }
  }, [storagePhones]);

  const fetchPhoneByColorAndStorage = async () => {
    try {
      const response = await axiosClient.get(
        "/Phones/GetPhoneByColorAndStorage",
        {
          params: {
            id: id,
            color: selectedColor,
            storage: selectedStorage,
          },
        }
      );
      setPhoneByColorAndStorage(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Gọi API khi selectedId, selectedColor, hoặc selectedStorage thay đổi
    if (selectedColor && selectedStorage) {
      fetchPhoneByColorAndStorage();
    }
  }, [selectedColor, selectedStorage]);

  const [phoneModelImages, setPhoneModelImages] = useState([]);
  useEffect(() => {
    const fetchPhoneModelImages = async () => {
      try {
        const response = await axiosClient.get(
          `/PhoneModelImages/GetPhoneModelImagesByPhoneModelId?id=${phoneModel.id}`
        );
        setPhoneModelImages(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchPhoneModelImages();
  }, [phoneModel.id]);

  const reviewData = [
    { user: "Nguyen Van A", rating: 4, comment: "Sản phẩm tuyệt vời!" },
    {
      user: "Tran Thi B",
      rating: 5,
      comment: "Rất hài lòng với sản phẩm này.",
    },
  ];

  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Kiểm tra xem có token hay không
    if (!token) {
      // Chuyển hướng đến trang đăng nhập
      navigate("/login");
      return;
    }

    // Giải mã token và trích xuất thông tin người dùng
    const decodedToken = jwtDecode(token);
    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    const newCartItem = {
      quantity: 1,
      status: true,
      userId: userId,
      phoneId: phoneByColorAndStorage.id,
    };

    axios
      .post("https://localhost:7217/api/Carts", newCartItem)
      .then(() => {
        navigate("/cart");
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Failed to add item to cart:", error);
      });

    console.log(newCartItem);
  };

  return (
    <>
      <Header />

      <Container className="body-phonedetail">
        <Row className="phone-detail">
          <Col md={7} className="phone-image-review">
            {/* Hình lớn */}
            <div className="large-image-container">
              <Image
                src={`https://localhost:7217/Image/PhoneModel/${
                  phoneModel.name
                }/${hoveredImage || largeImage}`}
                fluid
                className="large-image"
              />
            </div>

            {/* Hình nhỏ */}
            <Row className="mt-3">
              <Col md={12}>
                <div className="slider-container">
                  <Slider {...SettingsSlider} ref={sliderRef}>
                    {phoneModelImages.map((image, index) => (
                      <div key={image.id} className="slider-item">
                        <Image
                          src={`https://localhost:7217/Image/PhoneModel/${phoneModel.name}/${image.image}`}
                          alt="Hình nhỏ"
                          className="small-image"
                          thumbnail
                          onClick={() =>
                            handleThumbnailClick(image.image, index)
                          }
                          onMouseEnter={() => setHoveredImage(image.image)}
                          onMouseLeave={() => setHoveredImage("")}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Col>
            </Row>

            <Row className="review mt-5">
              <Col md={12}>
                <h3>Đánh giá:</h3>
                {reviewData.map((review, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Card.Text>Người dùng: {review.user}</Card.Text>
                      <Card.Text>Đánh giá: {review.rating}/5</Card.Text>
                      <Card.Text>Bình luận: {review.comment}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Col>

          <Col md={5} className="phone-info">
            <div key={phoneByColorAndStorage.id}>
              <Row>
                {/* Thông tin sản phẩm */}
                <h2 className="name">{phoneByColorAndStorage.name}</h2>
                <p className="price">
                  {phoneByColorAndStorage.price.toLocaleString()}đ
                </p>
                <hr />
                {/* Chọn dung lượng */}
                <div>
                  {storagePhones.map((item) => {
                    return (
                      <>
                        <Button
                          className="button-storage"
                          key={item}
                          variant={
                            selectedStorage === item
                              ? "secondary"
                              : "outline-secondary"
                          }
                          onClick={() => setSelectedStorage(item)}
                        >
                          {item}
                        </Button>
                      </>
                    );
                  })}
                </div>

                {/* Chọn màu */}
                <div>
                  {colorPhones.map((item) => {
                    return (
                      <>
                        <Button
                          className="button-color"
                          key={item}
                          variant={
                            selectedColor === item
                              ? "secondary"
                              : "outline-secondary"
                          }
                          onClick={() => setSelectedColor(item)}
                        >
                          {item}
                        </Button>
                      </>
                    );
                  })}
                </div>
              </Row>
              <Row>
                {phoneByColorAndStorage.stock > 0 ? (
                  <>
                    <p>Số lượng tồn kho: {phoneByColorAndStorage.stock}</p>
                    <Button
                      variant="primary"
                      className="button-add-cart"
                      onClick={handleAddToCart}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Thêm vào giỏ hàng
                    </Button>
                  </>
                ) : (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "700",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    Hết hàng
                  </p>
                )}
              </Row>
              <Row>
                <Card className="detailed-configuration">
                  <Card.Title>
                    Cấu hình Điện thoại {phoneByColorAndStorage.name}
                  </Card.Title>
                  <Card.Body>
                    <Card.Text>
                      <b>Màn hình:</b> {phoneModel.screen}
                    </Card.Text>
                    <Card.Text>
                      <b>Hệ điều hành:</b> {phoneModel.operatingSystem}
                    </Card.Text>
                    <Card.Text>
                      <b>Camera sau:</b> {phoneModel.rearCamera}
                    </Card.Text>
                    <Card.Text>
                      <b>Camera trước:</b> {phoneModel.frontCamera}
                    </Card.Text>
                    <Card.Text>
                      <b>Chip:</b> {phoneModel.chip}
                    </Card.Text>
                    <Card.Text>
                      <b>RAM:</b> {phoneModel.ram}
                    </Card.Text>
                    <Card.Text>
                      <b>Dung lượng lưu trữ:</b>{" "}
                      {phoneByColorAndStorage.storage}
                    </Card.Text>
                    <Card.Text>
                      <b>Màu:</b> {phoneByColorAndStorage.color}
                    </Card.Text>
                    <Card.Text>
                      <b>SIM:</b> {phoneModel.sim}
                    </Card.Text>
                    <Card.Text>
                      <b>Pin, Sạc:</b> {phoneModel.batteryAndCharger}
                    </Card.Text>
                    <Card.Text>
                      <b>Hãng:</b> {phoneModel.brand.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default PhoneDetailPage;
