const Nav = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Hệ thống</div>
            <a className="nav-link" href="/Admin">
              <div className="sb-nav-link-icon">
                <i className="fas fa-home" />
              </div>
              Trang chủ
            </a>

            <div className="sb-sidenav-menu-heading">Hệ thống quản trị</div>
            <a className="nav-link" href="/Admin/Brand">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table" />
              </div>
              Hãng điện thoại
            </a>
            <a className="nav-link" href="/Admin/PhoneModel">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table" />
              </div>
              Dòng điện thoại
            </a>
            <a className="nav-link" href="/Admin/SlideShow">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table" />
              </div>
              Banner quảng cáo
            </a>
            <a className="nav-link" href="/Admin/Invoice">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table" />
              </div>
              Đơn hàng
            </a>
            <a className="nav-link" href="/Admin/DiscountCode">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table" />
              </div>
              Mã giảm giá
            </a>           
          </div>
        </div>

        <div className="sb-sidenav-footer">
          <div className="small">Logged in as: MTD Store</div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
