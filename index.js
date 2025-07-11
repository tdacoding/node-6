import chalk from "chalk";
import { addNote, getNotes, delNote, updateNote } from "./notes-controller.js";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { addUser, loginUser } from "./users-controller.js";
import cookieParser from "cookie-parser";

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
    notes: await getNotes(),
    flag: false,
    error: undefined,
  });
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Registration",
    error: undefined,
  });
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Authorization",
    error: undefined,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title);

    res.render("index", {
      notes: await getNotes(),
      flag: "created",
      error: undefined,
    });
  } catch (error) {
    console.error("Creation error", error);
    res.render("index", {
      notes: await getNotes(),
      flag: false,
      error: true,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      res.render("register", {
        title: "Registration",
        error: "This email is already registered",
      });
      return;
    }
    console.error("Registration error", error);
    res.render("register", {
      title: "Registration",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    console.error("Login error", error);
    res.render("login", {
      title: "Login",
      error: error.message,
    });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await delNote(req.params.id);

    res.render("index", {
      notes: await getNotes(),
      flag: "deleted",
      error: undefined,
    });
  } catch (error) {
    console.error("Deleting error", error);
    res.render("index", {
      notes: await getNotes(),
      flag: false,
      error: true,
    });
  }
});

app.put("/", async (req, res) => {
  try {
    const { id, newTitle } = req.body;
    await updateNote(id, newTitle);

    res.render("index", {
      notes: await getNotes(),
      flag: "edited",
      error: undefined,
    });
  } catch (error) {
    console.error("Editing error", error);
    res.render("index", {
      notes: await getNotes(),
      flag: false,
      error: true,
    });
  }
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/notes?authSource=admin")
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`server is running on port ${port}`));
    });
  });
