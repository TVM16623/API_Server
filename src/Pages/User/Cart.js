import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  Table,
  Toast,
} from "react-bootstrap";
import "./css/Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../Component/axiosClient";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7217/api/Carts`)
      .then((res) => setCart(res.data));
  }, []);

  const [phone, setPhone] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7217/api/Phones`)
      .then((res) => setPhone(res.data));
  }, []);

  const [isUpdating, setIsUpdating] = useState(false);

  const updateCart = () => {
    setIsUpdating(true);

    // Cập nhật giỏ hàng
    setTimeout(() => {
      setIsUpdating(false);
      window.location.reload();
    }, 500);
  };

  const [isRedirecting, setIsRedirecting] = useState(false);

  const redirectToHomePage = () => {
    setIsRedirecting(true);

    setTimeout(() => {
      setIsRedirecting(false);
      window.location.href = "/";
    }, 500);
  };

  const increaseQuantity = async (id, phone) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    try {
      // Gửi yêu cầu lấy thông tin sản phẩm từ cơ sở dữ liệu
      const response = await axios.get(
        `https://localhost:7217/api/Carts/${id}`
      );
      const cartItem = response.data;

      // Tăng số lượng của sản phẩm lên 1
      cartItem.quantity += 1;

      // Gửi yêu cầu cập nhật số lượng sản phẩm lên máy chủ
      const updatedResponse = await axios.put(
        `https://localhost:7217/api/Carts/${id}`,
        cartItem
      );
      const updatedItem = updatedResponse.data;

      // Cập nhật giỏ hàng với số lượng đã cập nhật
      const updatedItems = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: updatedItem.quantity };
        }
        return item;
      });

      setCart(updatedItems);

      // Delay 0.5 giây và reload lại trang
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    }
  };

  const decreaseQuantity = async (id, phone) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    try {
      // Gửi yêu cầu lấy thông tin sản phẩm từ cơ sở dữ liệu
      const response = await axios.get(
        `https://localhost:7217/api/Carts/${id}`
      );
      const cartItem = response.data;

      // Giảm số lượng của sản phẩm đi 1
      cartItem.quantity -= 1;

      // Kiểm tra nếu số lượng sản phẩm đã giảm xuống 0 hoặc âm, thì xóa sản phẩm khỏi giỏ hàng
      if (cartItem.quantity <= 0) {
        // Gửi yêu cầu xóa sản phẩm khỏi giỏ hàng
        await axios.delete(`https://localhost:7217/api/Carts/${id}`);

        // Cập nhật giỏ hàng với sản phẩm đã xóa bằng cách lọc ra các sản phẩm khác với id đã xóa
        const updatedItems = cart.filter((item) => item.id !== id);

        setCart(updatedItems);
      } else {
        // Gửi yêu cầu cập nhật số lượng sản phẩm lên máy chủ
        const updatedResponse = await axios.put(
          `https://localhost:7217/api/Carts/${id}`,
          cartItem
        );
        const updatedItem = updatedResponse.data;

        // Cập nhật giỏ hàng với số lượng đã cập nhật
        const updatedItems = cart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: updatedItem.quantity };
          }
          return item;
        });

        setCart(updatedItems);
      }

      // Reload lại trang sau khi cập nhật giỏ hàng
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    }
  };

  // const removeItem = (id) => {
  //   // Xoá sản phẩm khỏi giỏ hàng
  //   const updatedItems = cart.filter((item) => item.id !== id);
  //   setCart(updatedItems);
  // };
  const [userId, setUserId] = useState("");
  const [isTokenDecoded, setTokenDecoded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
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
      getCart(userId);
    }
  }, [userId]);

  const getCart = async (userId) => {
    try {
      const res = await axiosClient.get(
        `https://localhost:7217/api/Carts/GetCartByUser/${userId}`
      );
      if (res && res.data) {
        setCart(res.data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách sản phẩm: ", error);
    }
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?"
    );
    if (shouldDelete) {
      axiosClient
        .delete(`https://localhost:7217/api/Carts/${id}`)
        .then(() => {
          setCart(cart.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error("Lỗi xóa: ", error);
        });
    }
  };

  const calculateTotalQuantity = (cart) => {
    let totalQuantity = 0;

    for (const item of cart) {
      totalQuantity += item.phone.price * item.quantity;
    }

    return totalQuantity;
  };

  const totalQuantity = calculateTotalQuantity(cart);

  const [isChecked, setIsChecked] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [discountCodePhone, setDiscountCodePhone] = useState("");

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
  };

  const handleBuy = () => {
    if (!shippingAddress || !shippingPhone) {
      alert("Vui lòng điền địa chỉ và số điện thoại giao hàng");
      return;
    }

    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (isChecked) {
      // Xử lý khi checkbox được chọn
      // Gọi hàm handleBuy hoặc thực hiện các thao tác khác
      console.log("Đã đồng ý các điều khoản và điều kiện");

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; // Lấy ngày hiện tại dưới dạng chuỗi YYYY-MM-DD
      const code = `${userId}-${formattedDate}`; // Tạo mã code từ userId và formattedDate

      const invoices = {
        code: code,
        issuedDate: formattedDate,
        shippingAddress: shippingAddress,
        shippingPhone: shippingPhone,
        total: totalQuantity,
        status: 1,
        userId: userId,
        paymentMethodId: 1,
        discountCodeId: 1,
      };

      // Gửi yêu cầu đặt hàng đến server
      axios
        .post("https://localhost:7217/api/Invoices", invoices)
        .then((response) => {
          // Xử lý phản hồi thành công
          console.log("Đặt hàng thành công");
          toast.success("Đặt hàng thành công");
          setTimeout(() => {
            window.location.reload(); // Reload lại trang web
          }, 500);
          // Xóa giỏ hàng sau khi đặt hàng thành công
          axios
            .delete(`https://localhost:7217/api/Carts/GetCartByUser/${userId}`)
            .then((response) => {
              // Xử lý phản hồi thành công
              console.log("Xóa giỏ hàng thành công");

              // Reset giá trị các trường nhập liệu
              setShippingAddress("");
              setShippingPhone("");
              setPaymentMethod("");

              // Reload lại trang web sau một khoảng thời gian
            })
            .catch((error) => {
              // Xử lý lỗi khi xóa giỏ hàng
              console.error("Lỗi xóa giỏ hàng:", error);
            });
        })
        .catch((error) => {
          // Xử lý lỗi khi đặt hàng
          console.error("Lỗi đặt hàng:", error);
        });
    } else {
      alert("Tôi đã đồng ý các điều khoản và điều kiện");
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <Header />
      {/* Phần điều hướng về trang sản phẩm */}

      <div
        className="breadcrumb"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "8cm",
          alignItems: "center",
        }}
      >
        <ul style={{ fontSize: "14px" }}>
          <li style={{ display: "inline", marginLeft: "15px" }}>
            <Link to={"/"} style={{ color: "#515154" }}>
              Trang chủ
            </Link>
          </li>
          <span style={{ margin: "0 5px" }}>›</span>
          <li style={{ display: "inline" }}>
            <Link to={"/Cart"} style={{ color: "#515154" }}>
              Giỏ hàng
            </Link>
          </li>
        </ul>
      </div>
      <div className="page-body">
        <Row className="row-body">
          <Col sm={8}>
            <Form
              style={{
                backgroundColor: "white",
                padding: "10px",
                marginTop: ".5cm",
                marginLeft: "5cm",
                borderRadius: "20px",
                marginBottom: ".5cm",
              }}
            >
              <Table className="small-table">
                {" "}
                {/* Đặt lớp CSS cho bảng */}
                <thead>
                  <tr>
                    <th>Hình Ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th>Giá Bán</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        index === cart.length - 1 ? "no-border-bottom" : ""
                      }
                    >
                      {/* Đặt lớp CSS cho dòng không có gạch đầu */}
                      <td style={{ width: '150px' }}>
                        <img
                          src={`https://localhost:7217/Image/PhoneModel/${item.phone.phoneModel.name}/${item.phone.image}`}
                          alt=""
                          style={{ width: '150px' }}
                        />
                      </td>
                      <td>{item.phone.name}</td>
                      <td>
                        <div className="quantity-control">
                          <Button
                            className="btn btn-secondary"
                            onClick={() =>
                              decreaseQuantity(item.id, item.phone.id)
                            }
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            className="small-input"
                          />
                          <Button
                            className="btn btn-secondary"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td>{item.phone.price.toLocaleString()} VNĐ</td>
                      <td>
                        <Button
                          className="btn"
                          variant="secondary"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Button
                  style={{ marginRight: "2px", marginTop: "20px" }}
                  className="btn btn-outline-primary"
                  variant="outline-primary"
                  onClick={updateCart}
                  disabled={isUpdating}
                >
                  Cập nhật giỏ hàng
                </Button>
                <Button
                  style={{ marginRight: "2px", marginTop: "20px" }}
                  className="btn btn-outline-primary"
                  variant="outline-primary"
                  onClick={redirectToHomePage}
                  disabled={isRedirecting}
                >
                  Tiếp tục mua sắm
                </Button>
              </Table>
            </Form>
          </Col>
          <Col sm={2}>
            <Form
              style={{
                backgroundColor: "white",
                padding: "50px",
                marginTop: ".5cm",
                borderRadius: "20px",
                marginBottom: ".5cm",
              }}
            >
              <p>Tổng phụ: {totalQuantity.toLocaleString()} VNĐ</p>
              <h6
                style={{
                  borderBottom: "0.5px solid gray",
                  paddingBottom: "50px",
                  display: "block",
                }}
              >
                Tổng cộng: {totalQuantity.toLocaleString()} VNĐ
              </h6>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheck}
                />
                <span> Tôi đã đọc và đồng ý với</span>
                <a href="/chinh-sach-doi-tra" className="read" target="_blank">
                  {" "}
                  điều khoản và điều kiện{" "}
                </a>
                <span className="rule-web">của website</span>
              </label>
              <Button onClick={handleBuy}>Tiến hành đặt hàng</Button>
            </Form>
          </Col>
          <Col sm={8}>
            <h3>Thông tin thanh toán</h3>
            <Form
              style={{
                backgroundColor: "white",
                padding: "10px",
                marginTop: ".5cm",
                marginLeft: "5cm",
                borderRadius: "20px",
                marginBottom: ".5cm",
              }}
            >
              <h6>Giao tận nơi</h6>
              <Form.Group controlId="shippingAddress">
                <Form.Label>Địa chỉ giao hàng:</Form.Label>
                <Form.Control
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="shippingPhone">
                <Form.Label>Số điện thoại giao hàng:</Form.Label>
                <Form.Control
                  type="tel"
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="discountCodePhone">
                <Form.Label>Mã giảm giá (nếu có): </Form.Label>
                <Form.Control
                  type="text"
                  value={discountCodePhone}
                  onChange={(e) => setDiscountCodePhone(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
            <Form
              style={{
                backgroundColor: "white",
                padding: "10px",
                marginTop: ".5cm",
                marginLeft: "5cm",
                borderRadius: "20px",
                marginBottom: ".5cm",
              }}
            >
              <h6>Thông tin thanh toán</h6>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Thanh toán khi nhận hàng"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handlePaymentMethodChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
