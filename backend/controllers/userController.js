import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function deleteEmployee(req, res, next) {
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

    if (deleteUser.rowCount > 0) {
      res.status(201).json({
        success: true,
        message: "Xóa nhân viên thành công",
      });
    } else {
      res.status(400);
      throw new Error("Không thể xóa nhân viên");
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await pool.query(
      "SELECT mataikhoan, email, hoten, ngaysinh, dienthoai, gioitinh, diachi, vaitro FROM TaiKhoan WHERE vaitro = $1",
      ["Khach Hang"]
    );

    if (users.rowCount > 0) {
      res.status(201).json(users.rows);
    } else {
      res.status(400);
      throw new Error("Không tìm thấy khách hàng.");
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllEmployees(req, res, next) {
  try {
    const users = await pool.query(
      "SELECT mataikhoan, email, hoten, ngaysinh, dienthoai, gioitinh, diachi, vaitro FROM TaiKhoan WHERE vaitro = $1",
      ["Nhan Vien"]
    );

    if (users.rowCount > 0) {
      res.status(201).json(users.rows);
    } else {
      res.status(400);
      throw new Error("Không tìm thấy nhân viên.");
    }
  } catch (err) {
    next(err);
  }
}

export async function postRegisterForm(req, res, next) {
  const { makh, loaitiem, goitiem, loaivaccine, ngaytiem } = req.body;

  console.log(("body:", req.body));

  try {
    const form = await pool.query(
      "INSERT INTO phieudangky(makh, loaitiem, goitiem, loaivaccine, ngaytiem) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [parseInt(makh), loaitiem, goitiem, loaivaccine, ngaytiem]
    );

    if (form.rowCount > 0) {
      res.status(201).json(form.rows);
    } else {
      res.status(400);
      throw new Error("Không có sẵn phiếu đăng ký nào.");
    }
  } catch (err) {
    next(err);
  }
}
