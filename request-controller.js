import chalk from "chalk";
import { Request } from "./models/Request.js";

export const addRequest = async (name, phone, description) => {
  await Request.create({ name, phone, description });
};

export const updateNote = async (noteId, newTitle, owner) => {
  const result = await Note.updateOne(
    { _id: noteId, owner },
    { title: newTitle }
  );
  if (result.matchedCount === 0) {
    throw new Error("No note to edit");
  }
  console.log(chalk.green("Note was updated!"));
  return;
};

export const delNote = async (noteId, owner) => {
  const result = await Note.deleteOne({ _id: noteId, owner });
  if (result.matchedCount === 0) {
    throw new Error("No note to edit");
  }
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
