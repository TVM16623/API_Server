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

const PhoneModelEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/Brands").then(
      (response) => response.json()
    );
    setBrands(response);
  };

  const [phoneModel, setPhoneModel] = useState({
    brand: {},
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/PhoneModels/${id}`).then((res) => {
      setPhoneModel(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPhoneModel((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setPhoneModel((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    setPhoneModel((prev) => ({ ...prev, ImageFile: e.target.files[0] }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(phoneModel).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(`https://localhost:7217/api/PhoneModels/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/admin/phoneModel");
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
              <h1 className="mt-4">Sửa dòng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/PhoneModel">
                  PhoneModel
                </Link>
                <li className="breadcrumb-item active">Edit</li>
              </ol>

              <Form className="col-md-4">
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={phoneModel.name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Screen:</Form.Label>
                  <Form.Control
                    type="text"
                    name="screen"
                    onChange={handleChange}
                    value={phoneModel.screen}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Operating System:</Form.Label>
                  <Form.Control
                    type="text"
                    name="operatingSystem"
                    onChange={handleChange}
                    value={phoneModel.operatingSystem}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Rear Camera:</Form.Label>
                  <Form.Control
                    type="text"
                    name="rearCamera"
                    onChange={handleChange}
                    value={phoneModel.rearCamera}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Front Camera:</Form.Label>
                  <Form.Control
                    type="text"
                    name="frontCamera"
                    onChange={handleChange}
                    value={phoneModel.frontCamera}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Chip:</Form.Label>
                  <Form.Control
                    type="text"
                    name="chip"
                    onChange={handleChange}
                    value={phoneModel.chip}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ram:</Form.Label>
                  <Form.Control
                    type="text"
                    name="ram"
                    onChange={handleChange}
                    value={phoneModel.ram}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sim:</Form.Label>
                  <Form.Control
                    type="text"
                    name="sim"
                    onChange={handleChange}
                    value={phoneModel.sim}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Battery And Charger:</Form.Label>
                  <Form.Control
                    type="text"
                    name="batteryAndCharger"
                    onChange={handleChange}
                    value={phoneModel.batteryAndCharger}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>PhoneModel Type:</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneModelType"
                    onChange={handleChange}
                    value={phoneModel.phoneModelType}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Old Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name="oldPrice"
                    onChange={handleChange}
                    value={phoneModel.oldPrice}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>PromotionalPrice:</Form.Label>
                  <Form.Control
                    type="number"
                    name="promotionalPrice"
                    onChange={handleChange}
                    value={phoneModel.promotionalPrice}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    name="ImageFile"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Group>
                    <Form.Label>Hãng:</Form.Label>
                    <Form.Select name="brandId" custom onChange={handleChange}>
                      <option value={phoneModel.brandId}>
                        {phoneModel.brand.name}
                      </option>
                      {brands.map((item) => {
                        if (item.id !== phoneModel.brandId) {
                          return <option value={item.id}>{item.name}</option>;
                        }
                        return null;
                      })}
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Còn hoạt động"
                    onChange={handleCheck}
                    checked={phoneModel.status}
                  />
                </Form.Group>
                <Button
                  className="mt-3 mb-3"
                  type="submit"
                  variant="warning"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faEdit} /> Sữa
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

export default PhoneModelEdit;
