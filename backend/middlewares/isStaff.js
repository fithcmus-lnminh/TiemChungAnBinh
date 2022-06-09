export const isStaff = (req, res, next) => {
    if (req.user && req.user[0].vaitro === "Staff") {
      next();
    } else {
      res.status(401);
      throw new Error("Không có quyền truy cập");
    }
};