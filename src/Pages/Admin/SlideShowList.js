import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./Component/TopNav";
import Nav from "./Component/Nav";

const SlideShowList = () => {
  const [slideShows, setslideShows] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://localhost:7217/api/SlideShows").then(
      (response) => response.json()
    );
    setslideShows(response);
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa banner quảng cáo này?"
    );
    if (shouldDelete) {
      axiosClient
        .delete(`https://localhost:7217/api/SlideShows/${id}`)
        .then(() => {
            setslideShows(slideShows.filter((item) => item.id !== id));
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
              <h1 className="mt-4">Quản lý banner quảng cáo</h1>

              <ol className="breadcrumb mb-4">
                <Link className="breadcrumb-item" to="/Admin">
                  Trang chủ
                </Link>
                <li className="breadcrumb-item active">SlideShow</li>
              </ol>

              <Link to="/Admin/SlideShow/Add" className="btn btn-success mb-2">
                <i className="fas fa-plus" /> Thêm
              </Link>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1" />
                  Danh sách banner quảng cáo
                </div>
                <div className="card mb-8">
                  <table className="table table-light text-center">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>PhoneModel</th>
                        <th>Status</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slideShows.map((item) => (
                        <tr>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src={`https://localhost:7217/Image/SlideShow/${item.image}`}
                              alt=""
                              style={{ width: 300 }}
                            />
                          </td>
                          <td>{item.phoneModel.name}</td>
                          <td>
                            {item.status === 0
                              ? "Không hoạt động"
                              : "Hoạt động"}
                          </td>
                          <td>
                            <div>
                              <Link
                                to={`/Admin/SlideShow/Edit/${item.id}`}
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

export default SlideShowList;