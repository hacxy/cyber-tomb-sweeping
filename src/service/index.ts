import axios from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getFirstSacrifices = async () => {
  return await instance.get("/sacrifices/info").then((res) => {
    return res.data.data;
  });
};

export const deleteFirstSacrifices = async () => {
  return await instance.delete("/sacrifices").then((res) => res.data);
};

export const getCurrentCount = async () => {
  return await instance.get("/sacrifices/count").then((res) => res.data.data);
};
export default instance;
