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
    MaNGH INTEGER,
    FOREIGN KEY (MaNGH) REFERENCES NguoiGiamHo(MaNGH)
);

CREATE TABLE PhieuDangKy (
    MaPhieu INTEGER PRIMARY KEY,
    MaKH INTEGER,
    LoaiTiem VARCHAR(50),
    GoiTiem VARCHAR(20)[],
    LoaiVaccine VARCHAR(20),
    NgayTiem DATE,
    FOREIGN KEY (MaKH) REFERENCES TaiKhoan(MaTaiKhoan)
);


CREATE TABLE HoaDon (
    MaHD INTEGER PRIMARY KEY,
    HinhThucThanhToan VARCHAR(50),
    TongTien FLOAT,
    SoTienConLai FLOAT,
    SoLanThanhToan INTEGER,
    MaKH INTEGER,
    MaNVLapHD INTEGER
);

CREATE TABLE LichLamViec (
    MaLLV INTEGER PRIMARY KEY,
    NgayLamViec DATE,
    CaLamViec VARCHAR(5),
    MaNV INTEGER
);

CREATE TABLE DonMuaVaccine (
    MaDon INTEGER PRIMARY KEY,
    TenVaccine VARCHAR(50),
    TenVaccineKhac VARCHAR(255),
    SoLuong INTEGER,
    MaKH INTEGER,
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
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