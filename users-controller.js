import chalk from "chalk";
import { User } from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = "test";

export const addUser = async (email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, password: passwordHash });
  console.log(chalk.green("User was added!"));
};

export const delUser = async (userEmail) => {
  await User.deleteOne({ email: userEmail });
  console.log(chalk.green("User was removed!"));
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Wrong password!");
  }
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
};
