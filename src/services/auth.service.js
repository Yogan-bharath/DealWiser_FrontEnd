import axiosInstance from "../api/axios";

export const registerUser = async (data) => {

  const res = await axiosInstance.post("/auth/register", data);

  localStorage.setItem("accessToken", res.data.accesstoken);
  localStorage.setItem("role", res.data.user.role);

  return res.data;
};


export const loginUser = async (data) => {

  const res = await axiosInstance.post("/auth/login", data);

  // ✅ unified token storage
  localStorage.setItem("accessToken", res.data.accesstoken);
  localStorage.setItem("role", res.data.user.role);

  return res.data;
};


export const getProfile = async () => {

  const token = localStorage.getItem("accessToken");

  const res = await axiosInstance.get("/auth/getMe", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};


export const logoutUser = async () => {

  await axiosInstance.post("/auth/logout");

  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
};