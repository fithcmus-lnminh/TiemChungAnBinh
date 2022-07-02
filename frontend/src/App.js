import Home from "./pages/Home";
import "antd/dist/antd.min.css";
import { Routes, Route } from "react-router-dom";
import SignUpVaccination from "./pages/SignUpVaccination";
import BuyVaccine from "./pages/BuyVaccine";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import SignUpFreeDay from "./pages/SignUpFreeDay";
import Profile from "./pages/Profile/index";
import MyBill from "./pages/MyBill";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-vaccination" element={<SignUpVaccination />} />
        <Route path="/buy-vaccine" element={<BuyVaccine />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout/:billId" element={<Checkout />} />
        <Route path="/signup-freeday" element={<SignUpFreeDay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bill" element={<MyBill />} />
      </Routes>
    </>
  );
}

export default App;
