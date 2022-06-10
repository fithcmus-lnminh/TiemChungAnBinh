import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function authUser(req, res, next) {
  const { email, password } = req.body;

  return true;
}
