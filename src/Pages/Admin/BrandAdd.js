import { useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../Component/axiosClient";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const BrandAdd = () => {
  const [brand, setBrand] = useState({
    ImageFile: null,
    status: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBrand((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setBrand((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    setBrand((prev) => ({ ...prev, ImageFile: e.target.files[0] }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(brand).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post(`https://localhost:7217/api/Brands`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/admin/brand");
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
              <h1 className="mt-4">Thêm hãng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/Brand">
                  Brand
                </Link>
                <li className="breadcrumb-item active">Add</li>
              </ol>

              <Form className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    name="ImageFile"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    name="name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status:</Form.Label>
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Còn hoạt động"
                    onChange={handleCheck}
                    checked
                  />
                </Form.Group>
                <Button type="submit" variant="success" onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faPlus} /> Thêm
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

export default BrandAdd;
