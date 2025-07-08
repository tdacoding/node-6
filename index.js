import chalk from "chalk";
import { addNote, getNotes, delNote, updateNote } from "./notes-controller.js";
import express from "express";
import path from "path";

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
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);

  res.render("index", {
    notes: await getNotes(),
    flag: "created",
  });
});

app.delete("/:id", async (req, res) => {
  await delNote(req.params.id);
  res.render("index", {
    notes: await getNotes(),
    flag: "deleted",
  });
});

app.put("/", async (req, res) => {
  const { id, newTitle } = req.body;
  await updateNote(id, newTitle);
  res.render("index", {
    notes: await getNotes(),
    flag: "edited",
  });
});

app.listen(port, () => {
  console.log(chalk.green(`server is running on port ${port}`));
});
