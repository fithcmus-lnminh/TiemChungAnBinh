export const isAdmin = (req, res, next) => {
  console.log("vao hàm isAdmin voi user", req.user);
  if (req.user && req.user.vaitro === "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Không có quyền truy cập");
  }
};
