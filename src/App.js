import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/User/Home";
import PhoneDetail from "./Pages/User/PhoneDetail";
import Account from "./Pages/User/Account";
import Cart from "./Pages/User/Cart";
import Pay from "./Pages/User/Pay";
import Login from "./Pages/Component/Login/Login";
import Register from "./Pages/Component/Register/Register";
import Wishlist from "./Pages/User/Wishlist";
import BrandList from "./Pages/Admin/BrandList";
import BrandAdd from "./Pages/Admin/BrandAdd";
import BrandEdit from "./Pages/Admin/BrandEdit";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import PhoneModelByBrand from "./Pages/User/PhoneModelByBrand";
import PhoneModelList from "./Pages/Admin/PhoneModelList";
import PhoneModelAdd from "./Pages/Admin/PhoneModelAdd";
import PhoneModelEdit from "./Pages/Admin/PhoneModelEdit";
import PhoneList from "./Pages/Admin/PhoneList";
import PhoneAdd from "./Pages/Admin/PhoneAdd";
import PhoneEdit from "./Pages/Admin/PhoneEdit";
import PhoneModelImageList from "./Pages/Admin/PhoneModelImageList";
import PhoneModelImageAdd from "./Pages/Admin/PhoneModelImageAdd";
import PhoneModelImageEdit from "./Pages/Admin/PhoneModelImageEdit";
import SlideShowList from "./Pages/Admin/SlideShowList";
import SlideShowAdd from "./Pages/Admin/SlideShowAdd";
import SlideShowEdit from "./Pages/Admin/SlideShowEdit";
import PrivateRoute from "./Routes/PrivateRoute";
import InvoiceList from "./Pages/Admin/InvoiceList";
import DiscountCodeList from "./Pages/Admin/DiscountCodeList";
import DiscountCodeAdd from "./Pages/Admin/DiscountCodeAdd";
import DiscountCodeEdit from "./Pages/Admin/DiscountCodeEdit";
import Order from "./Pages/User/Order";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/PhoneModelByBrand/:BrandId"
            element={<PhoneModelByBrand />}
          />
          <Route path="/PhoneDetail/:id" element={<PhoneDetail />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Pay" element={<Pay />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Order" element={<Order />} />


          <Route
            path="/Admin"
            element={
              <PrivateRoute>
                <HomeAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Brand"
            element={
              <PrivateRoute>
                <BrandList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Brand/Add"
            element={
              <PrivateRoute>
                <BrandAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Brand/Edit/:id"
            element={
              <PrivateRoute>
                <BrandEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/PhoneModel"
            element={
              <PrivateRoute>
                <PhoneModelList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/PhoneModel/Add"
            element={
              <PrivateRoute>
                <PhoneModelAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/PhoneModel/Edit/:id"
            element={
              <PrivateRoute>
                <PhoneModelEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Phone/:PhoneModelId"
            element={
              <PrivateRoute>
                <PhoneList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Phone/:PhoneModelId/Add"
            element={
              <PrivateRoute>
                <PhoneAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Phone/Edit/:id"
            element={
              <PrivateRoute>
                <PhoneEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/PhoneModelImage/:PhoneModelId"
            element={
              <PrivateRoute>
                <PhoneModelImageList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/PhoneModelImage/:PhoneModelId/Add"
            element={
              <PrivateRoute>
                <PhoneModelImageAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/PhoneModelImage/Edit/:id"
            element={
              <PrivateRoute>
                <PhoneModelImageEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/SlideShow"
            element={
              <PrivateRoute>
                <SlideShowList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/SlideShow/Add"
            element={
              <PrivateRoute>
                <SlideShowAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/SlideShow/Edit/:id"
            element={
              <PrivateRoute>
                <SlideShowEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/DiscountCode"
            element={
              <PrivateRoute>
                <DiscountCodeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/DiscountCode/Add"
            element={
              <PrivateRoute>
                <DiscountCodeAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/DiscountCode/Edit/:id"
            element={
              <PrivateRoute>
                <DiscountCodeEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin/Invoice"
            element={
              <PrivateRoute>
                <InvoiceList />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
