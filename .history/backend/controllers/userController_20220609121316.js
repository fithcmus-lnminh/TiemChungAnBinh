import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function deleteUser(req, res, next) {
  console.log("Vao ham delete user thanh cong");
  console.log("req.params: ", req.params);

  //   const { name, email, password, role } = req.body;

  //   try {
  //     const userExists = await pool.query(
  //       "SELECT * FROM TaiKhoan WHERE Email = $1",
  //       [email]
  //     );

  //     if (userExists.rowCount > 0) {
  //       res.status(400);
  //       throw new Error("Email đã tồn tại");
  //     }

  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);

  //     const user = await pool.query(
  //       "INSERT INTO TaiKhoan(email, password, hoten, vaitro) VALUES ($1, $2, $3, $4) RETURNING *",
  //       [email, hashedPassword, name, role]
  //     );

  //     if (user.rowCount > 0) {
  //       res.status(201).json({
  //         MaTaiKhoan: user.rows[0].mataikhoan,
  //         HoTen: user.rows[0].hoten,
  //         Email: user.rows[0].email,
  //         VaiTro: user.rows[0].vaitro,
  //         token: generateToken(user.rows[0].mataikhoan),
  //       });
  //     } else {
  //       res.status(400);
  //       throw new Error("Invalid User Data");
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
}
