import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Form } from "react-bootstrap";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const BrandEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState({
    id: "",
    name: "",
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/DiscountCodes/${id}`).then((res) => {
      setDiscountCode(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDiscountCode((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setDiscountCode((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .put(`https://localhost:7217/api/DiscountCodes/${id}`, discountCode)
      .then(() => {
        navigate("/admin/discountCode");
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
              <h1 className="mt-4">Sửa mã giảm giá</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/DiscountCode">
                  DiscountCode
                </Link>
                <li className="breadcrumb-item active">Edit</li>
              </ol>

              <Form className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={discountCode.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    onChange={handleChange}
                    value={discountCode.code}
                  />
                </Form.Group>                
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    value={discountCode.quantity}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Percent</Form.Label>
                  <Form.Control
                    type="number"
                    name="percent"
                    onChange={handleChange}
                    value={discountCode.percent}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Còn hoạt động"
                    onChange={handleCheck}
                    checked={discountCode.status}
                  />
                </Form.Group>
                <Button type="submit" variant="warning" onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faEdit} /> Sửa
                </Button>
              </Form>
            </div>
          </main>

          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright © Your Website 2023</div>
                <div></div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BrandEdit;
