import axios, { AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "https://concurso-gastronomico-api.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const userRole = localStorage.getItem("userRole")

        if (userRole === "client") {
          const response = await axios.post(
            "https://concurso-gastronomico-api.onrender.com/api/users/auth/refresh-token",
            { refreshToken },
          );

          const newAccessToken = response.data.accessToken;

          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } else if (userRole === "restaurant") {
          const response = await axios.post(
            "https://concurso-gastronomico-api.onrender.com/api/restaurants/auth/refresh-token",
            { refreshToken },
          );

          const newAccessToken = response.data.accessToken;

          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } else {
          console.warn("Role desconhecida ou ausente no localStorage");
        }


      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authUser");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
