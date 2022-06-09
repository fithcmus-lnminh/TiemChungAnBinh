import pool from "../config/db.js";

export async function updateBill(req, res, next) {
    const billId = req.params.ma-hoa-don;
    const { SoTienThanhToan } = req.body;

    try {
        const bill = await pool.query("SELECT * FROM HoaDon WHERE MaHD = $1", [
        billId,
        ]);

        if (bill.rowCount > 0)
        {
            bill.rows[0].solanthanhtoan++;
            bill.rows[0].sotienconlai -= SoTienThanhToan;
            if (bill.rows[0].sotienconlai < 0) {
                bill.rows[0].sotienconlai = 0;
            }
            res.json({
                MaHoaDon: bill.rows[0].mahd,
                HinhThucThanhToan: bill.rows[0].hinhthucthanhtoan,
                TongTien: bill.rows[0].tongtien,
                SoLanThanhToan: bill.rows[0].solanthanhtoan,
                SoTienConLai: bill.rows[0].sotienconlai,
                MaKhachHang: bill.rows[0].makh,
                MaNhanVienLap: bill.rows[0].manvlaphd,
            });
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
        const billBuyVaccine = await pool.query("SELECT * FROM DonMuaVaccine WHERE MaKH = $1", [
            userId,
        ]);

        if (billBuyVaccine.rowCount > 0)
        {
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
};

export async function getBillByUserID(req, res, next) {
    const userId = req.params.userid;

    try {
        const bill = await pool.query("SELECT * FROM HoaDon WHERE MaKH = $1", [
            userId,
        ]);

        if (bill.rowCount > 0)
        {
        res.json({
            MaHoaDon: bill.rows[0].mahd,
            HinhThucThanhToan: bill.rows[0].hinhthucthanhtoan,
            TongTien: bill.rows[0].tongtien,
            SoTienConLai: bill.rows[0].sotienconlai,
            SoLanThanhToan: bill.rows[0].solanthanhtoan,
            MaKhachHang: bill.rows[0].makh,
            MaNhanVienLap: bill.rows[0].manvlaphd,
        });
        } else {
            res.status(401);
            throw new Error("Invalid Bill");
        }
    } catch (err) {
        next(err);
    }
};

export async function addVaccinePackage(req, res, next) {
    const { MaGoi, TenGoi, SoLuong, DonGia } = req.body;

    try {
        const vaccinePackage = await pool.query(
            "INSERT INTO DanhSachGoiTiem(magoi, tengoi, soluong, dongia) VALUES ($1, $2, $3, $4) RETURNING *",
            [MaGoi, TenGoi, SoLuong, DonGia]
          );

        if (vaccinePackage.rowCount > 0)
        {
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
};

export async function addVaccineType(req, res, next) {
    const { MaVaccine, TenVaccine, SoLuong, DonGia } = req.body;

    try {
        const vaccineType = await pool.query(
            "INSERT INTO DanhSachVaccine(mavaccine, tenvaccine, soluong, dongia) VALUES ($1, $2, $3, $4) RETURNING *",
            [MaVaccine, TenVaccine, SoLuong, DonGia]
          );

        if (vaccineType.rowCount > 0)
        {
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
};

export async function updateVaccinePackage(req, res, next) {
    const { MaGoi, TenGoi, SoLuong, DonGia } = req.body;

    try {
        const vaccinePackage = await pool.query(
            "UPDATE DanhSachGoiTiem SET tengoi = $2, soluong = $3, dongia = $4 WHERE magoi = $1 RETURNING *",
            [MaGoi, TenGoi, SoLuong, DonGia]
          );

        if (vaccinePackage.rowCount > 0)
        {
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
};

export async function updateVaccineType(req, res, next) {
    const { MaVaccine, TenVaccine, SoLuong, DonGia } = req.body;

    try {
        const vaccineType = await pool.query(
            "UPDATE DanhSachVaccine SET tenvaccine = $2, soluong = $3, dongia = $4 WHERE mavaccine = $1 RETURNING *",
            [MaVaccine, TenVaccine, SoLuong, DonGia]
          );

        if (vaccineType.rowCount > 0)
        {
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
};

export async function deleteVaccinePackage(req, res, next) {
    const MaGoi = req.body;

    try {
        const vaccinePackage = await pool.query(
            "DELETE FROM DanhSachGoiTiem WHERE magoi = $1 RETURNING *",
            [MaGoi]
          );

        if (vaccinePackage.rowCount > 0)
        {
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
};

export async function deleteVaccineType(req, res, next) {
    const { MaVaccine, TenVaccine, SoLuong, DonGia } = req.body;

    try {
        const vaccineType = await pool.query(
            "DELETE FROM DanhSachVaccine WHERE mavaccine = $1 RETURNING *",
            [MaVaccine]
          );

        if (vaccineType.rowCount > 0)
        {
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
};

export async function updateInformation(req, res, next) {
    const userId = req.params.userid;
    const { HoTen, NgaySinh, DienThoai, GioiTinh, DiaChi } = req.body;

    try {
        const user = await pool.query(
            "UPDATE TaiKhoan SET HoTen = $2, NgaySinh = $3, DienThoai = $4, GioiTinh = $5, DiaChi = $6 WHERE mataikhoan = $1 RETURNING *",
            [userId, HoTen, NgaySinh, DienThoai, GioiTinh, DiaChi]
          );

        if (vaccinePackage.rowCount > 0)
        {
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
};