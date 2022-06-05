import Home from "./pages/Home";
import "antd/dist/antd.min.css";
import { Routes, Route } from "react-router-dom";
import SignUpVaccination from "./pages/SignUpVaccination";
import BuyVaccine from "./pages/BuyVaccine";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import SignUpFreeDay from "./pages/SignUpFreeDay";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-vaccination" element={<SignUpVaccination />} />
        <Route path="/buy-vaccine" element={<BuyVaccine />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup-freeday" element={<SignUpFreeDay />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
