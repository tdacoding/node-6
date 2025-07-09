import chalk from "chalk";
import { addNote, getNotes, delNote, updateNote } from "./notes-controller.js";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { Note } from "./models/Note.js";

const app = express();
const port = 4000;

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "pages"));

app.get("/", async (req, res) => {
  res.render("index", {
    notes: await getNotes(),
    flag: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title);

    res.render("index", {
      notes: await getNotes(),
      flag: "created",
      error: false,
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

app.delete("/:id", async (req, res) => {
  try {
    await delNote(req.params.id);

    res.render("index", {
      notes: await getNotes(),
      flag: "deleted",
      error: false,
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
      error: false,
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
