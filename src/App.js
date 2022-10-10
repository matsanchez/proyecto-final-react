import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//CONTEXT
import { CartProvider } from "../src/context/CartContext";
import { AuthProvider } from "../src/context/AuthContext";

//COMPONENTS
import NavBar from "./components/NavBar/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemListCategory from "./components/ItemListCategory/ItemListCategory";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import ResetPassword from "./components/Account/ResetPassword";
import Favorites from "./components/Profile/Favorites";
import Orders from "./components/Profile/Orders";
import { LogOut } from "./components/Profile/LogOut";
import Footer from "./components/Footer/Footer";
import CheckOut from "./components/CheckOut/CheckOut";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import Page404 from "./components/Page404/Page404";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path="/allproducts" element={<ItemListContainer />} />
              <Route path="/" element={<ItemListCategory />} />
              <Route path="/about" element={<About />} />
              <Route path="/category/:idCategory" element={<ItemListContainer />} />
              <Route path="/detail/:idItem" element={<ItemDetailContainer />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectRoute>
                    <CheckOut />
                  </ProtectRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route
                path="/favorites"
                element={
                  <ProtectRoute>
                    <Favorites />
                  </ProtectRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectRoute>
                    <Orders />
                  </ProtectRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectRoute>
                    <LogOut />
                  </ProtectRoute>
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
