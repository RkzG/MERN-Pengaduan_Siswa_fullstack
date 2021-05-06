import axios from "axios";

import { getToken, clearStorage } from "./storage";

export function BEARER_AUTH() {
  return { Authorization: `${getToken()}` };
}

const BASE_URL = "http://localhost:5000";

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => {
        if (res.data.message === "token tidak valid") clearStorage();
        else resolve(res.data);
      })
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: "error",
          message: "failed to fetch data. Please contach developer.",
        };
        if (!err.message) reject(defaultError);
        else reject(err);
      });
  });
};

export const loginUser = async (data) =>
  await fetch(`${BASE_URL}/login`, "post", data);

export const registerUser = async (data) =>
  await fetch(`${BASE_URL}/register`, "post", data);

export const getLaporan = async () =>
  await fetch(`${BASE_URL}/laporan`, "get", { headers: BEARER_AUTH() });

export const getStatistic = async () =>
  await fetch(`${BASE_URL}/statistik`, "get", { headers: BEARER_AUTH() });

export const getAllPengaduan = async (page) =>
  await fetch(`${BASE_URL}/pengaduan?page=${page}`, "get", {
    headers: BEARER_AUTH(),
  });

export const getDetailPengaduan = async (id) =>
  await fetch(`${BASE_URL}/pengaduan/${id}`, "get", {
    headers: BEARER_AUTH(),
  });

export const putStatusPengaduan = async (id, data) =>
  await fetch(`${BASE_URL}/pengaduan/${id}/status`, "put", data, {
    headers: BEARER_AUTH(),
  });

export const addPengaduan = async (data) =>
  await fetch(`${BASE_URL}/pengaduan`, "post", data, {
    headers: BEARER_AUTH(),
  });
export const editProfile = async (data) =>
  await fetch(`${BASE_URL}/profile`, "put", data, { headers: BEARER_AUTH() });

export const editPassword = async (data) =>
  await fetch(`${BASE_URL}/password`, "put", data, { headers: BEARER_AUTH() });
