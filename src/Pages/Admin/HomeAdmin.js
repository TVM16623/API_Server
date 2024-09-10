import { useEffect, useState } from "react";
import Nav from "./Component/Nav";
import TopNav from "./Component/TopNav";

const HomeAdmin = () => {
  const [brands, setBrands] = useState([]);
  const getBandsData = async () => {
    const response = await fetch("https://localhost:7217/api/Brands").then(
      (response) => response.json()
    );
    setBrands(response);
  };
  const [phoneModels, setPhoneModels] = useState([]);
  const getPhoneModelsData = async () => {
    const response = await fetch("https://localhost:7217/api/PhoneModels").then(
      (response) => response.json()
    );
    setPhoneModels(response);
  };
  const [slideShows, setSlideShows] = useState([]);
  const getSlideShowData = async () => {
    const response = await fetch("https://localhost:7217/api/SlideShows").then(
      (response) => response.json()
    );
    setSlideShows(response);
  };
  const [invoices, setInvoices] = useState([]);
  const getInvoicesData = async () => {
    const response = await fetch("https://localhost:7217/api/Invoices").then(
      (response) => response.json()
    );
    setInvoices(response);
  };
  const [discountCodes, setDiscountCodes] = useState([]);
  const getDiscountCodesData = async () => {
    const response = await fetch(
      "https://localhost:7217/api/DiscountCodes"
    ).then((response) => response.json());
    setDiscountCodes(response);
  };
  useEffect(() => {
    getBandsData();
    getPhoneModelsData();
    getInvoicesData();
    getDiscountCodesData();
    getSlideShowData();
  }, []);

  return (
    <div>
      <TopNav />

      <div id="layoutSidenav">
        <Nav />

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Thống kê</h1>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Hãng điện thoại</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      SL: {brands.length}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Dòng điện thoại</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      SL: {phoneModels.length}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Banner quảng cáo</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      SL: {slideShows.length}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Đơn hàng</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      SL: {invoices.length}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card bg-info text-white mb-4">
                    <div className="card-body">Mã giảm giá</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      SL: {discountCodes.length}
                    </div>
                  </div>
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

export default HomeAdmin;
