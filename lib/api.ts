import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const apiCall = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiCall;