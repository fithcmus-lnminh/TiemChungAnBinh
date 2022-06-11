export const isEmployee = (req, res, next) => {
  if (req.user && req.user.vaitro === "Nhan Vien") {
    next();
  } else {
    res.status(401);
    throw new Error("Không có quyền truy cập");
  }
};
