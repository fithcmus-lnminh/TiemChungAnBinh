import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function deleteUser(req, res, next) {
  const userId = parseInt(req.params.userId);

  try {
    const userExists = await pool.query(
      "SELECT * FROM TaiKhoan WHERE mataikhoan = $1",
      [userId]
    );

    if (userExists.rowCount <= 0) {
      res.status(400);
      throw new Error("Không tồn tại nhân viên");
    }

    const deleteUser = await pool.query(
      "DELETE FROM TaiKhoan WHERE mataikhoan = $1",
      [userId]
    );

    console.log("deleteUser: ", deleteUser);
    console.log("deleteUser.rowCount: ", deleteUser.rowCount);

    res.status(201).json({
      success: true,
      message: "Xóa nhân viên thành công",
    });
    // else {
    //   res.status(400);
    //   throw new Error("Không thể xóa nhân viên");
    // }
  } catch (err) {
    next(err);
  }
}
