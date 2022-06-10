import express from "express";
import { deleteUser } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/isAdmin.js";

const router = express.Router();

router.delete("/xoa-nhan-vien", isAuth, isAdmin, deleteUser);
// router.get("/lay-tat-ca-phieu-tiem", authUser);
// router.get("/lay-danh-sach-phieu-tiem/:userId", authUser);

export default router;
