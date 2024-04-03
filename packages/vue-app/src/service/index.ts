import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1118",
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
