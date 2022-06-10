import express from "express";
import { authUser } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/lay-tat-ca-phieu-tiem", authUser);
router.get("/lay-danh-sach-phieu-tiem", authUser);
router.post("/lay-tat-ca-phieu-tiem", authUser);

export default router;
