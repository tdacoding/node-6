import fs from "node:fs/promises";
import path from "node:path";
import chalk from "chalk";

const notesPath = path.join(path.resolve(), "db.json");

export const addNote = async (title) => {
  const data = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  data.push(note);
  const jsonData = JSON.stringify(data);
  await fs.writeFile(notesPath, jsonData);
  console.log(chalk.green("Note was added!"));
};

export const updateNote = async (noteId, newTitle) => {
  const data = await getNotes();
  const updatedData = data.map(({ id, title }) =>
    id !== noteId ? { id, title } : { id, title: newTitle }
  );

  const jsonData = JSON.stringify(updatedData);
  await fs.writeFile(notesPath, jsonData);
  console.log(chalk.green("Note was updated!"));
  return;
};

export const delNote = async (noteId) => {
  const data = await getNotes();
  const updatedData = data.filter(({ id }) => id !== noteId);
  const jsonData = JSON.stringify(updatedData);
  await fs.writeFile(notesPath, jsonData);
  console.log(chalk.green("Note was removed!"));
};

export const getNotes = async () => {
  return await fs.readFile(notesPath).then((data) => JSON.parse(data));
};

export const printNotes = async () => {
  const notes = await getNotes();
  console.log(chalk.bgBlue("The list of notes"));
  notes.forEach(({ title, id }) => {
    console.log("id: ", chalk.red(id), "  Note title: ", chalk.blue(title));
  });
};
