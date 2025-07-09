import chalk from "chalk";
import { Note } from "./models/Note.js";

export const addNote = async (title) => {
  await Note.create({ title });
  console.log(chalk.green("Note was added!"));
};

export const updateNote = async (noteId, newTitle) => {
  await Note.updateOne({ _id: noteId }, { title: newTitle });
  console.log(chalk.green("Note was updated!"));
  return;
};

export const delNote = async (noteId) => {
  await Note.deleteOne({ _id: noteId });
  console.log(chalk.green("Note was removed!"));
};

export const getNotes = async () => {
  return await Note.find();
};

export const printNotes = async () => {
  const notes = await getNotes();
  console.log(chalk.bgBlue("The list of notes"));
  notes.forEach(({ title, id }) => {
    console.log("id: ", chalk.red(id), "  Note title: ", chalk.blue(title));
  });
};
