import chalk from "chalk";
import { User } from "./models/User.js";

export const addUser = async (email, password) => {
  await User.create({ email, password });
  console.log(chalk.green("User was added!"));
};

export const delUser = async (userEmail) => {
  await User.deleteOne({ email: userEmail });
  console.log(chalk.green("User was removed!"));
};

export const getNotes = async () => {
  return await User.find();
};
