import express from "express";
import {
  deleteEmployee,
  getAllUsers,
  getAllEmployees,
  postRegisterForm,
  getAllRegisterForms,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/isAdmin.js";

const router = express.Router();

router.delete("/xoa-nhan-vien/:userId", isAuth, isAdmin, deleteEmployee);
router.get("/lay-tat-ca-khach-hang", isAuth, isAdmin, getAllUsers);
router.get("/lay-tat-ca-nhan-vien", isAuth, isAdmin, getAllEmployees);
router.post("/dang-ky-tiem", isAuth, isAdmin, postRegisterForm);
router.get("/lay-tat-ca-phieu-tiem", isAuth, isAdmin, getAllRegisterForms);
// router.get("/lay-danh-sach-phieu-tiem/:userId", authUser);

export default router;
