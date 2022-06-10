import express from "express";
import { createUser } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/them-nhan-vien", isAuth, isAdmin, createUser);
// router.get("/lay-tat-ca-phieu-tiem", authUser);
// router.get("/lay-danh-sach-phieu-tiem/:userId", authUser);

export default router;
