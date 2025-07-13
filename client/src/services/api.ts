import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
});

export const getCryptos = () => API.get("/cryptos");
export const getCryptoHistory = (id: string) => API.get(`/cryptos/${id}/history`);
