import express from "express";
import {
  deleteEmployee,
  getAllUsers,
  getAllEmployees,
  postRegisterForm,
  getAllRegisterForms,
  getRegisterFormByUserId,
  postBuyVaccine,
  postRegisterWork,
  getRegisterWorkById,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/isAdmin.js";
import { isEmployee } from "../controllers/isEmployee.js";

const router = express.Router();

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
  getRegisterWorkById
);

export default router;
