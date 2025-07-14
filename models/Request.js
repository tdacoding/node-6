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
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  },
});

export const Request = mongoose.model("Request", requestSchema);
