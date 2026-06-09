import axios from "axios";
import { API } from "../config/api";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true
});

let isRefreshing = false;
let pendingRequests = [];


/* ===============================
   PROCESS QUEUE
================================ */

const processQueue = token => {

  pendingRequests.forEach(cb => cb(token));

  pendingRequests = [];

};


/* ===============================
   REQUEST INTERCEPTOR
================================ */

axiosInstance.interceptors.request.use(config => {

  const token = localStorage.getItem("accessToken");

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;

});


/* ===============================
   RESPONSE INTERCEPTOR
================================ */

axiosInstance.interceptors.response.use(

  res => res,

  async error => {

    const originalRequest = error.config;

    if (

      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")

    ) {

      if (isRefreshing) {

        return new Promise(resolve => {

          pendingRequests.push(token => {

            originalRequest.headers.Authorization =
              `Bearer ${token}`;

            resolve(axiosInstance(originalRequest));

          });

        });

      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {

        const refreshResponse =
          await axiosInstance.get("/auth/refresh");

        const newToken =
          refreshResponse.data.accesstoken;

        const role =
          refreshResponse.data.user.role;


        localStorage.setItem(
          "accessToken",
          newToken
        );

        localStorage.setItem(
          "role",
          role
        );


        processQueue(newToken);


        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return axiosInstance(originalRequest);

      } catch {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        pendingRequests = [];

        window.location.href = "/login";

        return Promise.reject(error);

      } finally {

        isRefreshing = false;

      }

    }

    return Promise.reject(error);

  }

);

export default axiosInstance;