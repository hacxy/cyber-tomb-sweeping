import axios from "axios";
import { BASE_URL } from "./config";
import { showToast } from "vant";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getFirstSacrifices = async () => {
  return await instance
    .get("/sacrifices/info")
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      showToast("网络异常");
    });
};

export const deleteFirstSacrifices = async () => {
  return await instance
    .delete("/sacrifices")
    .then((res) => res.data)
    .catch(() => {
      showToast("网络异常");
    });
};

export const getCurrentCount = async () => {
  return await instance
    .get("/sacrifices/count")
    .then((res) => res.data.data)
    .catch(() => {
      showToast("网络异常");
    });
};
export default instance;
