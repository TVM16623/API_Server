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

const PhoneModelImageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [phoneModelImage, setPhoneModelImage] = useState({
    phoneModel: {},
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/PhoneModelImages/${id}`).then((res) => {
        setPhoneModelImage(res.data);
    });
  }, [id]);

  const nameFile = phoneModelImage.phoneModel.name;

  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setPhoneModelImage((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    setPhoneModelImage((prev) => ({ ...prev, ImageFile: e.target.files[0] }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(phoneModelImage).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(`https://localhost:7217/api/PhoneModelImages/${id}?nameFile=${nameFile}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate(`/Admin/PhoneModelImage/${phoneModelImage.phoneModelId}`);
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
              <h1 className="mt-4">Sửa hình dòng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link
                  className="breadcrumb-item"
                  to={`/Admin/PhoneModelImage/${phoneModelImage.phoneModelId}`}
                >
                  PhoneModelImage
                </Link>
                <li className="breadcrumb-item active">{phoneModelImage.phoneModelId}</li>
                <li className="breadcrumb-item active">Edit</li>
              </ol>

              <Form className="col-md-4">               
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="ImageFile"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Còn hoạt động"
                    onChange={handleCheck}
                    checked={phoneModelImage.status}
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

export default PhoneModelImageEdit;
