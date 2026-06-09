import { createContext, useEffect, useState } from "react";

import {
  getWishlistAPI,
  addWishlistAPI,
  removeWishlistAPI
} from "../services/wishlist.service";

export const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);


useEffect(() => {

  const token =
    localStorage.getItem("accessToken");

  if (!token) return;

  loadWishlist();

}, []);


  const loadWishlist = async () => {

    try {

      const data = await getWishlistAPI();

      setWishlist(data);

    } catch (err) {

      console.log("Wishlist load error");

    }

  };


  const addToWishlist = async (product) => {

    try {

      await addWishlistAPI(product);

      setWishlist(prev => [...prev, product]);

    } catch (err) {

      console.log(err);

    }

  };


  const removeFromWishlist = async (productId) => {

    try {

      await removeWishlistAPI(productId);

      setWishlist(prev =>
        prev.filter(item =>
          item.productId !== productId
        )
      );

    } catch (err) {

      console.log(err);

    }

  };


  const isInWishlist = (productId) => {

    return wishlist.some(
      item => item.productId === productId
    );

  };


  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>

  );

};
