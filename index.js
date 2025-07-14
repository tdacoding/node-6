import chalk from "chalk";
import {
  addRequest,
  getNotes,
  delNote,
  updateNote,
} from "./request-controller.js";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { loginUser } from "./users-controller.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/auth.js";

const app = express();
const port = 4000;

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "pages"));

app.get("/", async (req, res) => {
  res.render("index", {
    userEmail: undefined,
    error: undefined,
  });
});

app.post("/", async (req, res) => {
  try {
    await addRequest(req.body.name, req.body.phone, req.body.description);

    res.render("index", {
      error: undefined,
    });
  } catch (error) {
    console.error("Creation error", error);
    res.render("index", {
      error: error.message,
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Authorization",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/requsts");
  } catch (error) {
    console.error("Login error", error);
    res.render("login", {
      title: "Login",
      error: error.message,
    });
  }
});

app.get("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
});

app.use(auth);

app.get("/requests", async (req, res) => {
  res.render("requests", {
    title: "Requests",
    error: undefined,
  });
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/requests?authSource=admin")
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`server is running on port ${port}`));
    });
  });
