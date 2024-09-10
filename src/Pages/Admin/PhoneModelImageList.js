import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";
import axios from "axios";

const PhoneModelImageList = () => {
  const { PhoneModelId } = useParams();

  const [phoneModelImages, setPhoneModelImages] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/PhoneModelImages").then(
      (response) => response.json()
    );
    setPhoneModelImages(response);
  };

  const [selectedPhoneModel, setSelectedPhoneModel] = useState({
    brand: {},
    status: true,
  });
  useEffect(() => {
    axiosClient.get(`/PhoneModels/${PhoneModelId}`).then((res) => {
        setSelectedPhoneModel(res.data);
    });
  }, [PhoneModelId]);

  const nameFile = selectedPhoneModel.name;

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn hình dòng điện thoại này?"
    );
    if (shouldDelete) {
      axios
        .delete(`https://localhost:7217/api/PhoneModelImages/${id}?nameFile=${nameFile}`)
        .then(() => {
          setPhoneModelImages(phoneModelImages.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error("Lỗi xóa: ", error);
        });
    }
  };

  return (
    <div>
      <TopNav />

      <div id="layoutSidenav">
        <Nav />

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Quản lý hình dòng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/PhoneModel">
                  PhoneModel
                </Link>
                <li className="breadcrumb-item active">PhoneModelImage</li>
                <li className="breadcrumb-item active">{PhoneModelId}</li>
              </ol>

              <Link to={`/Admin/PhoneModelImage/${PhoneModelId}/Add`} className="btn btn-success mb-2">
                <i className="fas fa-plus" /> Thêm
              </Link>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1" />
                  Danh sách hình dòng điện thoại
                </div>
                <div className="card mb-8">
                  <table className="table table-light text-center">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phoneModelImages
                        .filter((item) => item.phoneModelId == PhoneModelId)
                        .map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src={`https://localhost:7217/Image/PhoneModel/${item.phoneModel.name}/${item.image}`}
                              alt=""
                              style={{ width: 200 }}
                            />
                          </td>
                          <td>
                            {item.status === 0
                              ? "Không hoạt động"
                              : "Hoạt động"}
                          </td>
                          <td>
                            <div>                             
                              <Link
                                to={`/Admin/PhoneModelImage/Edit/${item.id}`}
                                className="btn btn-warning"
                                style={{ marginRight: "5px" }}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                ></FontAwesomeIcon>
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item.id)}
                                style={{ marginRight: "5px" }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                ></FontAwesomeIcon>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>                  
                </div>
              </div>
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

export default PhoneModelImageList;
