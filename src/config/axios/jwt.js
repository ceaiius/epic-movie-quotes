import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});
axiosInstance.defaults.withCredentials = true;
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.authenticated = false;
      // this should redirect on 401 error page
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
