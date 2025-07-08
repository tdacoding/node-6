import chalk from "chalk";
import { addNote, getNotes, delNote, updateNote } from "./notes-controller.js";
import express from "express";
import path from "node:path";

const app = express();
const port = 4000;
const publicPath = path.join(path.resolve(), "public");

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
    deleted: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);

  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
    deleted: false,
  });
});

app.delete("/:id", async (req, res) => {
  await delNote(req.params.id);
  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
    deleted: true,
  });
});

app.put("/", async (req, res) => {
  const { id, newTitle } = req.body;

  await updateNote(id, newTitle);
  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
    deleted: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`server is running on port ${port}`));
});
