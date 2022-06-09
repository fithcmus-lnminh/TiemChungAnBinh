import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function deleteUser(req, res, next) {
  console.log("Vao ham delete user thanh cong");
  console.log("req.params: ", req.params);

  const userId = parseInt(req.params.userId);

  try {
    const userExists = await pool.query(
      "SELECT * FROM TaiKhoan WHERE mataikhoan = $1",
      [userId]
    );

    console.log("userExits: ", userExists.rows[0]);
    console.log("==> count: ", userExists.rowCount);

    if (userExists.rowCount > 0) {
      res.status(201).json({
        MaTaiKhoan: user.rows[0].mataikhoan,
        HoTen: user.rows[0].hoten,
        Email: user.rows[0].email,
        VaiTro: user.rows[0].vaitro,
        token: generateToken(user.rows[0].mataikhoan),
      });
      res.status(201).json({
        success: true,
        message: "Xóa nhân viên thành công",
      });
    } else {
      res.status(400);
      throw new Error("Không tồn tại nhân viên");
    }
  } catch (err) {
    next(err);
  }
}
