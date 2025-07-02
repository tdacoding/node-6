#!/usr/bin / env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { printNotes, addNote, delNote } from "./notes-controller.js";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Add new note to list",
    { title: { type: "string", describe: "Note title", demandOption: true } },
    async ({ title }) => {
      await addNote(title);
    }
  )
  .command("list", "Print all notes", async (argv) => {
    await printNotes();
  })
  .command(
    "remove",
    "Remove a note by id",
    { id: { type: "string", describe: "Title id", demandOption: true } },
    async ({ id }) => {
      await delNote(id);
    }
  )
  .parse();
