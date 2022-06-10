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
} from "../controllers/userController.js";
import { isStaff } from "../middlewares/isStaff.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/isAdmin.js";
import { isEmployee } from "../controllers/isEmployee.js";

const router = express.Router();

router.put("/thanh-toan/:ma-hoa-don", updateBill);
router.get("/lay-thong-tin-mua-vaccine/:userid", getInformationBuyVaccine);
router.get("/lay-thong-tin-hoa-don/:userid", getBillByUserID);
router.post("/them-goi-tiem", isStaff, addVaccinePackage);
router.post("/them-loai-vaccine", isStaff, addVaccineType);
router.post("/sua-goi-tiem", isStaff, updateVaccinePackage);
router.post("/sua-loai-vaccine", isStaff, updateVaccineType);
router.delete("/xoa-goi-tiem", isStaff, deleteVaccinePackage);
router.delete("/xoa-loai-vaccine", isStaff, deleteVaccineType);
router.put("/cap-nhap-thong-tin/:userid", updateInformation);
router.delete("/xoa-nhan-vien/:userId", isAuth, isAdmin, deleteEmployee);
router.get("/lay-tat-ca-khach-hang", isAuth, isAdmin, getAllUsers);
router.get("/lay-tat-ca-nhan-vien", isAuth, isAdmin, getAllEmployees);
router.post("/dang-ky-tiem", isAuth, postRegisterForm);
router.get("/lay-tat-ca-phieu-tiem", isAuth, getAllRegisterForms);
router.get(
  "/lay-danh-sach-phieu-tiem/:userId",
  isAuth,
  getRegisterFormByUserId
);
router.post("/mua-vaccine", isAuth, postBuyVaccine);
router.post("/dang-ky-lich-lam-viec", isAuth, isEmployee, postRegisterWork);
router.get(
  "/lay-lich-lam-viec/:userId",
  isAuth,
  isEmployee,
  getRegisterWorkByUserId
);

export default router;
