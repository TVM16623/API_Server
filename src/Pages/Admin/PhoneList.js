import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const PhoneList = () => {
  const { PhoneModelId } = useParams();

  const [phones, setPhones] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/Phones").then(
      (response) => response.json()
    );
    setPhones(response);
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
      "Bạn có chắc chắn muốn xóa điện thoại này?"
    );
    if (shouldDelete) {
      axiosClient
        .delete(`https://localhost:7217/api/Phones/${id}?nameFile=${nameFile}`)
        .then(() => {
            setPhones(phones.filter((item) => item.id !== id));
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
              <h1 className="mt-4">Quản lý điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin/PhoneModel">
                  PhoneModel
                </Link>
                <li className="breadcrumb-item active">Phone</li>
                <li className="breadcrumb-item active">{PhoneModelId}</li>
              </ol>

              <Link to={`/Admin/Phone/${PhoneModelId}/Add`} className="btn btn-success mb-2">
                <i className="fas fa-plus" /> Thêm
              </Link>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1" />
                  Danh sách điện thoại
                </div>
                <div className="card mb-8">
                  <table className="table table-light text-center">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Storage</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phones
                        .filter((phone) => phone.phoneModelId == PhoneModelId)
                        .map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src={`https://localhost:7217/Image/PhoneModel/${item.phoneModel.name}/${item.image}`}
                              alt=""
                              style={{ width: 150 }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.color}</td>
                          <td>{item.storage}</td>
                          <td>{item.price}</td>
                          <td>{item.stock}</td>
                          <td>
                            {item.status === 0
                              ? "Không hoạt động"
                              : "Hoạt động"}
                          </td>
                          <td>
                            <div>                             
                              <Link
                                to={`/Admin/Phone/Edit/${item.id}`}
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
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ fontWeight: "bold" }}>Tổng SL: {phones.filter((phone) => phone.phoneModelId == PhoneModelId).reduce((total, phone) => total + phone.stock, 0)}</td>
                        <td></td>
                        <td></td>
                      </tr>
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

export default PhoneList;
