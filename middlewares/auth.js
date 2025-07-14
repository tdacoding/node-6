import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const verifyResult = jwt.verify(token, JWT_SECRET);
    req.user = { email: verifyResult.email };
    next();
  } catch (error) {
    res.redirect("/login");
  }
};
