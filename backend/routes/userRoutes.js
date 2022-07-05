import express from "express";
import {
  updateBill,
  getInformationBuyVaccine,
  getBillByUserID,
  addVaccinePackage,
  addVaccineType,
  updateVaccinePackage,
  updateVaccineType,
  deleteVaccinePackage,
  deleteVaccineType,
  updateInformation,
  deleteEmployee,
  getAllUsers,
  getAllEmployees,
  postRegisterForm,
  getAllRegisterForms,
  getRegisterFormByUserId,
  postBuyVaccine,
  postRegisterWork,
  getRegisterWorkByUserId,
  getUserProfile,
  updateProfile,
  getBillById,
  getAllPackage,
  getAllVaccine,
} from "../controllers/userController.js";
import { isStaff } from "../middlewares/isStaff.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isEmployee } from "../middlewares/isEmployee.js";

const router = express.Router();

router.get("/thong-tin-tai-khoan/:id", isAuth, getUserProfile);
router.put("/thanh-toan/:mahoadon", updateBill);
router.get("/lay-thong-tin-mua-vaccine/:userid", getInformationBuyVaccine);
router.get("/lay-thong-tin-hoa-don/:userid", getBillByUserID);
router.get("/lay-hoa-don/:id", getBillById);
router.get("/lay-goi-tiem", getAllPackage);
router.get("/lay-loai-vaccine", getAllVaccine);
router.post("/them-goi-tiem", addVaccinePackage);
router.post("/them-loai-vaccine", addVaccineType);
router.post("/sua-goi-tiem/:id", updateVaccinePackage);
router.post("/sua-loai-vaccine/:id", updateVaccineType);
router.delete("/xoa-goi-tiem/:id", deleteVaccinePackage);
router.delete("/xoa-loai-vaccine/:id", deleteVaccineType);
router.put("/cap-nhap-thong-tin/:userid", updateInformation);
router.delete("/xoa-nhan-vien/:userId", isAuth, isAdmin, deleteEmployee);
router.get("/lay-tat-ca-khach-hang", isAuth, isAdmin, getAllUsers);
router.get("/lay-tat-ca-nhan-vien", isAuth, isAdmin, getAllEmployees);
router.post("/dang-ky-tiem", postRegisterForm);
router.get("/lay-tat-ca-phieu-tiem", isAuth, getAllRegisterForms);
router.get("/lay-phieu-tiem/:userId", isAuth, getRegisterFormByUserId);
router.post("/mua-vaccine", isAuth, postBuyVaccine);
router.post("/dang-ky-lich-lam-viec", isAuth, isEmployee, postRegisterWork);
router.get(
  "/lay-lich-lam-viec/:userId",
  isAuth,
  isEmployee,
  getRegisterWorkByUserId
);
router.put("/updateProfile/:id", isAuth, updateProfile);

export default router;
