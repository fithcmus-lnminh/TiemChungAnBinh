import pool from "../config/db.js";

export const getUserProfile = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await pool.query(
      "SELECT hoten, ngaysinh, dienthoai, gioitinh, diachi, vaitro FROM TaiKhoan WHERE mataikhoan = $1",
      [parseInt(userId)]
    );

    if (user.rowCount > 0) {
      res.status(200).json(user.rows[0]);
    } else {
      res.status(400);
      throw new Error("Không tìm thấy khách hàng");
    }
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  const userId = req.params.id;
  const { hoten, ngaysinh, dienthoai, gioitinh, diachi } = req.body;

  try {
    const user = await pool.query(
      "UPDATE TaiKhoan SET hoten=$1, ngaysinh=$2, dienthoai=$3, gioitinh=$4, diachi=$5 WHERE mataikhoan=$6 RETURNING *",
      [hoten, ngaysinh, dienthoai, gioitinh, diachi, parseInt(userId)]
    );

    if (user.rowCount > 0) {
      res.status(200).json(user.rows[0]);
    } else {
      res.status(401);
      throw new Error("Không thể cập nhật hồ sơ");
    }
  } catch (err) {
    next(err);
  }
};

export async function updateBill(req, res, next) {
  const billId = req.params.mahoadon;
  const { SoTienThanhToan, HinhThucThanhToan, SoLanThanhToan, TongTien } =
    req.body;

  try {
    const bill = await pool.query("SELECT * FROM HoaDon WHERE MaHD = $1", [
      billId,
    ]);

    if (bill.rowCount > 0) {
      bill.rows[0].sotienconlai -= SoTienThanhToan;
      if (bill.rows[0].sotienconlai < 1000) {
        bill.rows[0].sotienconlai = 0;
      }

      const updatedBill = await pool.query(
        "UPDATE HoaDon SET HinhThucThanhToan = $1, SoLanThanhToan = $2, SoTienConLai = $3, TongTien = $4 WHERE MaHD = $5 RETURNING *",
        [
          HinhThucThanhToan,
          SoLanThanhToan - 1,
          bill.rows[0].sotienconlai,
          TongTien,
          billId,
        ]
      );
      res.json(updatedBill);
    } else {
      res.status(401);
      throw new Error("Invalid Bill");
    }
  } catch (err) {
    next(err);
  }
}

export const getBillById = async (req, res, next) => {
  const billId = req.params.id;

  try {
    const bill = await pool.query("SELECT * FROM HoaDon WHERE MaHD = $1", [
      billId,
    ]);

    if (bill.rowCount > 0) {
      res.status(200).json(bill.rows[0]);
    } else {
      res.status(401);
      throw new Error("Invalid Bill");
    }
  } catch (err) {
    next(err);
  }
};

