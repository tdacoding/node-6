import { Request } from "./models/Request.js";

export const addRequest = async (name, phone, description) => {
  await Request.create({ name, phone, description });
};

export const getRequests = async () => {
  return await Request.find();
};
