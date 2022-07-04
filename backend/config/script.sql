CREATE DATABASE TiemChung;

CREATE TABLE NguoiGiamHo (
    MaNGH INTEGER PRIMARY KEY,
    HoTenNGH VARCHAR(255),
    MoiQuanHe VARCHAR(50),
    SoDienThoai VARCHAR(15)
);

CREATE TABLE TaiKhoan (
    MaTaiKhoan INTEGER PRIMARY KEY,
    Email VARCHAR(255),
    Password VARCHAR(255),
    HoTen VARCHAR(255),
    NgaySinh DATE,
    DienThoai VARCHAR(15),
    GioiTinh VARCHAR(5),
    DiaChi VARCHAR(255),
    VaiTro VARCHAR(50),
    MaNV INTEGER,
    FOREIGN KEY (MaNV) REFERENCES nhanvien(manv)
);

CREATE TABLE nhanvien (
	manv INTEGER PRIMARY KEY,
	bangcap varchar(25),
	luong integer,
	trungtamlamviec varchar(100)
);

CREATE TABLE PhieuDangKy (
    MaPhieu INTEGER PRIMARY KEY,
    MaKH INTEGER,
    HoTenNguoiTiem VARCHAR(255),
    NgaySinh DATE,
    GioiTinh VARCHAR(5),
    DienThoai VARCHAR(15),
    DiaChi VARCHAR(255),
    LoaiTiem VARCHAR(50),
    GoiTiem VARCHAR(255)[],
    LoaiVaccine VARCHAR(20),
    NgayTiem DATE,
    MaNGH INTEGER,
    FOREIGN KEY (MaNGH) REFERENCES NguoiGiamHo(MaNGH)
    FOREIGN KEY (MaKH) REFERENCES TaiKhoan(MaTaiKhoan)
);


CREATE TABLE HoaDon (
    MaHD INTEGER PRIMARY KEY,
    HinhThucThanhToan VARCHAR(50),
    TongTien FLOAT,
    SoTienConLai FLOAT,
    SoLanThanhToan INTEGER,
    MaKH INTEGER,
    MaDonMua INTEGER,
    FOREIGN KEY (MaDonMua) REFERENCES DonMuaVaccine(MaDon),
);

CREATE TABLE LichLamViec (
    MaLLV INTEGER PRIMARY KEY,
    ThongTinLamViec VARCHAR(255)[],
    MaNV INTEGER,
    FOREIGN KEY (MaNV) REFERENCES TaiKhoan(MaTaiKhoan)
);

CREATE TABLE DonMuaVaccine (
    MaDon INTEGER PRIMARY KEY,
    GoiVaccine VARCHAR(255)[],
    TenVaccineKhac VARCHAR(255),
    MaKH INTEGER,
    FOREIGN KEY (MaKH) REFERENCES TaiKhoan(MaTaiKhoan)
);

CREATE TABLE DanhSachGoiTiem (
    MaGoi INTEGER PRIMARY KEY,
    TenGoi VARCHAR(255),
    SoLuong INTEGER,
    DonGia INTEGER
);

CREATE TABLE DanhSachVaccine (
    MaVaccine INTEGER PRIMARY KEY,
    TenVaccine VARCHAR(255),
    SoLuong INTEGER,
    DonGia INTEGER
);