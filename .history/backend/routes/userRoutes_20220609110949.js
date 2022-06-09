import express from "express";
import {
  authUser,
  getBla,
  registerUser,
} from "../controllers/authController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);

export default router;
