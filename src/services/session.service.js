import axiosInstance from "../api/axios";

export const restoreSession = async () => {

  try {

    const res = await axiosInstance.get("/auth/refresh");

    localStorage.setItem("accessToken", res.data.accesstoken);
    localStorage.setItem("role", res.data.user.role);

    return true;

  } catch {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    return false;

  }

};