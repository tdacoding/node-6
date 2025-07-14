import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+7\d{10}$/.test(v);
      },
      message: (props) => "Номер телефона должен быть в формате +79999999999",
    },
  },
  created_at: {
    type: String,
    default: () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  description: {
    type: String,
    required: false,
  },
});

export const Request = mongoose.model("Request", requestSchema);
