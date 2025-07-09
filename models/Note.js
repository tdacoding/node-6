import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Note = mongoose.model("Note", noteSchema);
