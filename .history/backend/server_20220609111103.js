import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());

dotenv.config();
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await pool.query(
      "insert into TaiKhoan(email,password) values ($1, $2) returning *;",
      [email, password]
    );

    res.json(newUser);
  } catch (err) {
    console.log(err.message);
  }
});

// app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Tiem Chung app listening on port ${port}!`)
);
