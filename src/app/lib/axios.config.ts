import axios from "axios";
import { BASE_URL } from "@/data/utils/environments";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //     'Authorization': 'Bearer ' + getToken(),
  // },
});

export default axiosInstance;
