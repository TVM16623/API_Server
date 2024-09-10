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

const SlideShowEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

  const [phoneModels, setPhoneModels] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/PhoneModels").then(
      (response) => response.json()
    );
    setPhoneModels(response);
  };

  const [slideShow, setSlideShow] = useState({
    phoneModel: {},
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/SlideShows/${id}`).then((res) => {
        setSlideShow(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSlideShow((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setSlideShow((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    setSlideShow((prev) => ({ ...prev, ImageFile: e.target.files[0] }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(slideShow).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .put(`https://localhost:7217/api/SlideShows/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/Admin/SlideShow");
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
              <h1 className="mt-4">Sửa banner quảng cáo</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/SlideShow">
                  SlideShow
                </Link>
                <li className="breadcrumb-item active">Edit</li>
              </ol>

              <Form className="col-md-4">
                <Form.Group>
                  <Form.Label>Image:</Form.Label>
                  <Form.Control
                    type="file"
                    name="ImageFile"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Group>
                    <Form.Label>PhoneModel:</Form.Label>
                    <Form.Select name="phoneModelId" custom onChange={handleChange}>
                      <option value={slideShow.phoneModelId}>
                        {slideShow.phoneModel.name}
                      </option>
                      {phoneModels.map((item) => {
                        if (item.id !== slideShow.phoneModelId) {
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
                    checked={slideShow.status}
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

export default SlideShowEdit;