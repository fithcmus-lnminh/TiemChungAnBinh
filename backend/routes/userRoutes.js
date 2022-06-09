import express from "express";
import { deleteEmployee, getAllUsers } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/isAdmin.js";

const router = express.Router();

router.delete("/xoa-nhan-vien/:userId", isAuth, isAdmin, deleteEmployee);
router.get("/lay-tat-ca-khach-hang", isAuth, isAdmin, getAllUsers);
// router.get("/lay-tat-ca-phieu-tiem", authUser);
// router.get("/lay-danh-sach-phieu-tiem/:userId", authUser);

export default router;
