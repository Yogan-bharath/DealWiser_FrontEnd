import axiosInstance from "../api/axios";

export const getWishlistAPI = async () => {

  const res = await axiosInstance.get("/wishlist");

  return res.data;

};

export const addWishlistAPI = async (product) => {

  const res = await axiosInstance.post("/wishlist", {
    productId: product.productId,
    name: product.name,
    image: product.image,
    prices: product.prices,
    link: product.bestStore?.link || product.link
  });

  return res.data;

};


export const removeWishlistAPI = async (productId) => {

  await axiosInstance.delete(`/wishlist/${productId}`);

};