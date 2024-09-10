import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../Component/axiosClient";
import { Form, Button } from "react-bootstrap";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PhoneEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [phone, setPhone] = useState({
    phoneModel: {},
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/Phones/${id}`).then((res) => {
      setPhone(res.data);
    });
  }, [id]);

  const nameFile = phone.phoneModel.name;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPhone((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setPhone((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    setPhone((prev) => ({ ...prev, ImageFile: e.target.files[0] }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(phone).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(
        `https://localhost:7217/api/Phones/${id}?nameFile=${nameFile}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        navigate(`/admin/phone/${phone.phoneModelId}`);
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
              <h1 className="mt-4">Sửa điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link
                  className="breadcrumb-item"
                  to={`/Admin/Phone/${phone.phoneModelId}`}
                >
                  Phone
                </Link>
                <li className="breadcrumb-item active">{phone.phoneModelId}</li>
                <li className="breadcrumb-item active">Edit</li>
              </ol>

              <Form className="col-md-4">
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={phone.name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Color:</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    onChange={handleChange}
                    value={phone.color}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Storage:</Form.Label>
                  <Form.Control
                    type="text"
                    name="storage"
                    onChange={handleChange}
                    value={phone.storage}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="ImageFile"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={phone.price}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Stock:</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    onChange={handleChange}
                    value={phone.stock}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Còn hoạt động"
                    onChange={handleCheck}
                    checked={phone.status}
                  />
                </Form.Group>
                <Button
                  className="mt-3 mb-3"
                  type="submit"
                  variant="warning"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faEdit} /> Sửa
                </Button>
              </Form>
            </div>
          </main>

          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright © Your Website 2021</div>
                <div></div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PhoneEdit;
