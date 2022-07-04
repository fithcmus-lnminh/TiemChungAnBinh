export const isEmployee = (req, res, next) => {
  if (
    req.user &&
    (req.user.vaitro === "Nhan Vien" ||
      req.user.vaitro === "Y Bac Si" ||
      req.user.vaitro === "Nhan Vien Quan Ly")
  ) {
    next();
  } else {
    res.status(401);
    throw new Error("Không có quyền truy cập");
  }
};
