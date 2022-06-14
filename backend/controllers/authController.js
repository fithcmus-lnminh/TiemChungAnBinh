import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function authUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM TaiKhoan WHERE Email = $1", [
      email,
    ]);

    if (
      user.rowCount > 0 &&
      (await bcrypt.compare(password, user.rows[0].password))
    ) {
      res.status(200).json({
        MaTaiKhoan: user.rows[0].mataikhoan,
        HoTen: user.rows[0].hoten,
        Email: user.rows[0].email,
        VaiTro: user.rows[0].vaitro,
        DienThoai: user.rows[0].dienthoai,
        token: generateToken(user.rows[0].mataikhoan),
      });
    } else {
      res.status(401);
      throw new Error("Nhập sai email hoặc mật khẩu");
      //res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
}

export async function registerUser(req, res, next) {
  const { name, phone, email, password, role } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM TaiKhoan WHERE Email = $1",
      [email]
    );

    if (userExists.rowCount > 0) {
      res.status(400);
      throw new Error("Email đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await pool.query(
      "INSERT INTO TaiKhoan(email, password, hoten, dienthoai, vaitro) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, hashedPassword, name, phone, role]
    );

    if (user.rowCount > 0) {
      res.status(201).json({
        MaTaiKhoan: user.rows[0].mataikhoan,
        HoTen: user.rows[0].hoten,
        Email: user.rows[0].email,
        VaiTro: user.rows[0].vaitro,
        DienThoai: user.rows[0].dienthoai,
        token: generateToken(user.rows[0].mataikhoan),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    next(err);
  }
}

export const getBla = (req, res, next) => {
  res.json("Get success");
};
