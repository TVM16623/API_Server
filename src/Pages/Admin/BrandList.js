import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../Component/axiosClient";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const BrandList = () => {
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

  const handleDelete = (id) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa hãng này?");
    if (shouldDelete) {
      axiosClient
        .delete(`https://localhost:7217/api/Brands/${id}`)
        .then(() => {
          setBrands(brands.filter((item) => item.id !== id));
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
              <h1 className="mt-4">Quản lý hãng điện thoại</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin">
                  Trang chủ
                </Link>
                <li className="breadcrumb-item active">Brand</li>
              </ol>

              <Link to="/Admin/Brand/Add" className="btn btn-success mb-2">
                <i className="fas fa-plus" /> Thêm
              </Link>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1" />
                  Danh sách hãng điện thoại
                </div>
                <div className="card mb-8">
                  <table className="table table-light text-center">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map((item) => {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>
                              <img
                                src={`https://localhost:7217/Image/Brand/${item.image}`}
                                alt=""
                                style={{ width: 150 }}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              {item.Status === 0
                                ? "Không hoạt động"
                                : "Hoạt động"}
                            </td>
                            <td>
                              {
                                <>
                                  <Link
                                    to={`Edit/${item.id}`}
                                    className="btn btn-warning"
                                    style={{ marginRight: "5px" }}
                                  >
                                    Sửa
                                  </Link>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    Xóa
                                  </button>
                                </>
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
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

export default BrandList;
