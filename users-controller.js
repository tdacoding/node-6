import { User } from "./models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordCorrect = password === user.password;
  if (!isPasswordCorrect) {
    throw new Error("Wrong password!");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
};
