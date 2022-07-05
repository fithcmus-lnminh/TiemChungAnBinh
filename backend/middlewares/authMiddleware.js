import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const isAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const res = await pool.query(
        "SELECT mataikhoan, email, hoten, ngaysinh, dienthoai, gioitinh, diachi, vaitro, manv FROM TaiKhoan WHERE MaTaiKhoan = $1",
        [decoded.id]
      );
      req.user = res.rows[0];

      next();
    } else throw new Error("Not authorized!", 401);
  } catch (err) {
    next(err);
  }
};
