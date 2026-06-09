import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContext } from "./Context/AuthContext.jsx";
import { restoreSession } from "./services/session.service";

import ProtectedRoute from "./Components/ProtuctedRoute.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import DashBoardPage from "./pages/DashBoardPage/DashBoardPage.jsx";
import WishList from "./pages/WishListPage/WishList.jsx";

import Admin from "./pages/Admin/Admin.jsx";
import AddProductPage from "./pages/AddProductPage/AddProductPage.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";

import Footer from "./Components/Footer/Footer.jsx";

const App = () => {

  const { loading } = useContext(AuthContext);

  const [sessionReady, setSessionReady] = useState(false);


  /*
  =====================================
  RESTORE SESSION ON PAGE REFRESH
  =====================================
  */

  useEffect(() => {

    const initSession = async () => {

      await restoreSession();

      setSessionReady(true);

    };

    initSession();

  }, []);


  /*
  =====================================
  PREVENT UI FLICKER BEFORE AUTH READY
  =====================================
  */

  if (loading || !sessionReady) return null;


  return (

    <BrowserRouter>

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <Routes>

        {/* Redirect root to login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* PUBLIC ROUTE */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />


        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />


        {/* WISHLIST */}
        <Route
          path="/wishList"
          element={
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          }
        />


        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route
            path="add-product"
            element={<AddProductPage />}
          />

          <Route
            path="products"
            element={<ProductsPage />}
          />

        </Route>

      </Routes>



    </BrowserRouter>

  );

};

export default App;