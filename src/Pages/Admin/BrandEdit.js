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

  const [brand, setBrand] = useState({
    id: "",
    name: "",
    image: "",
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/Brands/${id}`).then((res) => {
      setBrand(res.data);
    });
  }, [id]);

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
      .put(`https://localhost:7217/api/Brands/${id}`, formData, {
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
              <h1 className="mt-4">Sửa hãng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/Brand">
                  Brand
                </Link>
                <li className="breadcrumb-item active">Edit</li>
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
                    value={brand.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Còn hoạt động"
                    onChange={handleCheck}
                    checked={brand.status}
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