export async function getInformationBuyVaccine(req, res, next) {
  const userId = req.params.userid;

  try {
    const billBuyVaccine = await pool.query(
      "SELECT * FROM DonMuaVaccine WHERE MaKH = $1",
      [userId]
    );

    if (billBuyVaccine.rowCount > 0) {
      res.json({
        MaDon: billBuyVaccine.rows[0].madon,
        TenVaccine: billBuyVaccine.rows[0].tenvaccine,
        TenVaccineKhac: billBuyVaccine.rows[0].tenvaccinekhac,
        SoLuong: billBuyVaccine.rows[0].soluong,
        MaKH: billBuyVaccine.rows[0].makh,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Bill Buy Vaccine");
    }
  } catch (err) {
    next(err);
  }
}

export async function getBillByUserID(req, res, next) {
  const userId = req.params.userid;

  try {
    const bill = await pool.query(
      "SELECT h.Mahd, d.goivaccine, d.tenvaccinekhac ,h.tongtien, h.hinhthucthanhtoan, h.sotienconlai, h.solanthanhtoan FROM HoaDon h, donmuavaccine d WHERE h.MaKH = $1 and h.madonmua = d.madon",
      [userId]
    );

    if (bill.rowCount > 0) {
      res.json(bill.rows);
    } else {
      res.status(401);
      throw new Error("Invalid Bill");
    }
  } catch (err) {
    next(err);
  }
}

export async function addVaccinePackage(req, res, next) {
  const { MaGoi, TenGoi, SoLuong, DonGia } = req.body;

  try {
    const vaccinePackage = await pool.query(
      "INSERT INTO DanhSachGoiTiem(magoi, tengoi, soluong, dongia) VALUES ($1, $2, $3, $4) RETURNING *",
      [MaGoi, TenGoi, SoLuong, DonGia]
    );

    if (vaccinePackage.rowCount > 0) {
      res.json({
        MaGoi: vaccinePackage.rows[0].magoi,
        TenGoi: vaccinePackage.rows[0].tengoi,
        SoLuong: vaccinePackage.rows[0].soluong,
        DonGia: vaccinePackage.rows[0].dongia,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Package Data");
    }
  } catch (err) {
    next(err);
  }
}

export async function addVaccineType(req, res, next) {
  const { MaVaccine, TenVaccine, SoLuong, DonGia } = req.body;

  try {
    const vaccineType = await pool.query(
      "INSERT INTO DanhSachVaccine(mavaccine, tenvaccine, soluong, dongia) VALUES ($1, $2, $3, $4) RETURNING *",
      [MaVaccine, TenVaccine, SoLuong, DonGia]
    );

    if (vaccineType.rowCount > 0) {
      res.json({
        MaVaccine: vaccineType.rows[0].mavaccine,
        TenVaccine: vaccineType.rows[0].tenvaccine,
        SoLuong: vaccineType.rows[0].soluong,
        DonGia: vaccineType.rows[0].dongia,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Vaccine Data");
    }
  } catch (err) {
    next(err);
  }
}

export async function updateVaccinePackage(req, res, next) {
  const { MaGoi, TenGoi, SoLuong, DonGia } = req.body;

  try {
    const vaccinePackage = await pool.query(
      "UPDATE DanhSachGoiTiem SET tengoi = $2, soluong = $3, dongia = $4 WHERE magoi = $1 RETURNING *",
      [MaGoi, TenGoi, SoLuong, DonGia]
    );

    if (vaccinePackage.rowCount > 0) {
      res.json({
        MaGoi: vaccinePackage.rows[0].magoi,
        TenGoi: vaccinePackage.rows[0].tengoi,
        SoLuong: vaccinePackage.rows[0].soluong,
        DonGia: vaccinePackage.rows[0].dongia,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Package Data");
    }
  } catch (err) {
    next(err);
  }
}

export async function updateVaccineType(req, res, next) {
  const { MaVaccine, TenVaccine, SoLuong, DonGia } = req.body;

  try {
    const vaccineType = await pool.query(
      "UPDATE DanhSachVaccine SET tenvaccine = $2, soluong = $3, dongia = $4 WHERE mavaccine = $1 RETURNING *",
      [MaVaccine, TenVaccine, SoLuong, DonGia]
    );

    if (vaccineType.rowCount > 0) {
      res.json({
        MaVaccine: vaccineType.rows[0].mavaccine,
        TenVaccine: vaccineType.rows[0].tenvaccine,
        SoLuong: vaccineType.rows[0].soluong,
        DonGia: vaccineType.rows[0].dongia,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Vaccine Data");
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteVaccinePackage(req, res, next) {
  const MaGoi = req.body;

  try {
    const vaccinePackage = await pool.query(
      "DELETE FROM DanhSachGoiTiem WHERE magoi = $1 RETURNING *",
      [MaGoi]
    );

    if (vaccinePackage.rowCount > 0) {
      res.json({
        MaGoi: vaccinePackage.rows[0].magoi,
        TenGoi: vaccinePackage.rows[0].tengoi,
        SoLuong: vaccinePackage.rows[0].soluong,
        DonGia: vaccinePackage.rows[0].dongia,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Package Data");
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteVaccineType(req, res, next) {
  const { MaVaccine, TenVaccine, SoLuong, DonGia } = req.body;

  try {
    const vaccineType = await pool.query(
      "DELETE FROM DanhSachVaccine WHERE mavaccine = $1 RETURNING *",
      [MaVaccine]
    );

    if (vaccineType.rowCount > 0) {
      res.json({
        MaVaccine: vaccineType.rows[0].mavaccine,
        TenVaccine: vaccineType.rows[0].tenvaccine,
        SoLuong: vaccineType.rows[0].soluong,
        DonGia: vaccineType.rows[0].dongia,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Vaccine Data");
    }
  } catch (err) {
    next(err);
  }
}

export async function updateInformation(req, res, next) {
  const userId = req.params.userid;
  const { HoTen, NgaySinh, DienThoai, GioiTinh, DiaChi } = req.body;

  try {
    const user = await pool.query(
      "UPDATE TaiKhoan SET HoTen = $2, NgaySinh = $3, DienThoai = $4, GioiTinh = $5, DiaChi = $6 WHERE mataikhoan = $1 RETURNING *",
      [userId, HoTen, NgaySinh, DienThoai, GioiTinh, DiaChi]
    );

    if (vaccinePackage.rowCount > 0) {
      res.json({
        userId: vaccinePackage.rows[0].mataikhoan,
        HoTen: vaccinePackage.rows[0].hoten,
        NgaySinh: vaccinePackage.rows[0].ngaysinh,
        DienThoai: vaccinePackage.rows[0].dienthoai,
        GioiTinh: vaccinePackage.rows[0].gioitinh,
        DiaChi: vaccinePackage.rows[0].diachi,
      });
    } else {
      res.status(401);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    next(err);
  }
}
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
  const {
    makh,
    hotennguoitiem,
    ngaysinh,
    gioitinh,
    sodienthoai,
    diachi,
    loaitiem,
    goitiem,
    loaivaccine,
    ngaytiem,
    tenngh,
    moiquanhe,
    sdtngh,
  } = req.body;

  try {
    let ngh = null;
    if (tenngh && moiquanhe && sdtngh) {
      ngh = await pool.query(
        "INSERT INTO nguoigiamho(hotenngh, moiquanhe, sodienthoai) VALUES ($1,$2,$3) RETURNING *",
        [tenngh, moiquanhe, sdtngh]
      );
    }

    const form = await pool.query(
      "INSERT INTO phieudangky(makh, hotennguoitiem, ngaysinh, gioitinh, dienthoai, diachi, loaitiem, goitiem, loaivaccine, ngaytiem, mangh) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        makh ? parseInt(makh) : null,
        hotennguoitiem,
        ngaysinh,
        gioitinh,
        sodienthoai,
        diachi,
        loaitiem,
        goitiem,
        loaivaccine,
        ngaytiem,
        ngh ? ngh.rows[0].mangh : null,
      ]
    );

    if (form.rowCount > 0) {
      res.status(201).json(form.rows[0]);
    } else {
      res.status(400);
      throw new Error("Không thể thêm phiếu đăng ký.");
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllRegisterForms(req, res, next) {
  try {
    const forms = await pool.query("SELECT * FROM phieudangky");

    if (forms.rowCount > 0) {
      res.status(201).json(forms.rows);
    } else {
      res.status(400);
      throw new Error("Không có sẵn phiếu đăng ký nào.");
    }
  } catch (err) {
    next(err);
  }
}

export async function getRegisterFormByUserId(req, res, next) {
  const userId = parseInt(req.params.userId);

  try {
    const forms = await pool.query(
      "SELECT * FROM phieudangky WHERE makh = $1",
      [userId]
    );

    if (forms.rowCount > 0) {
      res.status(201).json(forms.rows);
    } else {
      res.status(400);
      throw new Error("Không có sẵn phiếu đăng ký nào.");
    }
  } catch (err) {
    next(err);
  }
}

export async function postBuyVaccine(req, res, next) {
  const { tenvaccine, tenvaccinekhac, makh, tongtien } = req.body;

  try {
    const vaccineOrder = await pool.query(
      "INSERT INTO donmuavaccine(goivaccine, tenvaccinekhac, makh) VALUES ($1, $2, $3) RETURNING *",
      [tenvaccine, tenvaccinekhac, parseInt(makh)]
    );

    if (vaccineOrder.rowCount > 0) {
      res.status(201).json(vaccineOrder.rows[0]);

      await pool.query(
        "INSERT INTO hoadon(tongtien, sotienconlai, madonmua, makh) VALUES ($1, $2, $3, $4) returning *",
        [tongtien, tongtien, vaccineOrder.rows[0].madon, parseInt(makh)]
      );
    } else {
      res.status(400);
      throw new Error("Không thể mua vaccine.");
    }
  } catch (err) {
    next(err);
  }
}

export async function postRegisterWork(req, res, next) {
  const { thongtinlamviec, manv } = req.body;

  try {
    const isExisted = await pool.query(
      "SELECT * FROM lichlamviec WHERE MaNV = $1",
      [parseInt(manv)]
    );

    if (isExisted.rowCount > 0) {
      const updateWork = await pool.query(
        "UPDATE lichlamviec SET thongtinlamviec = $1 WHERE manv = $2 RETURNING *",
        [thongtinlamviec, parseInt(manv)]
      );

      if (updateWork.rowCount > 0) {
        res.status(201).json(updateWork.rows[0]);
      } else {
        res.status(400);
        throw new Error("Không thể đăng ký lịch làm việc.");
      }
    } else {
      const registerWork = await pool.query(
        "INSERT INTO lichlamviec(thongtinlamviec, manv) VALUES ($1, $2) RETURNING *",
        [thongtinlamviec, parseInt(manv)]
      );

      if (registerWork.rowCount > 0) {
        res.status(201).json(registerWork.rows[0]);
      } else {
        res.status(400);
        throw new Error("Không thể đăng ký lịch làm việc.");
      }
    }
  } catch (err) {
    next(err);
  }
}

export async function getRegisterWorkByUserId(req, res, next) {
  const userId = parseInt(req.params.userId);

  try {
    const registerWork = await pool.query(
      "SELECT thongtinlamviec FROM lichlamviec WHERE manv = $1",
      [userId]
    );

    if (registerWork.rowCount > 0) {
      res.status(201).json(registerWork.rows[0]);
    } else {
      res.status(400);
      throw new Error("Nhân viên này không có lịch làm việc.");
    }
  } catch (err) {
    next(err);
  }
}
